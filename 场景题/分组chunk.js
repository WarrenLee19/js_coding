//[1,2,3,4,5,6,7],3
function chunk(arr,size){
  let res =[]
  for (let i = 0; i < arr.length;) {
    res.push(arr.slice(i,i+size))
    i+=size
  }
  return res
}
chunk([1,2,3,4,5,6,7],3)