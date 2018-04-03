let rocket;
let popl;
let lifespan = 200;
let count = 0;
// show the count on screen
let lifeP;
// create your own target
let target;
let maxforce = 0.21;

let rx = 10;
let ry = 10;
let rw = 20;
let rh = 10;

function setup() {
  createCanvas(400, 300);
  rocket = new Rocket();
  popl = new Population();
  // console.log(popl.rockets[0]);
  lifeP = createP();

  target = createVector(width / 2, 50);
}

function draw() {
  background(255);
  popl.run();
  lifeP.html(count);
  count++;
  if (count == lifespan) {
    // popl = new Population();
    popl.selection();
    popl.reproduction();
    count = 0;
  }

  fill(100);
  rect(rx, ry, rw, rh);

  ellipse(target.x, target.y, 16, 16);
}





class DNA {
  constructor(genes) {
    // if the DNA receive genes, make a DNA with this genes, if not, create a random genes
    if (genes) {
      this.genes = genes;
    } else {
      this.genes = [];
      for (let i = 0; i < lifespan; i++) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }

  crossover(partner) {
    let newgenes = [];
    // pick the midpoint randomly in the genes array
    let mid = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (i > mid) {
        newgenes[i] = this.genes[i];
      } else {
        newgenes[i] = partner.genes[i];
      }
    }
    return new DNA(newgenes);
  }

  mutation() {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < 0.01) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }
}


class Rocket {
  constructor(dna) {
    this.pos = createVector(width / 2, height);
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

  update() {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d < 10) {
      this.complete = true;
      this.pos = target.copy();
    }

    // check if crashed
    if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y < ry + rh) {
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
    if (this.history.length > 200) {
      this.history.splice(0, 1);
    }
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    noStroke();
    fill(random(255), random(50), random(200), 100);
    rect(0, 0, 25, 5);
    pop();

   // draw tail
    beginShape();
    noFill();
    for (var i = 0; i < this.history.length; i++) {
      var pos = this.history[i];
      //fill(random(255));
      // ellipse(pos.x, pos.y, i, i);
      vertex(pos.x, pos.y);
    }
    endShape();

  }
}


class Population {
  constructor() {
    this.rockets = [];
    this.popsize = 10;
    this.matingpool = [];
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i] = new Rocket();
    }
  }

  selection() {
    let maxfit = 0;
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness
      }
    }
    createP(maxfit);
    // console.log(this.rockets);
    // normalize the fitness value to between 0-1 ???????? [i].fitness / maxfit will always be 1, right???
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }
    // make sure to clear the matingpool every generation
    this.matingpool = [];
    // loop through the rockets again and add them to the matingpool base on its fitness
    for (let i = 0; i < this.popsize; i++) {
      let n = this.rockets[i].fitness * 100;
      for (let j = 0; j < n; j++) {
        this.matingpool.push(this.rockets[i]);
      }
      this.rockets[i].fitness /= maxfit;
    }
  }

  reproduction() {
    let newRockets = [];
    for (let i = 0; i < this.rockets.length; i++) {
      // pick a random parent from the matingpool array
      let m = floor(random(this.matingpool.length));
      let d = floor(random(this.matingpool.length));
      let mom = this.matingpool[m];
      let dad = this.matingpool[d];
      let momgenes = mom.dna;
      let dadgenes = dad.dna;
      let child = momgenes.crossover(dadgenes);
      // let parentA = new DNA(random(this.matingpool).dna);
      // let parentB = random(this.matingpool).dna;
      // let child = parentA.crossover(parentB);

      child.mutation();
      // add the child to the new rockets array
      newRockets[i] = new Rocket(child);
    }
    // make the new rockets the current rockets now
    this.rockets = newRockets;
  }


  run() {
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].update();
      this.rockets[i].show();
    }
  }
}
