//attach socket.io to HttpServer
const server=require("http").createServer();
const io=require("socket.io")(server);
io.on("connection",client=>{
    client.on("message",function(){

    });
});
server.listen(10100,function(){
    console.log("listening on *.10100");
});
/*
const io=require("socket.io")();
io.on("connection",socket=>{
    socket.send("Hello!");
    socket.on("message",(data)=>{
        console.log(data);
    });
})
io.listen(3000);
console.log("server is listening at 10010");
*/