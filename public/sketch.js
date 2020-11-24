
let socket = io();
let myColor = "white";


socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);


function setColor(assignedColor) {
  myColor = assignedColor;
}

function newConnection() {
  console.log("your id: " + socket.id);
}

function drawOtherMouse(data){
  push();
  stroke(data.color);
  strokeWeight(3);
  line(data.x, data.y, data.x2, data.y2);
  pop();
}

function preload(){
  myImage1 = loadImage("./assets/settimana1.jpg");
  myImage2 = loadImage("./assets/prova1.jpg");

}


function setup() {
  createCanvas(windowWidth,windowHeight)
  background("black");
  imageMode(CENTER);
  push();
  image(myImage1, width/2 , height/2, windowWidth, windowHeight);
  filter("blur", 3);
  filter("gray");
  pop();
  image(myImage2, width/2, height/2);


}

function draw() {
  rect(0, 40, width, 100);
  fill("white");
  stroke("black");
  push();
  noStroke();
  textFont("Roboto Mono");
  fill(myColor);
  textSize(72);
  textAlign(CENTER);
  text("LA SETTIMANA ENIGMISTICA 2.0", width/2, height/8);
  pop();
}


function mouseDragged(){
  push();
  stroke(myColor);
  strokeWeight(3);
  line(pmouseX, pmouseY, mouseX, mouseY);
  pop();
  //create the message
  let message = {
    x: mouseX,
    y: mouseY,
    x2: pmouseX,
    y2: pmouseY,
    color : myColor,
  };
  // send to the server
  socket.emit("mouse", message);
}
