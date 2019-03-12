基本概念
1. 关于标识符：字母，下划线或者$开头，其他字符可以是字母下划线$或数字
2. 严格模式
- 在严格模式下，ECMAScript 3 中的一些不确定的行为将得到处理，而且对某些不安全的操作也会抛出错误
- “use strict”编译指示（pragma）----js需要编译吗？解释器是什么？
3. if(){一句话}，在控制语句中使用代码块可以让编码意图更加清晰，而且也能降低修改代码时出错的几率。
4. 保留字就像阿里抢注IP一样，比如const,export这些ES6里面还真的用到了,有远见~
5. ECMAScript 的变量是松散类型的，所谓松散类型就是可以用来保存任何类型的数据。换句话说，每个变量仅仅是一个用于保存值的占位符而已。
6. 5种简单数据类型：string, number, null, undefined, boolean;1种复杂类型object,ES6自定义类型
7. 由于 ECMAScript 数据类型具有动态性-----什么意思？类型转换么？
8. typeof 操作可能的结果：string, number, undefined, boolean, function, object[注意没有null]
9. Undefined类型：即便未初始化的变量会自动被赋予 undefined 值，但显式地初始化变量依然是
明智的选择。如果能够做到这一点，那么当 typeof 操作符返回"undefined"值时，
我们就知道被检测的变量还没有被声明，而不是尚未初始化。---------但是还没看到过有人这么干。。。
10. Null类型：null 值表示一个空对象指针，而这也正是使用 typeof 操作符检测 null 值时会返回"object"的原因；undefined 值是派生自 null值的。只要意在保存对象的变量还没有真正保存对象，就应该明确地让该变量保存 null 值。这样做不仅可以体现 null 作为空对象指针的惯例，而且也有助于进一步区分 null 和 undefined。
11. Boolean类型：两个字面值：true 和 false；但 ECMAScript 中所有类型的值都有与这两个 Boolean 值
等价的值。
Boolean转String：false->"0";true->1;
String转Boolean: 非空字符串->"1";空字符串->0;

Boolean转Numbern: false->0;true->1;
Number转Boolean: 非0->true; 0->false

Boolean(null) -> false;
Boolean(undefine) -> false;
[Boolean(NaN) -> true;]!!!
Boolean({}) -> true;

string“1”/"0"，number1/0，null->false, undefined->false, {}->true
12. Number类型：
- 型使用 IEEE754 格式来表示整数和浮点数值；
- 进制及进制超出；
- 浮点数不推荐.x的写法（我之前在css种喜欢省略前面的0）；
- 支持科学计数法；var floatNum = 3.125e7; // 等于 31250000 
- 0.1+0.2=0.30000000000000004，这是使用IEEE754 格式的通病。[---------------WHY？？];永远不
要测试某个特定的浮点数值
13. 极限值：尽管在计算中很少出现某些值超出表示范围的情况，但在执行极小或极大数值的计算时，检测监控
这些值是可能的，也是必需的。
Number.MIN_VALUE:5e-324
Number.MAX_VALUE:1.7976931348623157e+308
Number.MAX_SAFE_INTEGER:9007199254740991
Number.MIN_SAFE_INTEGER:-9007199254740991
Infinity; -Infinity; isInfinity()
14.  NaN； x/0 意外情况发生
- 和任何值都不相等，包括自己；
- 任何涉及 NaN 的操作（例如 NaN/10）都会返回 NaN
- isNaN()会进行自动的数制转换
15. 数值转换
* Number(任何数据类型)转换规则
* ParseInt(str, 进制基数):由于 Number()函数在转换字符串时比较复杂而且不够合理，因此在处理整数的时候更常用的是parseInt()函数
var num1 = parseInt("1234blue"); // 1234
var num2 = parseInt(""); // NaN
var num3 = parseInt("0xA"); // 10（十六进制数）
var num4 = parseInt(22.5); // 22
var num5 = parseInt("070"， 8); // 56（八进制数）
var num6 = parseInt("70"); // 70（十进制数）
var num7 = parseInt("0xf"， 16); // 15（十六进制数）
- 建议带基数， 多数情况下，我们要解析的都是十进制数值，因此始终将 10 作为第二个参数是非常必要的。
* ParseFloat(str)，始终忽略前导0，始终以10进制为标准
var num1 = parseFloat("1234blue"); //1234 （整数）
var num2 = parseFloat("0xA"); //0
var num3 = parseFloat("22.5"); //22.5
var num4 = parseFloat("22.34.5"); //22.34
var num5 = parseFloat("0908.5"); //908.5
var num6 = parseFloat("3.125e7"); //31250000 
17. String类型用于表示由零或多个 16 位 Unicode 字符组成的字符序列，即字符串
- 几乎每个值都有的 toString(进制基数)方法( [null 和 undefined 值没有这个方法!!!])
- 在不知道要转换的值是不是 null 或 undefined 的情况下，还可以使用转型函数 String()，这个
函数能够将任何类型的值转换为字符串。String()函数遵循下列转换规则：
 如果值有 toString()方法，则调用该方法（没有参数）并返回相应的结果；
 如果值是 null，则返回"null"；
 如果值是 undefined，则返回"undefined"。
- x+""直接转换成字符串
18. object类型
Object 的每个实例都具有下列属性和方法
- constructor
- hasOwnProperty(propertyName)
- isPrototypeOf(object)
- propertyIsEnumerable(propertyName)
- toLocaleString()
- toString()
- valueOf()
