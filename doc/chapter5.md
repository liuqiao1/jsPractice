# 引用类型
对象和类的区别？

- 类封装了一组属性和操作方法；对象也是；
- 类可以继承；es6里的class也是可以继承的，es5里有曲线救国的继承方法
- 确实没有接口；但是ts里有

---
## Object类型
> 但开发人员更青睐对象字面量语法，因为这种语法要求的代码量少，而且能够给人封装数据的感觉。实际上，对象字面量也是向函数传递大量可选参数的首选方式

**《重构》里也推荐**
> 方括号语法的主要优点是可以通过变量来访问属性

**这一点真的很方便，尤其在去重的时候**

---
## Array类型
关于Array的印象
- 新建数组的方法
```//javascript
    var array1 = new Array();
    //是小括号不是花括号
    var array2 = new Array("red","green","white");
    //开辟三个坑
    var array3 = new Array(3);
    //开辟一个坑 放"hi"
    var array4 = new Array("hi");
    //一个空数组
    var array5 = [];
```
- 数组的常用方法
```
join('')
// arr.toString的效果和arr.join(",")是一样的；实质上是调用每个元素的toString方法
split()
slice()
concat()
Array.isArray()

// 重排序方法
sort()
reverse()

// 迭代方法
//。每个方法都接收两个参数：要在每一项上运行的函数和
（可选的）运行该函数的作用域对象——影响 this 的值。
arr.map((item,index,arr)=>{}, [this])----全局环境下是window
map
filter
every
foreach
some

//归并方法
//函数接收 4 个参数：前一个值、当前值、项的索引和数组对象
reduce
resuceRight

// 栈方法
push()
pop()
//队列方法
shift()
unshift()
```
- 数组的长度是自动扩容的吗？**是的**
- js的数组与java的很大的不同是其保存的每个元素类型可以互相不一致

> 数组的 length 属性很有特点——它不是只读的。因此，通过设置这个属性，可以从数组的末尾移除项或向数组中添加新项
```
arr[arr.length] = x
```

**我觉得还不如用arr.push(),length应该设置为只读才科学啊**

> instanceof 操作符的问题在于，它假定只有一个全局执行环境。如果网页中包含多个框架，那实
际上就存在两个以上不同的全局执行环境，从而存在两个以上不同版本的 Array 构造函数。如果你从
一个框架向另一个框架传入一个数组，那么传入的数组与在第二个框架中原生创建的数组分别具有各自
不同的构造函数。

**所以说isArray才是最靠谱的方法**
> 如果数组中的某一项的值是 null 或者 undefined，那么该值在 join()、toLocaleString()、toString()和 valueOf()方法返回的结果中以空字符串表示。

> sort()方法可以接收一个比较函数作为参
数，以便我们指定哪个值位于哪个值的前面。
比较函数接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回 0，如果第一个参数应该位于第二个之后则返回一个正数。【升序！！】降序相反

**这个规则好难记哦**
```
function compare(value1, value2){
 return value2 - value1; // 正代表升
} 
undefined
[5,5,2,8,3,0].sort(compare)
(6) [8, 5, 5, 3, 2, 0]
```

>slice()如果有两个参数，该方法返回起始和结束位置之间的项——[但不包括结束位置的项]。注意，slice()方法不会影响原始数组!!!。

**我还真忽略了这一点**

**splice(起始位置，删除个数，插入的元素1, 插入的元素2...);删除包括了起始位置；插入在起始位置之后**

- 被我忽略的方法,还是常用的
1. indexOf()
2. lastIndexOf()

>给 reduce()和 reduceRight()的函数接收 4 个参数：前一个值、当前值、项的索引和数组对象。这
个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项上，因此第
一个参数是数组的第一项，第二个参数就是数组的第二项。

**这个过程就像织毛衣收针的逻辑**

## Date类型
关于Date的印象
- 创建
```
const date = new Date();
//秒数
```
- 日期格式
```
date.format('yyyy-mm-dd')
```
- 操作方法
```
date.month();
date.year();
date.day();

//日期比较
date.toString();
date.toLocaleString();
```

> 如果想根据特定的日期和时间创建日期对象，必须传入表示该日期的毫秒数（即从 UTC 时间 1970 年 1 月 1 日午夜起至该日期止经过的毫秒数）。为了简化这一计算过程，ECMAScript 提供了两个方法：Date.parse()和 Date.UTC()。