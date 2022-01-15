/**
 * 类的方法都定义在prototype对象上面
 * 类的内部所有定义的方法，都是不可枚举的Object.keys不可获得，
 * Object.getOwnPropertyNames可取到
 * 关键字使用
 * static：静态方法，表示该方法不会被实例继承，直接通过类来调用
 *         如果静态方法包含this关键字，这个this指的是类，而不是实例
 *         父类的静态方法，可以被子类继承
 */
const PENDING = "PENDING"; // 待定（pending）: 初始状态，既没有被兑现，也没有被拒绝。
const FULFILLED = "FULFILLED"; // 已兑现（fulfilled）: 意味着操作成功完成。
const REJECT = "REJECT"; // 已拒绝（rejected）: 意味着操作失败。

class MyPromise {
  constructor(fn) {
    this.status = PENDING; // 定义初始状态
    // 将成功、失败的结果放在this上，便于then、catch访问
    this.value = null;
    this.reason = null;

    // 成功态、失败态回调函数队列，同步调用then时将对应态的函数注册进去, 在状态变更的时候调用
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    // 实例上的resolve方法
    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 成功态回调函数依次执行
        this.onFulfilledCallbacks.forEach((fn) => fn(this.value));
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECT;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn(this.reason));
      }
    };

    // 生成实例后立即调用fn,把内部的resolve和reject传入fn,用户可调用resolve和reject
    try {
      fn(resolve, reject);
    } catch (err) {
      // fn执行出错，将错误内容用reject抛出去
      reject(err);
    }
  }

  /**
   * then中的参数解释
   * onFulfilled：
   *  当primise变成接受状态（fulfilled）时调用的函数，该函数有一个参数
   *  即接受的最终结果（the fulfillment  value），如果该参数不是函数
   *  则会在内部被替换为（x) => x,即原样返回promise最终结果的函数
   * onReject：
   *  当promise变成拒绝状态（rejected)时调用的函数，该函数有一个参数
   *  即拒绝的原因（reason）如果该参数不是函数，则会在内部被替换为一个
   *  "thrower"函数（it throws an error it received as argument）
   */
  
  then(onFulfilled, onReject) {
    // 实现值穿透 当then中传入的不是函数，则这个promise返回上一个promise的值
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onReject =
      typeof onReject === "function"
        ? onReject
        : (reason) => {
            return reason;
          };
    // 保存前一个promise的this
    const self = this;
    return new MyPromise((resolve, reject) => {
      // 封装前一个promise成功时执行的函数
      let fulfilled = () => {
        try {
          const result = onFulfilled(self.value); // 承前
          return result instanceof MyPromise
            ? result.then(resolve, reject)
            : resolve(result); //启后
        } catch (err) {
          reject(err);
        }
      };
      // 封装前一个promise失败时执行的函数
      let rejected = () => {
        try {
          const result = onReject(self.reason);
          return result instanceof MyPromise
            ? result.then(resolve, reject)
            : reject(result);
        } catch (err) {
          reject(err);
        }
      };

      switch (self.status) {
        case PENDING:
          self.onFulfilledCallbacks.push(fulfilled);
          self.onRejectedCallbacks.push(rejected);
          break;
        case FULFILLED:
          fulfilled();
          break;
        case REJECT:
          rejected();
          break;
      }
    });
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  // 原型的resolve方法
  static resolve(value) {
    // 如果是promise实例，直接返回
    if (value instanceof MyPromise) {
      return value;
    } else {
      // 如果不是promise实例，返回一个新的promise对象，状态为fulfilled
      return new MyPromise((resolve, reject) => resolve(value));
    }
  }
  static reject(reason) {
    // Promise.reject方法的参数会原封不动地作为reject的参数
    return new MyPromise((resolve, reject) => reject(reason));
  }
  /**
   * Promise.all() 接受一个数组，返回一个promise对象
   *    所有的promise状态变为FULFILLED，返回的promise状态才变为FULFILLED。
   *     一个promise状态变为REJECTED，返回的promise状态就变为REJECTED。
   *    数组成员不一定都是promise，需要使用Promise.resolve()处理。
   */
  static all(promiseArr) {
    const len = promiseArr.length;
    const values = new Array(len);

    let count = 0; // 记录已经成功的promise个数
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < len; i++) {
        // Promise.resolve()处理，确保每一个都是promise实例
        MyPromise.resolve(promiseArr[i]).then(
          (val) => {
            values[i] = val;
            count++;
            if (count === len) resolve(values); // 如果全部执行完，改变promise的状态为FulFilled
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach((item) => {
        MyPromise.resolve(item).then(
          (val) => resolve(val),
          (err) => reject(err)
        );
      });
    });
  }
}

export default MyPromise;
