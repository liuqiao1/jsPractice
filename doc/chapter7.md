# 函数表达式

## 递归
```
function count(num){
    if(num<=1)return num; 
    return num*count(num-1)
}
```
问题：改函数名 或者 another = count; count = null之后会报错。
```
function count(num){
    if(num<=1)return num; 
    return num*arguments.callee(num-1)
}
```
问题：严格模式下不饿能用
```
var factorial = (function f(num){
    if(num<=1>)return num;
    else return num*f(num-1)
})
```

## 闭包

我最直接的理解是：函数里面写函数

> 闭包是指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式，就是在一个函数内部创建另一个函数
**所以我的理解比较狭隘**

```
function createComparisonFunction(propertyName) {

 return function(object1, object2){
 var value1 = object1[propertyName];
 var value2 = object2[propertyName];

 if (value1 < value2){
 return -1;
 } else if (value1 > value2){
 return 1;
 } else {
 return 0;
 }
 };
} 

createComparisonFunction('value')({value: 1}, {value: 2})
-1
```

函数被调用时发生了什么？
1. 创建执行环境及相应的作用域链
2. 使用arguments和其他参数名的值初始化函数的活动对象
3. 作用域链中，第一位是自己的活动对象，第二位是包裹他的第一层，以此内推...直到全局作用域

> 无论什么时候在函数中访问一个变量时，就会从作用域链中搜索具有相应名字的变量。
一般来讲，当函数执行完毕后，局部活动对象就会被销毁，内存中仅保存全局作用域（全局执行环境的变量对象）。
但是，闭包的情况又有所不同.

**里面的释放掉之前，外面的也不能释放,所以要慎重使用闭包**

> 在另一个函数内部**定义**的函数会将包含函数（即外部函数）的活动对象添加到它的作用域链中

有哪些常见的错误闭包使用法？
1. 在闭包中保存HTML元素

## 关于this对象

> 匿名函数的执行环境具有全局性，因此其 this 对象通常指向 window①。但有时候由于编写闭包的方式不同，这一点可能不会那么明显。
```
var name = "The Window";
var object = {
 name : "My Object",
 getNameFunc : function(){
 return function(){
 return this.name;
 };
 }
}; 
alert(object.getNameFunc()());
```
调用getNameFunc后得到的function，实际上是在全局环境下调用的
```
var name = "The Window";
var object = {
 name : "My Object",
 getNameFunc : function(){ 
     var that = this;
 return function(){
 return that.name;
 };
 }
};
alert(object.getNameFunc()()); //"My Object" 
```
**搞不清的时候就画一个作用域链图**

## 模仿块级作用域
```
(function(){
 //这里是块级作用域
})(); 

```

## 私有变量
**我一直没搞懂私有变量存在的意义；使用setXXX()和A.XX都能修改XX，只是形式上的差别而已啊**

> 不过，倒是有一个私有变量的概念。任何在函数中定义的变量，都可以认为是私有变量，因为不能在函数的外部访问这些变量。私有变量包括函数的参数、局部变量和在函数内部定义的其他函数

没错，这就是作用域链的规则

> 而利用这一点，就可以创建用于访问私有变量的公有方法。

难道私有的目的不是让外部访问不到吗？
创建用于访问私有变量的共有方法，还不是让外部访问到了？？

看网上说是加一个中间层，方便重构。这点我可以理解，防止外部直接访问或者修改。
比如set的时候，校验以下，或者由于业务需要，set XX 的时候一定要同时改掉别的值。
另外方便调试，因为所有对私有变量的存取都通过我统一的入口，所以很好跟踪。
```
function Person(name){
 //一般来说，会习惯上加下面这句
 // this.name = name
 // 这样实例可以直接打点访问和修改
 this.getName = function(){
 return name;
 };
 this.setName = function (value) {
 name = value;
 };
}
var person = new Person("Nicholas");
person.name; //undefined!!!!!
alert(person.getName()); //"Nicholas"
person.setName("Greg");
alert(person.getName()); //"Greg" 
```
> 以上代码的构造函数中定义了两个特权方法：getName()和 setName()。这两个方法都可以在构
造函数外部使用，而且都有权访问私有变量 name。但在 Person 构造函数外部，没有任何办法访问 name。
由于这两个方法是在构造函数内部定义的，它们作为闭包能够通过作用域链访问 name。私有变量 name
在 Person 的每一个实例中都不相同，因为每次调用构造函数都会重新创建这两个方法。

## 静态私有变量
```
(function(){
    var name = ""
    //特地不加var 让他在外边可以被访问到
    Person = function(){

    }
    Person.prototye.getName = function(){
        return name;
    }
    Person.prototye.setName = function(value){
        name = value;
    }
})()
var p = new Person();//这里传参也没用哦
p.setName("Kitty");

```
> 变量 name 就变成了一个静态的、由所有实例共享的属性。也就是说，在一个实例上调用 setName()会影响所有实例。以这种方式创建静态私有变量会因为使用原型而增进代码复用，但每个实例都没有自己的私有变量。到底是使用实例变量，还是静态私有变量，最终还是要视你的具体需求而定。