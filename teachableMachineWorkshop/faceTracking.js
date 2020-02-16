// https://kylemcdonald.github.io/cv-examples/
// https://github.com/kylemcdonald/AppropriatingNewTechnologies/wiki/Week-2

var capture;
var tracker;
let tiger;
let uwu = false;
let owo = false;
let consolas;

function preload(){
  consolas = loadFont("./Consolas.ttf");
}

var w = 640,
    h = 480;

function setup() {
  textFont(consolas);
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

    // analyzing the cideo with the clmtracker function/object
    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);
    textSize(40);
    fill(196, 143, 191);
    textFont("consolas");
    text("click for uwu or owo", w + 20, 50);
    text("uwu", w + 165, 200);
    text("owo", w + 165, 250);

    textSize(15);
    text("uwu this, owo that- not so cute irl, is it??", w + 20, h);
}

function mousePressed(){
  if(mouseX > w + 160 &&
     mouseX < w + 250 &&
     mouseY > 235 &&
     mouseY < 255){
       owo = true;
       uwu = false;
    }
    else if(mouseX > w + 160 &&
            mouseX < w + 250 &&
            mouseY > 180 &&
            mouseY < 200){
      owo = false;
      uwu = true;
    }
}

function draw() {

    imageMode(CORNERS);
    image(capture, 0, 0, w, h);
    var positions = tracker.getCurrentPosition();
    imageMode(CENTER);
    noFill();
    stroke(255);
    beginShape();
    //looping through the position array and redrawing the vertices
    for (var i = 0; i < positions.length; i++) {

      // if we commented this out, there wouldn't be lines connecting each point
        //vertex(positions[i][0], positions[i][1]);
    }
    endShape();

    noStroke();
    for (var i = 0; i < positions.length; i++) {
         fill(map(i, 0, positions.length, 0, 360), 50, 100);
         fill(255);
         //ellipse(positions[i][0], positions[i][1], 4, 4);
         //text(i, positions[i][0], positions[i][1]);
        stroke(0);
        //
        //
        //ellipse(positions[23][0] + 10, positions[23][1], positions[25][0] - positions[23][0], positions[25][0] - positions[23][0]);
        //ellipse(positions[28][0] - 10, positions[28][1], positions[30][0] - positions[28][0], positions[30][0] - positions[28][0]);
        textFont("consolas");
        if(owo){
          textSize(positions[25][0] - positions[23][0] + 20);
          text("o", positions[23][0], positions[23][1]);
          text("o", positions[30][0], positions[30][1]);
          textSize(positions[50][0] - positions[44][0]);
          text("w", positions[55][0], positions[55][1]);
        }
        if(uwu){
          textSize(positions[25][0] - positions[23][0] + 20);
          text("u", positions[23][0], positions[23][1]);
          text("u", positions[30][0], positions[30][1]);
          textSize(positions[50][0] - positions[44][0]);
          text("w", positions[55][0], positions[55][1]);
        }
        // image(tiger, positions[62][0], positions[62][1], 300, 300);
    }

    if (positions.length > 0) {
        var mouthLeft = createVector(positions[44][0], positions[44][1]);
        var mouthRight = createVector(positions[50][0], positions[50][1]);
        var smile = mouthLeft.dist(mouthRight);
        // uncomment the line below to show an estimate of amount "smiling"
        // rect(20, 20, smile * 3, 20);

        // uncomment for a surprise
         // noStroke();
         // fill(0, 255, 255);
         // ellipse(positions[62][0], positions[62][1], 50, 50);
    }
}
