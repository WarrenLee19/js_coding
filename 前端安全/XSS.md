1. 转义HTML
```js
const tranform = (str) => str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]))
tranform('<div class="medium">Hi Medium.</div>') 
// &lt;div class=&quot;medium&quot;&gt;Hi Medium.&lt;/div&gt
```

2.解决XSS的最优方案：CSP.

CSP 只允许加载指定的脚本及样式，最大限度地防止 XSS 攻击。CSP 的设置根据加载页面时 http 的响应头 Content Security Policy 在服务器端控制。
1. 外部脚本可以通过指定域名来限制：`Content-Security-Policy: script-src 'self'`，self 代表只加载当前域名
2. 如果网站必须加载内联脚本 (inline script) ，则可以提供一个 `nonce` 才能执行脚本，攻击者则无法注入脚本进行攻击。`Content-Security-Policy: script-src 'nonce-xxxxxxxxxxxxxxxxxx'`