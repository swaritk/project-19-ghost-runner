var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisiblesBlocksGroup, invisibleBlock;
var gameState = "play";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300, 300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.25;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisiblesBlocksGroup = new Group();

}
function spawnDoor() {
  if (frameCount%100 == 0) {
    door = createSprite(random(50,450), 0);
    door.addImage(doorImg);
    door.scale = 0.8;
    door.velocityY = 3;

    climber = createSprite(0, 50);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.scale = 0.7
    climber.velocityY = 3;

    invisibleBlock = createSprite(0, 65,60,8);
    invisibleBlock.x = door.x;
    invisibleBlock.scale = 0.7
    invisibleBlock.velocityY = 3;
    invisibleBlock.visible = false;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisiblesBlocksGroup.add(invisibleBlock);

    ghost.depth = door.depth;
    ghost.depth += 1;
  }
}

function draw() {
  background(0);

if(gameState == "play"){
  spawnDoor();
  if (keyDown("space")) {
    ghost.velocityY = -11;
  }

  if(keyDown("left")&&ghost.x>50){
    ghost.x -=5;
  }
  if(keyDown("right")&&ghost.x<550){
    ghost.x +=5;
  }          
  ghost.velocityY = ghost.velocityY + 0.5;
  if (tower.y > 400) {
    tower.y = 300;
  }
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisiblesBlocksGroup.isTouching(ghost)|| ghost.y>600){
    ghost.destroy();
    gameState = "end"
  }
  drawSprites();
} else if(gameState =="end"){
  text("Game Over",230,250);
}
}