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
let meals = 0;
let games = 0;
let social = 0;
let score = 0;
let finish;
let pause = false;
let timer = 1440;
let time_left = timer;
let popup = false;
let first_time = false;
let soundPlayed = false;
let laptopPlayed = false;
let profPlayed = false;
let consol;
let notification = false;
let first_notif = false;
let prof_notif = false;
let profOH = false;
let smile;

// face tracking
var capture;
var tracker;
let label = "...waiting";

function preload(){
  hw = loadImage("images2/hw.png");
  ds = loadImage("images2/ds.png");
  dinner = loadImage("images2/dinner.png");
  phone = loadImage("images2/phone1.png");
  speech = loadImage("images2/speech.png");
  ringtone = loadSound("images2/ringtone.mp3");
  consol = loadFont("images2/consolas.ttf");
  rules = loadImage("images2/rules.png");
  phone2 = loadImage("images2/phone2.png");
  notifs = loadImage("images2/notifications.png");
  laptop = loadImage("images2/laptop.png");
  professor = loadImage("images2/professor.png");
}

function setup(){
  var w = windowWidth,
      h = windowHeight;
  imageMode(CENTER);
  textAlign(CENTER);
  textFont(consol);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.style("z-index", "-1");
  canvas.position(0, 0);

  capture = createCapture({
      audio: false,
      video: {
          width: w,
          height: h
      }
  }, function() {
      console.log('capture ready.')
  });
  capture.elt.setAttribute('playsinline', '');
  createCanvas(w + 400, h);
  capture.size(w, h);
  capture.hide();
  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);

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
  if(worked.toFixed(2) == 1){
    scoreText.html("You've worked " + worked.toFixed(2) + " hour since your last break!");
  } else {
    scoreText.html("You've worked " + worked.toFixed(2) + " hours since your last break!");
  }

  if(worked.toFixed(2) > 5){
    if (first_time == false){
      first_time = true;
      popup = true;
    }
  } else if (worked.toFixed(2) <= 5){
      if(first_time){
        popup = false;
      }
  }

  if(worked.toFixed(2) > 2){
    if (first_notif == false){
      first_notif = true;
      notification = true;
    }
  } else if (worked.toFixed(2) <= 2){
      if(first_notif){
        notification = false;
      }
  }

  if(timer/180 < 7){
    if (profOH == false){
      profOH = true;
      prof_notif = true;
    }
  } else if (timer/180 < 5){
      if(profOH){
        prof_notif = false;
      }
  }

  playButton.mousePressed(scoreIncrease);
  if(timer == 0){
    endGame = true;
  }
  if(meals > 2){
    winGame = true;
  }
}

function mousePressed(){
  if(mouseX > windowWidth*2/3 - 100 &&
     mouseX < windowWidth*2/3 + 100 &&
     mouseY > windowHeight/3-80 &&
     mouseY < windowHeight/3+80){
       meal();
     } else if (mouseX > windowWidth/3+10 &&
       mouseX < windowWidth/3+140 &&
       mouseY > windowHeight/3-60 &&
       mouseY < windowHeight/3+60) {
         play();
     } else if (mouseX > windowWidth*2/3 - 280 &&
       mouseX < windowWidth*2/3 - 210 &&
       mouseY > windowHeight/3-60 &&
       mouseY < windowHeight/3+60
     ) {
       socialize();
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

function socialize(){
  if(score/60 >= 2){
    score -= 120;
    social++;
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

function keyPressed(){
  if (key == "r"){
    if (endGame || winGame){
      endGame = false;
      winGame = false;
      startGame = false;
      setup();
      meals = 0;
      games = 0;
      score = 0;
      social = 0;
      timer = 1440;
      time_left = timer;
      popup = false;
      first_time = false;
      soundPlayed = false;
      laptopPlayed = false;
      profPlayed = false;
      notification = false;
      first_notif = false;
      prof_notif = false;
      profOH = false;
    }
  }
}

function winScreen() {
  background(125, 94, 99);
  let sleep = time_left;
  textSize(16);
  text("Congrats! You have finished another day and have " + sleep.toFixed(2) + " hours to sleep", windowWidth/2, windowHeight/2 - 100);
  text("You lose", windowWidth/2, windowHeight/2 - 85);
  text("Have fun doing it all tomorrow!", windowWidth/2, windowHeight/2 - 70);
  textSize(12);
  text("Press r to reset", windowWidth/2, windowHeight/2 - 55);
  nameText.hide();
  scoreText.hide();
  playButton.hide();
}

function pauseScreen() {
  background(125, 94, 99);
  textSize(16);
  text("Why aren't you smiling?", windowWidth/2, windowHeight/2 - 100);
  text("Maybe you should make an appointment with student health if you're so depressed", windowWidth/2, windowHeight/2 - 85);
  textSize(12);
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
    time_left = timer/180;
    background(255, 194, 205);
    scoreGen();
    textSize(16);
    image(rules, 160, 100, 300*5/6, 155*5/6);

    // handles timer
    if(time_left.toFixed(2) == 1){
      text(time_left.toFixed(2) + " hour left today", windowWidth/2, windowHeight/3 - 100);
    } else{
      text(time_left.toFixed(2) + " hours left today", windowWidth/2, windowHeight/3 - 100);
    }

    // play games or eat food
    textSize(12);
    image(ds, windowWidth/3 + 70, windowHeight/3, 120, 120);
    image(dinner, windowWidth*2/3 - 80, windowHeight/3, 200*2/3, 175*2/3);
    image(phone2, windowWidth*2/3 - 250, windowHeight/3, 64, 109);

    /// grammar of meals and games
    if(meals == 1){
      text("You have eaten " + meals + " meal today!", windowWidth/2, windowHeight/2);
    } else{
      text("You have eaten " + meals + " meals today!", windowWidth/2, windowHeight/2);
    }
    if(games == 1){
      text("You have taken " + games + " game break today!", windowWidth/2, windowHeight/2 + 15);
    } else {
    text("You have taken " + games + " game breaks today!", windowWidth/2, windowHeight/2 + 15);
    }
    if(social == 1){
      text("You have talked to " + social + " friend today!", windowWidth/2, windowHeight/2 + 30);
      } else {
      text("You have talked to " + social + " friends today!", windowWidth/2, windowHeight/2 + 30);
      }

    /// timer decrementation
    if (frameCount % 10 == 0 && timer > 0) {
      timer --;
    }

    // phone popup
    if (popup) {
      image(phone, 100, windowHeight - 100, 171*2/3, 250*2/3);
      image(speech, 250, windowHeight - 200, 603*1/3, 270*1/3);
      if(soundPlayed == false){
        ringtone.play();
        soundPlayed = true;
      }
    }

    // notification popup
    if(notification) {
      image(laptop, windowWidth - 100, windowHeight - 100, 715*1/5, 593*1/5);
      image(notifs, windowWidth - 200, windowHeight-180, 495*1/3, 180*1/3)
      if(laptopPlayed == false){
        ringtone.play();
        laptopPlayed = true;
      }
    }

    // professor email
    if(prof_notif) {
      image(laptop, windowWidth - 100, windowHeight - 100, 715*1/5, 593*1/5);
      image(professor, windowWidth - 200, windowHeight-200, 603*1/3, 369*1/3)
      if(profPlayed == false){
        ringtone.play();
        profPlayed = true;
      }
    }

    // smile
    var positions = tracker.getCurrentPosition();
    if (positions.length > 0) {
      if (frameCount % 60 == 0 && timer > 0){
         var mouthLeft = createVector(positions[44][0], positions[44][1]);
         var mouthRight = createVector(positions[50][0], positions[50][1]);
         var smile = mouthLeft.dist(mouthRight);
         if(smile < 115){
           pause = true;
         }
         if(smile > 115){
           pause = false;
           nameText.show();
           scoreText.show();
           playButton.show();

         }
       }
     }
   }

  if(pause){
    pauseScreen();
  }

  if(endGame){
    endScreen();
  } else if (winGame) {
    winScreen();
  }
}
