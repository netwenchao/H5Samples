import { RenderObj } from "./RenderObj";

export class Sprite extends RenderObj{
    constructor(img,x,y,w,h){
        super(img,x,y,w,h);
    }    
    render(ctx){
        ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
    }
}