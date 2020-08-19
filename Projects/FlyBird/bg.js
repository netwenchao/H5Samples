import Sprite from "../core/Sprite.js"
const WIDTH=480;
const HEIGHT=800;
const BGWIDTH=480;
const BGHEIGHT=82;
const ROADWIDTH=636;
const ROADHEIGHT=16;
const FRAMEPERMS=60/1000;

export default class Background{
    constructor(){
        this.speed=3;
        this.img=new Image();
        this.img.src="images/bg.png";
        this.imgRoad=new Image();
        this.imgRoad.src="images/road.png";
        this.bg=new Sprite(this.img,0,HEIGHT-BGHEIGHT-40,BGWIDTH,BGHEIGHT);
        this.bg1=new Sprite(this.img,BGWIDTH,HEIGHT-BGHEIGHT-40,BGWIDTH,BGHEIGHT);
        this.road=new Sprite(this.imgRoad,0,HEIGHT-BGHEIGHT+40,ROADWIDTH,ROADHEIGHT);
        this.road1=new Sprite(this.imgRoad,ROADWIDTH,HEIGHT-BGHEIGHT+40,ROADWIDTH,ROADHEIGHT);
    }
    
    update(delta){
        var dis=Math.floor(delta*this.speed*FRAMEPERMS);        
        var disbg=-Math.floor(dis*0.8);
        var disRoad=-dis;
        this.bg.move(disbg);
        if(this.bg.x<=-BGWIDTH){
            this.bg.moveTo(this.bg1.x+BGWIDTH);
        }

        this.road.move(disRoad);
        if(this.road.x<=-ROADWIDTH){
            this.road.moveTo(this.road1.x+ROADWIDTH);
        }

        this.bg1.move(disbg);
        if(this.bg1.x<=-BGWIDTH){
            this.bg1.moveTo(this.bg.x+BGWIDTH);
        }

        this.road1.move(disRoad);
        if(this.road1.x<=-ROADWIDTH){
            this.road1.moveTo(this.road.x+ROADWIDTH);
        }
    }

    render(ctx){
        ctx.fillStyle="#78C7CD";
        ctx.fillRect(0,0,WIDTH,HEIGHT);
        ctx.fillStyle="#DDDB98";
        ctx.fillRect(0,HEIGHT-120,WIDTH,120);

        this.bg.render(ctx);
        this.bg1.render(ctx);
        this.road.render(ctx);
        this.road1.render(ctx);
    }
}