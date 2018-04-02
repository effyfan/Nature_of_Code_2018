let img;
let debug = true;
let b;

// Flowfield object
let flowfield;
// An ArrayList of vehicles
let vehicles = [];

function preload() {
  img = loadImage("starrynight.jpg");
}

function setup() {
  createCanvas(799, 633);
  console.log(img.width, img.height);
  img.loadPixels();

  flowfield = new FlowField(20);
  for (let i = 0; i < 100; i++) {
    vehicles.push(new Vehicle(random(width), random(height), 2, random(0.1, 0.3)));
  }
}

function draw() {
  background(51);
  image(img, 0, 0);
  // Display the flowfield in "debug" mode
  if (debug) flowfield.display();
  // Tell all the vehicles to follow the flow field
  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].follow(flowfield);
    vehicles[i].run();
  }

}


function keyPressed() {
  if (key == ' ') {
    debug = !debug;
  }
}

// Make a new flowfield
function mousePressed() {
  flowfield.init();
}