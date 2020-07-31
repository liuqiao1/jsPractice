## 实现事件代理

> 我的写法

```html
<div id="box">
  <button id="one">1</button>
  <button id="two">1</button>
  <button id="three">1</button>
</div>
```

```javascript
const handleClick = e => {
  const { id } = e.target.attributes

  switch(id){
    case "one": xxx;break;
    case "two": xxx;break;
    case "three": xxx;break;
    default: console.log('xx');break
  }
}

document.querySelector(".box").addEventListener('click', handleClick)
```

> 问题分析

我这种按钮场景问题不大，但是如果是以下html结构就会有问题
如果target是<a>,那么target永远也无法命中

```html
<ul id="box">
  <li id="one"><a>xxxx</a></li>
  <li id="two"><a>yyyy</a></li>
<ul>
```

另外一个问题是没有封装，switch case会数量很多

> 答案
```javascript
function delegate(element, eventType, selector, fn) {
            element.addEventListener(eventType, e => {
                let el = e.target
                while (!el.matches(selector)) {
                    if (element === el) {
                        el = null
                        break
                    }
                    el = el.parentNode
                }
                el && fn.call(el, e, el)
            },true)
            return element
        }

delegate(box, 'click', "#one", () => { xxx })

作者：TianTianUP
链接：https://juejin.im/post/6855129007852093453
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```

> 知识点

1. addEventListner 的第二个参数
默认false: 冒泡阶段执行，顺序是自内向外
true: 捕获阶段执行，顺序是自外向内

2. matches
let result = element.matches(selectorString);


