
let socket = io();
let myColor = "white";
let eraseEnable = false;


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
  myImage2 = loadImage("./assets/prova2.jpg");

}

function toggleOtherErase() {
  if (eraseEnable) {
    noErase();
    eraseEnable = data.false;
  }
  else {
    erase();
    eraseEnable = data.true;
  }
}


function setup() {
  createCanvas(windowWidth,windowHeight)
  background("black");

  push();
  textSize(20);
  fill('black');
  toggleBtn = createButton("ERESE");
  toggleBtn.position(400, 210);
  toggleBtn.mouseClicked(toggleErase);
  pop();

  imageMode(CENTER);
  push();
  image(myImage1, width/2 , height/2, windowWidth, windowHeight);
  filter("blur", 3);
  filter("gray");
  pop();

  image(myImage2, width/2, 400);

}

function draw() {

  push();
  noStroke();

  fill(myColor);
  textSize(66);
  textAlign(CENTER);
  text("LA SETTIMANA ENIGMISTICA 2.0", width/2, height/8);
  pop();
}

function toggleErase() {
  if (eraseEnable) {
    noErase();
    eraseEnable = false;
  }
  else {
    erase();
    eraseEnable = true;
  }
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
