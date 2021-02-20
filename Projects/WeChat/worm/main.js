import Worm from "./worm.js"
import Button from "./ui/button.js"
import DirButton from "./dirbutton.js"
import Score from "./score.js"
import Background from "./background.js"

export default class Main{
    constructor(cav,w,h){
        this.w=w;
        this.h=h;
        this.aniId=0;
        this.frame=0;
        this.gameOver=false;
        this.playing=false;
        this.apples=[];
        this.restart();
        this.cav=cav;
        this.ctx=this.cav.getContext("2d");
        this.btnBg=new Image();
        this.btnBg.src="images/btn.png";
        this.restart();
        this.cav.addEventListener("touchstart",this.touchEventHandler.bind(this));        
    }

    restart(){
        this.worm=new Worm([this.w/2,this.w],this.w/50);
        this.background=new Background(0,0,this.w,this.h,20);
        this.score=new Score(20,20);
        this.startButton=new Button(this.w/2,this.h/2,108,36,this.btnBg,"Start");
        this.dirButton=new DirButton(20,this.h-128,128,128);

        this.bindLoop=this.loop.bind(this);
        window.cancelAnimationFrame(this.aniId);
        this.aniId=window.requestAnimationFrame(()=>{
            this.update();
            this.render();
        });
    }

    touchEventHandler(e){
        let t=e.touches[0];        
        if(this.playing && !this.gameOver){
            var dir=this.dirButton.pressed(t.clientX,t.clientY);
            if(dir){
                this.worm.setDirection(dir);
            }
        }else if(this.startButton.isPressed(t.clientX,t.clientY)){
            this.playing=true;
            this.gameOver=false;
            this.restart();
            this.aniId=window.requestAnimationFrame(this.bindLoop);
        }
    }

    render(){
        this.ctx.clearRect(0,0,this.w,this.h);
        this.ctx.fillStyle="#E1E1E1";
        this.ctx.fillRect(0,0,this.w,this.h);
        this.background.draw(this.ctx);;
        this.score.draw(this.ctx);
        this.worm.draw(this.ctx);
        this.dirButton.draw(this.ctx);
        //draw direction
        if(!this.playing || this.gameOver){
            this.startButton.draw(this.ctx);
        }
    }

    update(){
        let grow=false;
        if(this.frame%150==0 && this.frame!==0){
            grow=true;
        }

        if(this.frame%10===0 && this.frame!==0){
            if(this.worm.move(grow) || this.crashed(this.worm.head())){
                this.gameOver=true;
            }
        }
    }

    crashed(block){
        //x,y

        return false;
    }

    loop(){
        if(this.gameOver) return;
        this.frame++;
        this.update();
        this.render();
        this.aniId=window.requestAnimationFrame(this.bindLoop);
    }
}