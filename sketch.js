let shapeType;
let shapeSize;
let button1, button2, button3;
let timer = 0;
let sizeChanged = false;
let colorChanged = false;
let x, y;
let xSpeed, ySpeed;
let sound1, sound2, sound3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#ff69b4'); // hot pink color

  sound1 = loadSound('yeah.mp3');
  sound2 = loadSound('Tada.mp3');
  sound3 = loadSound('puuu.mp3');

  shapeType = ROUND;
  shapeSize = random(50, 150);
  x = random(width);
  y = random(height);
  xSpeed = random(1, 3);
  ySpeed = random(1, 3);
  button1 = createButton('Change Shape');
  button1.position(20, 20);
  button1.mousePressed(changeShape);
  button2 = createButton('Change Size');
  button2.position(120, 20);
  button2.mousePressed(changeSize);
  button3 = createButton('Change Color');
  button3.position(212, 20);
  button3.mousePressed(changeColor);
}

function draw() {
  background('#ff69b4'); // hot pink color
  drawShape(x, y, shapeSize, shapeType);
  moveShape();
  
  if (sizeChanged && millis() - timer > 500) {
    shapeSize = 100; // set original size
    sizeChanged = false;
  }
}

function drawShape(x, y, size, type) {
  noStroke();
  rectMode(CENTER);
  ellipseMode(CENTER);
  if (type === ROUND) {
    ellipse(x, y, size, size);
  } else if (type === SQUARE) {
    rect(x, y, size, size);
  } else if (type === TRIANGLE) {
    let h = (sqrt(3) / 2) * size;
    triangle(x, y - h / 2, x - size / 2, y + h / 2, x + size / 2, y + h / 2);
  }
}

function changeShape() {
  shapeType = int(random(3));
  sound1.play();
}

function changeSize() {
  shapeSize = random(100, width);
  timer = millis();
  sizeChanged = true;
  sound2.play();
}

function changeColor(){
  fill(random(255), random(255), random(255));
  colorChanged = true;
  sound3.play();
}

function moveShape() {
  x += xSpeed;
  y += ySpeed;
  
  if (x > width || x < 0) {
    xSpeed *= -1;
  }
  
  if (y > height || y < 0) {
    ySpeed *= -1;
  }
}

const ROUND = 0;
const SQUARE = 1;
const TRIANGLE = 2;
