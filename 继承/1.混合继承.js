function Parent(name){
  this.name = name;
  this.colors = ['red','blue']
}
Parent.prototype.getName = function (){
  console.log(this.name)
}
function Child(name,age){
  Parent.call(this,name)
  this.age = age
}
Child.prototype = new Parent()
Child.prototype.constructor = Child
let c1 =new Child('lee',19)
c1.colors.push('green')
let c2 =new Child('liu',29)
console.log(c1.colors);
console.log(c2.colors);