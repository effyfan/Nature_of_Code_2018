let swap = (a, i, j) => {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

// let calcDistance = (points) => {
//   let sum = 0;
//   let d;
//   // console.log(points);
//   for (let i = 0; i < points.length - 1; i++) {
//     d = dist(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y)
//     sum += d;
//   }
//   return sum;
// }


function calcDistance(points, order) {
  var sum = 0;
  let d;
  // console.log(order);
  for (var i = 0; i < order.length - 1; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i + 1];
    var cityB = points[cityBIndex];
    d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    // console.log(cityA, cityB);
    sum += d;
  }
  return sum;
}



let addSelectedToCities = () => {
  for (let i = 0; i < selectedCoorArr.length; i++) {
    let selectedLng = selectedCoorArr[i][0];
    let selectedLat = selectedCoorArr[i][1];
    let selectedPos =  myMap.latLngToPixel(selectedLat, selectedLng);
    selectedCities[i] = {
      lat: selectedLng,
      lon: selectedLat,
      pos: selectedPos
    };
  }
  // console.log(selectedObjectArr);
  // console.log(cities);
  // console.log(population);
  // for (var i = 0; i < population.length; i++) {
  //   let d = calcDistance(selectedObjectArr, population[i]);
  //   recordDistance = d;
  // }
  // copy the array that is the shortest
  bestCoorArr = selectedObjectArr.slice();
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

let drawRoute = () => {
  if (cities.length > 0 && !modifying) {
    // console.log(cities, bestEver);
    // GA
    calculateFitness();
    normalizeFitness();
    nextGeneration();

    for (let i = 0; i < selectedCoorArr.length; i++) {
      let selectedLng = selectedObjectArr[i].x;
      let selectedLat = selectedObjectArr[i].y;
      let selectedPos = myMap.latLngToPixel(selectedLat, selectedLng);
      cities[i] = selectedPos;
    }

    for (let i = 0; i < bestCoorArr.length; i++) {
      let selectedLng2 = bestCoorArr[i].x;
      let selectedLat2 = bestCoorArr[i].y;
      let selectedPos2 = myMap.latLngToPixel(selectedLat2, selectedLng2);
      cities2[i] = selectedPos2;
    }

    // draw current route
    stroke(100, 100, 0, 100);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let i = 0; i < currentBest.length; i++) {
      let n = currentBest[i];
      ellipse(cities[n].x, cities[n].y, 5, 5);
      vertex(cities[n].x, cities[n].y);
    }
    endShape();

    // draw best Ever route
    stroke(255, 100, 100);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i < bestEver.length; i++) {
      let n = bestEver[i];
      // draw lines between cities
      vertex(cities2[n].x, cities2[n].y);
    }
    endShape();

    // let i = floor(random(cities.length));
    // let j = floor(random(cities.length));
    // if (i > 0 && j > 0) {
    //   swap(selectedObjectArr, i, j)
    // }

    // after swap, check d again and make the shorter one the current d
    for (var k = 0; k < population.length; k++) {
      let d = calcDistance(selectedObjectArr, population[k]);
      if (d < recordDistance) {
        recordDistance = d;
        bestCoorArr = selectedObjectArr.slice();
      }
    }
  }
}
