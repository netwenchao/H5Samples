export class RenderObj{
    constructor(img,x,y,w,h){        
        this.owner=null;
        this.img=img;
        this.x=this.x||x;
        this.y=this.y||y;
        this.w=this.w||w;
        this.h=this.h||h;
        this.dx=0;//x加速度
        this.dy=0;//y加速度
        this.vx=0;//x速度
        this.vy=0;//y速度
        this.visible=false;
        this.canRemove=false;
    }

    moveTo(x,y){
        this.x=x||this.x;
        this.y=y||this.y;
    }

    update(delta){
        this.x+=(delta*this.vx);
        this.y+=(delta*this.vy);
    }

    remove(){
        this.canRemove=true;
    }

    hide(){
        this.visible=false;
    }
    show(){
        this.visible=true;
    }
    render(ctx){        
    }
}