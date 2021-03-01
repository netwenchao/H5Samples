# WebSocket Server
## 1.packages
- [Socket.io](https://www.npmjs.com/package/socket.io)

# server

## Properties

## Methods

# WebSocket Client

## 构造函数 WebSocket(url[, protocols])

## 常量

Constant | Value
--|--
WebSocket.CONNECTING | 0
WebSocket.OPEN | 1
WebSocket.CLOSING | 2
WebSocket.CLOSED | 3

## 属性

Property | Description
--|--
WebSocket.binaryType | 使用二进制的数据类型连接。
WebSocket.bufferedAmount 只读 | 未发送至服务器的字节数。
WebSocket.extensions 只读 | 服务器选择的扩展。
WebSocket.onclose | 用于指定连接关闭后的回调函数。
WebSocket.onerror | 用于指定连接失败后的回调函数。
WebSocket.onmessage | 用于指定当从服务器接受到信息时的回调函数。
WebSocket.onopen | 用于指定连接成功后的回调函数。
WebSocket.protocol 只读 | 服务器选择的下属协议。
WebSocket.readyState 只读 | 当前的链接状态。
WebSocket.url 只读 | WebSocket 的绝对路径。

## Method

Method | Description
--|--
close | 当一个 WebSocket 连接被关闭时触发。 也可以通过 onclose 属性来设置。
error | 当一个 WebSocket 连接因错误而关闭时触发，例如无法发送数据时。 也可以通过 onerror 属性来设置.
message | 当通过 WebSocket 收到数据时触发。也可以通过 onmessage 属性来设置。
open | 当一个 WebSocket 连接成功时触发。也可以通过 onopen 属性来设置。

## Sample
```javascript
const socket=new WebSocket("ws://localhost:8080");
socket.addEventListener("open",function(){
    socket.send("Hello Server!");
});

socket.addEventListener("message",function(e){
    console.log(`Message from server ${e.data}`);
});
```