//failure attempts to add GA!!

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
let recordDistance = Infinity;
let bestCoorArr;
let bestEver;
var currentBest;

let popSize = 500;
let population = [];
let fitness = [];
let order = [];

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
      // let selection = {
      //   name: selectedPlace,
      //   coord: selectedCoor
      // }

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
        // selections.push(selection);
      }
      // clear the array everytime click the buttons
      selectedObjectArr = [];
      cities = [];
      cities2 = [];
      order = [];
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
        order[i] = i;
      }
      // console.log(selectedArr);
      // console.log(selectedCoorArr);
      for (var i = 0; i < popSize; i++) {
        population[i] = shuffle(order);
      }
    }
  }

  button = createButton('Confirm');
  button.position(100, 95);
  button.size(60, 35);
  button.mousePressed(addSelectedToCities);
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
    placeName = datasheet.features[i].properties.Name;

  }

  drawRoute();
}
