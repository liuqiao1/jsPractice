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

new Date(Date.parse(''))
new Date(Date.UTC())可以自动转 不用显示写出
//秒数
```
- 日期格式化方法
```
 toDateString()——以特定于实现的格式显示星期几、月、日和年；
 toTimeString()——以特定于实现的格式显示时、分、秒和时区；
 toLocaleDateString()——以特定于地区的格式显示星期几、月、日和年；
 toLocaleTimeString()——以特定于实现的格式显示时、分、秒；
 toUTCString()——以特定于实现的格式完整的 UTC 日期。
const start = Date.now()
start
1552630076663
start.toLocaleString()
"1,552,630,076,663"
start.toString()
"1552630076663"
const d = new Date(start)
d
Fri Mar 15 2019 14:07:56 GMT+0800 (中国标准时间)
d.toLocaleDateString()
"2019/3/15"
d.toDateString()
"Fri Mar 15 2019"
d.toTimeString()
"14:07:56 GMT+0800 (中国标准时间)"
d.toJSON()
"2019-03-15T06:07:56.663Z"
d.toUTCString(0
VM452:1 Uncaught SyntaxError: missing ) after argument list
d.toUTCString()
"Fri, 15 Mar 2019 06:07:56 GMT"
```
- 日期/时间组建方法
```
date.getMonth();
date.getYear();
date.getDate();
....有很多很多，具体可以查表

//日期比较,通过转乘秒数相减
Date 类型的 valueOf()方法，则根本不返回字符串，而是返回日期的毫秒表示。因此，可以方便使用比较操作符（小于或大于）来比较日期值。
if(date1 < date2)

date.toString();//包含时区
date.toLocaleString();// 不含时区

Date.now()
```

> 如果想根据特定的日期和时间创建日期对象，必须传入表示该日期的毫秒数（即从 UTC 时间 1970 年 1 月 1 日午夜起至该日期止经过的毫秒数）。为了简化这一计算过程，ECMAScript 提供了两个方法：Date.parse()和 Date.UTC()。
```
//ECMA-262 没有定义 Date.parse()应该支持哪种日期格式，因此这个方法的行为因实现而异，而且通常是因地区而异。
Date.parse()
//Date.UTC()的参数分别是年份、基于 0 的月份（一月是 0，二月是 1，以此类推）、月中的哪一天（1 到 31）、小时数（0 到 23）、分钟、秒以及毫秒数。
Date.UTC(2019, 3, 15, 22, 30, 30);
```

## RegExp 类型
- 新建一个正则表达式
```
const reg = new RegExp('^a\s+b$', 'gi');

reg = /^a\s+b$/gi


```
>使用正则表达式字面量和使用 RegExp 构造函数创建的正则表达式不一样。在 ECMAScript 3 中，正则表达式字面量始终会共享同一个 RegExp 实例，而使用构造函数创建的每一个新 RegExp 实例都是一个新实例
ECMAScript 5 明确规定，使用正则表达式字面量必须像直接调用 RegExp 构造函数一样，每次都创
建新的 RegExp 实例。

- RegExp的实例属性
> lastIndex,整数，表示开始搜索下一个匹配项的字符位置，从 0 算起

**这个我用到过**

- RegExp的实例方法
1. exec()
> RegExp 对象的主要方法是 exec()，该方法是专门为捕获组而设计的。
exec()接受一个参数，即要应用模式的字符串，然后返回包含第一个匹配项信息的数组；或者在没有匹配项的情况下返回 null。
返回的数组虽然是 Array 的实例，但包含两个额外的属性：index 和 input。其中，index 表示匹配项在字符串中的位置，而 input 表示应用正则表达式的字符串。在数组中，第一项是与整个模式匹配的字符串，其他项是与模式中的捕获组匹配的字符串（如果模式中没有捕获组，则该数组只包含一项）

**那么index表示这一次出现的位置，lastIndex表示下一次我从哪里来开始匹配**
**设置了全局则会一次性匹配完毕；没有设置全部则是一步一步来；lastIndex 的值在每次调用 exec()后都会增加，而在非全局模式下则始终保持不变。**

2. test()
校验是否匹配

- RegExp构造函数属性
1. RegExp.input
2. RegExp.leftContext
3. RegExp.rightContext
4. RegExp.lastMatch // 最近一次匹配到的
5. RegExp.multiline
6. RegExp.lastParen //最近一个捕获组---参见正则“组”概念

```
str.match(reg)
reg.test(str)
str.replace(/reg/, 'as')
```

## Function类型
- Function本质上也是一个对象
- Function有两种定义方式，函数表达式，普通函数
```
var func = function(){} // 不存在变量名提升
function func(){} // 存在变量名提升
```
> 实际上，解析器在向执行环境中加载数据时，对函数声明和函数表达式并非一视同仁。解析器会率先读取函数声明，并使其在执行任何代码之前可用（可以访问）；至于函数表达式，则必须等到解析器执行到它所在的代码行，才会真正被解释执行

- 匿名函数/立即执行函数
```
(function(){
    //...
})()
```
- 函数可以当成参数传递,也可以当成返回值
```
function(a, callback){
    callback();
}

a()()() //接连调用 redux里的connect
```
> 还记得吧，要访问函数的指针而不执行函数的话，必须去掉函数名后
面的那对圆括号。因此上面例子中传递给 callSomeFunction()的是 add10 和 getGreeting，而不是执行它们之后的结果。

**原来在滴滴的时候犯过这种低级错误排查了很久，后来看到佳佳也和我一样写同一个BUG**

- 没有重载
> “函数是对象，函数名是指针”
没有函数签名

- 函数的内部属性
1. arguments

> 虽然 arguments 的主要用途是保存函数参数，但这个对象还有一个名叫 callee 的属性，该属性是一个指针，指向拥有这个 arguments 对象的函数。

**递归自己调用自己的时候用这个callee代替函数名，防止改名的时候不彻底**

> 当函数在严格模式下运行时，访问 arguments.callee 会导致错误。ECMAScript 5 还定义了arguments.caller 属性，但在严格模式下访问它也会导致错误，而在非严格模式下这个属性始终是undefined。定义这个属性是为了分清 arguments.caller 和函数的 caller 属性。以上变化都是为了加强这门语言的安全性，这样第三方代码就不能在相同的环境里窥视其他代码了。严格模式还有一个限制：不能为函数的 caller 属性赋值，否则会导致错误.

2. this

> 函数内部的另一个特殊对象是 this，其行为与 Java 和 C#中的 this 大致类似。换句话说，this引用的是函数据以执行的环境对象——或者也可以说是 this 值

> 在调用函数之前，this 的值并不确定，因此 this 可能会在代码执行过程中引用不同的对象

**this到底指向谁，决定于在那个环境中调用**

- 函数的属性和方法
1. length: 希望接受的参数的长度
2. prototype: 原型 和继承有关好看后续
> prototype 属性是不可枚举的，因此使用 for-in 无法发现

**这里说的是prototype这个属性，而不是说原型对象，使用for-in不管是实例的还是原型的都可以遍历出来**

**回答了我之前的问题**

3. call(this, arguments) & apply(this, [arg1, arg2, ...])

> 使用 call()（或 apply()）来扩充作用域的最大好处，就是对象不需要与方法有任何耦合关系。

**A.func() 变成 fun.call(自己决定的this， args)**

4. bind
> 这个方法会创建一个函数的实例，其 this 值会被绑定到传给 bind()函数的值

## 基本包装类
Boolean, Number, String
> 引用类型与基本包装类型的主要区别就是对象的生存期。使用 new 操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。

- Boolean类型
1. Boolean(true)是一个实例对象， true是一个bool值
2. 的建议是永远不要使用 Boolean 对象。

- Number类型
1. 重写了valueOf() toLocaleString() toString()
2. toFixed(x) 显示x位小数

> 能够自动舍入的特性，使得 toFixed()方法很适合处理货币值。
3. toExponential(x) 使用科学记数法表示
4. toPrecision(x)
> 如果你想得到表示某个数值的最合适的格式，就应该使用 toPrecision()方法。
对于一个数值来说，toPrecision()方法可能会返回固定大小（fixed）格式，也可能返回指数
（exponential）格式；具体规则是看哪种格式最合适。这个方法接收一个参数，即表示数值的所有数字的
位数（不包括指数部分）。
```
var num = 99;
alert(num.toPrecision(1)); //"1e+2"
alert(num.toPrecision(2)); //"99"
alert(num.toPrecision(3)); //"99.0" 
```
**这几个方法我还真不知道，在某些场景下应该是很有用的**

- String类型
1. 于Java不同，string是一个基本类型，但是new String('str')是一个实例对象
2. 属性
* length
3. 方法
* charAt()
* charCodeAt()

* slice(start, end)
* substr(start, 字符数)
* substring(start, end)

** 包前不包后**



* indexOf()
* lastIndexOf()

* replace()
> 。如果第一个参数是字符串，那么只会替换第一个子字符串。要想替
换所有子字符串，唯一的办法就是提供一个正则表达式，而且要指定全局（g）标志


**还以为只有第二种用途^^**
* match()
* search()
> search()方法返回字符串中第一个匹配项的索引；如果没有找到匹配项，则返回-1。而且，search()方法始终是从字符串开头向后查找模式。
* split()
> 这个方法可以基于指定的分隔符将一个字符串分割成
多个子字符串，并将结果放在一个数组中。分隔符可以是字符串，也可以是一个 RegExp 对象（这个方
法不会将字符串看成正则表达式）。split()方法可以接受可选的第二个参数，用于指定数组的大小，以便确保返回的数组不会超过既定大小

**还不知道有这个功能----**

* splice()

* trim()
> 这个方法会创建一个字符串的副本，删除**前置及后缀**的所有空格，然后返回结果

* toLowerCase()
* toUpperCase()

**
* concat()
> 虽然 concat()是专门用来拼接字符串的方
法，但实践中使用更多的还是加号操作符（+）。而且，使用加号操作符在大多数情况下都比使用concat()
方法要简便易行（特别是在拼接多个字符串的情况下）
**难怪看起来可陌生了**

* localeCompare()

返回值为0 代表两个字符串相等
```
"abc"=="abc"
true
"abc" === "abc"
true
// 猜测可能会在后台调用了这个方法
```
* fromCharCode()
```
alert(String.fromCharCode(104, 101, 108, 108, 111)); //"hello" 
```
**

## 单体内置对象
> 由 ECMAScript 实现提供的、**不依赖**于宿主环境的对象，这些对象在 ECMAScript 程序执行之前就已经存在了。”意思就是说，开发人员不必显式地实例化内置对象，因为它们已经实例化了。

- Global 对象
1. URI编码方法
* encodeURI()
* encodeURIComponent()

> 主要区别：encodeURI()不会对本身属于 URI 的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；而 encodeURIComponent()则会对它发现的任何非标准字符进行编码。一般来说，我们使用 encodeURIComponent() 方法的时候要比使用encodeURI()更多，因为在实践中更常见的是对查询字符串参数而不是对基础 URI进行编码。

**之所以会有这两个的方法，是因为浏览器不能准确识别包含特殊符号如空格的URI，用上encode解码之后可以进行替换**

3. decodeURI()
4. decodeURIComponent()

**原路返回，不可交叉**

2. window对象
>ECMAScript 虽然没有指出如何直接访问 Global 对象，但 Web 浏览器都是**将这个全局对象作为window 对象的一部分加以实现的**。因此，在全局作用域中声明的所有变量和函数，就都成为了 window
对象的属性。

- Math 对象
Math.PI
Math.random() // 返回大于等于 0 小于 1
Math.floor()
Math.Round()// 四舍五入
Math.ceil()
Math.sqrt()
Math.max()
Math.min()
```
var values = [1, 2, 3, 4, 5, 6, 7, 8];
var max = Math.max.apply(Math, values);
这个技巧的关键是把 Math 对象作为 apply()的第一个参数，从而正确地设置 this 值。然后，可以将任何数组作为第二个参数。
```
