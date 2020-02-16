let canvas;
let video;
let classifier;
let flippedVideo;
let counter = 0;
let graphx = 0;
let modelURL = "https://teachablemachine.withgoogle.com/models/AasLA0qM/";

let label = "...waiting";

function preload(){
  //add a link to your own data set here
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
 canvas = createCanvas(windowWidth, windowHeight);
 video = createCapture(VIDEO);
 video.size(640, 480);
 video.hide();

 flippedVideo = ml5.flipImage(video);

 classifyVideo();

}

function classifyVideo(){
  flippedVideo = ml5.flipImage(video);

  // Classify our images/video against the pre-trained model
  // After it's loaded, call the gotResults function
  classifier.classify(flippedVideo, gotResults);
}

function gotResults(error, results){
  if(error){
  //  console.log(error);
    return
  }
  label = results[0].label;
  classifyVideo();
  //console.log(results);
}

function draw() {
  background(0);
  image(video, 0, 0);

  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text("$" + counter, width/2, height - 100);
  text(label, width/2, height - 16);
  rect(0, 500, graphx, 50);

  if (label == "No one") {
    stroke(random(255), random(255),random(255));
    strokeWeight(5);
    // Update the width of the rectangle every frame
    graphx ++;
    counter++;
  }
  if (label == "Me!") {
    stroke(0);
    // pause the animation
    // graphx is the curr val of graphx
    graphx = graphx;
  }


}
