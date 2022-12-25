const express  = require('express')
const path = require('node:path')
/***
 * 实现一个热更新,使用的是nodemon
 * 使用方式:
 *  1、全局安装
 *     npm i nodemon -g
 *     yarn global add nodemon
 *          - 通过yarn进行全局安装是, 默认yarn目录并不在全局变量中
 *          - 需要手动将路径添加到环境变量中
 *     - 启动:
 *          nodemon //运行index.js
 *          nodemon xx //运行制定的js
 * 
 *   2、在项目中安装
 *      npm i nodemon -D
 *      yarn add nodemon -D
 *      
 *      - 启动:
 *          npx nodemon,如果觉得麻烦可以在script中写入命令
 *  
 *  默认启动的是index,js
 */
// 创建实例
const app = express()
// 配置路由
// 设置static中间件后, 浏览器访问时, 会自动在public目录下寻找静态文件
app.use(express.static(path.resolve(__dirname,"./tool")))
app.get('/',(req,res) => {
    res.send('根目录')
})
app.get('/login',(req,res) => {
    const obj =  req.query
    if(obj.password !== '111'){
        res.send('用户名或者密码错误')
    }
    res.send('登录成功')
})
// 启动服务器
app.listen(3001,() => {
    console.log('服务器已启动')
})