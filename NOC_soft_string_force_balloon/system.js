class BalloonSystem {

  constructor(pos) {
    this.origin = pos.copy();
    this.m = [];
  }

  addBalloon() {
    this.m.push(new Balloon(this.origin));
  }

  applyForce(force) {
    for (let p of this.m) {
      p.applyForce(force);
    }
  }

  run() {
    for (let p of this.m) {
      p.run();
    }
    this.m = this.m.filter(p => !p.isFinished());
  }
}
