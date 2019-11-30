
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

let enemiesTypes= {
    enemie_1 : './src/img/enemie.png'
};

let coins ={
    coin_1 : './src/img/coin.png'
};

let enemies = [];
let coinsArray = [];
let frames = 0;
let currentFrame=0;
let enemyCurrentFrame=0;
let coinCurrentFrame = 0;
let totalCoins = 0 ;
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
        this.score = 0;

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
        if (this.xPos + this.width > enemie.xPos && enemie.xPos + enemie.width > this.xPos && this.yPos < enemie.yPos + enemie.height && this.yPos + this.height > enemie.yPos) {
            
            return true;
        }
       
        return false;


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
         this.image.src = enemiesTypes.enemie_1;
         this.image.onload = this.draw();

     }
     draw(){
        ctx.drawImage(this.image, enemyCurrentFrame * (176/7), this.srcy, this.srcw, this.srch, this.xPos, this.yPos, this.width, this.height);
     }
     move(){
         this.xPos -=.5;
     }
 }
 class Coin {
    constructor(xPos,yPos,width,height){
    //constructor(xPos,yPos,width,height, srcx, srcy, srcw, srch){
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
        this.markedForDeletion = false;
        // this.srcx = srcx;
        // this.srcy = srcy;
        // this.srcw = srcw;
        // this.srch = srch;

        this.image = new Image();
        this.image.src = coins.coin_1;
        this.image.onload = this.draw();

    }
    draw(){
        ctx.drawImage(this.image, this.xPos, this.yPos , this.width, this.height)
       //ctx.drawImage(this.image, coinCurrentFrame * (613/10), this.srcy, this.srcw, this.srch, this.xPos, this.yPos, this.width, this.height);

    }
    delete(){
        this.image.enabled=false;
        //console.log("Inside delete"+ this)
        ctx.clearRect(this.image, this.xPos,this.yPos, this.width , this.height);

    }
 
}
 //Instances 
 let board = new Board();   
 let character = new Character(250,450, 217/6*1.5 ,69,0,0, 217/6 , 46);
 //let coin = new Coin          (100, 200, 613/10 , 70,0, 0 ,613/10 ,65);
 
 //Main functions
 function start(){
    interval = setInterval(update, 1000 / 60);
    
 }
 function update(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    if(frames % 7 === 0) {
        currentFrame = ++currentFrame % 4;
    }
    if(frames % 7 === 0) {
        enemyCurrentFrame = ++enemyCurrentFrame % 7;
        generateEnemies();
    }
    
    frames++;
     board.draw();
     character.draw();
     drawEnemies();
     checkColliton();
         
    //if(frames % 5 === 0) {
      //  coinCurrentFrame = ++coinCurrentFrame % 5;
      //  coin.draw();
      generateCoins();
      drawCoins();
      sumCoins();

    //}  
 }

 function generateEnemies (){
     let randomNumber = Math.floor(Math.random() * 5) + 0;
     let aleatoryNumber = 250;
    
        switch (randomNumber){
        case 0:
            aleatoryNumber = 150.50;
            drawRandom(aleatoryNumber);
            break;
        case 1:
            aleatoryNumber = 750;
            drawRandom(aleatoryNumber);
            break;
        
        case 2:
            aleatoryNumber = 50;
            drawRandom(aleatoryNumber);
            break;
        case 3:
            aleatoryNumber = 50;
            drawRandom(aleatoryNumber);
            break;    
        }
 }
 function drawRandom(aleatoryNumber){
    if(frames % aleatoryNumber == 0){
        let newEnemie = new Enemie (canvas.width, 500, 176/7*2 ,52,0,0, 160/7, 26);
        enemies.push(newEnemie);
    
    }
 }
 function drawEnemies(){
     enemies.forEach(enemie =>{
         enemie.draw();
         enemie.move();
     });
 }

 function gameOver(){
    Swal.fire('Game over');
    clearInterval(interval);
    
 }

 function checkColliton(){
     enemies.forEach(enemie =>{
         if(character.checkIfTouch(enemie)){
             gameOver();
         }
     });
 }

 function generateCoins(){
    var myNumber = Math.floor(Math.random()*canvas.width);
    myNumber = myNumber *30 + 15;
    
 let posX = Math.floor(Math.random() * canvas.width)+ character.xPos;
 let times = [200];
  let i = Math.floor(Math.random() * times.length);
  if (frames % times[i] !== 0){
    return;
  }else{
    for(let m= 0 ; m <= 5 ; m++){
       //coinsArray.push(new Coin(posX+109,350,109/3,114/3));
    }
    coinsArray.push(new Coin( posX,350,109/3,114/3));

  } 
  
 }

 function drawCoins(){
    coinsArray.forEach(coin =>{
        if(!coin.markedForDeletion){
            coin.draw();
           
        }
        
     });
 }
 function sumCoins(){
   
    coinsArray.forEach(coin =>{
        if(character.checkIfTouch(coin)){
            coin.markedForDeletion = true;
            character.score += .1;
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