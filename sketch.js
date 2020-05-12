var ball;
var database;
var position;
var smoke;
var tra = [];
var position = [];

function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(400,400);
    
    ball = createSprite(200,200,10,10);
    ball.shapeColor = "black";
    var ballref = database.ref('ball/position');
    ballref.on("value",readPosition,showError);

    smoke = loadImage("smoke.png");

    position.push(ball.position.x, ball.position.y,ball.x,ball.y)
    tra.push(position);
    console.log(tra);
    console.log(position);
}

function draw(){
    background(255);
   ball.x = mouseX;
   ball.y = mouseY;

   for (var i = 1; i<tra.length ; i++) {
    
  image(smoke, tra[i][0], tra[i][1]);
  }
    drawSprites();
}

function changePosition(x,y){
    database.ref('ball/position').set({  
        'x':position.x + x,
        'y':position.y + y
    });
}

function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("error connecting to the database");
}

function mouseDragged(){
   
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
}