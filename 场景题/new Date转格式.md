date2Str(new Date())

输出 Y/M/d/h/m/s/ms 格式的字符串，即执行date2Str 

输出的结果是
2023/5/17/0/39/15
```ts
function date2Str(date:Date){
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const second = date.getSeconds()
    return `${year}/${month}/${day}/${hour}/${minutes}/${second}`
}
```