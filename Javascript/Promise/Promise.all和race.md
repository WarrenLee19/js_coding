## all
* 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
* 如果所有Promise都成功，则返回成功结果数组
* 如果有一个Promise失败，则返回这个失败结果
```js
class MyPromise{
  // constructor(excutor){
  //   this.initMethod()
  //   excutor(this.reslove,this.reject)
  // }
  // initMethod(){
  //   this.status='pending'
  //   this.result = null
  // }
  // reslove(value){
  //   this.status = 'fullfilled'
  // }
  // reject(value){
  //   this.status = 'reject'
  // }
  static all(promises){
    let count =0
    let result = []
    return new Promise((resolve, reject)=>{
      function addTime(index,res){
        result[index] = res
        count++
        if(count === promises.length){
          resolve(result)
        }
      }
      promises.forEach((promise,index)=>{
        if(promise instanceof Promise){
          promise.then(res=>{
            addTime(index,res)
          },err=>{
            reject(err)
          })

        }else {
          addTime(index,promise)
        }
      })
    })
}
}
```
## race
* 接收一个Promise数组，数组中如有非Promise项，则此项当做成功
* 哪个Promise最快得到结果，就返回那个结果，无论成功失败
```js
   race(promises){
    return new Promise((resolve, reject)=>{
      promises.forEach((promise,index)=>{
        if(promise instanceof Promise){
          promise.then(res=>{
            resolve(res)
          },err=>{
            reject(err)
          })

        }else {
          resolve(promise)
        }
      })
    })
}
```
