## Install

```
yarn add @weimai/utils
```

## Usage

```
import { isIdentityCard } from '@weimai/utils/lib/certify'
const idcard = '83000019641221004X'
if (isIdentityCard(idcard)) {
    console.log("身份证验证通过");
} else {
    alert("请输入合格的身份证号");
}
```

## Api


```
验证类方法 certify.js
转换类方法 transition.js
```

## Develop

- 在目录src下新建目标函数分类的文件
- 编写方法完成后在src -  _tests_文件中编写自己的测试用例
- 编写测试用例完成后执行  yarn  test 执行测试用例
- 测试用例通过后修改package.json,执行yarn build 打包
- 打包完成后生成lib文件, npm publish 发包即可
