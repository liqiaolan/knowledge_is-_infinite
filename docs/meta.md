# meta标签应用

#### 1、如果设置了 name 属性，meta元素提供的是文档级别的元数据，应用于整个页面
- content-security-policy 允许定义当前页的内容策略，内容策略主要指定允许的服务器源和脚本断点，这有助于防止夸站点脚本攻击
```
1. content="upgrade-insecure-requests" 自动将http的不安全请求升级为https 
```

- content-type 其值必须是"text/html; charset=utf-8"。注意：该属性只能用于 MIME type 为 text/html 的文档，不能用于MIME类型为XML的文档- x-ua-compatible
如果指定，则 content 属性必须具有值 "IE=edge"。用户代理必须忽略此指示。
- refresh
这个属性指定:
如果 content 只包含一个正整数，则为重新载入页面的时间间隔(秒)；
如果 content 包含一个正整数，并且后面跟着字符串 ';url=' 和一个合法的 URL，则是重定向到指定链接的时间间隔(秒)


#### 2、如果设置了 http-equiv 属性，meta元素则是编译指令，提供的信息和类似命名http头部相同
#### 3、如果设置了 charset 属性，meta元素是一个字符集声明，告诉文档使用哪种字符编码
- <meta charset="UTF-8"> 声明编码
#### 4、如果设置了 itemprop 属性，meta元素提供用户定义的元数据


**注意**
1. 全局属性 name 在 <meta> 元素中具有特殊的语义；另外， 在同一个 <meta> 标签中，name, http-equiv 或者 charset 三者中任何一个属性存在时，itemprop 属性不能被使用。
2. content属性包含http-equiv 或 name属性的值，具体取决于所使用的值
