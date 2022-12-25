const express = require('express');
const app = express()
/**
* 中间件
* 在express中我们使用app.use来定义一个中间件
  中间件作用和路由很像,用法也很像
  但是路由不区分请求方式, 只看路径
  next()是use回调函数的第三个参数, 放行
  中间件做权限检查等
* 
*/
app.use("",(req,res) => {
    console.log('中间件1')
    // res.sendStatus(200)
    res.send('<h1>中间件1</h1>')
})
app.use("",(req,res) => {
    console.log('中间件2')
    // res.sendStatus(200)
    res.send('<h1>中间件2</h1>')
})
app.use("",(req,res) => {
    console.log('中间件3')
    // res.sendStatus(200)
    res.send('<h1>中间件3</h1>')
})
app.listen(3001)