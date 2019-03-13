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
19. 操作符--------[各种类型转换规则真的好多啊！]
- 一元操作符：后置递增和递减与前置递增和递减有一个非常重要的区别，即递增和递减操作是在包含它们的语句被求值之后才执行的。
（这波计算暂时不变，等到下一次计算才生效---副作用）；个人认为最好不要用这个，老老实实按照最直接的写法写最好。
在对非数值应用一元加操作符时，该操作符会像 Number()转型函数一样对这个值执行转换。
换句话说，布尔值 false 和 true 将被转换为 0 和 1，字符串值会被按照一组特殊的规则进行解析，而
对象是先调用它们的 valueOf()和（或）toString()方法，再转换得到的值。在将一元减操作符应用于数值时，该值会变成负数
- 位操作符
- 布尔操作符
* 逻辑非可以应用于 ECMAScript 中的任何值；逻辑非操作符也可以用于将一个值转换为与其对应的布尔值。而同时使用两个逻辑非操作符，实际上就会模拟 Boolean()转型函数的行为。
* 逻辑与作可以应用于任何类型的操作数，短路操作，即如果第一个操作数能够决定结果，那么就不会再对第二个操作数求值。
* 逻辑或操作符也是短路操作符。也就是说，如果第一个操作数的求值结果为true，就不会对第二个操作数求值了
* 与和或一样，如果有一个操作数不是布尔值，逻辑或也不一定返回布尔值[a = AA || BB-->如果AA不为空那么就是他了， AA具有优先权，BB是替补队员]
- 乘性操作符，涉及NaN 和 Infinity的计算规则
* 乘法
* 除法
* 求模
- 加性操作符
* 对于加性操作符而言，相应的转换规则还稍微有点复杂
- 关系操作符
* 当关系操作符的操作数使用了非数值时，也要进行数据转换或完成某些奇怪的操作
- 相等操作符
* == 和 ===
* 由于相等和不相等操作符存在类型转换问题，而为了保持代码中数据类型的完整性，我们推荐使用全等和不全等操作符。
- 条件操作符（三元操作符）
- 赋值操作符
- 逗号操作符
20. 语句
- if
- do-while[这个我用的少]；像 do-while 这种后测试循环语句最常用于循环体中的代码至少要被执行一次的
情形。比如2048生成一个随机位置的再去探测位置是否可用的情况
- while[需要谨慎，一不小心有可能导致死循环]
- for[i++改成++i为什么没有什么差别呢？但是while有差别]
- for-in 枚举对象属性[区分自己的还是原型上的么]；建议在使用 for-in 循环之前，先检测确认该对象的值不是 null 或 undefined。
- label[这个？基本没见过用这个的]
- break & continue
- with 是将代码的作用域设置到一个特定的对象中[也很少用到]
* with  (expression) statement; 
* 严格模式下不允许使用 with 语句，否则将视为语法错误。
* 导致性能下降，同时也会给调试代码造成困难
- switch
* 可以在switch 语句中使用任何数据类型（在很多其他语言中只能使用数值）
* switch 语句在比较值时使用的是全等操作符，因此不会发生类型转换
21. 函数
- 定义，调用，返回值
- 参数
* 按照参数列表的顺序来，而不是名字- 比如promise 的 reject 和 resolve
* 每个函数里都可以通过arguments对象取出参数 获取参数长度等,并且可以与命名参数一起使用；arguments的改变可以引起命名参数的改变，原因是做了同步而不是他们指向同一块内存
* 命名的参数只提供便利，但不是必需的。比如： 不强调参数类型，参数个数（不管是定义还是调用）
* ECMAScript 中的所有参数传递的都是值，不可能通过引用传递参数。[值传递和引用传递？如果是传对象呢？----表示怀疑]
- 实际上，未指定返回值的函数返回的是一个特殊的 undefined 值。[这也许就是在console重运行一个没有返回值的函数总是会输出一条undefined的原因]
- 由于不存在函数签名的特性，ECMAScript 函数不能重载。
