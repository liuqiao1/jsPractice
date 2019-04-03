# BOM窗口对象模型

- window

window.open()
window.close()
window.screenSize

- history
history.go()
history.back()?

- navigator
- location

- alert
- console?

## window对象

代表浏览器的一个实例，而不是浏览器打开的一个tab页

> 在浏览器中，window 对象有双重角色，它既是通过 JavaScript 访问浏览器窗口的一个接口，又是 ECMAScript 规定的 Global 对象。这意味着在网页中定义的任何一个对象、变量和函数，都以 window 作为其 Global 对象，因此有权访问parseInt()等方法。

**所以用的时候一般可以省略window.**
那么document对象其实是window.document

### 全局作用域
> 全局变量不能通过 delete 操作符删除，而直接在 window 对象上的定义的属性可以。

**之前在工作的时候看到很多往全局打入值的做法，都是写明了window.XX == XX的，这种后期要删掉的话了可以实现**

## 窗口关系及框架
frame,iframe没有自己用过，工作的时候有广泛用到，听到墨坤提过由于使用iframe导致一个很尴尬的问题，我忘记了...

> top 对象始终指向最高（最外）层的框架，也就是浏览器窗口;使用它可以确保在一个
框架中正确地访问另一个框架。因为对于在一个框架中编写的任何代码来说，其中的 window 对象指向
的都是那个框架的特定实例，而非最高层的框架

**这个还真是第一次知道**

[iframe 和 frame有什么区别？](https://blog.csdn.net/lyr1985/article/details/6067026)

## 窗口位置
使用下列代码可以跨浏览器取得窗口左边和上边的位置
```
var leftPos = (typeof window.screenLeft == "number") ?
 window.screenLeft : window.screenX;
var topPos = (typeof window.screenTop == "number") ? 
```
窗口移动,左上角为坐标原点
```
//将窗口移动到屏幕左上角
window.moveTo(0,0);
//将窗向下移动 100 像素
window.moveBy(0,100);
//将窗口移动到(200,300)
window.moveTo(200,300);
//将窗口向左移动 50 像素
window.moveBy(-50,0); 
```

## 窗口大小,位置，元素大小，位置
[总结](https://www.yuque.com/lejian/xhvzw6/urm4ki)


## 间歇调用和超时调用
js如何调度任务？

> JavaScript 是一个单线程序的解释器，因此一定时间内只能执行一段代码。为了控制要执行的代码，就
有一个 JavaScript 任务队列。如果队列是空的，那么添加的代码会立即执行；如果队列不是空的，那么它就要等前面的代码执行完了以后再执行。