```js
async function getClipboardContents() {
  try {
    // 检测浏览器是否支持 navigator.clipboard API
    if (!navigator.clipboard) {
      console.log('navigator.clipboard 不可用');
      return;
    }

    // 读取剪贴板中的文本内容
    const text = await navigator.clipboard.readText();
  
    console.log('剪贴板中的文本内容:', text);
    return text;
  } catch (err) {
    console.error('无法读取剪贴板内容: ', err);
  }
}
```
