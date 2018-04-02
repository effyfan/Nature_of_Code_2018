class Vehicle {
  constructor(x, y, ms, mf) {
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.pos = createVector(x, y);
    this.maxspeed = ms || 3;
    this.maxforce = mf || 0.05;
    this.r = 4;
  }

  run() {
    this.update();
    this.borders();
    this.display();
  }

  follow(flow) {
    //find out the vector of that sopt in the flow field
    let desired = flow.lookup(this.pos);
    desired.mult(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }

  // Method to update location
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  borders() {
    if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.y < -this.r) this.pos.y = height + this.r;
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r;
  }


  display() {
    // for (let i = 0; i < width / 20 - 1; i++) {
    //   for (let j = 0; j < height / 20 - 1; j++) {
    //     let x = i * 20;
    //     let y = j * 20;
    //     let index = x + y * img.width;
    //     let color = img.pixels[index * 4];
    //     let b = brightness([color]);
    //     console.log(b);
    //     let ccc = map(b, 0, 255, TWO_PI, 0);
    //   }
    // }
    var theta = this.vel.heading() + PI / 2;
    fill(255);
    stroke(200);
    noStroke();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape();
    ellipse(0, 0, this.r, this.r * 4);
    // vertex(0, -this.r * 2);
    // vertex(-this.r, this.r * 2);
    // vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}