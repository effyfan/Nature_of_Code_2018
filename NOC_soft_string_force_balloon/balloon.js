class Balloon {
  constructor(pos) {
    this.d1 = random(20, 70);
    this.d2 = this.d1 + 1;
    this.mass = this.d1/10;
    this.pos = pos.copy();
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.col = color(random(150, 255), random(50, 60), random(100, 150));
    this.lifespan = 255.0;
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass); //F/M = A
    this.acceleration.add(f); //apply force to create accerleration
  }

  run() {
    this.update();
    this.display();
    this.checkEdges();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.pos.add(this.velocity);
    this.acceleration.mult(0); // clear force
    this.lifespan -= 3;
  }

  display() {
    noStroke();
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.d1, this.d2);
    noFill();
    stroke(100, this.lifespan);
    strokeWeight(1);
    beginShape();
    curveVertex(this.pos.x, this.pos.y+this.d1/2);
    curveVertex(this.pos.x, this.pos.y+this.d1/2);
    curveVertex(this.pos.x-2, this.pos.y+this.d1/2+10);
    curveVertex(this.pos.x+1, this.pos.y+this.d1/2+20);
    curveVertex(this.pos.x, this.pos.y+this.d1/2+30);
    curveVertex(this.pos.x, this.pos.y+this.d1/2+30);
    endShape();
  }

  checkEdges() {
    if (this.pos.x > width - this.d1/2) {
      this.pos.x = width - this.d1/2;
      this.velocity.x *= -0.5;
    } else if (this.pos.x < this.d1/2) {
      this.velocity.x *= -0.5;
      this.pos.x = this.d1/2;
    }
    if (this.pos.y < this.d2/2) {
      this.velocity.y *= -0.5;
      this.pos.y = this.d2/2;
    } else if (this.pos.y > height){
      this.velocity.y *= -0.5;
      this.pos.y = height;
    }
  }

  isFinished() {
  if (this.lifespan < 0.0) {
    return true;
  } else {
    return false;
  }
}

}
