let m = [];
let system;

function setup() {
  createCanvas(1700, 1050);
  // system = new BalloonSystem();
}

function draw() {
  background(170, 155, 255);
  m.push(new Balloon(random(100, width - 100), height / 5));
  let helium = createVector(0, -0.07);
  for (let i = m.length - 1; i >= 0; i--) {
    let p = m[i];
    let drag = p.velocity.copy();
    drag.mult(-1);
    drag.normalize();
    drag.mult(0.005);

    p.applyForce(drag);
    p.applyForce(helium);
    p.run();
    p.checkEdges();
    if (p.isFinished()) {
      m.splice(i, 1);
    }
  }
}


function mouseDragged() {
  m.push(new Balloon(mouseX, mouseY));
}
