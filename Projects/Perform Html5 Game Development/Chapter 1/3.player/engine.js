var SpriteSheet=new function(){
    this.map={};
    this.load=function(spriteData,callback){
        this.map=spriteData;
        this.image=new Image();
        this.image.onload=callback
        this.image.src='images/sprites.png';
    };
    this.draw=function(ctx,sprite,x,y,frame){
        var sp=this.map[sprite];
        if(!frame) frame=0;
        ctx.drawImage(this.image,
            sp.sx+frame*sp.w,
            sp.sy,
            sp.w,
            sp.h,
            x,y,
            sp.w,sp.h
            );
    }
    return this;
};

var Game=new function(){
    this.initialize=function(cavEle,spriteData,callback){
        this.canvas=cavEle;
        this.width=this.canvas.width;
        this.height=this.canvas.height;
        this.ctx=this.canvas.getContext('2d');
        if(!this.ctx){
            alert('Please upgrade your browser!');
            return;
        }
        this.setupInput();
        this.loop();
        SpriteSheet.load(spriteData,callback);
    };

    var keyCodes={37:'Left',39:'Right',32:'Fire'};
    this.keys={};

    this.setupInput=function(){
        window.addEventListener('keydown',function(e){
            var code=e.keyCode||e.which;
            if(keyCodes.hasOwnProperty(code)){
                Game.keys[keyCodes[code]]=true;
            }
        },false);

        window.addEventListener('keyup',function(e){
            var code=e.keyCode||e.which;
            if(keyCodes.hasOwnProperty(code)){
                Game.keys[keyCodes[code]]=false;
            }
        },false);
    };

    var boards=[];
    this.loop=function(){
        var dt=30/1000;
        for(var i=0;i<boards.length;i++){
            if(boards[i]){
                boards[i].step(dt);
                boards[i] && boards[i].draw(Game.ctx);
            }
        }
        setTimeout(Game.loop,30);
    };

    this.setBoard=function(idx,board){
        boards[idx]=board;
    };

};