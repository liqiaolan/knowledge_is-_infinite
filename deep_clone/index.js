const DeepClone = (arg) => {
  let tmp;
  if (typeof arg !== "object") {
    return arg;
  } else {
    const type = (str) =>
      Object.prototype.toString.call(arg) === `[object ${str}]`;
    switch (true) {
      case type("Null"):
        return arg;
      case type("Array"):
        /**
         * for性能比forEach好
         * 该情况数组的长度是已知，所以使用for
         */
        tmp = new Array(arg.length);
        for (let i = 0; i < tmp.length; i++) {
          tmp[i] = DeepClone(arg[i]);
        }
        return tmp;
      case type("Object"):
        tmp = {};
        for (let i in arg) {
          tmp[i] = DeepClone(arg[i]);
        }
        return tmp;
    }
  }
};

module.exports = DeepClone;
