// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现

//思路，声明一个map作为记事本，遍历该数组，只要未出现过数都存为key，已存入的数则判断与遍历的值相加是否为目标值，是的话返回该索引数组
function numSum(target,nums){
    let map =new Map();
    for (let i = 0; i < nums.length; i++) {
        const element = target - nums[i];
        if(map.has(element)){
            return [map.get(element),i]
        }else{
            map.set(nums[i],i)
        }
        
    }
}