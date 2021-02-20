class Scene{
    constructor(win,cav,w,h,bgColor){
        this.win=win;
        this.canvas=cav;
        this.w=w||0;
        this.h=h||0;
        this.color=bgColor||"#FFFFFF";
        this.init();
        this.renderObjs=[];
        this.prevTime=0;
    }

    init(){
        this.canvas.setAttribute("width",w);
        this.canvas.setAttribute("height",h);
        this.ctx=this.canvas.getContext("2d");
        this.handler=null;
        this.running=false;
        this.mainloop=this.loop.bind(this);
    }

    update(delta){
        for(var idx=0;i<this.renderObjs.length;idx++){
            this.renderObjs[idx].update(delta);
        }
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.fillStyle=this.color;
        this.ctx.rect(0,0,this.w,this.h);
        this.ctx.fill();
        this.ctx.closePath();
        for(var idx=0;i<this.renderObjs.length;idx++){
            this.renderObjs[idx].draw(this.ctx);
        }
    }

    loop(perNow){
        this.win.cancelAnimationFrame(this.handler);
        this.update(perNow-this.prevTime);
        this.draw();
        this.prevTime=perNow;
        this.handler =this.win.requestAnimationFrame(this.mainloop);
    }
}