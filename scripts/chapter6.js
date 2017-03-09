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
    alert(person3.hasOwnProperty("name"));//true
    alert(person4.hasOwnProperty("name"));//flase
    alert(person4.hasOwnProperty("noAttr"));//false 

    /**
     * 返回false有两种情况：1.实例没有有这个属性，但原型有 2.实例和原型都没有这个属性 如何辨别?
     * 用 name in object,只要能访问到，就会返回true 
     * 也就是说，如果是true,那么属性试肯定有的，但不确定是实例的还是原型的
     * 接下来再用hasOwnProperty就可以知道 是实例的还是原型的
     */
    if(name in person4){
        alert(person4.hasOwnProperty("name"));
    }
    else{
        alert("no this Attribute");
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



//window.onload = def2;
//window.onload = dataAttr;
//window.onload = visisAttr;
window.onload = createTest;


