
//Global variables
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let speed = 1; 
let canvasWidth = 1200;
let canvasHeight = 600;
let floorYPos = canvas.height;
//globals
let interval;
let gravity = 1;

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
let enemyCurrentFrame=0;
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
        if(this.yPos <= 480) {
            this.yPos += gravity;
        }
          ctx.drawImage(this.image, currentFrame * (217/6), this.srcy, this.srcw, this.srch, this.xPos, this.yPos, this.width, this.height);
     }
     runForward(){
         this.xPos +=20;
     }
     runBack(){
         this.xPos -=20;
     }
     checkIfTouch(enemie){
        return (
            this.xPos < enemie.xPos + enemie.width &&
            this.xPos + this.width > enemie.x &&
            this.yPos < enemie.y + enemie.height &&
            this.yPos + this.height > enemie.y
          );
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
        ctx.drawImage(this.image, enemyCurrentFrame * (176/7), this.srcy, this.srcw, this.srch, this.xPos, this.yPos, this.width, this.height);

     }
     move(){
         this.xPos -=.5;
     }
 }
 //Instances 
 let board = new Board();
 let character = new Character(250,450, 217/6 ,152,0,0, 217/6 , 100);

 //Main functions
 function start(){
    interval = setInterval(update, 1000 / 60);
    
 }
 function update(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    if(frames % 7 === 0) {
        currentFrame = ++currentFrame % 4;
    }
    if(frames % 17 === 0) {
        enemyCurrentFrame = ++enemyCurrentFrame % 7;
    }
      frames++;
     board.draw();
     character.draw();
     generateEnemies();
     drawEnemies();
     checkColliton();
 }

 function generateEnemies (){

    let times = [200];
    let i = Math.floor(Math.random() * times.length);
     if (frames % times[i] !== 0) return;

    
     let randomPosX= Math.floor(Math.random()*canvas.width);
     if(frames % 50 == 0){
        let newEnemie = new Enemie (randomPosX, 500, 160/6 ,200,0,0, 160/7 , 100);
        enemie.push(newEnemie);
     }
    
    //  if (this.frames % 50 == 0) {
    //     this.enemies.push(new Unit(this.width, this.floorYPos - 20, 20, 20, koopa, 3))
    // }


     
 }
 function drawEnemies(){
     enemie.forEach(enemie =>{
         enemie.draw();
         enemie.move();
     });
 }

 function gameOver(){
    Swal.fire('Game over');
 }

 function checkColliton(){
     enemie.forEach(enemies =>{
         console.log(enemies);
         if(character.checkIfTouch(enemies)){
             gameOver();
         }
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