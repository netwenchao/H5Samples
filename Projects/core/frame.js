export default class Frames{
    constructor(img,x,y,w,h,dur){
        this.img=img;
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.duration=dur||50;
        this.frames=[];
        this.curIndex=0;
        this.curFrameDur=0;
        this.isCycle=true;
    }

    addFrame(x,y,w,h,dur,img){
        this.frames.push([img||this.img,x,y,w,h,dur||this.duration]);
    }

    getCurFrame(){
        if(this.frames.length==0) return null;
        return this.frames[this.curIndex];
    }

    update(delta){
        if(this.frames.length>0){
            this.curFrameDur+=delta;
            if(this.curFrameDur>=this.getCurFrame()[5]){
                this.curFrameDur=0;
                this.curIndex++;
                if(this.curIndex==this.frames.length){
                    this.curIndex=this.isCycle?0:(this.frames.length-1);
                }
            }
        }
    }

    removeFrame(idx){
        if(idx>=0 && idx<this.frames.length){
            this.frames.splice(idx,1);
        }
    }
    clearFrame(){
        this.frames=[];
    }
}