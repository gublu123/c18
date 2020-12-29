
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  //creating monkey
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  //creating ground
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX  = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
   //create Obstacle and Bananas groups
  obstaclesGroup = createGroup();
  bananasGroup = createGroup();
  
}


function draw() {
  background(255)
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score , 500, 50 );
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: " + survivalTime, 100, 50);
  
  if(ground.x<0)
    {
      ground.x = ground.width/2;
    }
  
  if(keyDown("space"))
    {
      monkey.velocityY = -12;
    }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
   //spawn the bananas
    spawnBananas();
  
    //spawn obstacles on the ground
    spawnObstacles();
  
  drawSprites();
  
} 

function spawnBananas()
{
  if(frameCount % 80 === 0)
  {
    var banana = createSprite(600,120,40,10);
    banana.y =  Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    // add each banana to the group
    bananasGroup.add(banana);
  }
}

function spawnObstacles()
{
  if(frameCount % 300 === 0)
    {
      var obstacle = createSprite(600,120,40,10);
      obstacle.velocityX  = -(6 + score/100);
      
      //generate random obstacles
      var rand = Math.round(random(1, 6));
      switch(rand)
        {
          case 1: obstacle.addImage(obstacle);
            break;
            
            default: break;
        }
      //assign scale and lifetime to the obstacle
      obstacle.scale = 0.5;
      obstacle.lifetime = 300;
      
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
}