class Rocket {
  constructor(dna) {
    this.pos = createVector(50, height / 2);
    this.vel = createVector();
    this.acc = createVector();
    this.completed = false;
    this.crashed = false;
    // if received DNA, make a Rocket with this DNA ,if not, create a random DNA
    if (dna) {
      this.dna = dna;
    } else {
      this.dna = new DNA();
    }
    this.fitness = 0;

    this.history = [];
  }

  calcFitness() {
    // the closer the rocket make it to the target, the bigger fitness
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    // let d2 = dist(this.pos.x, this.pos.y, target2.x, target2.y);
    this.fitness = map(d, 0, width, width, 0);
    if (this.completed) {
      this.fitness *= 10;
    }
    if (this.crashed) {
      this.fitness /= 10;
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update(histories) {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 10) {
      this.complete = true;
      this.pos = target.copy();
    }

    // check if crashed
    if (this.pos.x > rx - rw/2 && this.pos.x < rx + rw/2 && this.pos.y > ry - rh/2 && this.pos.y < ry + rh/2) {
      this.crashed = true;
    }
    if(this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
      this.crashed = true;
    }

    this.applyForce(this.dna.genes[count]);
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }

    // store history as the tail
    let v = createVector(this.pos.x, this.pos.y);
    this.history.push(v);
    if (this.history.length >= 200) {
      histories.push(this.history);
      this.history.splice(0, 1);
    }
  }


  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    noStroke();
    fill(250, 150, 20, 100);
    if(this.crashed){
      for (var i = 0; i < 30; i++){
      ellipse(0, 0, i, i);
    }
    } else {
    rect(0, 0, 5, 2);
    }
    pop();
  }

  drawtail(r, g, b) {
    // draw current tail
     beginShape();
     strokeWeight(0.1);
     stroke(r, g, b);
     fill(255, 0, 0, 20);
     for (var i = 0; i < this.history.length; i++) {
       var pos = this.history[i];
       //fill(random(255));
       // ellipse(pos.x, pos.y, i, i);
       vertex(pos.x, pos.y);
     }
     endShape();
  }
}
