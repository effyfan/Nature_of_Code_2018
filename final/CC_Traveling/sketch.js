let cities = [];
let totalCities = 5;
let recordDistance;
let bestEver;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < totalCities; i++) {
    let v = createVector(random(width), random(height));
    cities[i] = v;
  }
  let d = calcDistance(cities);
  recordDistance = d;
  // copy the array that is the shortest
  bestEver = cities.slice();
}

function draw() {
  background(0);
  for (let i = 0; i < totalCities; i++) {
    // draw a circle on the cities
    ellipse(cities[i].x, cities[i].y, 5, 5);
  }

  // draw current route
  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < totalCities; i++) {
    // draw lines between cities
    vertex(cities[i].x, cities[i].y);
  }
  endShape();

  // draw best Ever route
  stroke(255, 100, 100);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let i = 0; i < totalCities; i++) {
    // draw lines between cities
    vertex(bestEver[i].x, bestEver[i].y);
  }
  endShape();

  let i = floor(random(totalCities));
  let j = floor(random(totalCities));
  swap(cities, i, j)

  // after swap, check d again and make the shorter one the current d
  let d = calcDistance(cities);
  if(d < recordDistance){
    recordDistance = d;
    bestEver = cities.slice();
    console.log(recordDistance);
  }
}

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
