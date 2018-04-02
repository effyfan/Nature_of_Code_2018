class FlowField {

  constructor(r) {
    // How large is each "cell" of the flow field
    this.resolution = r;
    // Determine the number of columns and rows based on sketch's width and height
    this.cols = width / this.resolution;
    this.rows = height / this.resolution;
    this.field = this.make2Darray(this.cols);
    this.init();
  }

  init() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let x = i * this.resolution;
        let y = j * this.resolution;
        this.field[i][j] = createVector(width / 2 - x, height / 2 - y);
        this.field[i][j].normalize();
      }
    }

    for (let i = 0; i < this.cols - 1; i++) {
      for (let j = 0; j < this.rows - 1; j++) {
        let x = i * this.resolution;
        let y = j * this.resolution;
        let index = x + y * img.width;
        let color = img.pixels[index * 4];
        let b = brightness([color]);
        console.log(b);
        // let c = img.pixels[x+y*img.width];
        let theta = map(b, 0, 255, TWO_PI, 0);
        this.field[i][j] = createVector(cos(theta), sin(theta));
      }
    }
    return b;

  }

  make2Darray(n) {
    let array = [];
    for (let i = 0; i < n; i++) {
      array[i] = [];
    }
    return array;
  }

  // Draw every vector
  display() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.drawVector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 2);
        // this.drawVector(0, 0, 100, 100);
        // console.log(i+"  "+ j);
      }
    }
  }

  lookup(lookup) {
    let column = Math.floor(constrain(lookup.x / this.resolution, 0, this.cols - 1));
    let row = Math.floor(constrain(lookup.y / this.resolution, 0, this.rows - 1));
    //println(lookup.x);
    return this.field[column][row].copy();
  }

  // Renders a vector object 'v' as an arrow and a location 'x,y'
  drawVector(v, x, y, scayl) {
    push();
    let arrowsize = 4;
    // Translate to location to render vector
    translate(x, y);
    stroke(200, 100);
    // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
    rotate(v.heading());
    // Calculate length of vector & scale it to be bigger or smaller if necessary
    let len = v.mag() * scayl;
    // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
    line(0, 0, len, 0);
    //line(len,0,len-arrowsize,+arrowsize/2);
    //line(len,0,len-arrowsize,-arrowsize/2);
    pop();
  }
}