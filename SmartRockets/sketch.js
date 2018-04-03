let rocket;
let popl;
let lifespan = 200;
let count = 0;
// show the count on screen
let lifeP;
// create your own target
let target;
let target2;
let maxforce = 0.21;
let histories = [];

let rx = 250;
let ry = 150;
let rw = 80;
let rh = 80;

function setup() {
  createCanvas(500, 300);
  rocket = new Rocket();
  popl = new Population();
  // console.log(popl.rockets[0]);
  // lifeP = createP();

  target = createVector(450, height / 2);
  // target2 = createVector(750, height / 2);
}

function draw() {
  background(255);
  popl.run(histories);
  // lifeP.html(count);
  count++;
  if (count == lifespan) {
    // popl = new Population();
    popl.selection();
    popl.reproduction();
    count = 0;
  }
  noStroke();
  // draw obstacle
  fill(250, 150, 20, 100);
  ellipse(rx, ry, rw, rw);
  // draw targets
  fill(255, 50, 50, 200);
  ellipse(target.x, target.y, 16, 16);
  // ellipse(target2.x, target2.y, 16, 16);
  drawtails(histories);
}

function drawtails(histories) {
  for (var i = 0; i < histories.length; i++){
    beginShape();
    stroke(255, 0, 0, 100);
    noFill();
    for (var j = 0; j < histories[i].length; j++) {
      var pos = histories[i][j];
      //fill(random(255));
      // ellipse(pos.x, pos.y, i, i);
      vertex(pos.x, pos.y);
    }
    endShape();
  }
}
