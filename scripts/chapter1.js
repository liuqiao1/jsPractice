//要想全面理解和掌握 JavaScript，关键在于弄清楚它的本质、历史和局限性。

网速慢，频繁的服务端交互耗时长，比如表单验证，有些表单验证工作完全可以在客户端完成比如判空。
Netscape开发了Javscript1.0受欢迎，Microsoft不甘落后，搞了个Jscript,此时相当于有两套标准了。
开发者炸毛，大家也开始担心要乱了套，于是决定制定标准。
ECMA协会制定39号技术委员会负责“标准化一种通用、跨平台、供应商中立的脚本语言的语法和语义”即ECMAScript。
自此以后，浏览器开发商就开始致力于将 ECMAScript 作为各自 JavaScript 实现的基础，也在不同程度
上取得了成功。

Javascript = ECMAScript + BOM + DOM 

我可以基于ECMAScript开发出一个新的脚本语言吗？---
可以，书中说到了如果想要开发，需要遵循什么，不过我需要这样做吗？
node 有没有用到ECMAScript?---包括

混乱的兼容性上Mozilla查，主流浏览器现在对ES6，ES7的支持情况?

文档对象模型（DOM，Document Object Model）是针对 XML 但经过扩展用于 HTML 的应用程序编程接口（API，Application Programming Interface）。
所以DOM实质上是一组可以操纵文档节点的API

DOM的出现原因和ECMAScript类似，都是有个大哥（这次是W3C）出来调和N家和M家的矛盾，避免势不两立局面，对大家都没好处

1996.10    DOM1   DOM核心+DOM HTML
           DOM2   鼠标和用户界面事件、范围、遍历（迭代 DOM文档的方法）等细分模块，而且通过对象接口增加了对 CSS（Cascading Style Sheets，层叠样式表）的支持。
           DOM3   加载保存文档，验证文档

原来SVG基于 XML 的，它的 DOM 标准添加了特殊的新方法和新接口

Mozilla 开发团队的目标是构建与标准 100%兼容的浏览器（火狐），而他们的努力也得到了回报。----这么牛逼的吗？难怪查什么都是去他家查

BOM是一组操纵浏览器窗口和框架（frame?）的API

而 BOM 真正与众不同的地方（也是经常会导致问题的地方），还是它作为 JavaScript 实现
的一部分但却没有相关的标准。这个问题在 HTML5 中得到了解决，HTML5 致力于把很多 BOM 功能写
入正式规范。---------- 比如有哪些BOM功能？现在大家都用新的正式规范了么？

Javascript 的版本？只有 Netscape/Mozilla 浏览器才遵循这种编号模式，大多数浏览器在提及对 JavaScript 的支持情况
时，一般都以 ECMAScript 兼容性和对 DOM 的支持情况为准。----难怪很少听到JS版本这个词。。。

