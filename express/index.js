const e = require("express");
const express = require("express");
const path = require("node:path");
const app = express();
// 配置静态资源的路径
app.use(express.static(path.resolve(__dirname, "./tool")));
// 引入解析请求体解析的中间件
app.use(express.urlencoded());
// 添加路由
app.get("/login", (req, res) => {
  const query = req.query;
  console.log(query, "nihao ");
  res.send("你好");
});
app.post("/login", (req, res) => {
  /** 默认情况下express不会自动解析请求体,需要通过中间件来为其增加功能 */
  const body = req.body;
  console.log(body, "=== ");
  if (body.name === "admin" && body.password === "111111") {
    res.send("post请求");
  } else {
    res.send("登录失败");
  }
});
app.listen("3001", () => {
  console.log("项目启动完成~");
});
