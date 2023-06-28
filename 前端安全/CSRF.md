1. SameSite
2. csrfToken放cookie

   session 写入 csrfToken，登录成功之后 凭证也放在session里面，设置httpOnly, 然后用CSP 限制不允许执行内联JS，不允许请求站外js 文件
3. 复杂的JSON 对象