### 梳理
1. 初始化计算属性时，遍历computed对象，给其中每一个计算属性分别生成唯一computed watcher，并将该watcher中的dirty设置为true

2. 初始化时，计算属性并不会立即计算（vue做的优化之一），只有当获取的计算属性值才会进行对应计算
3. 初始化计算属性时，将Dep.target设置成当前的computed watcher，将computed watcher添加到所依赖data值对应的dep中（依赖收集的过程），然后计算computed对应的值，后将dirty改成false
4. 当所依赖data中的值发生变化时，调用set方法触发dep的notify方法，将computed watcher中的dirty设置为true
5. 下次获取计算属性值时，若dirty为true, 重新计算属性的值
6. dirty是控制缓存的关键，当所依赖的data发生变化，dirty设置为true，再次被获取时，就会重新计算

### 理解
`computed`函数接受一个getter函数作为参数，并返回一个计算属性`computed`。在computed函数中，我们定义了三个变量：`dirty`、`value和runner`。其中，`dirty`表示计算属性的值是否需要重新计算，`value`表示计算属性的值，`runner()`是计算属性的更新函数。

在计算属性的更新函数`effect`中，我们首先判断`dirty`的值是否为true，如果是，则将`dirty`的值改为false，然后调用`runner`函数来重新计算计算属性的值，并将计算结果赋值给value变量。在计算完成后，我们通过`track`函数收集依赖，然后返回计算属性的值。

接下来我们定义了一个对象computed，这个对象拥有以下三个属性：

* `effect`: 计算属性`computed`对应的响应式`effect`。
* `dep`: 计算属性`computed`对应的依赖`dep`对象。
* `value`: 计算属性的值，该属性使用了`get`函数，并在其中收集依赖。

接着，我们使用了`effect`函数来创建一个响应式`effect`，并将`getter`函数和一个对象作为参数传入。在这个对象中，我们使用了`lazy`属性，指定计算属性是懒计算的，即只有在需要的时候才会计算。我们还使用了`scheduler`属性，指定计算属性的更新函数，在计算属性的值发生变化时，我们会标记计算属性为`dirty`，并使用`trigger`函数触发依赖更新。

最后，我们将`effect`函数返回的值转换为计算属性类型，并返回`computed`对象。这样，我们就实现了`computed`的缓存机制。在依赖的响应式数据发生更新时，会重新计算计算属性的值，并将计算结果缓存起来，以便下次的访问。


### 具体实现
```typescript
export function computed<T>(getter: () => T, debugOptions?: DebuggerOptions): ComputedRef<T> {
  let dirty = true
  let value: T
  let runner: Effect

  /**
   * 计算属性 effect 的更新函数
   */
  const effect = () => {
    if (dirty) {
      dirty = false // 标记计算属性已经被更新
      value = runner() // 重新计算并更新计算属性的值
    }
    track(computed, TrackOpTypes.GET, 'value') // 在计算属性 effect 中收集依赖
    return value // 返回计算属性的值
  }

  /**
   * 计算属性 ref 对象
   */
  const computed = {
    [ReactiveFlags.IS_REF]: true,
    effect: effect,
    // 计算属性 Dep 对象,和哪些 ref 或响应式对象相依赖
    dep: new Dep(),
    /**
     * 计算属性 ref 的 value 属性
     */
    get value() {
      // 在计算属性的 get 时收集依赖
      track(computed, TrackOpTypes.GET, 'value')
      // 因为只有在 dirty = true 时才会重新计算，因此可将计算完成的缓存下来
      if (dirty) {
        value = runner()
        dirty = false
      }
      return value
    }
  }

  /**
   * 创建一个响应式 effect，并使用计算属性 effect 作为它的 runner
   */
  runner = effect(getter, {
    lazy: true,
    scheduler: () => {
      if (!dirty) {
        dirty = true // 标记需要重新计算
        trigger(computed, TriggerOpTypes.SET, 'value')
      }
    }
  })

  return computed as any
}

```