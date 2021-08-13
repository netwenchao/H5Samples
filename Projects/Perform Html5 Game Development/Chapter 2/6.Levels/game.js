var sprites={
    ship:{sx:0,sy:0,w:39,h:42,frames:1},
    missle:{sx:0,sy:30,w:2,h:10,frames:1},
    enemy_purple:{sx:37,sy:0,w:42,h:43,frames:1},
    enemy_bee:{sx:79,sy:0,w:37,h:143,frames:1},
    enemy_ship:{sx:116,sy:0,w:42,h:43,frames:1},
    enemy_circle:{sx:158,sy:0,w:32,h:33,frames:1},
    explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }
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

var WinGame=function(){
    Game.setBoard(3,new TitleScreen('You Win!','Press file to play again!',playGame));
};

var LoseGame=function(){
    Game.setBoard(3,new TitleScreen('You Lose!','Press file to play again!',playGame));
};

var OBJECT_PLAYER = 1,
    OBJECT_PLAYER_PROJECTILE = 2,
    OBJECT_ENEMY = 4,
    OBJECT_ENEMY_PROJECTILE = 8,
    OBJECT_POWERUP = 16;

var PlayerShip=function(){
    this.setup('ship',{ vx: 0, frame: 1, reloadTime: 0.25, maxVel: 200 });
    this.x=Game.width/2;
    this.y=Game.height-10-this.h;
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
            this.board.add(new PlayerMissile(this.x,this.y+this.h/2));
            this.board.add(new PlayerMissile(this.x+this.w,this.y+this.h/2));
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
PlayerShip.prototype=new Sprite();
PlayerShip.type=OBJECT_PLAYER;
PlayerShip.prototype.hit=function(){
    if(this.board.remove(this)){
        LoseGame();
    }
};

var PlayerMissile=function(x,y){
    this.setup('missle',{vy:-700,damage:10});
    //put center at x
    this.x=x||0-this.w/2;
    //put bottom at y
    this.y=y||0+this.h;
};
PlayerMissile.prototype=new Sprite();

PlayerMissile.prototype.step=function(dt){
    this.y+=dt*this.vy;
    var collision=this.board.collide(this,OBJECT_ENEMY);
    if(collision){
        this.board.remove(this);
        collision.hit(this.damage);
    }else if(this.y<this.h){
        this.board.remove(this);
    }
};

PlayerMissile.prototype.draw=function(ctx){
    SpriteSheet.draw(ctx,'missle',this.x,this.y);
};
PlayerMissile.prototype.type=OBJECT_PLAYER_PROJECTILE;

var enemies={
    straight: { x: 0, y: -50, sprite: 'enemy_ship', health: 10,E: 100 },
    ltr: { x: 0, y: -100, sprite: 'enemy_purple', health: 10,B: 200, C: 1, E: 200 },
    circle: { x: 400, y: -50, sprite: 'enemy_circle', health: 10,A: 0, B: -200, C: 1, E: 20, F: 200, G: 1, H: Math.PI/2 },
    wiggle: { x: 100, y: -50, sprite: 'enemy_bee', health: 20,B: 100, C: 4, E: 100 },
    step: { x: 0, y: -50, sprite: 'enemy_circle', health: 10,B: 300, C: 1.5, E: 60 },
    basic:{x:100,y:-50,sprite: 'enemy_purple', B: 100, C: 2 , E: 100,health: 20},
};

var level1=[
    // Start, End, Gap, Type, Override
    [ 0, 4000, 500, 'step' ],
    [ 6000, 13000, 800, 'ltr' ],
    [ 12000, 16000, 400, 'circle' ],
    [ 18200, 20000, 500, 'straight', { x: 150 } ],
    [ 18200, 20000, 500, 'straight', { x: 100 } ],
    [ 18400, 20000, 500, 'straight', { x: 200 } ],
    [ 22000, 25000, 400, 'wiggle', { x: 300 }],
    [ 22000, 25000, 400, 'wiggle', { x: 200 }]
];

var Enemy=function(bluePrint,overide){
    this.merge(this.baseParameters);
    this.setup(bluePrint.sprite,bluePrint);
    this.merge(overide);
};
Enemy.prototype=new Sprite();
Enemy.prototype.baseParameters={
    A:0,B:0,C:0,D:0,
    E:0,F:0,G:0,H:0,
    t:0
};
Enemy.prototype.step=function(dt){
    this.t+=dt;
    this.vx=this.A+this.B*Math.sin(this.C*this.t+this.D);
    this.vy=this.E+this.F*Math.sin(this.G*this.t+this.H);

    this.x+=this.vx*dt;
    this.y+=this.vy*dt;

    var collision=this.board.collide(this,OBJECT_PLAYER);
    if(collision){
        collision.hit(this.damage);
        this.board.remove(this);
    }
    else if(this.y>Game.height || this.x<-this.w || this.x>Game.width){
        this.board.remove(this);
    }
};

Enemy.prototype.draw=function(ctx){
    SpriteSheet.draw(ctx,this.sprite,this.x,this.y);
};
Enemy.prototype.hit=function(damage){
    this.health-=damage;
    if(this.health<=0){
        this.board.remove(this);
        this.board.add(new Explosion(this.x+this.w/2,this.y+this.h/2));
    }
};
Enemy.prototype.type=OBJECT_ENEMY;

var Explosion=function(x,y){
    this.setup('explosion',{frame:0});
    this.x=x-this.w/2;
    this.y=y-this.h/2;
    this.subFrame=0;
};
Explosion.prototype=new Sprite();
Explosion.prototype.step=function(dt){
    this.frame = Math.floor(this.subFrame++ / 3);
    if(this.subFrame >= 36) {
        this.board.remove(this);
    }
};

var Level=function(levelData,callback){
    this.levelData=[];
    for(var i=0;i<levelData.length;i++){
        this.levelData.push(Object.create(levelData[i]));
    }
    this.t=0;
    this.callback=callback;
};

Level.prototype.step=function(dt){
    var idx=0,curShip=null,remove=[];
    this.t+=dt*1000;
    while((curShip=this.levelData[idx]) && (curShip[0] < this.t + 2000)){
        // Check if past the end time
        if(this.t > curShip[1]) {
            // If so, remove the entry
            remove.push(curShip);
        } else if(curShip[0] < this.t) {
            // Get the enemy definition blueprint
            var enemy = enemies[curShip[3]],
            override = curShip[4];
            // Add a new enemy with the blueprint and override
            this.board.add(new Enemy(enemy,override));
            // Increment the start time by the gap
            curShip[0] += curShip[2];
        }
        idx++;
    }
};
Level.prototype.draw=function(ctx){};

var playGame=function(){
    var board=new GameBoard();
    board.add(new Level(level1,WinGame));
    board.add(new PlayerShip());
    Game.setBoard(3,board);
};

window.addEventListener('load',function(){
    Game.initialize(this.document.getElementById('game'),sprites,startGame);
},false);