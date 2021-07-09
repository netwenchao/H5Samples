var sprites={
    ship:{sx:0,sy:0,w:37,h:42,frames:1},
    missle:{sx:0,sy:30,w:2,h:10,frames:1},
    enemy_purple:{sx:37,sy:0,w:42,h:43,frames:1},
    enemy_bee:{sx:79,sy:0,w:37,h:143,frames:1},
    enemy_ship:{sx:116,sy:0,w:42,h:43,frames:1},
    enemy_circle:{sx:158,sy:0,w:32,h:33,frames:1},
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
    this.reloadTime=0.25;
    this.reload=this.reloadTime;

    this.step=function(dt){
        if(Game.keys['Left']){
            this.vx=-this.maxVx;
        }else if(Game.keys['Right']){
            this.vx=this.maxVx;
        }else{
            this.vx=0;
        }

        this.reload-=dt;
        if(Game.keys['Fire'] && this.reload<=0){
            Game.keys['Fire']=false;
            this.reload=this.reloadTime;
            this.board.add(new PlayMissle(this.x,this.y+this.h/2));
            this.board.add(new PlayMissle(this.x+this.w,this.y+this.h/2));
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

var PlayMissle=function(x,y){
    this.w=SpriteSheet.map['missle'].w;
    this.h=SpriteSheet.map['missle'].h;
    //put center at x
    this.x=x||0-this.w/2;
    //put bottom at y
    this.y=y||0+this.h;
    this.vy=-700;
};

PlayMissle.prototype.step=function(dt){
    this.y+=dt*this.vy;
    if(this.y<this.h) this.board.remove(this);
};

PlayMissle.prototype.draw=function(ctx){
    SpriteSheet.draw(ctx,'missle',this.x,this.y);
};

var enemies={
    basic:{x:100,y:-50,sprite: 'enemy_purple', B: 100, C: 2 , E: 100},
};

var Enemy=function(bluePrint,overide){
    var baseParam={A:0,B:0,C:0,D:0,E:0,F:0,G:0,H:0};
    for(var p in baseParam){
        this[p]=baseParam[p];
    }
    for(var p in bluePrint){
        this[p]=bluePrint[p];
    }
    if(overide){
        for(var p in overide){
            this[p]=overide[p];
        }
    }
    this.w=SpriteSheet.map[this.sprite].w;
    this.h=SpriteSheet.map[this.sprite].h;
    this.t=0;
};

Enemy.prototype.step=function(dt){
    this.t+=dt;
    this.vx=this.A+this.B*Math.sin(this.C*this.t+this.D);
    this.vy=this.E+this.F*Math.sin(this.G*this.t+this.H);

    this.x+=this.vx*dt;
    this.y+=this.vy*dt;
    if(this.y>Game.height || this.x<-this.w || this.x>Game.width){
        this.board.remove(this);
    }
};

Enemy.prototype.draw=function(ctx){
    SpriteSheet.draw(ctx,this.sprite,this.x,this.y);
}

var playGame=function(){
    var board=new GameBoard();
    board.add(new Enemy(enemies.basic));
    board.add(new Enemy(enemies.basic,{x:200}));
    board.add(new PlayerShip());
    Game.setBoard(3,board);
};

window.addEventListener('load',function(){
    Game.initialize(this.document.getElementById('game'),sprites,startGame);
},false);