var square, squareImg;
var bullet, bulletImg, bulletGroup, bulletSound;
var wall1, wall2, Background, backgroundImg;
var score = 0;
var enemy1Image, enemy2Image, enemy3Image, enemy1;
var life = 3, lifeImg, life1, life2, life3;

function preload(){

    bulletImg = loadImage("Bullet0.png");
    bulletSound = loadSound("bullet_Sound.mp3")

    backgroundImg = loadImage("Space0.jpg");

    squareImg = loadImage("Cube0.png");

    enemy1Image = loadAnimation("Alien10.png");
    enemy2Image = loadAnimation("Alien20.png");
    enemy3Image = loadAnimation("Alien30.png");

    lifeImg = loadImage("Lives0.png");

}

function setup(){

    createCanvas(windowWidth, windowHeight);

    Background = createSprite(windowWidth/2, windowHeight/2, 100, 100);
    Background.addImage(backgroundImg);
    Background.scale = 1.5;

    square = createSprite(200, 300, 15, 15);
    square.addImage(squareImg);
    square.scale=0.1;

    enemy1 = createSprite(windowWidth-50, windowHeight/2, 5, 5);
    enemy1.addAnimation("enemy1", enemy1Image);
    enemy1.addAnimation("enemy2", enemy2Image);
    enemy1.addAnimation("enemy3", enemy3Image);
    
    wall1 = createSprite(750, 0, 1500, 50);
    wall1.shapeColor="yellow";

    wall2 = createSprite(750, windowHeight, 1500, 50);
    wall2.shapeColor="yellow";

    life1 = createSprite(windowWidth*3/4, 15, 5, 5);
    life1.addImage(lifeImg);
    life1.scale = 0.05;

    life2 = createSprite(windowWidth*3/4+40, 15, 5, 5);
    life2.addImage(lifeImg);
    life2.scale = 0.05;

    life3 = createSprite(windowWidth*3/4+80, 15, 5, 5);
    life3.addImage(lifeImg);
    life3.scale = 0.05;

    bulletGroup = new Group();

}

function draw(){

    background(255);

    if(keyDown("up_arrow")){

        square.velocityY = -5;

    }

    if(keyDown("down_arrow")){

        square.velocityY = 5;

    }

    if(frameCount%30 === 0&& life!=0){

        enemy1.y = Math.round(random(60, windowHeight-60));

    }    

    square.collide(wall1);
    square.collide(wall2);

    if(score >= 100&&score <= 200){

        enemy1.changeAnimation("enemy2", enemy2Image);
        enemy1.scale = 0.75;

    }else if(score >= 200 && score <= 300){

        enemy1.changeAnimation("enemy3", enemy3Image);
        enemy1.scale = 0.80;

    }
    
    for(var i = 0;i<bulletGroup.length;i++){

        if(bulletGroup[i].isTouching(square)){

            bulletGroup[i].lifetime = 0;

            life = life-1;

        }

        if(bulletGroup[i].x<180){

            score = score+10;

            bulletGroup[i].lifetime = 0;

        }

    }

    drawSprites();

    if(life === 2){

        life3.destroy();

    }else if(life === 1){

        life2.destroy();

    }else if(life === 0){

        life1.destroy();

        square.velocityY = 0;

        bulletGroup.setVelocityXEach(0);
        
        fill("red")
        strokeWeight(5)
        stroke("white")
        textSize(50)
        text("Game Over", windowWidth/2-100, windowHeight/2);

    }

    textSize(30)
    fill("red");
    text("Score : "+score, windowWidth/2, 25);

    if(life!=0){

        Bullet();

    }

}

function Bullet(){

    if(frameCount%30 === 0){

        bullet = createSprite(windowWidth-50, enemy1.y, 5, 5);
        bullet.addImage(bulletImg);
        bulletSound.play();
        bullet.scale = 0.05;
        bullet.velocityX = -(5+score/100);


        bullet.lifetime = windowWidth/5;

        bulletGroup.add(bullet);

    }

}