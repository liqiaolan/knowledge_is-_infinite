/**
 * classNames  传参类型为 number string object arr
 * 循环本来使用了  let i = len; i--; 出来的顺序单元测试不通过，需要翻转才可以所以修改为正序列
 * argument 和 普通数组的区别：
 * */

type Param =
  | string
  | number
  | boolean
  | undefined
  | null
  | Record<string, unknown>;

const getType = (arg) => {
  /**
   * match方法检索返回一个字符串匹配正则表达式的结果，返回的是数组
   * . 匹配除换行符（\n,\r)之外的任何单个字符
   * * 匹配前面的子表达式0次或多次，例如zo* 能匹配 "z" 以及 "zoo"。* 等价于{0,}
   * ? 匹配前面的子表达式零次或一次。例如，"do(es)?" 可以匹配 "do" 或 "does" 。? 等价于 {0,1}。
   *   当该字符紧跟在任何一个其他限制符 (*, +, ?, {n}, {n,}, {n,m}) 后面时，
   *   匹配模式是非贪婪的。非贪婪模式尽可能少的匹配所搜索的字符串，
   *   而默认的贪婪模式则尽可能多的匹配所搜索的字符串。
   *   例如，对于字符串 "oooo"，'o+?' 将匹配单个 "o"，而 'o+' 将匹配所有 'o'。
   */
  const types = Object.prototype.toString
    .call(arg)
    .match(/\[object (.*?)\]/)[1];
  return types;
};

const classNames: (...arg: Array<Param | Array<Param>>) => string = (
  ...arg
) => {
  /**
   * arg 和 argument 是不一样的  arg是一个正常数组
   */
  let classStr = "",
    len = arg.length;

  for (let i = 0; i < len; i++) {
    let element: Param | Array<Param> = arg[i];
    /**
     * element 的判断是将null undefined去掉，==的判断转换
     */
    if (
      (typeof element === "string" || typeof element === "number") &&
      element
    ) {
      classStr += `${element} `;
    } else {
      if (getType(element) === "Object") {
        /**
         * 如果有addPrefixCls函数 实现在类名前拼接
         */
        if (
          element.hasOwnProperty("addPrefixCls") &&
          getType(element["addPrefixCls"]) === "Function"
        ) {
          for (let j in element) {
            if (element[j] && j !== "addPrefixCls") {
              classStr += `${element.addPrefixCls() + j} `;
            }
          }
        } else {
          for (let j in element) {
            if (element[j]) {
              classStr += `${j} `;
            }
          }
        }
      } else if (getType(element) === "Array") {
        element.forEach((el) => {
          /**
           * 判断是不是为空字符串的原因
           * a    b
           * classNames(['a', 0, null, undefined, false, true, 'b']
           */
          const tmpclassNames = classNames(el);
          classStr += tmpclassNames ? `${tmpclassNames} ` : `${tmpclassNames}`;
        });
      }
    }
  }
  return classStr.trim();
};

module.exports = classNames;
