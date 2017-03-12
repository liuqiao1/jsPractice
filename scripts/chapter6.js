/**
 * Chapter 6 面向对象程序设计
 * 2017-3-9
 */
///////////////////////////////理解对象/////////////////////////////////////////////
/**
 * ecma 对象 ，可以看作是一个散列表，表中有许多无序键值对 程序通过引用对象访问（其实就是指针？）
 */

/**
 * 两种定义对象的方式比较
 * 上次我还觉得def1好，由于用惯了java嘛，但是这次觉得def2更简单
 */
function def1(){
    var person = new Object();
    person.name = "liuqiao";
    person.age = 22;
    person.sayName = function(){
        alert(this.name)
    };

    alert(person.name +"  "+person.age);
    person.sayName();//加括号才调用
}

function def2(){
    var person = {
        name:"liuqiao",
        age:22,
        sayName:function(){
           alert(this.name) 
        }
    }
    alert(person.name +"  "+person.age);
    person.sayName();//加括号才调用
}

/**
 * 对象的数据属性 Cofiguarable Writeable Enummerable Value
 * 有点儿权限控制的意思
 * 用得少
 */

function dataAttr(){
    var person = {};
    //Adds one or more properties to an object, 
    //and/or modifies attributes of existing properties.
    Object.defineProperty(person,"name",{
        writable:false,//只读 
        value:"liuqiao"
    });
    alert(person.name);
    person.name = "lily";//严格模式下会报错
    delete person.name; //删除也没用
    alert(person.name);
}

/**
 * 访问器属性 Cofiguarable  Enummerable Get Set
 */

function visisAttr(){
    var book = {
        name:"English",
        editor:"liu"
    };

   // book.defineProperty(b) 错啦
   Object.defineProperty(book,"editor",{
        get:function(){
            return this.editor;
        },
        set:function(editor){
            if(editor == "liu"){
                this.name = "haha";
            }
        }
   });

   alert(book.name);//输出 English
   book.editor = "liu";
   alert(book.name);//输出haha
}
/**
 * 读取属性 Object.getOwnPropertyDescription
 */

////////////////////////////////创建对象/////////////////////////////////////
/**
 * 上面创建对象的方法，对象是可以创建出来，但是如果我要创建10个person 需要10段重复代码
 * 1.自写一个函数专门生成person对象
 */

function getPerson(){
    var person = {
        name:"liuqiao",
        age:22,
        // sayName:function(){
        //    alert(this.name) 
        // }
        sayName:sayName
    }
    return person;
}
/**
 * 改进：使用构造方法
 * 构造函数本质上也是个函数，你可以选择用new()的方式调用，也可按普通的方式调用
 * 如果用new ,有些操作会自动完成，比如创建新对象，把this指向新对象，绑定值，返回对象
 * 如果用普通方式调用，则值会绑在window上
 */
function createPerson(name,age){
    this.name = name;
    this.age = age;
    this.sayName = function(){
        alert(this.name);
    }
}

function createTest(){
    var person1 = getPerson();
    //alert(person1.name);
    //person1.sayName();
    var person2 = getPerson();

    //alert(person1.sayName == person2.sayName);//false 说明这两个实例的sayName不是同一个
    //但是完全没必要这样做，因为我们只需要一个就行了

    Person.prototype.name = "jack";
    Person.prototype.age = 22;
    Person.prototype.sayName = function(){
        alert(this.name);
    }
    /**
     * 更简单的原型语法 
     * 相当于创建了一个新对象，让prototype指向它
     * 这时新对象的constructor属性 不再指向Person  而是指向Object
     * 但是，如果需要的话，可以强行指向
     * 
     * constructor:person 
     */
    /*Person.prototype = {
        name:"jack",
        age:22,
        sayName:function(){
            alert(this.name);
        }
    }*/

    var person3 = new Person();
    //alert(person3.name);//jack 通过空构造函数访问原型对象
    //person3.sayName();
    //如果我在实例上把name值改了，会影响原型对象吗？
    person3.name = "changedName";
    //alert(person3.name);//输出changedName

    //因为 先找实例属性的值，找不到则去原型对象找
    //就算改变了实例属性的值 ，也不会影响到原型对象
    //原型对象就默默地站在那里，而且只有一个，无论产生多少实例，用的都是同一个原型
    var person4 = new Person();
    //alert(person3.prototype == person4.prototype);//true

    /**
     * 如何判断某个属性是实例属性，还是原型属性
     * object.hasOwnProperty("Attr");
     */
    //alert(person3.hasOwnProperty("name"));//true
    //alert(person4.hasOwnProperty("name"));//flase
    //alert(person4.hasOwnProperty("noAttr"));//false 

    /**
     * 返回false有两种情况：1.实例没有有这个属性，但原型有 2.实例和原型都没有这个属性 如何辨别?
     * 用 name in object,只要能访问到，就会返回true 
     * 也就是说，如果是true,那么属性试肯定有的，但不确定是实例的还是原型的
     * 接下来再用hasOwnProperty就可以知道 是实例的还是原型的
     */
    if(name in person4){
        //alert(person4.hasOwnProperty("name"));
    }
    else{
        //alert("no this Attribute");
    }

    /**
     * 原型的动态性
     * 一个对象 的原型对象已经写好了，如果我创建了一个实例，再去修改原型对象，会怎样
     */
    var person5 = new Person();
    Person.prototype.name = "Changed";
    //alert(person5.name);//输出Changed 。先在实例中找name,没找到，去找原型中的，找到了，尽管被改了也不影响
    /**
     * 一个对象 的原型对象已经写好了，如果我创建了一个实例，再去【重写】！原型对象，会怎样
     */
    var person6 = new Person();//创建好实例 prototype 指向原来的原型对象
    Person.prototype={//实例对象重写，但是与 person6 没有任何关联，除非在person6生成之前重写实例
        name:"Jack",
        age:44,
        test: function(){
            alert("Dynamic!");
        }
    }
    alert(person6.age);//没有任何东西输出


}

/**
 * 原型 的缺点
 * 1.不支持传递构造参数  2.不希望共享的属性也会被共享
 * 一般情况下，每个实例的属性值不同，但是使用的方法相同
 * 那么属性定义采用构造方法，方法定义使用原型
 * 组合二者，互补
 */
function combine(){
   //alert("combine");
    // Book.prototype={
    //     open:function(){
    //         alert("open:"+this.name);
    //     }
    // }
     var book = new Book("Math","Martin");
     alert(book.name + book.author);
     book.open();

}

function Book(name,author){
    this.name = name;
    this.author = author;
    //如果想把 属性 和原型方法封装到一起呢？
    //创建原型open方法的代码只会执行一次
    //第一次，open不存在，制作好，下一次创建实例的时候可以直接用源性对象里的open
    if(typeof this.open != "function"){
        //alert("no");
        Book.prototype.open=function(){
            alert("open:"+this.name);
     }
    }
}

/**
 * 2.把可以公用的函数提到外面来
 * 好是好点，不过其他的函数也可以访问，这个就完全没必要了，因为我希望sayName是person独有的
 */

function sayName(){
    alert(this.name);
}

/**
 * 3.原型 prototype 上来救场了
 * 每创建一个函数，自动生成一个内部属性：prototype.这个属性本质上是一个指向原型对象的指针。
 * 原型对象又是什么样的存在呢？
 * 创建自定义构造函数后,原型对象自动获取一个属性：constructor.这个属性指向prototype所在的函数
 * 
 */

function Person(){
}

////////////////////////////////////////继承////////////////////////////////

function Animal(){
    this.name = "defaultAnimalName";
    this.colors = ["black","white"];
    if(typeof this.call != "function"){
        Animal.prototype.call = function(){
             alert("animal call"+this.name);
         }
    }
}
/** 
 * 借用构造函数  组合模式（传自己的构造参数）
 */
function Dog(name){  
    Animal.call(this);//------------第二次创建Animal--------------------
    this.name = name;//这一句放在前，没用；放在后有用.为什么呢？
    //难道是 放在前面的话，会被覆盖掉？
    //放在后面有点追加的意思
}

// function Dog(name){
//     this.name = name;
// }

function Cat(name){
    Animal.call(this);
    this.name = name;
}

function testInherite(){
    //alert("testInherite");
    var animal = new Animal();//------------第一次创建Animal--------------
    //alert(animal.name);
    /**
     * 通过下面这句继承
     */
    Dog.prototype = animal;
    var dog = new Dog("dog");
   
    //dog.prototype = animal;
    //alert(dog.name);
   // dog.call();

    //dog 原型加一个自己的方法 
    Dog.prototype.run = function(){
        alert("run!");
    }  

    //dog.run();
    //animal.run();//其实是加在了animal上

    //重写原型的方法
    Dog.prototype.call=function(){
        alert("call again!");
    }
    //dog.call();
    //animal.call();//覆盖了原来的call方法

    /**
     * 使用 原型链 实现继承的缺点 和 使用原型创建实例 的缺点类似
     * 1.不希望共享的也被共享
     * 2.不能传递构造参数
     */
    Cat.prototype = animal;
    var cat = new Cat("cat");
   
    //alert(dog.colors);
    dog.colors.push("red");
    alert(cat.colors); 

}
/**
 * 所有函数的默认原型 都是object实例
 */
/**
 * 测试借用构造函数 组合继承(子对象构造函数追加自己的属性)
 */

function borrowConstrutor(){
    //Calls a method of an object, substituting another object for the current object.
    Dog.prototype = new Animal();
    var myDog = new Dog("myDog");
    //alert(myDog.colors);
    //myDog.call();

    Cat.prototype = new Animal();
    var myCat = new Cat("myCat");
    //alert(myCat.name);

    myDog.colors.push("red");
    //alert(myDog.colors);
    //alert(myCat.colors);//这样就算狗的颜色修改了，也不会影响猫  为什么

   // alert(myDog.call == myCat.call);//true
    //猫和狗共享一个原型 ？
   // alert(Dog.prototype == Cat.prototype);//false  说明不是同一个

    /**
     * 原型式继承
     */
   //var yx = getChild(Animal); 错！
   var yx = getChild(new Animal());//得到的是一个实例
   //alert(yx.colors);   //输出了颜色
   var child = parasite(new Animal);
   child.sayHi();//输出Hello I'm a Child 
}
/**
 * 原型式继承 只给temp写了一个最简单的构造函数，在想得到一个与object类似的对象（没有过多个性）的对象时
 * 可以用原型式继承
 */
function getChild(object){
    function temp(){};
    temp.prototype = object;
    //return temp;
    return new temp();
}
/**
 * 寄生式继承 在原型式继承的基础上，再封装点特性
 */

function parasite(object){
    var child = getChild(object);
    child.sayHi = function(){
        alert("Hello I'm a Child");
    }
    return child;
}

/**
 * 寄生组合式继承
 * subType:子对象
 * superType:父对象
 * ------------不理解---------------------
 */
function inheritPrototype(subType, superType){
    var prototype = object(superType.prototype); //创建对象
    prototype.constructor = subType; //增强对象
    subType.prototype = prototype; //指定对象
}

//window.onload = def2;
//window.onload = dataAttr;
//window.onload = visisAttr;
//window.onload = createTest;
//window.onload = combine;
//window.onload = testInherite;
window.onload = borrowConstrutor;

