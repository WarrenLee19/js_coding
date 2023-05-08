//当a<b，返回true,否则false
function less(a,b){
  return a - b < 0;
}

//对数组a，在i,j上的值进行交换
function swap(a, i ,j){
  const temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

//分区
function partition(a, lo, hi){
  let i = lo;
  let j = hi + 1;
  while(true){
    while(less(a[++i],a[lo])){
      if(i == hi){
        break;
      }
    }
    while(less(a[lo],a[--j])){
      if(j == lo){
        break;
      }
    }
    //i大于j，证明i和j已经交叉
    if(i >= j){
      break;
    }
    swap(a , i ,j)
  }
  swap(a, lo, j)
  return j;
}


const quickSort = (array) => {
  const sort = (arr, left = 0, right = arr.length - 1) => {
    if (left >= right) {//如果左边的索引大于等于右边的索引说明整理完毕
      return
    }
    let i = left
    let j = right
    const baseVal = arr[j] // 取无序数组最后一个数为基准值
    while (i < j) {//把所有比基准值小的数放在左边大的数放在右边
      while (i < j && arr[i] <= baseVal) { //找到一个比基准值大的数交换
        i++
      }
      arr[j] = arr[i] // 将较大的值放在右边如果没有比基准值大的数就是将自己赋值给自己（i 等于 j）
      while (j > i && arr[j] >= baseVal) { //找到一个比基准值小的数交换
        j--
      }
      arr[i] = arr[j] // 将较小的值放在左边如果没有找到比基准值小的数就是将自己赋值给自己（i 等于 j）
    }
    arr[j] = baseVal // 将基准值放至中央位置完成一次循环（这时候 j 等于 i ）
    sort(arr, left, j-1) // 将左边的无序数组重复上面的操作
    sort(arr, j+1, right) // 将右边的无序数组重复上面的操作
  }
  const newArr = array.concat() // 为了保证这个函数是纯函数拷贝一次数组
  sort(newArr)
  return newArr
}

const arr = [15,13,7,9,14,10,8,16,5,12]
console.log(quickSort(arr));