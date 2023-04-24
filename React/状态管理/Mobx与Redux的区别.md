1. 从数据管理模式的差别上看，Mobx是基于双向绑定的响应式的实现，而redux是基于flux的单向数据流的实现。
2. 从开发上来看是和面向对象和函数式编程的区别。但是前端开发需要经常与副作用打交道，所以前端开发很难与完美的函数式编程相结合。
3. redux的state是只读的，产生新的state的过程是pure的；Mobx的state可读可写，并且action并不是必须的，可以直接赋值改变，这也看出了Mobx改变数据的impure。
4. 在可预测性、可维护性上看，redux得益于它的清晰的单向数据流和纯函数的实现，在这方面优于Mobx。
5. redux是单一数据源；而Mobx是多个store。
6. redux中的store是普通的js对象结构，而Mobx中的会对其进行observable化，从而实现响应式。
7. 从代码量上看，Mobx能少写很多代码，而redux要通过action,reducer等等的编写才能实现整个流程。