### 原因：
手机端事件 touchstart –> touchmove –> touchend or touchcancel –> click，因为在 touch 事件触发之后，浏览器要判断用户是否会做出双击屏幕的操作，所以会等待 300ms 来判断，再做出是否触发 click 事件的处理，所以就会有 300ms 的延迟。

### 解决
#### 1. 加了 FastClick 后解决延迟。

原理：FastClick 在 touchend 阶段调用 event.preventDefault，然后通过 document.createEvent 创建一个 MouseEvents，然后通过 event​Target​.dispatch​Event 触发对应目标元素上绑定的 click 事件。(即浏览器在300ms之后的真正click事件阻止掉,并立即发出一个模拟click事件)

缺点：脚本较大

使用方法：

在终端中添加使用
```shell
$ npm install fastclick --save
```

在入口main.js中
```js
import fastClick from 'fastclick'
fastClick.attach(document.body)
```
```js
// 业务代码
var $test = document.getElementById('test');
$test.addEventListener('click', function () {
    console.log('click')
});

// FastClick简单实现
var targetElement = null;
document.body.addEventListener('touchstart', function () {
    // 记录点击的元素
    targetElement = event.target;
});
document.body.addEventListener('touchend', function (event) {
    // 阻止默认事件（屏蔽之后的click事件）
    event.preventDefault();
    var touch = event.changedTouches[0];
    // 合成click事件，并添加可跟踪属性forwardedTouchEvent
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initMouseEvent('click', true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    clickEvent.forwardedTouchEvent = true;
    targetElement.dispatchEvent(clickEvent);
});
```

#### 2. 禁用浏览器缩放
```html
<meta name="viewport" content="user-scalable=no">
<meta name="viewport" content="initial-scale=1,maximum-scale=1">
```
表明这个页面是不可缩放的，那双击缩放的功能就没有意义了，此时浏览器可以禁用默认的双击缩放行为并且去掉300ms的点击延迟。

```js
<script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
```

#### 3.更改默认视口宽度
```html
<meta name="viewport" content="width=device-width">
```
一开始，因为双击缩放主要是用来改善桌面站点在移动端浏览体验的。 随着发展现在都是专门为移动开发专门的站点，这个时候就不需要双击缩放了，所以移动端浏览器就可以自动禁掉默认的双击缩放行为并且去掉300ms的点击延迟。如果设置了上述meta标签，那浏览器就可以认为该网站已经对移动端做过了适配和优化，就无需双击缩放操作了。 这个方案相比方案一的好处在于，它没有完全禁用缩放，而只是禁用了浏览器默认的双击缩放行为，但用户仍然可以通过双指缩放操作来缩放页面。

#### 4.通过tuchstart和touchend模拟实现

能不能直接touchstart代替click呢，
答案是不能，使用touchstart去代替click事件有两个不好的地方。
第一：touchstart是手指触摸屏幕就触发，有时候用户只是想滑动屏幕，却触发了touchstart事件，这不是我们想要的结果；
第二：使用touchstart事件在某些场景下可能会出现点击穿透的现象。

#### 什么是点击穿透？

假如页面上有两个元素A和B。B元素在A元素之上。我们在B元素的touchstart事件上注册了一个回调函数，该回调函数的作用是隐藏B元素。我们发现，当我们点击B元素，B元素被隐藏了，随后，A元素触发了click事件。

这是因为在移动端浏览器，事件执行的顺序是touchstart > touchend > click。而click事件有300ms的延迟，当touchstart事件把B元素隐藏之后，隔了300ms，浏览器触发了click事件，但是此时B元素不见了，所以该事件被派发到了A元素身上。如果A元素是一个链接，那此时页面就会意外地跳转。
