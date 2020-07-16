var characterImage,monsterImage,villainImage;
var character,monster,villain;
var villainsGroup;
var score=0;
var border;
var door;
var gameState="level1"
var bulletcount=0;
var monsterBullet;
var monsterBulletcount=0;
var bullet;

function preload(){
  characterImage=loadImage("character.jpg");
  monsterImage=loadImage("monster.png");
  villainImage=loadImage("villain.png");
  aimImage=loadImage("aim.png");
}
function setup() {
  createCanvas(800,400);
  character=createSprite(400,350,10,10);
  character.addImage(characterImage);
  border=createSprite(400,390,800,10);
  border.visible=false;

  aim=createSprite(100,40,10,10);
  aim.addImage(aimImage);
  aim.scale=0.1;
  bullet=createSprite(12000,800);
  monsterBullet=createSprite(12000,800);
  villainsGroup=new Group();

  door=createSprite(750,100,100,200);
  door.visible=false;

  monster=createSprite(400,100,10,10);
  monster.addImage(monsterImage);
  monster.visible=false;
  monster.scale=0.5;

}

function draw() {
  background(255,255,255);
  text("score: "+score,50,50);
  

  aim.x=character.x+140;
  aim.y=character.y-25;
  if(keyDown("space")){
    bullet=createSprite(10,10,10,50);
    bullet.x=aim.x;
    bullet.y=aim.y;
    bullet.velocityX=2;
    bullet.velocityY=-2;
    bullet.shapeColor="blue";
  }
  if(keyDown("a")){
    character.x=character.x-2;

  }
  if(keyDown("d")){
    character.x=character.x+2;

  }
  if(keyDown("s")){
    character.y=character.y+2;

  }
  if(keyDown("w")){
    character.y=character.y-2;


  }
  if(gameState==="level1"){

  
  for (var i = 0; i < villainsGroup.maxDepth(); i++)
   { if (villainsGroup.get(i)!=null&&villainsGroup.isTouching (bullet))
     { villainsGroup.get(i).destroy();
      score=score+10;
     }
     }
     if(villainsGroup.isTouching(border)){
      gameState="lost";
     }
     if(score===100){
       door.visible=true;
     }
     if(score>=100&&character.isTouching(door)){
       gameState="level2"
     }
    
  spawnVillains();
    }
    else if(gameState==="level2"){
      villainsGroup.destroyEach();
      door.visible=false;
      monster.visible=true;
      if(monster.isTouching(bullet)){
        bulletcount+=1;
        console.log(bulletcount);
        bullet.destroy();
        
      }
      if(bulletcount===50){
        monster.destroy();
        gameState="win";
      }
      if(frameCount%20===0){
        monsterBullet=createSprite(350,150,40,10);
        monsterBullet.velocityX=Math.round(random (3,-3));
        monsterBullet.velocityY=Math.round(random (3,-3));
        monsterBullet.shapeColor="red"
  
      }
      if(character.isTouching(monsterBullet)){
        monsterBulletcount+=1;
        console.log(monsterBulletcount);
        monsterBullet.destroy();
        
      }
      if(monsterBulletcount===25){
        character.destroy();
        gameState="lost";
      }
     
      
    }
    else if(gameState==="lost"){
      character.destroy();
      villainsGroup.destroyEach();
      aim.destroy();
      textSize(20);
      text("You Lost",400,200);
      door.visible=false;
      monster.visible=false;
      



    }
    else if(gameState==="win"){
      textSize(20);
      text("You win",400,200);
    }
  drawSprites();
}
function spawnVillains() {
  if(frameCount % 60 === 0) {
    var villain = createSprite(400,0,10,40);
    villain.velocityY = +1;
  villain.x=Math.round(random(400,750));
villain.addImage(villainImage);
villainsGroup.add(villain);
if(score>=50){
  villain.scale=0.2;
  
}
else{
  villain.scale = 0.1;
}

    
    //assign scale and lifetime to the obstacle           
    
    
    //add each obstacle to the group
    
  }
}