/**
 * Promise方法的核心在于解决异步,承诺存值
 * 只存一次, 不会丢, 同时then实现promise的链式调用
 * then返回的是什么: 返回的是promise中存的值
 * queueMicrotask(() => {}) 创建微任务队列
 * 私有方法和私有属性外边实例不可访问加#表示私有
 *
 * 类中方法: 如果是普通函数形式是放在了函数的原型中 [只有一次]
 *          如果是箭头函数形式是放在了对象中 [这种情况稍微浪费一点内存]
 *  - MyPromiseStatus记录Promise的状态（三种状态）
 *          pending  （进行中）
 *          fulfilled（完成） 通过resolve存储数据时
 *          rejected（拒绝，出错了） 出错了或通过reject存储数据时
 * 状态一旦改变就不会再被修改,所以使用状态来判断是否赋值
 *
 */
const MyPromiseStatus = {
  PENDING_STATUS: 0,
  FULFILLED_STATUS: 1,
  REJECTED_STATUS: 2,
};

class MyPromise {
  #result = null; //用来存储值
  #status = MyPromiseStatus.PENDING_STATUS;
  #onFulfilledCallbacks = []; //用来执行成功的回调函数 []为了实现then的多次调用
  #onRejectedCallbacks = []; //用来执行回调函数

  constructor(executor) {
    executor(this.#resolve, this.#reject);
  }
  // resolve 和 reject 是内部方法, 不允许外边修改
  #resolve = (value) => {
    if (this.#status !== MyPromiseStatus.PENDING_STATUS) return;
    this.#result = value;
    this.#status = MyPromiseStatus.FULFILLED_STATUS;
    queueMicrotask(() => {
      this.#onFulfilledCallbacks.forEach((cb) => {
        cb(this.#result);
      });
    });
  };

  #reject = (value) => {
    if (this.#status !== MyPromiseStatus.PENDING_STATUS) return;
    this.#result = value;
    this.#status = MyPromiseStatus.REJECTED_STATUS;
    queueMicrotask(() => {
      this.#onRejectedCallbacks.forEach((cb) => {
        cb();
      });
    });
  };
  // 存值完成, 定义取值方法
  then(onFulfilled, onRejected) {
    /**
     * 谁将成为then返回的新Promise中的数据
     *  then中回调函数的返回值,会成为新的Promise中的返回值
     */
    // 函数可以不传
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            return reason;
          };
    return new MyPromise((resolve, reject) => {
      if (this.#status === MyPromiseStatus.FULFILLED_STATUS) {
        //成功
        queueMicrotask(() => {
          resolve(onFulfilled(this.#result));
        });
      } else if (this.#status === MyPromiseStatus.REJECTED_STATUS) {
        //失败
        queueMicrotask(() => {
          reject(onRejected(this.#result));
        });
      } else {
        // 进行中 --- 如果是异步的时候就要在resolve和reject调用方法
        this.#onFulfilledCallbacks.push(() => {
          resolve(onFulfilled(this.#result));
        });
        this.#onRejectedCallbacks.push(() => {
          reject(onRejected(this.#result));
        });
      }
    });
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

export default MyPromise;
