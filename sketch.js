var mc,mc_run,diamond,diamondimg,ground,groundimg,lava;
var lavaimg,score,invisibleground;
var lavagroup,diamondgroup;
var PLAY , END , gameState;
var end, endtext, etx, ety, ets;

function preload(){
  groundimg=loadImage("ground.jpg");
  
  mc_run=loadImage("steve_run.png");
  
  diamondimg=loadImage("diamond.png");
  lavaimg=loadImage("lava.png");
   
}

function setup() {
  createCanvas(800, 400);
  
  ground= createSprite(600,400,800,500);
  ground.addImage("ground", groundimg);
  ground.x = ground.width/2;
  ground.scale = 1.9;
  
  invisibleground=createSprite(400,350,800,10);
  invisibleground.visible = false;  

  mc= createSprite(50,330,20,20);
  mc.addImage("mc",mc_run);
  mc.scale=0.1;
  
  lavagroup = new Group();
  diamondgroup = new Group ();
  
  score = 0; 
  PLAY = 1; 
  END = 0; 

  endtext = "GAME START"
  
  gameState = PLAY ; 
  
  ets = 18;
  etx = 200;
  ety = 600;
}

function draw() {
  background(0);
  
  
 
  if(keyDown("space")&&mc.y>=168){
  mc.velocityY=-10; 
}
  ground.velocityX = -6; 
  
  fruit();
  lava();

  camera.y = mc.y
  
  if(ground.x<200){
  ground.x = ground.width/2;
  
}
 mc.velocityY=mc.velocityY+0.8;
  mc.collide(invisibleground);

  
  
 if(mc.isTouching(diamondgroup)){
   diamondgroup.destroyEach();
   score = score +1;
  
 }
  if(mc.isTouching(lavagroup)){
    gameState = END
  }

  if(gameState===0){
    endtext = "GAME OVER"
    etx = 400;
    ety = 300;
    ets = 30;
    end = createSprite(400,200,1000,1000);
    end.shapeColor = "black";
    fill("white");
    textSize(25);
    
  }

  
  

  drawSprites();
    fill("white");
    textSize(18);
    text("Score "+score,600,500);
    textSize(ets);
    text(endtext, etx, ety);
 
  
  
}
 

 
function fruit(){
  if(frameCount%50===0){
    diamond=createSprite(600,290,30,10);
    diamond.scale=0.1;
    diamond.velocityX=-4;
    diamond.y = Math.round(random(250,350));
    diamond.addImage(diamondimg);
    diamond.lifetime=200;
    diamondgroup.add(diamond);
}
}
 function lava(){
   if(frameCount%100===0){
    var stone =createSprite(800,354,10,40);
    stone.addImage(lavaimg);
    stone.velocityX = - (6 + 2*score/100);
    stone.scale=0.2;
    stone.lifetime=400;
    
  lavagroup.add(stone);
  }
 }