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

var gPaint=(function(){
  var ctx=null;
  var cavEle=null;
  var colorEle=null;
  var size={w:0,h:0};
  var empP={x:0,y:0}
  var data={
    painting:false,
    startPoint:empP,
    endPoint:empP,
    color:"#000000",
    lineWidth:2
  };

  var drawer={
    start:function(e){
      console.log(`${e.pageX},${e.pageY}`);
      data.startPoint={x:e.pageX,y:e.pageY};
      data.endPoint={x:e.pageX,y:e.pageY};
      data.painting=true;
    },
    move:function(e){
      if(!data.painting)return;
      data.endPoint={x:e.pageX,y:e.pageY};
      drawLine(data.startPoint,data.endPoint);
      data.startPoint=data.endPoint;
    },
    end:function(e){
      data.painting=false;
      if(!data.painting)return;
      data.startPoint=empP;
      data.endPoint=empP;
    }
  };

  function initEvent(){
    $(cavEle).mousedown(function(e){
      drawer.start(e);
    });
    $(cavEle).mousemove(function(e){
      drawer.move(e);
    });
    $(cavEle).mouseup(function(e){
      drawer.end(e);
    });

    $(colorEle).find(".pad").click(function(){
      //debugger;
      data.color=$(this).attr("data-color")
    });
  }

  function drawLine(ps,pe){
    ctx.strokeStyle=data.color;
    ctx.lineWidth=data.lineWidth;
    ctx.beginPath();
    ctx.moveTo(ps.x,ps.y);
    ctx.lineTo(pe.x,pe.y);
    ctx.closePath();
    ctx.stroke();
  }

  function pad(num)
  {
    if(num.length==1)return "0"+num;
    return num;
  }

  function createPad(){
    var output=[];
    var r=0,g=0,b=0,c="";
    while(r<=256){
      r+=1;
      g+=1;
      b+=1;
      c=`#${pad(r.toString(16))}${pad(g.toString(16))}${pad(b.toString(16))}`;
      output.push(`<span class="pad" data-color="${c}" style="background-color:${c}"></span>`);
    }
    $(colorEle).html(output.join("\r\n"));
  }

  return {
    init:function(cav,padEle){
      cavEle=cav;
      colorEle=padEle;
      ctx=cavEle.getContext("2d");
      size.w=parseInt(cavEle.getAttribute("width"));
      size.h=parseInt(cavEle.getAttribute("height"));
      createPad();
      initEvent();
    },
  };
})();

$(function(){
  /*
    var socket=serverFactory.create("ws://127.0.0.1:9898")
    socket.open();*/
    var game=gPaint.init(document.getElementById("main"),document.getElementById("colorPad"));
});