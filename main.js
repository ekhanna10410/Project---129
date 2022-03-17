music1 = "";
music2 = "";
music1X = 0;
music1Y = 0;
music2X = 0;
music2Y = 0;
leftWrist = 0;
leftWristSong = "";

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.center();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}
function preload()
{
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}

function draw() { 
  image(video, 0, 0, 600, 500); 
  song1_status = song1.isPlaying(); song2_status = song2.isPlaying(); 
  fill("#FF0000"); 
  stroke("#FF0000"); 

  if(scoreRightWrist > 0.2) 
  { 
    circle(rightWristX,rightWristY,20); 
    song2.stop(); 

    if(song1_status == false) 
    { 
      song1.play(); 
      document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song";
    } 
  } 
    if(scoreLeftWrist > 0.2) 
    { 
      circle(leftWristX,leftWristY,20); 
      song1.stop(); 

      if(song2_status == false)
      { 
        song2.play();
        document.getElementById("song").innerHTML = "Playing - Peter Pan Song" 
      } 
}

function modelLoaded () 
{
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
    console.log(results);
    scoreLeftWrist = results[0].pose.keypoints[9].score;
  }
}
