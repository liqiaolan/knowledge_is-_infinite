const fs = require("node:fs/promises");
const path = require("node:path");
const { buffer } = require("stream/consumers");

/**
    fs.readFile() 读取文件
    fs.appendFile()  创建新文件, 或将数据添加到已有文件中
    fs.mkdir() 创建目录
    fs.rmdir() 创建目录
    fs.rm() 删除文件
    fs.rename() 重命名
    fs.copyFile() 复制文件
*/

// fs.appendFile(path.resolve(__dirname, "./hello1.txt"), "创建新文件").then((res) => {
//   console.log("执行成功");
// });

// fs.readFile(path.resolve(__filename, "../target.png"))
//   .then((buffer) => {
//     console.log("这是图片的buffer", buffer);
//     return fs.appendFile(
//       path.resolve(__filename, "../target1.png"),
//       buffer
//     );
//   })
//   .then((res) => {
//     console.log("成功");
//   });

// fs.mkdir(path.resolve(__dirname,'./test'))
// fs.rmdir(path.resolve(__dirname,'./test'))
// fs.rm(path.resolve(__dirname,'./test/11.js'))

// fs.rename(path.resolve(__dirname,'./test'),path.resolve(__dirname,'./test1'))
fs.copyFile(path.resolve(__dirname,'./fs.js'),path.resolve(__dirname,'./test/fs.js'))