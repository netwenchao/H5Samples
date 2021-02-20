class Vector2{
    constructor(x,y){
        this.x=x||0;
        this.y=y||0;
    }

    add(diff){
        this.x+=diff.x;
        this.y+=diff.y;
    }

    ride(rate){
        return {
            x:this.x*rate,
            y:this.y*rate
        };
    }
};
Vector2.zero=new Vector2();

var KeyInput={
    GoLeft:0,
    GoRight:1,
    GoDown:2,
    Jump:3,
    Count:4
};

var CharacterState={
    Stand:0,
    Walk:1,
    Jump:2,
    GrabLedge:3
};

class AABB{
    constructor(vCenter,vHalfSize){
        this.center=vCenter;
        this.halfSize=vHalfSize;
    }

    Overlaps(other){
        if(Math.abs(this.center.x-other.x)> halfSize.x+other.halfSize.x) return false;
        if(Math.abs(this.center.y-other.y)> halfSize.y+other.halfSize.y) return false;
        return true;
    };
}

class MovingObject extends AABB{
    constructor(){
        this.oldPos=null;
        this.pos=null;
        this.oldSpeed=null;
        this.speed=null;
        this.scale=null;
        this.mAABB=null;
        this.mAABBOffset=null;

        //position states
        this.mPushedRightWall=null;
        this.mPushesRightWall=null;

        this.mPushedLeftWall=null;
        this.mPushesLeftWall=null;

        this.mWasOnGround=null;
        this.mOnGround=null;

        this.mWasAtCeiling;
        this.mAtCeiling;
    }

    updatePhysics(delta){
        this.oldPos=this.pos;
        this.oldSpeed=this.speed;

        this.mWasOnGround=this.mOnGround;
        this.mPushedLeftWall=this.mPushesLeftWall;
        this.mPushedRightWall=this.mPushesRightWall;
        this.mWasAtCeiling=this.mAtCeiling;

        this.pos.add(this.speed.ride(delta));

        if(this.pos.y<=0){
            this.pos.y=0;
            this.mOnGround=true;
        }else{
            this.mOnGround=false;
        }

        this.center=pos.add(this.mAABBOffset);
    };
};

class Character extends MovingObject{
    constructor(){
        this.jumpSpeed=0;
        this.walkSpeed=0;
        this.state=CharacterState.Stand;
    };
};