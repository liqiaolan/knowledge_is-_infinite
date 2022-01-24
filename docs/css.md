# css的经典用法
1、伪类的特殊用法【具体含义：first-child兄弟元素正着数第一个，nth-last-child(1)表示兄弟元素倒着数第一个，那就表示只有一个】
    
```
/* 一个的样式 */
.item-contain:first-child:nth-last-child(1) {
  width: 100%;
  background-color: #8179c1;
}
/* 两个的样式 */
.item-contain:first-child:nth-last-child(2),
.item-contain:nth-child(2):nth-last-child(1) {
    display: inline-block;
    width: 49.5%;
    background-color: #959565;
}
/* 三个的样式 */
.item-contain:first-child:nth-last-child(3),
.item-contain:nth-child(2):nth-last-child(2) {
    display: inline-block;
    width: 49.5%;
    background-color: #c76eb7;
}
.item-contain:nth-child(3):nth-last-child(1) {
    margin-top: 8px;
    width: 100%;
    background-color: #c76eb7;
}
/* 两个和三个的时候上边一排平均排列 */
.item-contain:nth-child(2):nth-last-child(1),
.item-contain:nth-child(2):nth-last-child(2){
    float: right;
}
```
2、弹性布局排列【https://www.zhangxinxu.com/wordpress/2019/08/css-flex-last-align/】

```
.container {
    display: flex;
    flex-wrap: wrap;
}
.list {
    width: 24%; height: 100px;
    background-color: skyblue;
    margin-top: 15px;
}
.list:not(:nth-child(4n)) {
    margin-right: calc(4% / 3);
}
```
