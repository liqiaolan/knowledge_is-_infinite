/**
 * async 就是一个语法糖,可以快速创建一个异步函数
 * 通过async可以创建一个异步函数,异步函数的返回值会自动封装
 * async引出的原因: Promise如果调用多次会出现then很多的链式调用
 * 写多了阅读和理解不好, 所以采用同步的方式去调用异步的代码增加更好的阅读性
 *
 * function fn1(){
 *     return '哈哈果'
 * }
 * console.log(fn1()); //执行结果: 哈哈果
 *
 * async function fn2(){
 *     return '哈哈果'
 * }
 * console.log(fn2()); //执行结果: Promise { '哈哈果' }
 *
 * 注意1: 当我们通过await去调用异步函数时, 它会暂停代码的运行直到异步代码执行有结果的时候才会将结果返回
 *       [但是await只阻塞自己函数内部的, 不阻塞全局的运行]
 *        await只能用于aysnc声明的异步函数中, 或es模块的顶级作用域中
 * 注意2: 通过await调用异步代码时, 需要通过try{}catch{}来处理异步代码
 * 注意3: await后边的所有代码, 都会放入到微任务队列中执行: 注意是await后
 * 
 *  try{
 *       const result = await fn1();
 *  }catch(e){
 *       console.log(e,'出错了')
 *  }
 *
 */

async function fn1(){
    console.log(1)
    await console.log(2)
    console.log(5)
    await console.log(3)
    console.log(6)
}
fn1()
console.log(4)