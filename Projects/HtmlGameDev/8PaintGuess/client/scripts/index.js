var serverFactory=(function(){
    var _create=function(url){
        var obj={
            url:url,
            socket:null
        };

        obj.send=function(msg){
            if(!this.socket) this.open();
            this.socket.send(msg);
        };

        obj.open=function(){
            this.socket=new WebSocket(this.url);
            this.socket.onopen=function(){
                console.log("opened...");
            };

            this.socket.onmessage=function(e){
                console.log("onMessage..."+e);
            };

            this.socket.onclose=function(e){
                debugger;
                console.log("onclose..."+e);
            };
            this.socket.onerror=function(e){
                debugger;
                console.log("onerror..."+e);
            };
        };

        /*
        onopen
        onmessage
        onclose
        */

        return obj;
    };

    return {
        create:_create
    };
})();

$(function(){
    var socket=serverFactory.create("ws://127.0.0.1:9898")
    socket.open();
});