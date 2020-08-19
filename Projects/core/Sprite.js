import RenderObj from "./RenderObj.js"
import Frames from "./frame.js"
import Animations from "./animations.js"

export default class Sprite extends RenderObj{
    constructor(img,x,y,w,h){
        super(img,x,y,w,h);
        this.anim=new Animations();        
    }
    update(delta){
        this.anim.update(delta);
        super.update(delta);
    }
    render(ctx){
        ctx.drawImage(this.img,this.x,this.y,this.w,this.h);        
    }
}