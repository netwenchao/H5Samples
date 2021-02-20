export default class DirButton{
    constructor(x,y,w,h){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.btnW=this.w/3;
        this.btnH=this.h/3;
        this.images=[
            new Image(),
            new Image(),
            new Image(),
            new Image()
        ];

        const imgs=[
            "images/up.png",
            "images/right.png",
            "images/down.png",
            "images/left.png"
        ];
        var ix=0;
        this.images.forEach(i=>{
            i.src=imgs[ix++];
        });
        this.btnRect=[
            {x:this.x+this.btnW,y:this.y,w:this.btnW,h:this.btnH},
            {x:this.x+this.btnW*2,y:this.y+this.btnH,w:this.btnW,h:this.btnH},
            {x:this.x+this.btnW,y:this.y+this.btnH*2,w:this.btnW,h:this.btnH},
            {x:this.x,y:this.y+this.btnH,w:this.btnW,h:this.btnH}
        ];
        this.dirDict={
            0:"up",
            1:"left",
            2:"down",
            3:"right",
        };
    }

    draw(ctx){
        ctx.fillStyle="rgba(255,255,255,0.5)";
        ctx.fillRect(this.x,this.y,this.w,this.h);

        ctx.drawImage(this.images[0],0,0,600,600,this.btnRect[0].x,this.btnRect[0].y,this.btnW,this.btnH);
        ctx.drawImage(this.images[1],0,0,600,600,this.btnRect[1].x,this.btnRect[1].y,this.btnW,this.btnH);
        ctx.drawImage(this.images[2],0,0,600,600,this.btnRect[2].x,this.btnRect[2].y,this.btnW,this.btnH);
        ctx.drawImage(this.images[3],0,0,600,600,this.btnRect[3].x,this.btnRect[3].y,this.btnW,this.btnH);
    }

    isPressed(x,y,r){
        return x>=r.x &&
            x<=r.x+r.w &&
            y>=r.y &&
            y<=r.y+r.h;
    }

    pressed(x,y){
        for(var i=0;i<this.btnRect.length;i++){
            if(this.isPressed(x,y,this.btnRect[i])){
                return this.dirDict[i];
            }
        }
        return null;
    }
}