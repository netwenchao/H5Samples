export default class Background{
    constructor(x,y,w,h,dis){
        this.x=x||0;
        this.y=y||0;
        this.w=w||0;
        this.h=h||0;
        this.grass=new Image();
        this.grass.src="images/grass.jpg";

        this.dirt=new Image();
        this.dirt.src="images/dirt.jpeg";
        this.dis=dis;
    }

    draw(ctx){
        ctx.drawImage(this.grass,0,0,this.w,this.h);
        
        ctx.drawImage(this.dirt,this.x+this.dis,this.y+this.dis,this.x+this.w-this.dis*2,this.y+this.h-this.dis*2);
    }
}