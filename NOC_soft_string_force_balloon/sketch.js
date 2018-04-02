let systems = [];
let nxoff = 0;
let nyoff = 10000;


function setup() {
  createCanvas(700, 550);
}

function draw() {
  background(170, 155, 255);

  for (let p of systems){
    let helium = createVector(0, -0.2);
    let wind = createVector(random(-1,1),0);
    p.applyForce(wind);
    p.applyForce(helium);
    p.addBalloon();
    p.run();
  }

  // nxoff += 0.01;
  // let c = map(noise(nxoff), 0, 1, -0.09, 0.09);
  // nyoff += 0.01;
  // let d = map(noise(nyoff), 0, 1, 0.003, 0.15);
  // stroke(100);
  // strokeWeight(1);
  // let wind = createVector(c, d);
  // if(mouseIsPressed){
  //   for (let j = 100; j < width-100; j += 5) {
  //     line(j, 0, c * 1000 + j, d * 1000);
  //   }
  //   system.applyForce(wind);
  // }
  //???????
  // let p = m[i];
  // let drag = p.velocity.copy();
  // drag.mult(-1);
  // drag.normalize();
  // drag.mult(0.005);
  // system.applyForce(drag);
}


function mousePressed() {
  systems.push(new BalloonSystem(createVector(mouseX, mouseY)));
}
