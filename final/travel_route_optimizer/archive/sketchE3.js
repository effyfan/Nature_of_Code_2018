// add the starting point
// swap excluding the first place selectedLng

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
  style: 'mapbox://styles/effyfan/cj91vol42g93z2rmiqyhjfref'
}

let dropDownDiv;
let selectedArr = [];
let selectedCoorArr = [];
let placeName;
let selectedObjectArr = [];

// Cities
let cities = [];
let totalCities = 10;
let recordDistance;
let bestEver;

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
          // selectedObjectArr.splice(index, 1);
        }
      } else {
        this.className = 'selectedButton';
        selectedArr.push(selectedPlace);
        selectedCoorArr.push(selectedCoor);
      }
      // clear the array everytime click the buttons
      selectedObjectArr = [];
      cities = [];
      cities2 = [];
      // convert selected coordinates array into selected object array
      for (let i = 0; i < selectedCoorArr.length; i++) {
        selectedObjectArr[i] = {
          x: selectedCoorArr[i][0],
          y: selectedCoorArr[i][1]
        };
        let selectedLng = selectedObjectArr[i].x;
        let selectedLat = selectedObjectArr[i].y;
        let selectedPos = myMap.latLngToPixel(selectedLat, selectedLng);
        cities[i] = selectedPos;
      }
      // console.log(selectedArr);
      // console.log(selectedCoorArr);
    }
  }

  button = createButton('Confirm');
  button.position(100, 95);
  button.size(60, 35);
  button.mousePressed(addSelectedToCities);
}

let drawReferrence = () => {
  console.log("you pressed the button");
}

let addSelectedToCities = () => {
  for (let i = 0; i < selectedCoorArr.length; i++) {
    selectedObjectArr[i] = {
      x: selectedCoorArr[i][0],
      y: selectedCoorArr[i][1]
    };
    let selectedLng = selectedObjectArr[i].x;
    let selectedLat = selectedObjectArr[i].y;
    let selectedPos = myMap.latLngToPixel(selectedLat, selectedLng);
    cities[i] = selectedPos;
  }
  // console.log(selectedObjectArr);
  // console.log(cities);

  let d = calcDistance(selectedObjectArr);
  recordDistance = d;
  // copy the array that is the shortest
  bestEver = selectedObjectArr.slice();
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

  drawRoute();
}

let drawRoute = () => {
  if (cities.length > 0 && !modifying) {
    for (let i = 0; i < selectedCoorArr.length; i++) {
      let selectedLng = selectedObjectArr[i].x;
      let selectedLat = selectedObjectArr[i].y;
      let selectedPos = myMap.latLngToPixel(selectedLat, selectedLng);
      cities[i] = selectedPos;

      let selectedLng2 = bestEver[i].x;
      let selectedLat2 = bestEver[i].y;
      let selectedPos2 = myMap.latLngToPixel(selectedLat2, selectedLng2);
      cities2[i] = selectedPos2;
    }

    for (let i = 0; i < cities.length; i++) {
      // draw a circle on the cities
      ellipse(cities[i].x, cities[i].y, 5, 5);
    }

    // draw current route
    stroke(100, 0, 0, 100);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < cities.length; i++) {
      // draw lines between cities
      vertex(cities[i].x, cities[i].y);
    }
    endShape();

    // draw best Ever route
    stroke(255, 100, 100);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < cities2.length; i++) {
      // draw lines between cities
      vertex(cities2[i].x, cities2[i].y);
    }
    endShape();

    let i = floor(random(cities.length));
    let j = floor(random(cities.length));
    if (i > 0 && j > 0){
      swap(selectedObjectArr, i, j)
    }

    // after swap, check d again and make the shorter one the current d
    let d = calcDistance(selectedObjectArr);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = selectedObjectArr.slice();
    }
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
  // console.log(points);
  for (let i = 0; i < points.length - 1; i++) {
    d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
    sum += d;
  }
  return sum;
}
