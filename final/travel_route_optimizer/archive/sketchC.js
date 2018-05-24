let url1 = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/-74,40.75,1,0,0/1024x512?access_token='
let apiKey = 'pk.eyJ1IjoiZWZmeWZhbiIsImEiOiJjajh6N3psdGMwZjZtMzJvNGx5Ym54aTdkIn0.BcJIyPZ2FXZBbVWg71unOA'
let datasheet;
let coor;
let name;
let myMap;
var canvas;
let mappa;
let options = {
  lat: 40.7,
  lng: -74,
  zoom: 9,
  style: 'mapbox://styles/effyfan/cj91vol42g93z2rmiqyhjfref'
}

// Cities
var cities = [];
var totalCities = 3;

// Best path overall
var recordDistance = Infinity;
var bestEver;

// Population of possible orders
var population = [];
var popTotal = 100;

var dropDownDiv;

function preload() {
  datasheet = loadJSON("places.json");
}

function setup() {
  canvas = createCanvas(800, 600);
  canvas.parent('canvas-holder');
  mappa = new Mappa('Mapboxgl', apiKey);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  imageMode(CENTER);

  // Make random cities
  for (var i = 0; i < totalCities; i++) {
    var v = createVector(random(10, width - 10), random(10, height / 2 - 10));

    // var v = createVector(lat, log);
    cities[i] = v;
  }

  // Create population
  for (var i = 0; i < popTotal; i++) {
    population[i] = new DNA(totalCities);
  }

  // put the element in id 'myDropdown' into dropDownDiv, this is our father for all the buttons
  dropDownDiv = document.getElementById('myDropdown');

  for (let i = 0; i < datasheet.features.length; i++) {
    name = datasheet.features[i].properties.Name;

    let pointBtn = document.createElement('button');
    // give id and class to the buttons in javascript so HTML will recognize them
    pointBtn.id = name;
    pointBtn.className = 'placeButton';
    // console.log(pointBtn);
    // make the buttons childrens of the dropDownDiv which is in an HTML father
    dropDownDiv.appendChild(pointBtn);
    // put the name data in my JSON to the buttons
    pointBtn.innerHTML = name;
    pointBtn.onclick = function(){
    }

    // create a button
    // with innerHTML = name
    // call function , pass the place to the function
    // in the function, toggle display on the map
    // give the button a background to indicate it is selected
    //
    // a 'list' to holder what we have selected;
    // var whatToHightlight = [];
    // when we click the button, push the place into the list;
    //
    // whatToHightlight.push(name);
    // so the canvas can know what to hightlight;
    // when drawing for xx in whatToHightlight, if xx is what we are currently drawing, draw it differently

  }
}

function draw() {
  // background(0);
  clear();
  for (let i = 0; i < datasheet.features.length; i++) {
    coor = datasheet.features[i].geometry.coordinates;
    let lat = coor[1];
    let lng = coor[0];
    let pos = myMap.latLngToPixel(lat, lng);
    console.log(pos.x, pos.y);
    noStroke();
    fill(255, 0, 0, 100);
    ellipse(pos.x, pos.y, 10, 10);
    // console.log(pos.x, pos.y);
    name = datasheet.features[i].properties.Name;
    text(name, pos.x, pos.y);
  }

  // Each round let's find the best and worst
  var minDist = Infinity;
  var maxDist = 0;

  // Search for the best this round and overall
  var bestNow;
  for (var i = 0; i < population.length; i++) {
    var d = population[i].calcDistance();

    // Is this the best ever?
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }

    // Is this the best this round?
    if (d < minDist) {
      minDist = d;
      bestNow = population[i];
    }

    // Is this the worst?
    if (d > maxDist) {
      maxDist = d;
    }
  }

  // Show the best this round
  // bestNow.show();
  translate(0, height / 2);
  line(0, 0, width, 0);
  // Show the best ever!
  bestEver.show();

  // Map all the fitness values between 0 and 1
  var sum = 0;
  for (var i = 0; i < population.length; i++) {
    sum += population[i].mapFitness(minDist, maxDist);
  }

  // Normalize them to a probability between 0 and 1
  for (var i = 0; i < population.length; i++) {
    population[i].normalizeFitness(sum);
  }

  // Selection

  // A new population
  var newPop = [];

  // Sam population size
  for (var i = 0; i < population.length; i++) {

    // This is a new algorithm to select based on fitness probability!
    // It only works if all the fitness values are normalized and add up to 1

    // Start at 0
    var index = 0;

    // Pick a random number between 0 and 1
    var r = random(1);

    // Keep subtracting probabilities until you get less than zero
    // Higher probabilities will be more likely to be fixed since they will
    // subtract a larger number towards zero
    while (r > 0) {
      r -= population[index].fitness;
      // And move on to the next
      index += 1;
    }

    // Go back one
    index -= 1;

    // Clone exactly, no crossover!
    newPop[i] = new DNA(totalCities, population[index].order);
  }

  // New population!
  population = newPop;
}
