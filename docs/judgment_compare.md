# switch 和 if 对比

#### 效率
- switch...case在分支比较多的时候，用switch效率高，因为switch是随机访问的，就是确定了选择值之后直接跳转到特定的分支，但是if...else是遍历所有得可能值，直到找到符合条件的分支，如果是确定值用switch更加快
- 由汇编代码可知道，switch...case占用较多的代码空间，因为它要生成跳表，特别是当case常量分布范围很大但实际有效值又比较少的情况，switch...case的空间利用率将变得很低
- switch...case只能处理case为常量的情况，对非常量的情况是无能为力的。例如 if (a > 1 && a < 100)，是无法使用switch...case来处理的。所以，switch只能是在常量选择分支时比ifelse效率高
- 一般情况下，当判断条件较多的情况下，使用switch case语句的效率会高于使用if...else if语句。