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

var GameBoard=function(){
    var board=this;
    this.objects=[];
    this.cnts=[];
    this.removed=[];
    this.add=function(obj){
        if(obj){
            obj.board=this;
            this.objects.push(obj);
            this.cnts[obj.type]=(this.cnts[obj.type]||0)+1;
        }
        return obj;
    };

    this.remove=function(obj){
        this.removed.push(obj);
    };

    this.resetRemoved=function(){
        this.removed=[];
    };

    this.finalizeRemoved=function(){
        for(var i=0,len=this.removed.length;i<len;i++){
            var idx=this.objects.indexOf(this.removed[i]);
            if(idx!=-1){
                this.cnts[this.removed[i].type]--;
                this.objects.splice(idx,1);
            }
        }
    };

    this.iterate=function(funName){
        var args=Array.prototype.splice.call(arguments,1);
        for(var i=0,len=this.objects.length;i<len;i++){
            var obj=this.objects[i];
            try{
                obj[funName].apply(obj,args);
            }
            catch(e){
                debugger;
            }
        }
    };

    this.detect=function(func){
        var args=Array.prototype.splice.call(arguments,1);
        for(var i=0,len=this.objects.length;i<len;i++){
            var obj=this.objects[i];
            if(func.call(obj)) return obj;
        }
        return false;
    };
    
    // Call step on all objects and them delete
    // any object that have been marked for removal
    this.step=function(dt){
        this.resetRemoved();
        this.iterate('step',dt);
        this.finalizeRemoved();
    };

    //draw objects
    this.draw=function(ctx){
        this.iterate('draw',ctx);
    };

    // Check for a collision between the 
    // bounding rects of two objects
    this.overlap=function(o1,o2){
        return !((o1.y+o1.h-1<o2.y)  || (o1.y>o2.y+o2.h)
        ||(o1.x+o1.w-1<o2.x) ||(o1.x>o2.x+o2.w-1) 
        );
    };

    // Find the first object that collides with obj
    // match against an optional type
    this.collide=function(obj,type){
        return this.detect(function(){
            if(obj!=this){
                return ((!type || this.type && type) && board.overlap(obj,this))?this:false
            }
        });
    };

};

var Sprite=function(){}
Sprite.prototype.setup=function(sprite,props){
    this.sprite=sprite;
    this.merge(props);
    this.frame=this.frame||0;
    this.w=SpriteSheet.map[sprite].w;
    this.h=SpriteSheet.map[sprite].h;
};

Sprite.prototype.merge=function(props){
    if(props){
        for(var prop in props){
            this[prop]=props[prop];
        }
    }
};

Sprite.prototype.draw=function(ctx){
    SpriteSheet.draw(ctx,this.sprite,this.x,this.y);
};

Sprite.prototype.hit=function(){
    this.board.remove(this);
};