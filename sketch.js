let shapeType;
let shapeSize;
let button1, button2, button3;
let timer = 0; // Timer variable to control the duration for size change
let sizeChanged = false; // Flag to indicate if the shape size has changed
let colorChanged = false; // Flag to indicate if the shape color has changed
let x, y;
let xSpeed, ySpeed; // Speed at which the shape moves
let sound1, sound2, sound3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#ff69b4');

  // Load sound files for the buttons
  sound1 = loadSound('yeah.mp3');
  sound2 = loadSound('Tada.mp3');
  sound3 = loadSound('puuu.mp3');

  // Initialize shape properties and button positions
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
  background('#ff69b4'); 
  drawShape(x, y, shapeSize, shapeType);
  moveShape(); 
  
  // Reset shape size to 100 if sizeChanged is true and more than 500 milliseconds have passed since the last size change
  if (sizeChanged && millis() - timer > 500) {
    shapeSize = 100; // set original size
    sizeChanged = false; // Reset sizeChanged flag
  }
}

// Function to draw the shape based on its type and properties
function drawShape(x, y, size, type) {
  noStroke();
  rectMode(CENTER);
  ellipseMode(CENTER);

  // Draw shape based on its type (ROUND, SQUARE, or TRIANGLE)
  if (type === ROUND) {
    ellipse(x, y, size, size);
  } else if (type === SQUARE) {
    rect(x, y, size, size);
  } else if (type === TRIANGLE) {
    let h = (sqrt(3) / 2) * size;
    triangle(x, y - h / 2, x - size / 2, y + h / 2, x + size / 2, y + h / 2);
  }
}

// Function to change the shape type randomly and play 'yeah.mp3' sound
function changeShape() {
  shapeType = int(random(3)); // Randomly choose 0, 1, or 2 representing ROUND, SQUARE, or TRIANGLE
  sound1.play(); // Play sound
}

// Function to change the shape size randomly and play 'Tada.mp3' sound
function changeSize() {
  shapeSize = random(100, width);
  timer = millis(); // Record the current time in milliseconds
  sizeChanged = true; // Set sizeChanged flag to true
  sound2.play(); // Play sound
}

// Function to change the shape color randomly, set colorChanged flag to true, and play 'puuu.mp3' sound
function changeColor(){
  fill(random(255), random(255), random(255));
  colorChanged = true;
  sound3.play();
}

// Function to move the shape based on its current speed
function moveShape() {
  x += xSpeed; // Move the shape horizontally
  y += ySpeed; // Move the shape vertically

  // If the shape reaches the canvas boundaries, reverse its direction
  if (x > width || x < 0) {
    xSpeed *= -1; // Reverse horizontal direction
  }
  
  if (y > height || y < 0) {
    ySpeed *= -1; // Reverse vertical direction
  }
}

//constants representing the types of shapes
const ROUND = 0;
const SQUARE = 1;
const TRIANGLE = 2;
