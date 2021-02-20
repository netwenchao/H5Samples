export default class Button{
    constructor(x,y,w,h,img,txt){
        this.x=x||0;
        this.y=y||0;
        this.w=w||0;
        this.h=h||0;
        this.img=img;
        this.text=txt;
        this.textRect=null;
    }

    draw(ctx){
        if(!this.textRect && this.text){
            ctx.fontStyle="30px Arial";
            this.textRect=ctx.measureText(this.text);
        }
        
        ctx.drawImage(this.img,0,0,108,36,this.x,this.y,this.w,this.h);

        if(this.text){
            ctx.fillStyle="#FF0000"
            ctx.fontStyle="30px Arial";
            ctx.fillText(this.text,this.x+(this.w-this.textRect.width)/2,this.y+this.textRect.actualBoundingBoxAscent+8);
        }
    }

    isPressed(x,y){
        return x>=this.x &&
            x<=this.x+this.w &&
            y>=this.y &&
            y>=this.y+this.h;
    }
}