### instanceof 操作符的实现原理
instanceof 来判断对象的具体类型，其实 instanceof 主要的作用就是判断一个实例是否属于某种类型

```js
function new_instance_of(leftVaule, rightVaule) { 
    let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
    leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
    while (true) {
    	if (leftVaule === null) {
            return false;	
        }
        if (leftVaule === rightProto) {
            return true;	
        } 
        leftVaule = leftVaule.__proto__ 
    }
}
```
其实 instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false，告诉我们左边变量并非是右边变量的实例。

要全部理解```instanceof```，我们先看看几个例子
```js
function Foo() {
}

Object instanceof Object // true
Function instanceof Function // true
Function instanceof Object // true
Foo instanceof Foo // false
Foo instanceof Object // true
Foo instanceof Function // true
```
根据js的原型链继承可知，每个 JavaScript 对象均有一个隐式的 __proto__ 原型属性，而显式的原型属性是 prototype，只有 Object.prototype.__proto__ 属性在未修改的情况下为 null 值

* Object instanceof Object

由图可知，Object 的 prototype 属性是 Object.prototype, 而由于 Object 本身是一个函数，由 Function 所创建，所以 Object.__proto__ 的值是 Function.prototype，而 Function.prototype 的 __proto__ 属性是 Object.prototype，所以我们可以判断出，Object instanceof Object 的结果是 true 。用代码简单的表示一下

* Foo instanceof Foo

  Foo 函数的 prototype 属性是 Foo.prototype，而 Foo 的 __proto__ 属性是 Function.prototype，由图可知，Foo 的原型链上并没有 Foo.prototype ，因此 Foo instanceof Foo 也就返回 false 。



