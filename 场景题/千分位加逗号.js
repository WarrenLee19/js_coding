function toThousands(nStr){
  nStr = nStr.toString() || 0
  let count = 0,res=''
  let len = nStr.length - 1
  while (len >= 0){
    count ++
    res= nStr.charAt(len) + res
    if (count % 3 === 0 && len !== 0){
      res = ','+res
    }
    len--
  }
  return res
}
toThousands(1232143543)