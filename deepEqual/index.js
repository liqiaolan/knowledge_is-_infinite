/**
 *  @typedef {import('./index.d').DeepEqual}
 *  爬坑之路：
 *  1、本来使用的Object.prototype.toString.call来判断基础数据类型，
 *     使用 ===  判断是否相等，但是 void 0 和 undefined不相等验证不过
 *  链接  https://github.com/inspect-js/is-equal
 */
const has = Object.prototype.hasOwnProperty;
const getType = (el) => Object.prototype.toString.call(el);
const judgeNaN = (value) => {
  return typeof value === "number" && isNaN(value);
};

const DeepEqual = (value, other) => {
  // 先保证是同一个类型
  if (getType(value) === getType(other)) {
    if (judgeNaN(value) && judgeNaN(other)) {
      return true;
    }
    /**
     * typeof null 为 object  null === null
     */
    if (typeof value !== "object" || value === null) {
      return value === other;
    }
    // 对象处理
    if (getType(value) === "[object Object]") {
      let len1 = Object.keys(value).length;
      let len2 = Object.keys(other).length;
      if (len1 === len2) {
        for (const key of Object.keys(value)) {
          if (has.call(value, key) && !has.call(other, key))
            return false;
          if (!DeepEqual(value[key], other[key])) return false;
        }
        return true;
      }
    }
    // 数组处理
    if (getType(value) === "[object Array]") {
      let len = value.length;
      if (len === other.length) {
        for (let j = 0; j < len; j++) {
          if (!DeepEqual(value[j], other[j])) return false;
        }
        return true;
      }
    }
    // 时间类型处理
    if (getType(value) === "[object Date]") {
      return value.getTime() === other.getTime();
    }
    // 正则类型处理
    if (getType(value) === "[object RegExp]") {
      return value.toString() === other.toString();
    }
    // Set
    if (getType(value) === "[object Set]") {
      if (value.size === other.size) {
        for (let i of value) {
          if (typeof i !== "object") {
            if (!other.has(i)) return false;
          } else {
            if (!DeepEqual(i, other.get(i))) return false;
          }
        }
        return true;
      }
    }
    console.log("来着");
    return false;
  }
  return false;
};
export default DeepEqual;
