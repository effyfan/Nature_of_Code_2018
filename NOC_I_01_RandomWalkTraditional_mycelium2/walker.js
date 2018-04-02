class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    // this.pos = createVector(width/2,height/2);
  }

  render() {
    stroke(255);
    point(this.x, this.y);
  }

  stepRandom() {
    let newX = this.x + 200000;
    let newY = this.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 50) {
      let choice = floor(random(4));
      newX = this.x;
      newY = this.y;
      if (choice === 0) {
        newX ++;
      } else if (choice == 1) {
        newX --;
      } else if (choice == 2) {
        newY ++;
      } else if (choice == 3) {
        newY --;
      }
    }
    this.x = newX;
    this.y = newY;
  }

  stepUp() {
    let newX = this.x + 200000;
    let newY = this.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 240) {
      let choice = floor(random(7));
      newX = this.x;
      newY = this.y;
      if (choice === 0 || choice == 5) {
        newX ++;
      } else if (choice == 1 || choice == 6) {
        newX --;
      } else if (choice == 2) {
        newY++;
      } else if (choice == 3 || choice == 4) {
        newY--;
      }
    }
    this.x = newX;
    this.y = newY;
  }

  stepDown() {
    let newX = this.x + 200000;
    let newY = this.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 240) {
      let choice = floor(random(7));
      newX = this.x;
      newY = this.y;
       if (choice === 0 || choice == 5) {
        newX ++;
      } else if (choice == 1 || choice == 6) {
        newX --;
      } else if (choice == 2 || choice == 3) {
        newY++;
      } else if (choice == 4) {
        newY--;
      }
    }
    this.x = newX;
    this.y = newY;
  }

  stepLeft() {
    let newX = this.x + 200000;
    let newY = this.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 240) {
      let choice = floor(random(7));
      newX = this.x;
      newY = this.y;
       if (choice === 0) {
        newX ++;
      } else if (choice == 1 || choice == 2) {
        newX --;
      } else if (choice == 3 || choice == 4) {
        newY++;
      } else if (choice == 5 || choice == 6) {
        newY--;
      }
    }
    this.x = newX;
    this.y = newY;
  }
  
  stepRight() {
    let newX = this.x + 200000;
    let newY = this.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 240) {
      let choice = floor(random(7));
      newX = this.x;
      newY = this.y;
       if (choice === 0 || choice == 1) {
        newX ++;
      } else if (choice == 2) {
        newX --;
      } else if (choice == 3 || choice == 4) {
        newY++;
      } else if (choice == 5 || choice == 6) {
        newY--;
      }
    }
    this.x = newX;
    this.y = newY;
  }
 
  stepUpLeft() {
    let newX = this.x + 200000;
    let newY = this.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 240) {
      let choice = floor(random(6));
      newX = this.x;
      newY = this.y;
       if (choice === 0) {
        newX ++;
      } else if (choice == 1 || choice == 2) {
        newX --;
      } else if (choice == 3) {
        newY++;
      } else if (choice == 4 || choice == 5) {
        newY--;
      }
    }
    this.x = newX;
    this.y = newY;
  }

  stepUpRight() {
    let newX = this.x + 200000;
    let newY = this.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 240) {
      let choice = floor(random(6));
      newX = this.x;
      newY = this.y;
       if (choice === 0 || choice == 1) {
        newX ++;
      } else if (choice == 2) {
        newX --;
      } else if (choice == 3) {
        newY++;
      } else if (choice == 4 || choice == 5) {
        newY--;
      }
    }
    this.x = newX;
    this.y = newY;
  }


  stepDownLeft() {
    let newX = this.x + 200000;
    let newY = this.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 240) {
      let choice = floor(random(6));
      newX = this.x;
      newY = this.y;
       if (choice === 0) {
        newX ++;
      } else if (choice == 1 || choice == 2) {
        newX --;
      } else if (choice == 3 || choice == 4) {
        newY++;
      } else if (choice == 5) {
        newY--;
      }
    }
    this.x = newX;
    this.y = newY;
  }
  
  stepDownRight() {
    let newX = this.x + 200000;
    let newY = this.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 240) {
      let choice = floor(random(6));
      newX = this.x;
      newY = this.y;
       if (choice === 0 || choice == 1) {
        newX ++;
      } else if (choice == 2) {
        newX --;
      } else if (choice == 3 || choice == 4) {
        newY++;
      } else if (choice == 5) {
        newY--;
      }
    }
    this.x = newX;
    this.y = newY;
  }

  constrain() {
    let a = this.x * this.x + this.y * this.y;
    let b = 230400;
    a = constrain(0, b);
  }
}