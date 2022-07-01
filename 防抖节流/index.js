//1.节流：限定间隔内只触发一次，触发时间隔刷新
// 主要思路：使用时间戳判断，每次调用判断和上一次调用的时间差异确定是否需要调用。
module.exports.throttle = (fn,delay){
  let last = 0;
  return (...args) =>{
    const now = + Date.now();
    if(now > last +delay){
      last = now;
      fn.apply(this,args)
    }
  }
}
//防抖：2次触发间隔必须>限制间隔，小于限制间隔时，间隔刷新
// 实现的话可以使用定时器执行函数，新调用发生时如果旧调用没有执行就清除之前的定时器

module.exports.debounce = (fn,delay){
  let timer;
  return (...args) => {
    timer && clearTimeout(timer)

    //重新新建TimeOut
    timer = setTimeout(()=>{
      fn.apply(this,args)
    },delay)
  }
}