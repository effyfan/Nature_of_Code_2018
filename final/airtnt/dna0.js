// A generic function to swap two elements in an array
function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

class DNA {
  constructor(total, order) {
    this.dist = Infinity;
    this.fitness = 0;

    // Is this being made from another DNA object?
    if (order instanceof Array) {
      // Just copy the order
      this.order = order.slice();
      // Mutation
      // 50% of the time shuffle one spot to see if it improves
      if (random(1) < 0.5) {
        this.shuffle();
      }
    } else {
      // Create a random order
      this.order = [];
      for (var i = 0; i < total; i++) {
        this.order[i] = i;
      }
      // Shuffle randomly 100 times
      // Is this good enough for variation?
      for (var n = 0; n < 100; n++) {
        this.shuffle();
      }
    }
  }

  // Shuffle array one time
  shuffle() {
    var i = floor(random(this.order.length));
    var j = floor(random(this.order.length));
    if (i > 0 && j > 0) {
      swap(this.order, i, j);
    }
  }
  // How long is this particular path?
  calcDistance() {
    var sum = 0;
    for (var i = 0; i < this.order.length - 1; i++) {
      var cityAIndex = this.order[i];
      var cityA = cities[cityAIndex];
      var cityBIndex = this.order[i + 1];
      var cityB = cities[cityBIndex];
      var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
      sum += d;
    }
    this.dist = sum;
    return sum;
  }
  // Map the fitess where shortest is best, longest is worst
  mapFitness(minD, maxD) {
    this.fitness = map(this.dist, minD, maxD, 1, 0);
    return this.fitness;
  }

  // Normalize against total fitness
  normalizeFitness(total) {
    this.fitness /= total;
  }

  // store(){
  //   vertices = [];
  //   for (var i = 0; i < this.order.length; i++) {
  //     var n = this.order[i];
  //     vertices.push({
  //         x: cities[n].x,
  //         y: cities[n].y
  //     });
  //     // console.log(vertices);
  //   }
  // }

  show(r, g, b) {
    vertices = [];
    // Lines
    stroke(r, g, b);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < this.order.length; i++) {
      var n = this.order[i];
      vertex(cities[n].x, cities[n].y);
      //store vertices in the bestEver order
      vertices.push({
          x: cities[n].x,
          y: cities[n].y
      });
    }
    endShape();

    // Cities
    fill(255);
    for (var i = 0; i < this.order.length; i++) {
      var n = this.order[i];
      ellipse(cities[n].x, cities[n].y, 6, 6);
    }
  }
}
