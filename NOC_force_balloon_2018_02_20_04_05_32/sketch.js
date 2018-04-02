let m = [];
let nxoff = 0;
let nyoff = 10000;

function setup() {
  createCanvas(1700, 1050);
  for (let i = 0; i < 30; i++) {
    m[i] = new Balloon(random(100, width - 100), height / 2);
  }
}

function draw() {
  background(170, 155, 255);

  nxoff += 0.01;
  let c = map(noise(nxoff), 0, 1, -0.09, 0.09);
  nyoff += 0.01;
  let d = map(noise(nyoff), 0, 1, 0.003, 0.15);
  stroke(100);
  point(nxoff, c)
  strokeWeight(1);
  for (let j = 100; j < width-100; j += 5) {
    line(j, 0, c * 1000 + j, d * 1000);
  }

  let wind = createVector(c, d);
  console.log(wind.x + " & & " + wind.y);
  let helium = createVector(0, -0.07); //opposite of gravity

  // let c = -0.01;
  // let normal = 1;
  // let frictionMag = c * normal; 
  // let friction = m.velocity.copy(); //get the direction of velocity
  // friction.mult(-1); //opposite direction of velocity
  // friction.normalize(); //normalize vector to 1
  // friction.mult(frictionMag); //apply magnitude
  for (let i = 0; i < 30; i++) {
    let drag = m[i].velocity.copy();
    drag.mult(-1);
    drag.normalize();
    drag.mult(0.005);


    m[i].applyForce(drag);
    m[i].applyForce(helium);

    // if (mouseIsPressed) {
    m[i].applyForce(wind);
    // }

    m[i].update();
    m[i].display();
    m[i].checkEdges();
  }
}