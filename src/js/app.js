//Global variables
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let speed = 1; 
let canvasWidth = 2000;
let canvasHeight = 600;
let floorYPos = canvas.height;
//globals
let interval;

let images = {
    bg :  './src/img/background.png'
};

let characters = {
    character_1 : './src/img/character_run.png'
};

let enemies= {
    enemie_1 : './src/img/enemie.png'
};

let enemie = [];
let frames = 0;
let currentFrame=0;
canvas.width= canvasWidth;
canvas.height = canvasHeight;

//Class
 class Board{
     constructor(){
         this.xPos = 0;
         this.yPos = 0;
         this.width =canvas.width ;
         this.height = canvas.height;
         
         this.gravity = 5;
         this.image = new Image();
         this.image.src = images.bg;
         this.image.onload = this.draw();
        }  
     draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.image, this.xPos, this.yPos, this.width, this.height);
        ctx.drawImage(this.image, this.xPos + this.width, this.yPos, this.width, this.height);
        
     }
 }


 class Character{
     constructor(xPos , yPos , width , height, srcx, srcy, srcw, srch){
        this.xPos = xPos;
        this.yPos  = yPos;
        this.width = width;
        this.height = height;
        this.srcx = srcx;
        this.srcy = srcy;
        this.srcw =srcw;
        this.srch = srch;

        this.life = 3;
        this.speed = 5;

        this.image = new Image();
        this.image.src = characters.character_1;
        this.image.onload = this.draw.bind(this);
     }
     draw(){
        // if (this.yPos< canvas.height - this.height) {
        //     this.yPos += gravity;
        //   }
        // if(this.yPos + this.height < floorYPos){
        //     this.yPos+=gravity;
        // }
        // if(this.yPos + this.height > floorYPos){
        //     this.yPos = floorYPos - this.height;
        // }
          ctx.drawImage(this.image, currentFrame * (217/6), this.srcy, this.srcw, this.srch, this.xPos, this.yPos, this.width, this.height);
     }
     runForward(){
         this.xPos +=20;
        // ctx.drawImage(this.image, currentFrame * (217/6), this.srcy, this.srcw, this.srch, this.xPos, this.yPos, this.width, this.height);
     }
     runBack(){
         this.xPos -=20;
     }

 }
 class Enemie {
     constructor(xPos,yPos,width,height, srcx, srcy, srcw, srch){
         this.xPos = xPos;
         this.yPos = yPos;
         this.width = width;
         this.height = height;

         this.srcx = srcx;
         this.srcy = srcy;
         this.srcw = srcw;
         this.srch = srch;

         this.image = new Image();
         this.image.src = enemies.enemie_1;
         this.image.onload = this.draw();

     }
     draw(){
        ctx.drawImage(this.image, currentFrame * (160/6), this.srcy, this.srcw, this.srch, this.xPos, this.yPos, this.width, this.height);

     }
 }
 //Instances 
 let board = new Board();
 let character = new Character(250,450, 217/6 ,152,0,0, 217/6 , 100);
 let simpleEnemie = new Enemie (350,500, 160/6 ,152,0,0, 160/7 , 100);
 //Main functions
 function start(){
    interval = setInterval(update, 1000 / 60);
    
 }
 function update(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    if(frames % 7 === 0) {
        currentFrame = ++currentFrame % 4;
      }
      frames++;
     board.draw();
     character.draw();
     generateEnemies();
     drawEnemies()
     simpleEnemie.draw();
 }
 function generateEnemies (){
     let times = [200];
     let i = Math.floor(Math.random() * times.length);
     let randomPosX= Math.floor(Math.random()*canvas.width+250);
     if (frames % times[i] !== 0) return;
     let newEnemie = new Enemie (randomPosX, 500, 160/6 ,152,0,0, 160/7 , 100);
     enemie.push(newEnemie);
     
 }
 function drawEnemies(){
     enemie.forEach(enemie =>{
         enemie.draw();
     });
 }
 addEventListener("keydown" , e =>{
     switch(e.which){
         case  39:
             character.runForward();
             board.xPos -=20;
             break;
        case 37:
            character.runBack();
           // character.xPos  -=20;
            board.xPos +=20;
            break;
        case 38:

            character.yPos -=20;
            break;
        case 40:
                character.yPos +=20;   
                break; 
        default:
            break;

     }
 });

 start();