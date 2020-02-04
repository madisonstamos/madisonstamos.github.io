let playButton;
let playerName;
let canvas;
let greeting;
let startGame = false;
let endGame = false;
let winGame = false;
let hw;
let ds;
let dinner;
let nameText;
let scoreText;
let userAgent;
let startTime;
let meals = 0;
let games = 0;
let score = 0;
let finish;

function preload(){
  hw = loadImage("images2/hw.png");
  ds = loadImage("images2/ds.png");
  dinner = loadImage("images2/dinner.png");
}

function setup(){
  imageMode(CENTER);
  textAlign(CENTER);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("z-index", "-1");
  canvas.position(0, 0);
  startTime = millis();

  intro = createP("In this game you will simulate a University of Chicago student!");
  instructions = createP("You must eat 3 meals to win.");
  instructions2 = createP("Get as much sleep as you can; remember, you have class at 9am!");
  greeting = createP("Please type your name and press enter");
  playerName = createInput("");
  playerName.changed(start);
}

function start(){
  startGame = true;
  playerName.hide();
  greeting.hide();
  intro.hide();
  instructions.hide();
  instructions2.hide();
  nameText = createP("");
  scoreText = createP("");
  playButton = createButton("Work 1 minute");
}

function scoreGen(){
  nameText.html("Welcome to <s>hell</s> UChicago, " + playerName.value() + "!");
  let worked = score/60;
  scoreText.html("You've worked " + worked.toFixed(2) + " hours since your last break!");
  playButton.mousePressed(scoreIncrease);
  if(millis() - startTime > 100000){
    endGame = true;
  }
  if(meals > 2){
    finish = millis();
    winGame = true;
  }
}

function mousePressed(){
  if(mouseX > windowWidth*2/3 - 180 &&
     mouseX < windowWidth*2/3 + 60 &&
     mouseY > windowHeight/3 &&
     mouseY < windowHeight/3+80){
       meal();
     } else if (mouseX > windowWidth/3+10 &&
        mouseX < windowWidth/3+140 &&
        mouseY > windowHeight/3-60 &&
        mouseY < windowHeight/3+60) {
       play();
     }
}

function scoreIncrease(){
  score++;
}

function meal(){
  if(score/60 >= 3){
    score -= 180;
    meals ++;
  }
}

function play(){
  if(score/60 >= 1){
    score -= 60;
    games ++;
  }
}

function endScreen(){
  background(125, 94, 99);
  textSize(16);
  text("Congrats! You've dropped out of school because you couldn't finish your work", windowWidth/2, windowHeight/2 - 100);
  text("You lose", windowWidth/2, windowHeight/2 - 85);
  nameText.hide();
  scoreText.hide();
  playButton.hide();
}

function winScreen() {
  background(125, 94, 99);
  let sleep = (startTime - finish + 400000) / 60000;
  textSize(16);
  text("Congrats! You have finished another day and have " + sleep.toFixed(2) + " hours to sleep", windowWidth/2, windowHeight/2 - 100);
  text("You lose", windowWidth/2, windowHeight/2 - 85);
  nameText.hide();
  scoreText.hide();
  playButton.hide();
}

function draw(){
  background(255, 194, 205);
  textAlign(CENTER);
  imageMode(CENTER);
  image(hw, windowWidth/2, windowHeight/2 - 120, 75, 75);
  if(startGame){
    background(255, 194, 205);
    scoreGen();
    image(ds, windowWidth/3 + 70, windowHeight/3, 120, 120);
    text("Play after 1 homework hour", windowWidth/3 + 70, windowHeight/3+75);

    image(dinner, windowWidth*2/3 - 80, windowHeight/3 + 20, 220, 66);
    text("Eat after 3 homework hours", windowWidth*2/3 - 80, windowHeight/3+75);

    text("You have eaten " + meals + " meal(s)!", windowWidth/2, windowHeight/2);
    text("You have taken " + games + " game break(s)!", windowWidth/2, windowHeight/2 + 15);
  }

  if(endGame){
    endScreen();
  } else if (winGame) {
    winScreen();
  }

}
