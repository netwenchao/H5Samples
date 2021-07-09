var sprites={
    ship:{sx:0,sy:0,w:37,h:42,frames:1}
};
var startGame=function(){
    Game.setBoard(0,new Starfield(20,0.4,100,true));
    Game.setBoard(1,new Starfield(50,0.6,100));
    Game.setBoard(2,new Starfield(100,1.0,50));
    Game.setBoard(3,new TitleScreen('Alien Invasion','Press space to start playing',playGame));
};

var Starfield=function(speed,opacity,num,clear){
    var cav=document.createElement('canvas');
    cav.width=Game.width;
    cav.height=Game.height;
    var ctx=cav.getContext('2d');
    var offset=0;
    num=num||100;

    if(clear){
        ctx.fillStyle='#000';
        ctx.fillRect(0,0,cav.width,cav.height);
    }
    ctx.fillStyle="#FFF";
    ctx.globalAlpha=opacity;

    for(var i=0;i<num;i++){
        ctx.fillRect(Math.floor(Math.random()*cav.width),
            Math.floor(Math.random()*cav.height),2,2
        );
    }

    this.draw=function(ctx){
        var intOffset = Math.floor(offset);
        var remaining = cav.height - intOffset;

        // Draw the top half of the starfield
        if(intOffset > 0) {
            ctx.drawImage(cav,
                    0, remaining,
                    cav.width, intOffset,
                    0, 0,
                    cav.width, intOffset);
        }

        // Draw the bottom half of the starfield
        if(remaining > 0) {
            ctx.drawImage(cav,
                0, 0,
                cav.width, remaining,
                0, intOffset,
                cav.width, remaining);
        }
    };

    this.step=function(dt){
        offset+=dt*speed;
        offset=offset%cav.height;
    };
};
var TitleScreen=function(title,subTitle,callback){
    this.step=function(dt){
        if(Game.keys['Fire'] && callback) callback();
    };

    this.draw=function(ctx){
        ctx.fillStyle='#FFFFFF';
        ctx.textAlign='center';

        ctx.font='bold 40px bangers';
        ctx.fillText(title||'',Game.width/2,Game.height/2-40);

        ctx.font='bold 20px bangers';
        ctx.fillText(subTitle||'',Game.width/2,Game.height/2);
    };
};

var PlayerShip=function(){
    this.w=SpriteSheet.map['ship'].w;
    this.h=SpriteSheet.map['ship'].h;
    this.x=Game.width/2;
    this.y=Game.height-10-this.h;
    this.vx=0;
    this.maxVx=200;
    this.step=function(dt){
        if(Game.keys['Left']){
            this.vx=-this.maxVx;
        }else if(Game.keys['Right']){
            this.vx=this.maxVx;
        }else{
            this.vx=0;
        }
        this.x+=this.vx*dt;
        
        if(this.x<0){
            this.x=0;
        }

        if(this.x>(Game.width-this.w)){
            this.x=Game.width-this.w;
        }
    };
    this.draw=function(ctx){
        SpriteSheet.draw(ctx,'ship',this.x,this.y,1);
    };
};

var playGame=function(){
    var board=new GameBoard();
    board.add(new PlayerShip());
    Game.setBoard(3,board);
};

window.addEventListener('load',function(){
    Game.initialize(this.document.getElementById('game'),sprites,startGame);
},false);