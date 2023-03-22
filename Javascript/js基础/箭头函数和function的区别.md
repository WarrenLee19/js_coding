1. this指向的区别：function定义函数，this指向随着调用环境的变化而变化；箭头函数中的this指向是固定不变的 ps:不熟悉可以直接到JavaScript/this 去查看this指向图
2. function可以定义构造函数；箭头函数不可以，箭头函数不能使用new，也不能使用arguments对象，因为不存在，如果使用，可以用rest代替（结合三点运算符使用）
3. 由于js内存机制，function级别最高；而箭头函数因为变量提升，因为var定义的变量不能得到变量提升，所以箭头函数一定要定义调用之前
4. 箭头函数不能使用yield命令，所以不能作为Generator函数