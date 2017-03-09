

function quote(){
    //基本类型 引用类型
    //基本类型：Number Boolean String Undefined Null
    //引用类型：由基本类型组合而成，放在内存中，程序不可直接访问内存位置，只能通过引用间接访问
    //可以给引用类型加属性 和 方法
    var person = new Object();
    person.name = "liu";

    //alert(person.name);
    //复制 :基本类型重新开辟一个空间，把值放在新空间里，和旧的互不干扰，甚至可以一起工作；
    var a=10;
    var b=a;
    //alert(a+b);

    //引用类型有些像指针地方还是那块地方，复制后，只是多了个指向，也可以理解为这个地方多了个名字
   var person2 = person;
  //alert(person2.name);

   //函数 传参or 传值？ 
   //C 语言是传参 但是 javascript更复杂
   modify(a);
   //alert(a);// a还是10  说明函数内部不能改外部值，
   //此处是传递的基本类型，modify 函数接收到a,会复制一份作为自己函数内部的局部变量（自己有自己的空间）
   //所以 函数内部的 a  和 函数外部的a 其实是互不相干的

   //如果传递 引用类型呢？

   modifyQuote(person);
  // alert(person.name);//输出：xiaowanzi 说明函数内部修改了person 对外部有效
   //函数内部person 与  函数外部 的person 其实是同一块内存，两个引用

   //instanceof  检测引用类型的火眼金睛
   //alert(person instanceof Object);//true
   //alert(person instanceof Array);//false

   //执行环境与作用域
   //感觉有点像上下文context 
   //作用域链由上至下（由外至内） Window->quote ->changeColor
   var color = "red";

   function changeColor(){
       //寻找color 从前端（当前的环境中找），当前的局部变量只有arguments,很明显找不到，
       //然后再往上爬一层，到quote ，发现了color ，刚好等于red ，那么就把他修改为green
       //所以：里面的可访问外面的  但是外面的不能访问里面的？系这样吗？
       if(color === "red"){
           color = "green";
       }
       else{
           color = "yellow";
       }
   }

   changeColor();
   //alert("now color:"+color);

   //执行环境并不是打个{}就算一个 ，必须是function(){},比如：
   if(true){
       var book = "EnglishBook";
   }
   //alert(book);

   //每次var 一下，就会把当前的新变量加入当前执行环境
   //怎么管理和回收这些分配出去了的内存呢？
   //做法 和 java 的垃圾回收机制很像，不用程序员自己来打扫，因为系统自带了一套清理机制
   //标记清理：每个变量都设置标记，刚进入执行环境的变量标记绿色，代表绝对不能清楚；
   //离开执行环境的变量标红，表示等会儿要被清理，每个一段时间，清洁工来转一圈
   //把所有标红的区域都收回来


   //但是这并不代表我们什么都不用做 ，引文分给web的内存并不充足，所以自己及时标记不用的变量也是很必要的

   //比如:
   color = null;//脱离执行环境
}

function modify(a){
    a=12;
    //return a;
}

function modifyQuote(person){
    person.name="xiaowanzi";
}

window.onload = quote;