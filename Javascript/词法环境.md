> A Lexical Environment is a specification type used to define the association of Identifiers to specific variables and functions based upon the lexical nesting structure of ECMAScript code. A Lexical Environment consists of an Environment Record and a possibly null reference to an outer Lexical Environment.

> 翻译：词法环境是一种规范类型，用于根据ECMAScript代码的词法嵌套结构定义标识符与特定变量和函数的关联。词法环境由环境记录和对外部词法环境的可能空引用组成。

官方翻译可能有点难以理解

### 词法环境
由内部 JavaScript 引擎构造，用来保存标识符变量的映射关系。同时，它还保存对父级词法环境的引用。
那么这里的标识符就是指变量或者函数的名称，变量是对实际对象（包括函数类型对象）或者原始值的引用。

每当 JavaScript 引擎创建执行上下文来执行函数或者全局代码时，就会创建一个新的词法环境，以存储在该函数执行期间在该函数中定义的变量。

词法环境有两个组成部分：

1. 环境记录：存储变量和函数声明的实际位置
2. 对外部环境的引用：实际上就是对外部或者说是父级词法环境的引用。这对理解闭包是如何工作的尤为重要。

例如，
```html
    lexicalEnvironment = {
        environmentRecord: {    // 环境记录
            <identifier>: <value>,
            <identifier>: <value>
        }
        outer: <Reference to the parent lexical environment>  // 外部环境引用
    }
```
当 JavaScript 创建一个全局执行上下文来执行全局代码时，它还会创建一个新的词法环境用来存储全局范围内定义的变量和函数。所以对这个全局的词法环境就有：
```html
    globalLexicalEnvironment = {
      environmentRecord: {
        text: 'Hello Lexical Environment',
        fn: < reference to function object >
      }
      outer: null
    }
```
这是全局作用域下的词法环境，所以外层这里是 null。
而当 JavaScript 引擎为函数 fn 创建执行上下文时，它会再创建一个词法环境来存储在函数执行期间在该函数内部定义的变量。函数 fn 的词法环境如下：
```html
    functionLexicalEnvironment = {
      environmentRecord: {
        fnText: 'Inside Lexical Environment'
      }
      outer: < globalLexicalEnvironment >
    }
```

### 总结一下
词法环境就是在JavaScript 引擎创建一个执行上下文时，创建的用来存储变量和函数声明的环境，它可以使代码在执行期间，访问到存储在其内部的变量和函数，而在代码执行完毕之后，从内存中释放掉。

### 查找变量的顺序
```js
var global_variable1 = 'Hello';
let global_variable2 = 'World';

function fn() {
var inside_variable1 = 'fn';
let inside_variable2 = 'function';
{
var block_variable1 = 'var_block';
let block_variable2 = 'let_block';
}
}

fn()
```
假如我们在fn里使用global_variable1变量，那它的查找顺序就是

```html
fn 词法环境--》fn 变量环境--》全局词法环境--》全局变量环境
```