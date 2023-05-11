1. 遍历watch对象， 给其中每一个`watch`属性，生成对应的`user watcher`
2. 调用watcher中的`get`方法，将`Dep.target`设置成当前的`user watcher`，并将`user watcher`添加到监听data值对应的dep中（依赖收集的过程）
3. 当所监听data中的值发生变化时，会调用set方法触发dep的notify方法，执行watcher中定义的方法
4. 设置成`deep：true`的情况，递归遍历所监听的对象，将`user watcher`添加到对象中每一层key值的dep对象中，这样无论当对象的中哪一层发生变化，`watcher`都能监听到。通过对象的递归遍历，实现了深度监听功能
