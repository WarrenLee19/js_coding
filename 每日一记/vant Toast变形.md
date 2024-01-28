### 遇到一个坑
> 问题现象：vant toast直接从loading的矩形变成长方形
 
 修复方法1：虽然在页面中调用了toast.loading,但是可以在网络请求（axios）先把它clear掉。接下来再报错，就会生一个新的toast实例，不会受之前影响

 修复方法2： 在方法1的基础中，clear掉后；并且使用toast.success、toast.fail替换
