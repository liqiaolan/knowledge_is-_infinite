/**
 * classNames  传参类型为 number string object arr
 * 循环本来使用了  let i = len; i--; 出来的顺序单元测试不通过，需要翻转才可以所以修改为正序列
 */

const type = (arg, str) =>
  Object.prototype.toString.call(arg) === `[object ${str}]`;

const classNames = (...arg) => {
  let classArr = [],
    len = arg.length;

  for (let i = 0; i < len; i++) {
    let element = arg[i];
    /**
     * element 的判断是将null undefined去掉，==的判断转换
     */
    if (
      (typeof element === "string" || typeof element === "number") &&
      element
    ) {
      classArr.push(element);
    } else {
      switch (true) {
        case type(element, "Object"):
          /**
           * 如果有addPrefixCls函数 实现在类名前拼接
           */
          if (
            element.hasOwnProperty("addPrefixCls") &&
            type(element["addPrefixCls"], "Function")
          ) {
            for (let j in element) {
              if (element[j] && j !== "addPrefixCls") {
                classArr.push(element.addPrefixCls() + j);
              }
            }
          } else {
            for (let j in element) {
              if (element[j]) {
                classArr.push(j);
              }
            }
          }
          break;
        case type(element, "Array"):
          element.forEach((el) => {
            /**
             * 判断是不是为空字符串的原因
             * classNames(['a', 0, null, undefined, false, true, 'b']
             * 直接split会出现[''],想用正则没写出来【.split(/^\s(' ')\s$/g))
             */
            classArr = classArr.concat(
              classNames(el) !== "" ? classNames(el).split(" ") : []
            );
          });
          break;
      }
    }
  }
  return classArr.join(" ");
};

module.exports = classNames;
