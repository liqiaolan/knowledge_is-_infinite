const DeepClone = (arg) => {
  let tmp, k;
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
        k = arg.length;
        for (tmp = new Array(k); k--; ) {
          tmp[k] = DeepClone(arg[k]);
        }
        return tmp;
      case type("Object"):
        tmp = {};
        for (let i in arg) {
          if (i === "__proto__") {
            Object.defineProperty(tmp, i, {
              value: DeepClone(arg[i]),
              configurable: true,
              enumerable: true,
              writable: true,
            });
          }
          tmp[i] = DeepClone(arg[i]);
        }
        return tmp;
      case type("Set"):
        tmp = new Set();
        arg.forEach((element) => {
          tmp.add(DeepClone(element));
        });
        return tmp;
    }
  }
};

module.exports = DeepClone;
