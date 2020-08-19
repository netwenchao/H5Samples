import Background from "./bg.js"

const WIDTH=480;
const HEIGHT=800;

export default class Game{
    constructor(cavNode){
        this.handler=null;
        this.prevTime=0;
        this.bg=new Background();
        this.cav=cavNode;
        this.ctx=this.cav.getContext("2d");
        this.restart();        
    }
    
    restart(){
        this.prevTime=performance.now();
        this.bindUpdate=this.update.bind(this);
        this.update();
    }

    update(){
        var delta=Math.floor(performance.now()-this.prevTime); 
        this.bg.update(delta);
        this.render();
        this.prevTime=performance.now();        
        window.cancelAnimationFrame(this.handler);
        this.handler=window.requestAnimationFrame(this.bindUpdate);
    }

    render(){
        this.bg.render(this.ctx);
    }
}