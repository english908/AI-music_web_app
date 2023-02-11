song1 ="";
song2= "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_right_wrist = 0;
score_left_wrist = 0;
song2_status ="";
song1_status ="";
function setup(){
    canvas = createCanvas(600 , 500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video ,modelLoaded);
    poseNet.on('pose ' , gotposes);
}
function modelLoaded(){
    console.log("PoseNet is initialized");
}
function gotposes(){
    if(results.length > 0){
        console.log(results);
        score_right_wrist = results[0].pose.keypoints[10].score;
        score_left_wrist = results[0].pose.keypoints[9].score;
        console.log("Score_right_wrist =" + score_right_wrist + "Score_left_wrist =" + score_left_wrist );
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY );

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY );
    }
}
function draw(){
    image(video , 0, 0 , 600 , 500);
   fill("purple");
   stroke("purple");
   if(score_left_wrist > 0.2){
    circle(leftWristX , leftWristY , 20);
    song1.stop();
    if (song2_status == false){
        song2.play();
        document.getElementById("song").innerHTML = "Playing - Peter Pan Song";
        
    }
   }

   if(score_right_wrist > 0.2){
    circle(rightWristX , rightWristY, 20);
    song2.stop();
    if (song1_status == false){
        song1.play();
        document.getElementById("song").innerHTML = "Playing - Peter Pan Song";
        
    }
   }
}
function preload(){
    song1 = loadSound("music.mp3");
    song2= loadSound("music2.mp3");
}
function play(){
    song1.play();
   song1.volume(1);
   song1.rate(1);
   song2.volume(1);
 song2.rate(1);
}