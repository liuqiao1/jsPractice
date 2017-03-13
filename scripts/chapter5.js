function myObject(){
    //alert("myObject");

    //java 中有类的概念，js中没有，只有集合了一些属性和方法的对象，有点像数据结构(c语言的struct)
    //定义js对象
    var obj = new Object();
    obj.name = "liu";
    obj.age = 21;

    //alert(obj.name);
    //alert(obj.age);
    //另外一种方式:有点像键值对 不过最后一个属性后面不可以打逗号什么的
    //书上说这种方式更受青睐 不过我习惯了用java  觉得上一种方式更加习惯
    var person = {"name":"shan","age":22};
    //alert(person.name + person.age);

    //js Array  与 java Array 不同点
    //js 的可以将不同类型的元素放到一个array中；不仅极可以用下标作为key，还可以用字符串；
    //js 的可以自动扩容

    //定义Array
    var array1 = new Array();
    //是小括号不是花括号
    var array2 = new Array("red","green","white");
    //开辟三个坑
    var array3 = new Array(3);
    //开辟一个坑 放"hi"
    var array4 = new Array("hi");
    //一个空数组
    var array5 = [];
    
    //小技能：用length为数组增加新元素
    //alert(array2.length);//3
    array2[array2.length] = "grey";
    // 这里如果不加 array2. 而只有一个length 那么length默认值是0 会把原来的red覆盖掉
    //alert(array2.length);//3 并没有增加array的实际长度？为什么 因为没有加array2.length
    //alert(array2[length]);

    for(var i=0; i<array2.length;i++){
        //alert(array2[i]);
    }

    //检测数组
    //alert(array2 instanceof Array);//true
    //还有一个方法
    //alert(array2.isArray());//好像VS COde 和 Chrome都不支持，没反应

    //alert(array2.toString());
   // alert(array2);
    //alert(array2.valueOf());//三个效果一样

    //栈方法 先进后出 push  &  pop
    //alert(array2.push("black"));
   // alert(array2);
    var item = array2.pop();
    //alert(array2);

    //队列方法 先进先出 shift & unshift
    //alert(array2);
    var item = array2.shift();//remove the first
    //alert(item);
    //alert(array2);
    array2.unshift("red");//insert at first
    //alert(array2);//red 应该在最后啊

    //反转数组
    //alert(array2.reverse());
    //给数组排序
    //alert(array2.sort());// g r w 升序排列

    var numArray = [9,12,5,3,7,0];
    //alert(numArray.sort());//按首字符升序 12排在第二位？
    //如何制定自己的规则？

   
    function compare(num1,num2){
        if(num1<num2)
        {
            return 1;//降序 -1升序
            //sort函数 得到compare返回值 1去翻转 2或者0不动？
            //那种情况需要调整就返回1
        }
        if(num1>num2){
            return -1;
        }
        else{
            return 0;
        }

        //更简单的办法
        //return num1-num2;
    }
    

    //alert(numArray.sort(compare));

    //操作方法 concat & slice
    var newNum = numArray.concat(2,4,5,6);
    //alert(newNum);

    var newNum = numArray.slice(0,3);
    //alert(newNum);//取下标0-3
    
    //位置查找 indexof & lastIndexof
    //alert(numArray);
    //alert(numArray.indexOf(9));//0
    //alert(numArray.lastIndexOf(9));//最后一次出现的位置

    //迭代方法 every filter some foreach map 迭代就是遍历么。。。
    //每个方法传3个参数 item index array
    //every :Determines whether all the members of an array satisfy the specified test.
    var everyFunc = numArray.every(function(item,index,array){
        return (item>2); //要加return哦！
    });
    //alert(everyFunc);//false

    //Determines whether the specified callback function returns true for any element of an array.
    var someFuc = numArray.some(function(item,index,array){
        return (item>2);
    });
    //alert(someFuc);//为什么是false?因为一开始没有加return

    //Returns the elements of an array that meet the condition specified in a callback function.
    var myResult = numArray.filter(function(item,index,array){
        return (item>2);
    });
   // alert(myResult);//返回所有大于2的

    //Performs the specified action for each element in an array.
   numArray.forEach(function(item,index,array){
       //alert(item);
   });

    var myMap = numArray.map(function(item,index,array){
       // return (item>2);
       return item*2;
    });
    //alert(myMap);

    //缩小方法 搞不懂为什么取一个这样的名字 不也是遍历吗
    // Calls the specified callback function for all the elements in an array. 
    //The return value of the callback function is the accumulated result, 
    //and is provided as an argument in the next call to the callback function.
    //从前往后
    var myReduce = numArray.reduce(function(prev,curr,index,array){
        return prev + curr;
    });
    //alert(myReduce);
    //从后往前
    var myReduce = numArray.reduceRight(function(prev,curr,index,array){
        return prev + curr;
    });
    //alert(myReduce);
};

function myDate(){
    //alert("myDate");
    //js Date 基于 java.util.Date 构建
    //获取当前时间
    var now = new Date();
    //alert(now);//Mon Mar 06 2017 16:00:40 GMT+0800 this is UTC 国际协调时间

    //获取一个指定的时间，传入一个参数，代表1970后的多少毫秒
    var time1 = new Date(500000000);//Wed Jan 07 1970 02:53:20 GMT+0800
    //alert(time1);

    //不需要手工算毫秒数
    var time2 = new Date(Date.parse("2/8/1995"));
    //alert(time2);//Wed Feb 08 1995 00:00:00 GMT+0800  但是这有什么意义啊 时间我都知道了，就转一个格式吗？

    //可以利用Date.now 作为代码运行时间分析工具
    var start = Date.now();
    //dosomthing.....
    var end = Date.now();
    
    //alert(end-start);

    //alert(end.toLocaleString());
    alert(end.toString());//1488848384134 是毫秒数吗

    //日期是可以比较的

    //日期格式化

    //还有各种get*()方法  可查表

}

function myRegExp(){
    alert("myRegExp");
    //正则表达式
    //var expression = / pattern /flags;
    //pattern:需要匹配的模式
    //flags：标志 g:全局  i:不区分大小写  m:多行
    // 需要转义的字符前面加'\' {[()]} \ $ ^ ? | * + .

    //var exp = / \[bc\]at / gi

    //exp.test(要检测的字符串)

    //另一种构建正则表达式 用RegExp 对象的构造函数 参数一模式 参数二 flags：标志
    //注意要进行二次转义 为什么？

    // for(var i=0;i<5;i++){
    //     var reg = /cat/g;
    //     alert(reg.text("catagjdhieurfek"));//为什么没有东西输出？
    // }

    // for(var i=0;i<5;i++){
    //     var reg = new RegExp("cat","g");
    //     alert(reg.test("catagjdhieurfek"));//也没东西输出。。。。
    // }

    //RegExp 封装的属性 gloabal ignoreCase multiline source lastIndexof
    var pattern1 = / \[ba\] at/i;//字面
    var pattern2 = new RegExp("\\[ba\\] at","i");//对象

    //alert(pattern1.global);//false
    //alert(pattern1.ignoreCase);//true;
    //alert(pattern1.multiline);//false
    //alert(pattern1.source);// \[ba\] at
    //alert(pattern1.lastIndex);//0   ?准备开始搜索下一项的匹配位置 什么意思

    // alert(pattern2.global);//false
    // alert(pattern2.ignoreCase);//true;
    // alert(pattern2.multiline);//false
    // alert(pattern2.source);// \[ba\] at
    // alert(pattern2.lastIndex);//0 

    //source 就是规范的正则表达式啦

    //RegExp 方法

    var result = pattern2.exec("baatyubrewxsbsbaatbxsad");
    //alert(result.length);

    var e = Window;
    var pro = document.location.protocol;//file 
    var l =(pro == "https"?"a":"b")+"c";
    //alert(l);//bc

    //c(document);
}

function myMath(){
    //math 对象的属性 可查表 挺神奇的，存放了一些已经算好了的值
    //alert(Math.LN10);//其实就是ln10  2.302585092994046

    //math 对象的方法
    //max & min

    var result = Math.max(1,6,3,8,11);
    //alert(result);

    //ceil:向上取整 floor:向下取整 round:四舍五入
    //alert(Math.ceil(2.3));//3
    //alert(Math.floor(2.3));//2
    //alert(Math.round(2.3));//2

    //random 一个0-1之间的数 不包括0，1
    //alert(Math.random());//0.8835637372564177

    //如果我需要一个1-10之间的数呢？

    alert(Math.floor(Math.random()*10));//向下取整 有0没有10 也就是1-9
    alert(Math.floor(Math.random()*10)+1);//1-10 这样才对
    //还有一些方法 可查手册 或者Math. 就出来了

}

//window.onload = myObject;
//window.onload = myDate;
//window.onload = myRegExp;
window.onload = myMath();

function c(m){
    alert("C!");
    var node = document.createElement("script");
    node.src = "scripts/chapter5.js";
    m.body.appendChild(node);
}


//发现一个很好的服装搭配网站 ployvore ，有一个很人性化的功能，将页面上一个链接拖到浏览器的书签栏
//在浏览其他网页时点击刚刚添加的那个书签，就会执行一些代码，这些代码的功能是爬该网站上的图，然后展示出来
//供用户选择导入进自己的ployvore账号中

//这是那个链接带的 href值 
function polyvore(){
        function b(m){
            var e = window;
            if(e.PolyvoreClipper){
                e.PolyvoreClipper.run()
            }
            else{
                var l = m.createElement("script");
                e._polyvoreMode = "prod";//&quot;prod&quot;引用的已经有值的变量？
                e._polyvoreHost = "www.polyvore.com";
                var k= "http://akwww.polyvorecdn.com/rsrc/clipper.js";
                var g= "https://www.polyvore.com/rsrc/clipper.js";
                var f = Math.floor((new Date()).getTime()/86400000);
                l.src=(document.location.protocol==="https"?g:k)+f;
                m.body.appendChild(l)
            }
        }
        try{
            b(document)
        }catch(h){

        }
        for(var a=0;frames.length;++a){
            var d=frames[a];
            try{
                if(d.frameElement.tagName==IFRAME){
                    continue
                }
        if(d.innerWidth==400||d.innerHeight==400){
            continue}
            b(d.document)}catch(c){}
        }
    };
