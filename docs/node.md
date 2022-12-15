#### CommonJS
  - CommonJS: 是node.js中的模块化机制
  - 在node.js中,一个js文件就是一个模块
  - commonjs引入模块 require("模块路径")函数引入模块
  - 模块名要以./或者../开头
  - 在定义模块时, 模块中的内容默认是不能被外部看到的, 可以通过exports来设置要向外部暴露的内容
  - 访问exports的方式有两种: exports和module.exports两者是相等的 exports === module.exports
  - 当我们在其他模块中引入当前模块时,require函数返回的就是exports
  - 可以将希望暴露给外部模块的内容设置为exports的属性
  
  ```
    既然exports === module.exports
    为啥不能exports = {
        a:1,
        b:2
    }
    而modules.exports = {
        a:1,
        b:2
    }可以, 因为module.exports是在给module的exports增加属性
    而直接exports就是在改写exports
  ```
 - commonjs中文件的扩展名可以省略不写, commonjs会自动补全(顺序js/json/node)
 - 引入node的核心模块时,直接写核心模块名字即可,也可以在核心模块前添加 node:
  
  ```
    const path = require("path");
    const path = require("node:path");// 这样写速度更快
  ```
 - 当一个文件夹作为模块的时候, 默认查找的是文件夹下index
 - 我们在使用node时候, 使用到的exports,require,module等

  ```
   (function(exports,requires,module,__filename,__dirname){
        //所有的这种变量都是以实参传进来的, 不是全局变量
    })
    怎么证明是函数呢: 所有的函实参都会封装到 arguments中
    console.log(arguments) 
  ```

#### ES(es6标准)
  - 默认情况下,node中模块化标准是commonjs
  - 要使用es的模块化, 1、使用mjs作为扩展名 2、修改package.json将模块化规范设置为ES模块
  - 在es模块中引入文件必须要写全, 不能和react相比, 因为react是有webpack打包工具来补全的
  - es模块化,导入的内容都是常量,es模块都是运行在严格模式下
  - es模块化在浏览器同样也支持, 但是一般不直接使用,因为有兼容性, 通常都会结合打包工具使用

#### node核心模块
  - 核心模块是node中自带的模块,可以在node中直接使用
  - window 是浏览器的宿主对象,node中是没有的,global是node中的全局对象, 作用类似于window
  - es标准下, 全局对象的标准名应该是globalThis
  
#### node核心模块介绍

  1. process
        1. process表示当前node的进程,通过该对象可以获取进程的信息或者对进程做各种操作
        1. process是一个全局变量, 可以直接使用
        2. 属性和方法

           - process.exit() 结束当前进程, 终止node 
           - process.nextTick(callback[, ...args]) 
            - 将函数插入到 tick队列中
            - tick队列中的代码,会在下一次事件循环之前执行顺序如下(调用栈、tick队列、微任务队列、宏任务队列)
            - tick队列出现在微任务队列之前, 是老版的微任务队列

  2. path
        1. 表示路径, 通过path可以用来获取各种路径
        2. 方法: path.resolve([...paths]) 用来生成一个绝对路径 
        3. 相对路径: ./xxx ../xxx 
        4. 绝对路径: - 在计算机本地, window下 c:\xx linux下 /user/ 在网络中 http://www.xxx或者https://www.xxx
        5. const resultUrl =  path.resolve(__dirname,'./hello.js') 在使用路径时,尽量使用path.resolve()来生成路径
   
  3. fs (File System)
        1. fs用来帮助node来操作磁盘中的文件
        2. 文件操作就是所谓的I/0  input output
        3. fs.readFileSync('./hello.txt');readFileSync同步的读取文件的方法, 会阻塞后边的代码执行,当我们通过fs模块读取磁盘中的数据时候, 读取的数据总会以Buffer对象的形式返回
        4. Buffer是一个临时用来存储数据的缓存区
        5. readFile异步读取文件, 需要传回调函数接受参数,容易形成回调地域
   

           ```
              const buf = fs.readFile(path.resolve(__dirname,'./hello.txt'),(err,buffer)=>{
                  if(err){
                      console.log(err,'出错来')
                  }else{
                      console.log(buffer.toString())
                  }
              })
           ```

      1. 推荐使用node:fs/promises
          
          ```
            fs.readFile(path.resolve(__dirname,'./hello.txt')).then(buffer => {
                console.log('这是获取的结果',buffer)
            }).catch(err => {
                console.log(err,'出错')
            })
            // await方式 语法糖形式
            (async () => {
              try {
                const buf = await fs.readFile(path.resolve(__dirname, "./hello.txt"));
                console.log(buf.toString(), "await执行的结果");
              } catch(e) {
                console.log("await捕获异常");
              }
            })();
          ```


### npm相关

  - cnpm不推荐使用: cnpm生成的是软链接的映射, 他是为了解决npm和cnpm一起使用
  - 在一些开发工具上, cnpm上的东西映射无法反映,导致无法使用