//Config 
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let speed = 1; 
let canvasWidth = 2000;
let canvasHeight = 600;
//globals
let interval;
let images = {
    bg :  './src/img/background.png'
};

let frames = 0;
canvas.width= canvasWidth;
canvas.height = canvasHeight;

//Class
 class Board{
     constructor(){
         this.xPos = 0;
         this.yPos = 0;
         this.width =canvas.width ;
         this.height = canvas.height;
         this.image = new Image();

         this.image.src = images.bg;
         this.image.onload = this.draw.bind(this);
        }  
     draw(){
         console.log(images);
         console.log("Draw image");
         ctx.drawImage(this.image, this.xPos, this.yPos , this.width, this.height);

    }
 }

 //Instances 
 let board = new Board();

 //Main functions
 function start(){
    interval = setInterval(update, 1000 / 60);
    
 }
 function update(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
     board.draw();
 }

 start();