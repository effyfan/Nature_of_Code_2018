// add Traveling Salesman!!


let url1 = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/-74,40.75,1,0,0/1024x512?access_token='
let apiKey = 'pk.eyJ1IjoiZWZmeWZhbiIsImEiOiJjajh6N3psdGMwZjZtMzJvNGx5Ym54aTdkIn0.BcJIyPZ2FXZBbVWg71unOA'
let datasheet;
let coor;

let myMap;
let canvas;
let mappa;
let options = {
  lat: 40.7,
  lng: -74,
  zoom: 9,
  style: 'mapbox://styles/effyfan/cj91vol42g93z2rmiqyhjfref'
}

let dropDownDiv;
let selectedArr = [];
let selectedCoorArr = [];
let placeName;
// let placeID;

// Cities
let cities = [];
let totalCities = 10;
// Best path overall
let recordDistance = Infinity;
let bestEver;
// Population of possible orders
let population = [];
let popTotal = 100;
let button;

function preload() {
  datasheet = loadJSON("places.json");
}

function setup() {
  canvas = createCanvas(600, 400);
  // canvas.parent('canvas-holder');
  mappa = new Mappa('Mapboxgl', apiKey);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  document.getElementById('mappa');
  imageMode(CENTER);

  // put the element in id 'myDropdown' into dropDownDiv, this is our father for all the buttons
  dropDownDiv = document.getElementById('myDropdown');

  for (let i = 0; i < datasheet.features.length; i++) {
    placeName = datasheet.features[i].properties.Name;
    // placeID = datasheet.features[i].id;
    coor = datasheet.features[i].geometry.coordinates;
    let pointBtn = document.createElement('button');
    // give id and class to the buttons in javascript so HTML will recognize them
    pointBtn.id = placeName;
    pointBtn.className = 'placeButton';
    // console.log(pointBtn);
    // make the buttons childrens of the dropDownDiv which is in an HTML father
    dropDownDiv.appendChild(pointBtn);
    // put the name data in my JSON to the buttons
    pointBtn.innerHTML = placeName;

    //toggle the selected place when clicked
    pointBtn.onclick = function() {
      let selectedPlace = this.innerHTML;
      let selectedCoor = getCoorByName(selectedPlace);

      if (this.className == 'selectedButton') {
        this.className = 'placeButton';
        // get index of the place to splice
        let index = selectedArr.indexOf(selectedPlace);
        if (index !== -1) {
          selectedArr.splice(index, 1);
          selectedCoorArr.splice(index, 1);
          // console.log(selectedCoorArr);
        }
        // console.log(selectedArr);
      } else {
        this.className = 'selectedButton';
        selectedArr.push(selectedPlace);
        selectedCoorArr.push(selectedCoor);
        // console.log(selectedCoorArr);
        // console.log(selectedArr);
      }
    }
  }

  button = createButton('Plan My Route');
  button.position(100, 60);
  button.size(60, 35);


  for (let i = 0; i < totalCities; i++) {
    let v = createVector(random(10, width - 10), random(10, height / 2 - 10));
    // let v = createVector(lat, log);
    cities[i] = v;
  }

  // Create population
  for (let i = 0; i < popTotal; i++) {
    population[i] = new DNA(totalCities);
  }
}

let drawRoute = () => {
  for (let i = 0; i < selectedArr.length; i++) {
    let coorX = selectedCoorArr[i][0];
    let coorY = selectedCoorArr[i][1];
    let v = createVector(coorX, coorY);
    cities[i] = v;
  }
  // Each round let's find the best and worst
  let minDist = Infinity;
  let maxDist = 0;

  // Search for the best this round and overall
  let bestNow;
  for (let i = 0; i < population.length; i++) {
    let d = population[i].calcDistance();

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
  let sum = 0;
  for (let i = 0; i < population.length; i++) {
    sum += population[i].mapFitness(minDist, maxDist);
  }

  // Normalize them to a probability between 0 and 1
  for (let i = 0; i < population.length; i++) {
    population[i].normalizeFitness(sum);
  }

  // Selection

  // A new population
  let newPop = [];

  // Sam population size
  for (let i = 0; i < population.length; i++) {

    // This is a new algorithm to select based on fitness probability!
    // It only works if all the fitness values are normalized and add up to 1

    // Start at 0
    let index = 0;

    // Pick a random number between 0 and 1
    let r = random(1);

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

// this function will return the coordinates of the selected place
let getCoorByName = (NYCplaceName) => {
  let NYCplaceCoor;
  for (let i = 0; i < datasheet.features.length; i++) {
    if (NYCplaceName == datasheet.features[i].properties.Name) {
      NYCplaceCoor = datasheet.features[i].geometry.coordinates;
      break;
    }
  }
  // if NYCplaceCoor == undefined
  // console.log("Error");
  // return;
  return NYCplaceCoor;
}


function draw() {
  clear();
  for (let i = 0; i < datasheet.features.length; i++) {
    placeName = datasheet.features[i].properties.Name;
    coor = datasheet.features[i].geometry.coordinates;
    let lat = coor[1];
    let lng = coor[0];
    let pos = myMap.latLngToPixel(lat, lng);
    // console.log(pos.x, pos.y);
    noStroke();
    if (selectedArr.includes(placeName)) {
      fill(255, 100, 100, 200);
    } else {
      fill(0, 50);
    }
    ellipse(pos.x, pos.y, 5, 5);
    // console.log(pos.x, pos.y);
    placeName = datasheet.features[i].properties.Name;
    text(placeName, pos.x, pos.y);
  }

  if (selectedArr.length > 2) {
      button.mousePressed(drawRoute());
  }
}
