// creating constant for Engine,World,Bodies and Constraint
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

// creating variables for engine and world
var engine, world;
// creating variables for obstacles
var box1,box2,box3,box4,box5;
var log1,log2,log3,log4;
// creating variables for enemies
var pig1,pig2,pig3;
// creating variables for backgroung image, ground and platform
var backgroundImg,platform,ground;
// creating variables for bird and the slingshot
var bird, slingshot;

// creating variable for holding the game state
var gameState = "onSling";

var score = 0, birdCount = 5;

function preload() {
    // loading the background image

    backgroundImg = loadImage("sprites/Lighthouse.jpg");
    chanceImg = loadImage("sprites/pig2.png");
}

function setup(){
    var canvas = createCanvas(1350,400);
    // creating the physics engine
    engine = Engine.create();
    // creating the world
    world = engine.world;

    // creating the ground and platform
    ground = new Ground(650,height,2000,20);
    platform = new Ground(150, 305, 300, 170);

    // creating the obstacles
    box1 = new Box(600,390,70,70);
    box2 = new Box(800,390,70,70);
    box3 = new Box(600,230,70,70);
    box4 = new Box(800,230,70,70);
    box5 = new Box(630,120,70,70);

    log1 = new Log(700,280,270,PI/2);
    log2 = new Log(700,180,270,PI/2);
    log3 = new Log(750,80,70,PI);
    log4 = new Log(675,55,170,PI/2);

    // creating the enemies
    pig1 = new Pig(700,380);
    pig2 = new Pig(700,160);
    pig3 = new Pig(670,190);
    pig4 = new Pig(720,180)

    // creating the bird and slingshot
    bird = new Bird(200,50);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
    //log6 = new Log(230,180,80, PI/2);
    
}

function draw(){
    // to stop the redrawwing of objects
    background(backgroundImg);
    noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-190, 50)
        text("x "+birdCount,width-340, 55);
    // running the physics engine 
    Engine.update(engine);
    //strokeWeight(4);

    // showing the obstacles,enemies,bird,slingshot,ground and the platform in the screen
    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();

    log1.display();
    log2.display();
    log3.display();
    log4.display();

    pig1.display();
    pig2.display();
    pig3.display();
    pig4.display();
    pig1.score();
    pig2.score();
    pig3.score();
    pig4.score();

    bird.display();

    platform.display();
    ground.display();
   
    
    slingshot.display();    
    image(chanceImg, width-400, 10,70,70);
    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    
}

function keyPressed(){
    if(keyCode === 32 && birdCount != 0){
        bird.trajectory = [];
        slingshot.attach(bird.body);
        Matter.Body.setPosition(bird.body, {x:200, y:50});
        birdCount--
    }
}