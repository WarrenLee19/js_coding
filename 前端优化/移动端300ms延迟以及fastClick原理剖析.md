### 原因：
手机端事件 touchstart –> touchmove –> touchend or touchcancel –> click，因为在 touch 事件触发之后，浏览器要判断用户是否会做出双击屏幕的操作，所以会等待 300ms 来判断，再做出是否触发 click 事件的处理，所以就会有 300ms 的延迟。

### 解决
加了 FastClick 后解决延迟。

原理：FastClick 在 touchend 阶段调用 event.preventDefault，然后通过 document.createEvent 创建一个 MouseEvents，然后通过 event​Target​.dispatch​Event 触发对应目标元素上绑定的 click 事件。

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