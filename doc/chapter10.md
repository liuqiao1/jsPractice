# DOM
- 有哪些类型的节点
- 操作节点的常用API
- 客服浏览器兼容性问题及各种陷阱

> 本章主
要讨论与浏览器中的 HTML 页面相关的 DOM1 级的特性和应用，以及 JavaScript 对 DOM1 级的实现

## 节点层次
### Node 类型

所有节点的基类
node.nodeType 表明了节点类型

Node.ELEMENT_NODE(1)；
Node.ATTRIBUTE_NODE(2)；
Node.TEXT_NODE(3)；
Node.CDATA_SECTION_NODE(4)；
Node.ENTITY_REFERENCE_NODE(5)；
Node.ENTITY_NODE(6)；
Node.PROCESSING_INSTRUCTION_NODE(7)；
Node.COMMENT_NODE(8)；
Node.DOCUMENT_NODE(9)；
Node.DOCUMENT_TYPE_NODE(10)；
Node.DOCUMENT_FRAGMENT_NODE(11)；
Node.NOTATION_NODE(12)。

1. nodeName 和 nodeValue属性

> 对于元素节点， nodeName 中保存的始终都是元素的标签名，而 nodeValue 的值则始终为 null

2. 节点关系

- 父子
    - childNodes属性
    - parendNode属性
    - hasChidNodes()
- 兄弟
    - preveiousSibling
    - nextSibling
3. 操作节点
- appendChild()

> 如果传入到 appendChild()中的节点已经是文档的一部分了，那结果就是将该节点从原来的位置
转移到新位置。即使可以将 DOM 树看成是由一系列指针连接起来的，但任何 DOM 节点也不能同时出
现在文档中的多个位置上。因此，如果在调用 appendChild()时传入了父节点的第一个子节点，那么
该节点就会成为父节点的最后一个子节点.

```
//someNode 有多个子节点
var returnedNode = someNode.appendChild(someNode.firstChild
alert(returnedNode == someNode.firstChild); //false
alert(returnedNode == someNode.lastChild); //true
```

- insertBefore(A, B)

将A插在B之前，如果B为null，则插在末尾

- replaceChild(A, B)

用A替换B的位置

> 在使用 replaceChild()插入一个节点时，该节点的所有关系指针都会从被它替换的节点复制过
来。尽管从技术上讲，被替换的节点仍然还在文档中，但它在文档中已经没有了自己的位置。

- removeChild(待删除的节点)

- cloneNode(true/false)

true为深拷贝
false为浅拷贝
只拷贝属性盒子节点，其他都不复制比如事件，IE是例外，所以建议clone之前先移除事件

- normalize()

> 唯一的作用就是处理文档树中的文本节点。
由于解析器的实现或 DOM 操作等原因，可能会出现文本节点不包含文本，或者接连出现两个文本节点
的情况。当在某个节点上调用这个方法时，就会在该节点的后代节点中查找上述两种情况。如果找到了
空文本节点，则删除它；如果找到相邻的文本节点，则将它们合并为一个文本节点

---

### Document类型

document继承自HTMLDocument对象，是window的一个属性

Document节点的特征：
nodeType 的值为 9；
nodeName 的值为"#document"；
nodeValue 的值为 null；
parentNode 的值为 null；
ownerDocument 的值为 null；
其子节点可能是一个 DocumentType（最多一个）、 Element（最多一个）、 ProcessingInstruction
或 Comment。

1. 文档的子节点
- document.documentElement指向\<html>
- document.body指向\<body>

2. 文档信息
- document.title
- document.URL/domain/referere

3. 查找元素
- getElemntById()
- getElementsByTagName()
- getElementsByName()

4. 特殊集合
5. DOM一致性检测
6. 文档写入
- document.write() //严格模式下不允许用

### Element类型

Element 节点具有以下特征：
 nodeType 的值为 1；
 nodeName 的值为元素的标签名；
 nodeValue 的值为 null；
 parentNode 可能是 Document 或 Element；
 其子节点可能是 Element、 Text、 Comment、 ProcessingInstruction、 CDATASection 或
EntityReference。

1. HTML元素
> 所有 HTML 元素都是由 HTMLElement 或者其更具体的子类型来表示的
2. 取得特性
- getAttribute()
- setAttribute()
- removeAttribute()
> 取不到style和事件处理由于存在这些差别，在通过 JavaScript 以编程方式操作 DOM 时，开发人员经常不使用 getAttribute()，而是只使用对象的属性。**只有在取得自定义特性值的情况下，才会使用 getAttribute()方法**
3. 设置特性
> 直接给属性赋值可以设置特性的值
4. attributes属性
> 如果想要遍历元素的特性， attributes 属性倒是可以派上用场
5. 创建元素
- docuemnt.createElement()
6. 元素的子节点
> 如果是 IE 来解析这些代码，那么\<ul>元素会有 3 个子节点，分别是 3 个\<li>元素。但如果是在其
他浏览器中， \<ul>元素都会有 7 个元素，包括 3 个\<li>元素和 4 个文本节点（表示\<li>元素之间的空
白符）。如果像下面这样将元素间的空白符删除，那么所有浏览器都会返回相同数目的子节点。

### Text类型

Text 节点具有以下特征：
 nodeType 的值为 3；
 nodeName 的值为"#text"；
 nodeValue 的值为节点所包含的文本；
 parentNode 是一个 Element；
 不支持（没有）子节点。
1. 创建文本节点
- document.createTextNode("")
2. 规范化文本节点
- 合并 parentNode.normalize()
3. 分割文本节点
- element.splitText(5)

    分割为两个文本节点，从位置 5 开始
    
### Comment类型
注释

### CDATASection类型
CDATA 指的是不应由 XML 解析器进行解析的文本数据；继承自 Text 类型
> 在真正的 XML 文档中，可以使用 document.createCDataSection()来创建 CDATA 区域，只需
为其传入节点的内容即可

### DocumentType类型
### DocumentFragment类型
### Attr类型
元素的特性在 DOM 中以 Attr 类型来表示
- name
- value
- specified

    一个布尔值，用以区别特性是在代码中指定的，还是默认的