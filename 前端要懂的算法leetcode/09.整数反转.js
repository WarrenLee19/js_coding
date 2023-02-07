// /**
//  * @param {number} x
//  * @return {number}
//  */
function reverse (x) {
    const flag = x< 0 ? -1 : 1
    let now =0,old =x
    while(old> 0){
        now = now * 10 + old % 10
        old = Math.floor(old /10)
    }
    // 正负运算
    now = flag * now
    return now < Math.pow(-2, 31) || now > Math.pow(2, 31) - 1 ? 0 : now
};