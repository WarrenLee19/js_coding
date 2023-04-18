> MDN上描述，bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。

由此可知，bind的两个特点，
1. 返回一个函数
2. 可以传参，且第一个参数将作为它运行时的 this

由上可知，我们需要改变this的指向，可以通过apply来实现
```js
Funciton.prototype.new_bind = function (context) {
  var self = this;
  return function (){
    return self.apply(context)
  }
}
```
但上面的版本还没考虑传参的情况，
```js
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);

}

var bindFoo = bar.bind(foo, 'lee');
bindFoo('24');
// 1
// lee
// 24
```
我们可以在bind时，传入第一个参数name，在执行时传入第二个参数age；这个我们可以使用arguments 处理：
```js
Funciton.prototype.new_bind = function (context) {
  var self = this;
  //获取第一次new_bind时，第二个参数到最后一个参数
  var args = Array.prototype.slice(arguments,1)
  return function (){
    //将伪数组转变成数组
    var bindArgs = Array.prototype.slice(arguments)
    return self.apply(context,args.concat(bindArgs))
  }
}
```
还有一步，var obj = new bind(foo)就是bind返回的函数，假如被new实例化了，此时指向的不是foo,而是obj。
- 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
举个例子
```js
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
```
因此基于该特性，我们得到一个新版
```js
Function.prototype.new_bind = function (context) {
  var self = this
  var args = Array.prototype.slice(1,arguments)
  var bindFunction = function (){
    var bind_args = Array.prototype.slice(arguments)
    return self.apply(this instanceof bindFunction ? this : context, args.concat(bind_args))
  }
  // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
  // 即例子中的bar.prototype.friend = 'kevin'，依然可以在obj.friend中取到
  bindFunction.prototype = this.prototype
  return bindFunction
}
```
