export default class Score{
    constructor(x,y){
        this.score=0;
        this.x=x;
        this.y=y;
    }

    addPoint(){
        this.score+=1;
    }

    draw(ctx){
        ctx.fillStyle="#FFFFFF";
        ctx.font="30px Arial";
        ctx.fillText("Score:"+this.score,this.x+8,this.y+8);
    }
}