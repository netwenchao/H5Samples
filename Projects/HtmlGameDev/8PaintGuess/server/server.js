const ws=require(__dirname+'/node_modules/node-websocket-server/lib/ws/server');
const server=ws.createServer();
const port="9898";

server.addListener("connection",function(conn){
    console.log("Connection established "+conn.id);
});

server.addListener("close",function(conn){
    //console.log("Connection established "+conn);
});

server.addListener("message",function(){

});

server.listen(port);
console.log("WebSocket server is running...");
console.log("listening to "+port);
