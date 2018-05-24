let cities = [];
let totalCities = 5;
let recordDistance = Infinity;
let bestEver;

let popSize= 300;
let population = [];
let fitness = [];

function setup() {
  createCanvas(400, 400);
  // create an order array
  let order = [];
  for (let i = 0; i < totalCities; i++) {
    let v = createVector(random(width), random(height));
    cities[i] = v;
    order[i] = i;
  }

  // add a population of orders
  for (var i = 0; i < popSize; i++){
    population[i] = shuffle(order);
    // shuffle(population[i], 15);
  }
  // console.log(population);

  // for (var i = 0; i < population.length; i++){
  //   let d = calcDistance(cities, population[i]);
  //   if (d < recordDistance){
  //     recordDistance = d;
  //     bestEver = population[i];
  //   }
  //   fitness[i] = d;
  //
  // }

  // let d = calcDistance(cities);
  // recordDistance = d;
  // // copy the array that is  the shortest
  // bestEver = cities.slice();
}

function draw() {
  background(0);

  // GA
  calculateFitness();
  normalizeFitness();
  nextGeneration();

  // // draw current route
  // stroke(255);
  // strokeWeight(2);
  // noFill();
  // beginShape();
  // for (let i = 0; i < totalCities; i++) {
  //   // draw a circle on the cities
  //   ellipse(cities[i].x, cities[i].y, 5, 5);
  //   // draw lines between cities
  //   vertex(cities[i].x, cities[i].y);
  // }
  // endShape();
  // // draw best Ever route
  // stroke(255, 100, 100);
  // strokeWeight(2);
  // noFill();
  // beginShape();
  // for (let i = 0; i < totalCities; i++) {
  //   // draw lines between cities
  //   vertex(bestEver[i].x, bestEver[i].y);
  // }
  // endShape();

  // Genetic Alg code, just draw the best one
  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < bestEver.length; i++) {
    let n = bestEver[i];
    // draw a circle on the cities
    ellipse(cities[n].x, cities[n].y, 5, 5);
    // draw lines between cities
    vertex(cities[n].x, cities[n].y);
  }
  endShape();
}

// function shuffle(a, num){
//   // a is the array, indexA B are the index number, swap num times
//   for (let i = 0; i < num; i++){
//     let indexA = floor(random(a.length));
//     let indexB = floor(random(a.length));
//     swap(a, indexA, indexB);
//   }
// }

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points) {
  let sum = 0;
  let d;
  for (let i = 0; i < points.length - 1; i++) {
    d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
    sum += d;
  }
  return sum;
}
