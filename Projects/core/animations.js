import Frames from "./frame.js"

export default class Animations{
    constructor(){
        this.anims={};
        this.curAnim=null;
    }

    add(name,frames){
        this.anims[name]=frames;
    }
    
    change(name){
        if(this.exists(name)){
            this.curAnim=this.anims(name);
        }else{
            this.curAnim=null;
        }
    }

    exists(name){
        return this.anims.hasOwnProperty(name);
    }

    getCurrAnim(){
        return this.curAnim;
    }

    update(delta){
        if(this.curAnim){
            this.curAnim.update(delta);
        }
    }

    remove(name){
        this.anims[name] && (delete this.anims[name]);
    }

    clear(){
        this.curAnim=null;
        this.anims={};
    }
}