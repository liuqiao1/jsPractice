function test1(){
    //alert("nihao");
    //1.区分大小写
    var test = "Hello";
    var Test = "World";

    //alert(test+Test);
    //2.可以这样声明
    var message="hi",num=3;
    //alert(message+num);

    //3.ECMA 建议采用驼峰法命名，与其源代码风格保持一致

    //4.ECMA 5中基本类型：undefined,string,object,number,boolean,null

    //5.typeof 可以获取某个变量的类型
    //alert(typeof message);//string 
    //alert(typeof num);//number
    //如果没有初始化呢？
    var A;
   // alert(typeof A);//undefined
   //如果每没有声明呢？
   //alert(typeof B);//也是undefined
   //如果直接alert一个没有声明的变量 Chrome没有任何反应

   //还有一个更奇葩的
   //alert(typeof null);//object null 指向一个空指针对象

   //5.Boolean  true false 对的 True False 不对 true,flase  是 Boolean的字面值
   //Boolean 与 boolean 也不同
   //boolean flag = true; 明显中了java的毒
   var flag = true;

   var flag2 = Boolean(message);
  // alert(flag2);//true 有一个转换规则对应表 可查阅

  //6.Number 可整数可浮点甚至还可字符
  //可表示八进制 十六进制
  var eight = 0123;
  var sixteen = 0x3A;

  //alert(eight);//83
  //alert(sixteen);//58  弹出十进制数

  //表示范围并不是那么广 
  //NaN: not a number
  //alert(4/0);//infinity  超出表示范围
  //alert(isFinite(4/0));//flase 

  //alert(isNaN(23));//false  是一个数字
  //alert(isNaN("23"));//可以转成一个数字
  //alert(isNaN("blue"));//不能被转成数字
  //alert(isNaN(blue));//没有东西输出
  //alert(isNaN(true));//false 可以转成数值 

 //数值转换 Number() 
    var num1 = Number("hello");
    //alert(num1);//NaN
    var num2 = Number("11");
    //alert(num2);//11
    //alert(Number("11"));

    var num3 = Number(true);
    //alert(num3);//1
    //parseInt() 转成整数 使用较多
    //parseFloat 转浮点 科学记数法

    //String 
    var string1 = "hello";
    //alert(string1.length);//5
    string1 = "world";
    //alert(string1); //会把之前那个销毁

    //toString()转字符串
    //Object  和 java 对象很相似
    //都一个共同的父类Obejct ,这个父类还有些写好了可直接继承
    

    //各种操作符  和 语句先省略 以后遇到再补充吧
}

function func(){
    //alert("func");
    //函数内部 return; 意思是返回undefined,一般用在需要停止函数但是不需要返回值的情况

    //cc("hh");// hhundefined
    //相对于其他语言 ，参数管得比较宽松，声明两个参数，可以只传一个参数值
    //实际上解释器并不care你声明 调用时的参数情况，因为无论在那种情况下，都会有一个参数数组arguments
    //声明时写下参数名 只是为了程序员好辨识

    //testLength();//0
    //testLength(12);//1
    //testLength("ee",33);//2

    //mix(10,5);//20 说明还是以自定义优先的

    //函数重载 = 函数重写？
    //JAVA 重载，用同一个函数名，只要参数类型和数量，返回值中一个以上不同，他们就是不同的函数
    //但是ECMA 函数参数管理试很松的 不能用参数来定死一个函数，所以没有传统意义上的重载
    //但是可以用巧妙地方法间接实现重载，那就是在函数中判断参数的情况，根据不同参数采取不同方案

};

function cc(arg0,arg1){
    alert(arg0+arg1);
};

function cc(){//函数名可以相同  自动匹配参数 ？错！ 如果遇到函数名相同的情况，以最后定义的那个为准
    alert(arguments[0]);
    //alert(arg0+arg1);
};

function testLength(){
    alert(arguments.length);
};

//自定义参数名 和 系统arguments 可以混合使用！
//他们占据不同的内存空间 不过会实时同步
function mix(arg0,arg1){
    arg1 = 10;
    alert(arguments[0]+arguments[1]);
}

function myGlobal(){
    alert("myGlobal");
    //ECMA  单体内置对象Global
    //属性 isNaN function undefined 等等 它是全局性的领导~
    //重要方法：eval()
    var message = "hello";
    //Evaluates JavaScript code and executes it.
    eval("alert(message)");//eval 方法传入一个字符串，该字符串是要解释执行的ECMAscript，
    //eval 相当于一个脚本解释器 但是他的执行环境没有变

    //window 相当于 JAVASCRIPT Global  但是比global更丰富
}

//基本包装类
function myBasicObj(){
    alert("myBasicObj");
    //Boolean String Number
}

function funcObj(){
    //alert("funcObj");
    //ECMA 函数是对象，函数名是指向函数的指针，函数可以有自己的属性和方法，可以作为值传入函数 甚至当作其他函数返回值

    //alert(myBasicObj.name);
    var another = myBasicObj;
    //myBasicObj = null; //有新指针后 断掉以前的也无所谓
    //another();//输出myBasicObj

    //函数声明 和 函数表达式 
    //区别在于解释器的处理方式 ，函数声明会先读出来 准备好，要用时直接拿，
    //而函数表达式则是遇到再处理 

   // A();//没有东西输出来，因为A还没有被发现
    var A = function(){
        //alert("A");
    }

    B(A);//输出A

    var D = C();
    D();//也可以输出A

    function B(A){ //函数作为参数
        A();
    }

    function C(){ //函数作为返回值
        return A;
    }

    //函数内部属性 arguments.callee this

    //函数属性 length prototype
    //alert(C.length);//0  函数希望的带名参数的个数
    //prototype 管toString等一些方法 后面介绍

    //apply 和 call 方法
    // object.sayColor.call(this,[]);

    // callAdd1(1,2);
    // callAdd2(2,3);

    var object ={color:"Blue"};
    sayColor.call(object);//输出blue 对象变量值
    sayColor.call(this);//输出Red 全局变量值

    //bind方法
    //For a given function,
    //creates a bound function that has the same body as the original function. 
    //The this object of the bound function is associated with the specified object, 
    //and has the specified initial parameters.

    //sayColor.bind 不懂。。。。。
    
}

//这个方法 不一定是绑在固定的一个执行环境上 
function sayColor(){
    alert(this.color);
}

var color = "Red";

function add(num1,num2){
    alert(num1+num2);
}

function callAdd1(num1,num2)
{
    add.apply(this,arguments);
    //add.apply(this,[num1,num2]);  效果同上
}

function callAdd2(num1,num2)
{
    add.call(this,num1,num2);
   // add(num1,num2); 这样也可以调用啊 为什么一定要用call或者apply 呢？
   //为了加个this 带个执行环境？
   //传递参数不是apply call的目的 用武之地在扩充执行环境
}
//window.onload = test1;
//window.onload = func;
window.onload = funcObj;