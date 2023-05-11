### useCallback
useCallback 返回一个函数，只有在依赖项发生变化的时候才会更新（返回一个新的函数），多用于生成一个防抖函数

用法：
1. 组件每次更新时，所有方法都会重新创建，这样之前写的防抖函数就会失效，需要使用useCallback包裹
```jsx
import {debounce} from 'debounce'
// 第二个参数为要监听的变量，当为空数组时[]，submit只会被创建一次
// 当监听有值时，会随着值的变化重新创建生成新的submit
const submit = useCallback(debounce(fn, 2000), [])
<button onClick={() => submit()}>提交</button>
```
2. 同一个UI模板函数，但其中一个改变时，其他使用该模板的也会更新，使用useCallback对模板函数的入参进行监听

### useMemo
useMemo 只有在依赖项发生改变的时候，才会重新调用此函数，返回一个新的值, 类似于vue中的computed 计算属性
```jsx
const info = useMemo(() => {
  //  定义info变量， 该变量会随着 inputPerson, inputAge的变化而变化， info可以在页面中显示
  return {
    name: inputPerson,
    age: inputAge
  };
}, [inputPerson, inputAge]);

```

