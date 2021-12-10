const queryStringTest = require("./index");
// 模拟单元测试 注释代表已通过
// console.log(queryStringTest.parse("?foo=bar")); // {foo: 'bar'}
// console.log(queryStringTest.parse("#foo=bar")); // {foo: 'bar'}
// console.log(queryStringTest.parse("&foo=bar&foo=baz")); // {foo: ['bar', 'baz']}
// console.log(queryStringTest.parse("&foo=bar&foo=baz&foo=bas")); // {foo: ['bar', 'baz' ,'bas']}
// console.log(queryStringTest.parse("foo=bar&")); // {foo: 'bar'}
// console.log(queryStringTest.parse("foo=bar&&&")); // {foo: 'bar'}
// console.log(queryStringTest.parse("foo=bar&&&")); // {foo: 'bar'}
// console.log(queryStringTest.parse("foo=bar")); // {foo: 'bar'}
// console.log(queryStringTest.parse("foo=bar&key=val")); // { foo: 'bar',key: 'val'}
// console.log(queryStringTest.parse("b=foo&a=bar&c=yay")); // { a: 'bar',b: 'foo',c: 'yay'}
// console.log(queryStringTest.parse("b=foo&a=bar&c=yay", { sort: false })); // { b: 'foo',a: 'bar',c: 'yay'}

console.log(queryStringTest.parse("foo=")); // {foo: null}