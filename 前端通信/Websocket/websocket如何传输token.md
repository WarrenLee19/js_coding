#### 客户端
那第二种方式就是利用子协议数组，将 token 携带在 protocols 里，
```js
var ws = new WebSocket(url, ["token1"]);
```

websocket请求头中可以包含Sec-WebSocket-Protocol这个属性，该属性是一个自定义的子协议。它从客户端发送到服务器并返回从服务器到客户端确认子协议。我们可以利用这个属性在请求头添加token，对token进行保护的同时，让服务器对客户端进行校验。

### 服务器
后端接收到请求后，从header中取出“Sec-WebSocket-Protocol”，做校验
```js
 token = context.Request.Header.Get("Sec-WebSocket-Protocol")
 if len(token) == 0 {
   ResponseError(context, 11000, errors.New("请求未携带token,无权限访问"))
   context.Abort()
   return
 }
```
在响应头上添加Sec-Websocket-Protocol,如下是在grilla/websocket响应中设置Sec-Websocket-Protocol的方式

```
var upgrader = func(r *http.Request) *websocket.Upgrader {
	upgrader := &websocket.Upgrader{}
	upgrader.HandshakeTimeout = time.Second * 2
	upgrader.CheckOrigin = func(r *http.Request) bool {
		return true
	}
	upgrader.Subprotocols = []string{r.Header.Get("Sec-Websocket-Protocol")}  //设置Sec-Websocket-Protocol
	return upgrader
}
```

### 常见问题
多数时候，浏览器出现下面异常提示信息，就是因为响应报文头中没有Sec-Websocket-Protocol导致的
```
WebSocket: Error during WebSocket handshake: Sent non-empty 'Sec-WebSocket-Protocol' header but no response was receivedWebSocket：WebSocket
```

