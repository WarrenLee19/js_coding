### 场景描述
1. 当我们在使用一个函数API时，我们希望在拦截器输出和输入
2. 拦截输入时，需要执行该函数beforeCall，若为FALSE，则不执行
3. 拦截输出时，需要传入函数API执行后的结果ret，最后，return afterCall执行后的结果
```js
function intercept(fn,{beforeCall = null,afterCall = null}){
  return function (...args){
    if(!beforeCall || beforeCall.call(this,args)!==false){
      const ret = fn.apply(this,args)
      if(afterCall) return afterCall.call(this,ret)
      return ret
    }
  }
}
```