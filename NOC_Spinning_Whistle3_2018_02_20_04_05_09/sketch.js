let angle = 0; 
let aVelocity = 0;
let a = 0;
let x;
let mouseXAction;
let mouseYAction;
let y;

function setup() {
  createCanvas(800, 600, WEBGL);
  rectMode(CENTER);
}

function draw() {
  ambientLight(200);
  
  var dirX = (mouseX / width - 0.5) * 2;
  var dirY = (mouseY / height - 0.5) * 2;
  directionalLight(255, 0, 0, dirX, -dirY, 0.25);
  
  ambientMaterial(130);
  background(250); 

  mouseXAction = map(mouseX, 0, width, -PI/2, PI/2);
  if (mouseX < width/2) {
  mouseYAction = map(mouseY, 0, height, -PI/2, PI/2);
  } else if (mouseX > width/2) {
  mouseYAction = map(mouseY, 0, height, PI/2, -PI/2); 
  }
  rotateY(mouseXAction);
  rotateZ(mouseYAction);

  // rect(0, 0, 200, 400);
  // ellipsoid(10, 150, 200);
  for(let i = 0; i < 30; i ++) {
    push();
    rotateX(angle+i/5);
    translate(i*10-200,0);
    box(3, 5*i, 5*i);
    pop();
  }
    // beginShape(LINES);
    // noFill();
    // stroke(100, 100, 100);
    // //line
    // vertex(-y * 1000 - 100, 0, 0);
    // vertex(y * 1000 + 100, 0, 0);
    // endShape();
  // line(100, 100, 1, 200, 200, 1);
  
  ///// a is the x in y = sin(x) graph that will keep increasing its value
  a += 0.03; 
  ///// x is the y in y = sin(x) graph that will go back and forth between -PI/15 to PI/15
  x = PI/15 * sin(a);
  ///// tan(x) will go from -oo to +oo, however x is constrained by PI/15
  aVelocity = tan(x);
  angle += aVelocity;
 
  if(aVelocity > 0){
  y = tan(x)
  } else {
  y = -tan(x)
  }
}