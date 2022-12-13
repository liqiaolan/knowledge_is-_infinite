const fs = require("node:fs/promises");
const express  = require('express')
console.log(express)
// const fs = require("node:fs/promises");
const path = require("node:path");
fs.readFile(path.resolve(__dirname,'./hello.txt')).then(buffer => {
    console.log('这是获取的结果',buffer)
}).catch(err => {
    console.log(err,'出错')
})
// await方式 语法糖形式
;(async () => {
  try {
    const buf = await fs.readFile(path.resolve(__dirname, "./hello.txt"));
    console.log(buf.toString(), "await执行的结果");
  } catch(e) {
    console.log("await捕获异常");
  }
})();

