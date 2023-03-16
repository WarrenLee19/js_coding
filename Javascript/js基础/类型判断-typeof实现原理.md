### typeof 实现原理
typeof 一般被用于判断一个变量的类型，我们可以利用 typeof 来判断number, string, object, boolean, function, undefined, symbol 这七种类型，即基础类型

总结：typeof只能帮我们判断基础类型所对应的类型

```js
let s = new String('abc');
typeof s === 'object'// true
s instanceof String // true
```

js 在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息

* 000：对象
* 010：浮点数
* 100：字符串
* 110：布尔
* 1：整数

但是，对于 undefined 和 null 来说，这两个值的信息存储是有点特殊的。

* null：所有机器码均为0
* undefined：用 −2^30 整数来表示

所以，typeof 在判断 null 的时候就出现问题了，由于 null 的所有机器码均为0，因此直接被当做了对象来看待。

总结:typeof的原理是获取变量的存储类型信息，判断并返回对应的类型