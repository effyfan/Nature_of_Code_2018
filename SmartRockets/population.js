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
    // createP(maxfit);
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


  run(histories) {
    for (let i = 0; i < this.popsize; i++) {
      this.rockets[i].update(histories);
      this.rockets[i].show();
      this.rockets[i].drawtail(255, 0, 0);
    }
  }
}
