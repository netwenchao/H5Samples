var canvas=document.getElementById('game');
var ctx=canvas.getContext('2d');
if(ctx){
    startGame();
}else{
    alert('Please upgrade your browser!');
}

function startGame(){
    ctx.fillStyle='#FFFF00';
    ctx.fillRect(50,100,280,400);
    ctx.fillStyle='rgba(0,0,127,0.5)';
    ctx.fillRect(0,50,380,400);

    var img=new Image();
    img.onload=function(){
        //ctx.drawImage(img,100,100,200,200);
        //sx,sy,sw,sh,dx,dy,dw,dh
        ctx.drawImage(img,18,0,18,25,100,100,18,25);
    };
    img.src='images/sprites.png';
}