// clean up
// add animation
// animation won't follow the zoom

let modifying = true;

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
  style: 'mapbox://styles/mapbox/basic-v9'
}

let dropDownDiv;
let selectedArr = [];
let selectedCoorArr = [];
let placeName;
let selectedObjectArr = [];
let selectedLng;
let selectedLat;
let selectedPos;

// Cities
let cities = [];
let recordDistance = Infinity;
let bestEver;

// Population of possible orders
let population = [];
let popTotal = 100;

// store cities with the bestEver order in here
let vertices = [];
// variable to hold how many frames have elapsed in the animation
let t = 1;
let ctx
let points;
let blueDotW = 3;

function preload() {
  datasheet = loadJSON("places.json");
}

function setup() {
  canvas = createCanvas(600, 400);
  canvas.id("thecanvas");
  let thecanvas = document.getElementById("thecanvas");
  // canvas = document.getElementById("canvas");
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
    // make the buttons childrens of the dropDownDiv which is in an HTML father
    dropDownDiv.appendChild(pointBtn);
    // put the name data in my JSON to the buttons
    pointBtn.innerHTML = placeName;

    //toggle the selected place when clicked
    pointBtn.onclick = function() {
      modifying = true;
      let selectedPlace = this.innerHTML;
      let selectedCoor = getCoorByName(selectedPlace);

      if (this.className == 'selectedButton') {
        this.className = 'placeButton';
        // get index of the place to splice
        let index = selectedArr.indexOf(selectedPlace);
        if (index !== -1) {
          selectedArr.splice(index, 1);
          selectedCoorArr.splice(index, 1);
        }
      } else {
        this.className = 'selectedButton';
        selectedArr.push(selectedPlace);
        selectedCoorArr.push(selectedCoor);
      }
      // clear the array everytime click the buttons
      selectedObjectArr = [];
      cities = [];
      population = [];
      vertices = [];
      points = [];
      recordDistance = Infinity;

      // convert selected coordinates array into selected object array
      for (let i = 0; i < selectedCoorArr.length; i++) {
        selectedObjectArr[i] = {
          x: selectedCoorArr[i][0],
          y: selectedCoorArr[i][1]
        };
        selectedLng = selectedObjectArr[i].x;
        selectedLat = selectedObjectArr[i].y;
        selectedPos = myMap.latLngToPixel(selectedLat, selectedLng);
        cities[i] = selectedPos;
        vertices[i] = selectedPos;
      }
    }
  }

  button = createButton('Confirm');
  button.position(130, 95);
  button.size(60, 35);
  button.mousePressed(addSelectedToCities);

  button2 = createButton('Walk Me Throug The Shortest Route');
  button2.position(810, 95);
  button2.size(120, 35);
  button2.mousePressed(drawAnimation);
}

let addSelectedToCities = () => {
  for (let i = 0; i < selectedCoorArr.length; i++) {
    selectedObjectArr[i] = {
      x: selectedCoorArr[i][0],
      y: selectedCoorArr[i][1]
    };
    selectedLng = selectedObjectArr[i].x;
    selectedLat = selectedObjectArr[i].y;
    selectedPos = myMap.latLngToPixel(selectedLat, selectedLng);
    cities[i] = selectedPos;
    vertices[i] = selectedPos;
  }

  // Create population
  for (let i = 0; i < popTotal; i++) {
    population[i] = new DNA(selectedCoorArr.length);
  }
  modifying = false;
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
    noStroke();
    if (selectedArr.includes(placeName)) {
      fill(255, 100, 100, 200);
      text(placeName, pos.x, pos.y);
    } else {
      fill(0, 50);
    }
    ellipse(pos.x, pos.y, 5, 5);
    // console.log(pos.x, pos.y);
  }

  // draw legends
  let lineAx1 = 380;
  let lineAx2 = 430;
  let lineAy = 370;
  let lineBx1 = 380;
  let lineBx2 = 430;
  let lineBy = 350;
  strokeWeight(1);
  fill(255);
  stroke(255, 0, 0);
  line(lineAx1, lineAy, lineAx2, lineAy);
  ellipse(lineAx1, lineAy, 5);
  ellipse(lineAx2, lineAy, 5);
  noStroke();
  fill(255, 0, 0);
  text("Current Shortest", lineAx2 + 20, lineAy+5);
  stroke(255, 150, 150);
  line(lineBx1, lineBy, lineBx2, lineBy);
  noStroke();
  fill(255, 100, 100);
  text("Current Calculation", lineBx2 + 20, lineBy+5);

  drawRoute();
}

let drawRoute = () => {
  if (cities.length > 0 && !modifying) {
    for (let i = 0; i < selectedCoorArr.length; i++) {
      selectedLng = selectedObjectArr[i].x;
      selectedLat = selectedObjectArr[i].y;
      selectedPos = myMap.latLngToPixel(selectedLat, selectedLng);
      cities[i] = selectedPos;
    }

    let minDist = Infinity;
    let maxDist = 0;
    let bestNow;
    for (let i = 0; i < population.length; i++) {
      let d = population[i].calcDistance();
      if (d < recordDistance) {
        recordDistance = d;
        bestEver = population[i];
      }
      if (d < minDist) {
        minDist = d;
        bestNow = population[i];
      }
      if (d > maxDist) {
        maxDist = d;
      }
    }

    // console.log(bestEver);
    bestNow.show(255, 200, 200);
    bestEver.show(255, 0, 0);
    // bestEver.store();

    let sum = 0;
    for (let i = 0; i < population.length; i++) {
      sum += population[i].mapFitness(minDist, maxDist);
    }
    for (let i = 0; i < population.length; i++) {
      population[i].normalizeFitness(sum);
    }
    let newPop = [];
    for (let i = 0; i < population.length; i++) {
      let index = 0;
      let r = random(1);
      while (r > 0) {
        r -= population[index].fitness;
        index += 1;
      }
      index -= 1;
      newPop[i] = new DNA(selectedObjectArr.length, population[index].order);
    }
    population = newPop;
  }
}




function drawAnimation() {
  ctx = thecanvas.getContext("2d");
  // calculate incremental points along the path
  points = calcWaypoints(vertices);
  // extend the line from start to finish with animation
  animate(points);
  console.log(vertices);
  // draw from the begining everytime press the button
  t = 1;
}

// calc waypoints traveling along vertices
function calcWaypoints(vertices) {
  let waypoints = [];
  for (let i = 1; i < vertices.length; i++) {
    let pt0 = vertices[i - 1];
    let pt1 = vertices[i];
    let dx = pt1.x - pt0.x;
    let dy = pt1.y - pt0.y;
    for (let j = 0; j < 100; j++) {
      let x = pt0.x + dx * j / 100;
      let y = pt0.y + dy * j / 100;
      waypoints.push({
        x: x,
        y: y
      });
    }
  }
  return (waypoints);
}

function animate() {
  if (t < points.length - 1) {
    requestAnimationFrame(animate);
  }
  // draw a line segment from the last waypoint to the current waypoint
  // ctx.lineCap = "round";
  ctx.lineWidth = blueDotW;
  blueDotW += 0.5;
  blueDotW %= 10;
  ctx.strokeStyle = "steelblue";
  ctx.beginPath();
  ctx.moveTo(points[t - 1].x, points[t - 1].y);
  ctx.lineTo(points[t].x, points[t].y);
  ctx.stroke();
  // increment "t" to get the next waypoint
  t++;
  // start from the begining point when finish drawing
  if (t >= points.length - 1) {
    t = 1;
  }
}
