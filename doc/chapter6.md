# 面向对象的程序设计
javascript是一门面向对象的语言，虽然不像java一样有类，接口的概念。但是是否面向对象，不是看这个的。
语言分两种，一种面向对象，一种面向过程。C语言明显就是面向过程。
java的特点：封装继承和多态；javascript用对象封装一组属性和方法，继承可以用多种方式间接实现；多态是用子类生成父类，由于javascript没有强类型，仿佛没这个必要？

## 理解对象
### 属性类型
1. 数据属性[[attr]]
* Configurable
是否可用delete
* Enumerable
是否可任用for-in
* Writeable
是否可以修改
* Value
属性值

既然这些属性是给引擎用的，我不能读取也不能修改，那么知道这些属性有什么用？

> 要修改属性默认的特性，必须使用 ECMAScript 5 的 Object.defineProperty()方法。这个方法
接收三个参数：属性所在的对象、属性的名字和一个描述符对象。其中，描述符（descriptor）对象的属
性必须是：configurable、enumerable、writable 和 value。
```
Object.defineProperty(obj, "attrName", {
    configurable: true，
})
```
什么情况下我需要用到这个方法？我目前还没遇到过要修改这几个属性的场景。
> 多数情况下，可能都没有必要利用 Object.defineProperty()
方法提供的这些高级功能。不过，理解这些概念对理解 JavaScript 对象却非常有用。

**有什么用？**

2. 访问器属性
* Configurable: 同上？
* Enumerable：同上？
* Get: 在读取属性时调用的函数。默认值为 undefined
* Set: 在写入属性时调用的函数。默认值为 undefined

```
var book = {
 _year: 2004,
 edition: 1
};
Object.defineProperty(book, "year", {
 get: function(){
 return this._year;
 },
 set: function(newValue){
 if (newValue > 2004) {
 this._year = newValue;
 this.edition += newValue - 2004;
 }
 }
});
book.year = 2005;
alert(book.edition); //2

class A{
    constructor(a){
        this._a = a;
    }
    get a(){
        return this._a;
    }
    set a(v){
        this._a = v+this._a;
    }
}
```
class 的私有属性也和这个有关系吗？一种语法糖？

---
### 读取属性的特性
> 使用 ECMAScript 5 的 Object.getOwnPropertyDescriptor()方法，可以取得给定属性的描述
符。这个方法接收两个参数：属性所在的对象和要读取其描述符的属性名称。返回值是一个对象，如果
是访问器属性，这个对象的属性有 configurable、enumerable、get 和 set；如果是数据属性，这
个对象的属性有 configurable、enumerable、writable 和 value。

原来不仅可以改，也还可以读取。访问器属性和数据属性到底有什么区别？
```
var book = {};
Object.defineProperties(book, {
 _year: {// 数据属性
 value: 2004
 },
 edition: {
 value: 1
 },
 year: {//访问器属性
 get: function(){
 return this._year;
 },
 set: function(newValue){
 if (newValue > 2004) {
 this._year = newValue;
 this.edition += newValue - 2004;
 }
 }
 }
}); 
```
---

## 创建对象
创建对象的方式
1. new Object()
2. obj = {}
> 虽然 Object 构造函数或对象字面量都可以用来创建单个对象，但这些方式有个明显的缺点：使用同一个接口创建很多对象，会产生大量的重复代码。

比如我想创建10个结构都是{a: 1, b:2}的
### 工厂模式
```
function Bird(name, age, speed){
    let obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.speed = speed;
    obj.fly = function(){
        console.log(this.name+"fly");
    }
    return obj;
}

new Bird('lily', 2, 10);
```
缺点：不能识别是谁的实例
> 工厂模式虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）。---只知道是object类型，但是不知道是Bird,如果可以识别的话，应该可以用isInstanceOf方法

### 构造函数模式
```
function Bird(name,age,speed){
    this.name = name;
    thia.age = age;
    this.speed = speed;
    this.fly = function(){
        console.log(this.name+"fly");
    }
}
```
实际过程：

1. new Object()
2. 使this指向obj
3. 赋值
4. 返回obj

实例有一个constructor指针，指向构造函数

**XX instanceof Object 总是会返回true的**

缺点：fly是一样的，但是每次new都会生成一份

### 原型模式
```
function Bird(name, age speed){
    ...
}

Bird.prototype = {
    constructor : Person, // !!!!
    fly:function(){
        console.log(this.name+"fly")
    }
}
```

```
function Person(name){this.name=name}
const p = new Person('la')
p
Person {name: "la"}
p.constructor
ƒ Person(name){this.name=name}
p.__proto__
{constructor: ƒ}
p.__proto__.toString()
"[object Object]"
Person.prototype
{constructor: ƒ}
Person.prototype.constructor
ƒ Person(name){this.name=name}

Person.prototype.isPrototypeOf(p)
true

Object.getPrototypeOf(p)
{constructor: ƒ}
constructor
:
ƒ Person(name)
arguments
:
null
caller
:
null
length
:
1
name
:
"Person"
prototype
:
{constructor: ƒ}
__proto__
:
ƒ ()
[[FunctionLocation]]
:
VM2191:1
[[Scopes]]
:
Scopes[2]
__proto__
:
Object
```

构造函数，原型，实例之间的指向关系，一阵子不看就不记得

任何函数一创建就会有一个prototype指针指向该函数的原型对象
该原型对象默认有一个constructor指针指向把它当原型的函数**其实就是互指**
实例有一个[[prototype]]或者__prototype__指针指向构造函数的原型对象
同时也有个constructor函数指向构造函数

```
function hasPrototypeProperty(object, name){
 return !object.hasOwnProperty(name) && (name in object);
} 
```
> 由于 in 操作符只要通过对象能够访问到属性就返回 true，hasOwnProperty()只在属性存在于实例中时才返回 true，因此只要 in 操作符返回 true 而 hasOwnProperty()返回 false，就可以确
定属性是原型中的属性

> 在使用 for-in 循环时，返回的是所有能够通过对象访问的、可枚举的（enumerated）属性，其中
**既包括存在于实例中的属性，也包括存在于原型中的属性。**
屏蔽了原型中不可枚举属性（即将[[Enumerable]]标记为 false 的属性）的实例属性也会在 for-in 循环中。
**但是Object.keys()只会返回自己的**

```
Person.prototype.country="china"
"china"
const p2 = new Person("p2")
undefined
p2
Person {name: "p2"}
p2.country
"china"
for(attr in p){console.log(attr)}
VM3955:1 name
VM3955:1 country

Object.keys(p2)
["name"]
```

> 如果你想要得到所有实例属性，无论它是否可枚举，都可以使用 Object.getOwnPropertyNames()方法。
```
Object.getOwnPropertyDescriptor(p2)
undefined
Object.getOwnPropertyDescriptor(Person)
undefined
Object.getOwnPropertyNames(p2)
["name"]
Object.getOwnPropertyNames(Person)
(5) ["length", "name", "arguments", "caller", "prototype"]
Object.getOwnPropertyNames(Person.prototype)
(2) ["constructor", "country"]
```

### 组合使用构造函数模式和原型模式
构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。结果，每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用，最大限度地节省了内存。另外，这种混成模式还支持向构造函数传递参数；可谓是集两种模式之长。

## 继承
[简书-继承](https://www.jianshu.com/p/04d7e3f71181)
### 原型链
> 让原型对象等于另一个类型的实例
```
function SuperType(){
    this.property = true;
}
SuperType.prototype.getSuperValue = function(){
    return this.property;
}
function SubType(){
    this.subProperty = false; 
}

SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function(){
    return this.subProperty;
}
var instance = new SubType();
alert(instance.getSupervalue);
```
缺点：new父类实例作为子类的原型时，父类实例上的本来不该共享的数据被共享了

### 借用构造函数
> 在子类型构造函数的内部调用超类型构造函数
```
function SuperType(name){
    this.name = name;
    this.property = true;
}
SuperType.prototype.getSuperValue = function(){
    return this.property;
}
function SubType(name){
    SuperType.call(this, "Jack"); // 传递参数
    this.subProperty = false; 
}

SubType.prototype.getSubValue = function(){
    return this.subProperty;
}
var instance = new SubType();
alert(instance.getSupervalue);
```
缺点：
> 方法都在构造函数中定义，因此函数复用就无从谈起了。而且，在超类型的原型中定义的方法，对子类型而言也是不可见的，结果所有类型都只能使用构造函数模式
### 组合继承
> 其背后的思路是使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承。这样，既通过在原型上定义方法实现了函数复用，又能够保证每个实例都有它自己的属性。

```
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototypr.sayName = function(){
    alert(this.name);
}
function SubType(name. age){
    SuperType.call(this, name);
    this.age = age;
}

Subtype.prototype = new SuperType();
SubType.prototype.constructor = SubType;
Subtype.prototype.sayAge = function(){
    alert(this.age)l
}
var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29
var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27 
```

### 原型式继承
> 型可以基于已有的对象创建新对象，同时还不必因此创建自定义类型。
```
function extend(o){
    function F(){}
    F.prototype = o;
    return new F();
}
```
### 寄生式继承
> 创建一个仅用于封装继承过程的函数，该函数在内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象。
```
function createAnother(original){
 var clone = object(original); //通过调用函数创建一个新对象
 clone.sayHi = function(){ //以某种方式来增强这个对象
 alert("hi");
 };
 return clone; //返回这个对象
} 
```