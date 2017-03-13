/**
 * Chapter 7 函数表达式
 * 递归 闭包 模仿块级作用域 私有变量
 */

/**
 * 递归
 * 求阶乘
 */
function factorial(num){
    if(num<=1){
        return 1;
    }
    else{
        //return num * factorial(num-1);

        return num*arguments.callee(num-1);//推荐方式
    }
}
/**
 * 严格模式下 递归
 */
var strictFactorial = (function f(num){
    if (num <= 1){
    return 1;
    } else {
    return num * f(num-1);
    }
});

/**
 * 闭包
 */
function createCpmpare(property){

    return function(object1,object2){
        //内部匿名函数可以访问到外部变量 property
        var value1 = object1[property];
        var value2 = object2[property];

        if(value1 <= value2){
            return 1;
        }
        else{
            return 0;
        }
    }

}
/**
 * 闭包陷阱
 */
function createFunc(){
    var result = new Array();
    
    for(var i=0;i<10;i++){
        // result[i] = function(){
        //     return i;
        // }

        result[i] = function(num){
            return num;
        }
    }

    return result;
}

/**
 * 在全局函数中， this 等于 window，而当函数被作为某个对象的方法调用时， this 等于那个对象。
 * 匿名函数的执行环境具有全局性，因此其 this 对象通常指向 window①。
 * 但有时候由于编写闭包的方式不同，这一点可能不会那么明显。
 * 
 * 前面曾经提到过，每个函数在被调用时都会自动取得两个特殊变量： this 和 arguments。
 * 内部函数在搜索这两个变量时，只会搜索到其活动对象为止，因此永远不可能直接访问外部函数中的这两个变量
 */
var name = "windowName";
function testThis(){
 
    var bean = {
        name:"thisName",
        sayHi:function(){
            var hiFunc = function(){
                alert(this.name);
            }
            return hiFunc;
        }
    }
    alert(bean.name);
    bean.sayHi()();
}

function Main(){
    //alert("Main");
    //测试求阶乘
    //alert(factorial(4));//24
    //接下来我用另一个指针指向函数对象
    var anotherFactorial = factorial;
    factorial = null;//断开原来的
    //alert(anotherFactorial(4));//无输出
    //因为factorial函数内部 自己调用自己的时候，还是返回的factorial(num-1)
    //但是这是factorial已经和函数本身没有关联了

    //return num*arguments.callee(num1-1);//推荐方式
    //-----------------------
    var compare = createCpmpare("name");
    //alert(compare);
    var result = compare({name:"lily"},{name:"michael"});
    //alert(result);//  1
    //------------------------------------
    var funcs = createFunc();
    alert(funcs[0](0));
    alert(funcs[1](1));
    alert(funcs[9](9));
}
/**
 * 私有变量 私有方法
 */
function Student()
{
    /**
     * new Student时  
     * var obj  = new object();
     * 然后当前执行环境转到obj 上 ，此时this 指obj
     * 
     * obj.getName = .....
     * 
     * return obj;
     */
    var name = "liu";
    function exam(){
        alert("exam!");
    }

    this.getName = function(){
        return name;//闭包访问外部的name
        //return this.name 就错了
    }
}
/**
 * 通过构造函数的方式来创建私有变量访问方法
 * 缺点：每次生成一个新实例，都会产生一套相同的方法
 * 如果可以实现共享方法可以解决这个问题
 * 使用原型
 */
function Person(name){
    //name 是一个私有变量 在构造函数外部只能用下面两个方法访问
    this.getName = function(){
        return name;
    };
    this.setName = function (value) {
        name = value;
    };
}

(function(){
    var name = "";
    function Country(value){
        name = value;
    }
    Country.prototype.getName = function(){
        return name;
    }
    Country.prototype.setName = function(value){
        name = value;
    }
})(); //模仿块级作用域  定义 马上调用




function testPrivate(){
    //alert("testPrivate");
    // var stu = new Student();
    // this.age = 11;
    // alert(stu.name);//undefined
    // alert(stu.age);//undefined
    // alert(Student.name);//Student
    // alert(stu.getName());

    // var person = new Person("Nicholas");
    // alert(person.getName()); //"Nicholas"
    // person.setName("Greg");
    // alert(person.getName()); //"Greg


    
    
    /**
     * java 私有变量
     * Class A(){
     *      private name;
     *      
     *      public getA();setA();
     * }
     * A a = new A();
     * a.name = "liuqiao";//这样做会报错哦，因为name是私有变量
     * //如果开放了set方法：
     * A.setA("liuqiao");这样是对的
     * 
     */
}

//window.onload = Main;
//window.onload = testThis;
window.onload = testPrivate;