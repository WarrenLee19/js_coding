```js
function objectFactory(){
  // 创建临时对象，新对象
  var obj = new Object()
  // 绑定原型
  Constructor = [].shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  // 指定this = 临时对象，执行构造函数
  var ret = Constructor.apply(obj,arguments)
  //判断是否为对象 返回临时对象
  return typeof ret === 'object' ?ret : obj
}
```
