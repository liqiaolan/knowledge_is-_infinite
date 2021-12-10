class queryString {
  parse(str, options) {
    options = Object.assign(
      {
        sort: true,
        // decode: true,
        // arrayFormat: 'none',
        // arrayFormatSeparator: ',',
        // parseNumbers: false,
        // parseBooleans: false
      },
      options
    );
    const q = {};
    str.replace(/([^#?&=]+)=([^&]+)/g, (_, k, v) => {
      if (Object.keys(q).indexOf(k) === -1) {
        q[k] = v || null;
      } else {
        q[k] = [q[k], v || null].flat();
      }
    });
    if (options.sort) {
      let b = {};
      Object.keys(q)
        .sort()
        .forEach((item) => {
          b = {
            ...b,
            [item]: q[item],
          };
        });
      Object.assign(q, b);
      return b;
    }
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
