1. vue nextTick的源码实现，异步优先级判断，总结就是Promise > MutationObserver > setImmediate > setTimeout
2. 优先使用Promise，因为根据 event loop 与浏览器更新渲染时机，宏任务 →  微任务  →  渲染更新，使用微任务，本次event loop轮询就可以获取到更新的dom
3. 如果使用宏任务，要到下一次event loop中，才能获取到更新的dom
