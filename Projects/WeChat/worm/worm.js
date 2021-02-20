export default class Worm{
    constructor(head,unit){
        this.unit=unit;
        this.worm=[
            [head[0],head[1]],
            [head[0],head[1]+this.unit],
            [head[0],head[1]+this.unit*2]
        ];
        this.head=this.head.bind(this);
        this.direction="up";
    }

    draw(ctx){
        ctx.fillStyle="#FFFFFF";
        this.worm.forEach(b=>{
            ctx.fillRect(b[0],b[1],this.unit,this.unit);
        })
    }

    //returns the location of the worms head
    head(){
        return [this.worm[0][0],this.worm[0][1]];
    }

    getDirction(){
        return this.direction;
    }

    setDirection(dir){
        this.direction=dir;
    }

    /*
    * detemines where to draw worms head next
    * if grow is true the tail block isnt 
    * removed so the worm grows by 1 block.
    * Also checks if worm crashed into itself
    */
    move(grow){
        let newHead=this.head();
        switch(this.direction){
            case "up":
                newHead[1]=newHead[1]-this.unit;
                break;
            case "down":
                newHead[1]=newHead[1]+this.unit;
                break;
            case "right":
                newHead[1]=newHead[0]+this.unit;
                break;
            case "left":
                newHead[1]=newHead[0]-this.unit;
                break;
        }

        if(!grow){
            this.worm.pop();
        }

        let crashed=false;
        //check crash
        this.worm.forEach(seg=>{
            if(seg[0]==newHead[0] && seg[1]==newHead[1]){
                crashed=true;
            }            
        });

        this.worm.unshift(newHead);
        return crashed;
    }
}