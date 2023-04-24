## call 和 apply
### 共同点
1.改变函数执行时的上下文
2.函数被执行
### 不同
第二个参数，call是传入多个，apply是传入一个

## call实现
```js
Function.prototype.new_call = function (context){
  //1.选择上下文，并保存在函数中
  const cxt = context || window
  cxt.fn = this
  
  //2.argument存入字符串舒服
  const args= []
  for (var i = 0; i < arguments.length; i++) {
    args.push(' arguments['+i+']')
  }
  //3.eval执行，并删除上下文的fn属性
  var result = eval('cxt.fn('+args+')')
  delete cxt.fn
  return result
}
```

## apply实现
```js
Function.prototype.new_apply = function (context,arr) {
  var context = Object(context) || window
  context.fn = this
  var result
  if (!arr){
    return context.fn()
  }else {
    const args = []
    for (var i = 0; i < arr.length; i++) {
      args.push('arr['+i+']')
    }
    result = eval('context.fn('+args+')')
    delete context.fn
    return result
  }
}
```