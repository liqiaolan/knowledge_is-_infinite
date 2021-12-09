class queryString {
  parse(str, options) {
    /**
     *  options = {
     *   arrayFormat: 'none'| 'bracket' | 'index' |'comma' | 'separator' | 'bracket-separator'
     *   arrayFormat: '默认'| '方括号' | '数组下标' |'逗号' | '下划线' | '方括号且下划线'
     * }
     */
    const q = {};
    str.replace(/([^#?&=]+)=([^&]+)/g, (_, k, v) => {
      if (Object.keys(q).indexOf(k) === -1) {
        q[k] = v;
      } else {
        q[k] = [...q[k], v];
      }
    });
    return q;
  }
  stringify(parse, options) {
    let str = "";
    if (Object.prototype.toString.call(parse) === "[object Object]") {
      Object.entries(parse).forEach((element) => {
        let k = element[0];
        if (Array.isArray(element[1])) {
          let arrStr = "";
          element[1].forEach((item) => {
            arrStr += `&${k}=${item}`;
          });
          str += arrStr;
        } else {
          let v = window.encodeURIComponent(element[1]);
          str += `&${k}=${v}`;
        }
      });
      return str.slice(1);
    } else {
      return;
    }
  }
}

module.exports = new queryString();
