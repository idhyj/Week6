// Class for managing shape generation and interactions
class ShapeGenerator {
  constructor() {
    // Initialize shape properties
    this.shapeType = ROUND;
    this.shapeSize = random(50, 150);
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.xSpeed = random(1, 3);
    this.ySpeed = random(1, 3);
    
    // Load sound effects
    this.sound1 = loadSound('yeah.mp3');
    this.sound2 = loadSound('Tada.mp3');
    this.sound3 = loadSound('puuu.mp3');
  }

  // Function to draw the shape on the canvas
  drawShape() {
    noStroke();
    rectMode(CENTER);
    ellipseMode(CENTER);
    if (this.shapeType === ROUND) {
      ellipse(this.x, this.y, this.shapeSize, this.shapeSize);
    } else if (this.shapeType === SQUARE) {
      rect(this.x, this.y, this.shapeSize, this.shapeSize);
    } else if (this.shapeType === TRIANGLE) {
      let h = (sqrt(3) / 2) * this.shapeSize;
      triangle(
        this.x, this.y - h / 2,
        this.x - this.shapeSize / 2, this.y + h / 2,
        this.x + this.shapeSize / 2, this.y + h / 2
      );
    }
  }

  // Function to change the shape type
  changeShape() {
    this.shapeType = int(random(3));
    this.sound1.play();
  }

  // Function to change the size of the shape
  changeSize() {
    this.shapeSize = random(100, windowWidth);
    timer = millis();
    sizeChanged = true;
    this.sound2.play();
  }

  // Function to change the color of the shape
  changeColor() {
    fill(random(255), random(255), random(255));
    colorChanged = true;
    this.sound3.play();
  }

  // Function to move the shape on the canvas
  moveShape() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    if (this.x > windowWidth || this.x < 0) {
      this.xSpeed *= -1;
    }
    
    if (this.y > windowHeight || this.y < 0) {
      this.ySpeed *= -1;
    }
  }
}

let shapeGenerator;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#ff69b4'); // hot pink color

  // Create a new instance of ShapeGenerator class
  shapeGenerator = new ShapeGenerator();

  // Create buttons for interactions
  button1 = createButton('Change Shape');
  button1.position(20, 20);
  button1.mousePressed(() => shapeGenerator.changeShape());

  button2 = createButton('Change Size');
  button2.position(120, 20);
  button2.mousePressed(() => shapeGenerator.changeSize());

  button3 = createButton('Change Color');
  button3.position(211, 20);
  button3.mousePressed(() => shapeGenerator.changeColor());
}

function draw() {
  background('#ff69b4'); // hot pink color
  shapeGenerator.drawShape();
  shapeGenerator.moveShape();
  
  // Reset shape size after a certain duration
  if (sizeChanged && millis() - timer > 500) {
    shapeGenerator.shapeSize = 100; // set original size
    sizeChanged = false;
  }
}

// Constants for different shape types
const ROUND = 0;
const SQUARE = 1;
const TRIANGLE = 2;

let timer = 0; // Timer variable for size change duration
let sizeChanged = false; // Flag to track if the shape size has changed
