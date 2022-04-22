/**
 * 给定一个整数数组 nums 和一个整数目标值 target，
 * 请你在该数组中找出和为目标值 target  的那两个整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
 */

var twoSum = function (nums, target) {
  if (nums.length < 2) {
    return false;
  }
  let result = [];
  outerloop: for (let i = 0; i < nums.length; i++) {
    innerloop: for (let j = nums.length - 1; j >= i + 1; j--) {
      if (nums[i] + nums[j] === target) {
        result = [i, j];
        break outerloop;
      }
    }
  }
  return result.length > 0 ? result : false;
};

let nums = [11, 15, 10, 1, 8, 2, 4];
let target = 9;
console.log(twoSum(nums, target)); // [3,4]
/**方法2 */
var twoSum2 = function (nums, target) {
  if (nums.length < 2) {
      return false
  }
  let map = new Map()
  for (let i = 0; i < nums.length; i++) {
      const num1 = nums[i];
      const num2 = target - nums[i];
      if (map.has(num1)) {
          return [map.get(num1), i]
      } else {
          map.set(num2, i)
      }
  }
  return false
};


/** apply,call,bind 的内部实现原理
 * apply传入参数为数组
 * call传入参数为对象
 * bind传入参数和call一致
 * 目的：修改this指向
 * 原理：通过内部接收参数，内部调用指定函数
 * 参数第一个是指定的对象，其余为参数,先要确定this一定是个函数
 */

Function.prototype.myApply = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let innerContext = context || window;
  innerContext.fn = this;
  let result = null; // 返回调用函数
  if (arguments[1]) {
    result = innerContext.fn(...arguments[1]);
  } else {
    result = innerContext.fn();
  }
  return result;
};

Function.prototype.myCall = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  let innerContext = context || window;
  innerContext.fn = this;
  let result = null;
  let args = [...arguments].slice(1);
  result = innerContext.fn(...args);
  return result;
};

Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new TypeError("error");
  }
  const _this = this;
  let args = [...arguments].slice(1);
  return function () {
    return _this.call(context, ...args);
  };
};

/**
 *  最长 严格递增 子序列 长度 
 *  子序列： 不连续
 *  子串：  连续
 *  [10,9,2,5,3,7,101,18]
*/