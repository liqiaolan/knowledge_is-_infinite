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