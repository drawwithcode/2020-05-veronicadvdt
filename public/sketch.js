
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

function drawOtherMouse(data) {
  push();
  fill(data.color);
  ellipse(data.x, data.y, 20);
  pop();
}

function preload(){
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  background("black");

}

function draw() {

}

function mouseMoved() {
  push();
  fill(myColor);
  ellipse(mouseX, mouseY, 5);
  pop();
  // create the message
  let message = {
    x: mouseX,
    y: mouseY,
    color: myColor,
  };
  // send to the server
  socket.emit("mouse", message);
}
