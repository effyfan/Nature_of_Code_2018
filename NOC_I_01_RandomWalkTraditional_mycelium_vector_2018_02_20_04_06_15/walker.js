class Walker {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.position = createVector(width/2, height/2);
    // this.pos = createVector(width/2,height/2);
  }

  render() {
    stroke(255);
    point(this.position.x, this.position.y);
  }

  stepRandom() {
    let newX = this.position.x + 200000;
    let newY = this.position.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 50) {
      let choice = floor(random(4));
      newX = this.position.x;
      newY = this.position.y;
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
    this.position.x = newX;
    this.position.y = newY;
  }

  stepUp() {
    let newX = this.position.x + 200000;
    let newY = this.position.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 240) {
      let choice = floor(random(7));
      newX = this.position.x;
      newY = this.position.y;
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
    this.position.x = newX;
    this.position.y = newY;
  }

  stepDown() {
    let newX = this.position.x + 200000;
    let newY = this.position.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 240) {
      let choice = floor(random(7));
      newX = this.position.x;
      newY = this.position.y;
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
    this.position.x = newX;
    this.position.y = newY;
  }

  stepLeft() {
    let newX = this.position.x + 200000;
    let newY = this.position.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 240) {
      let choice = floor(random(7));
      newX = this.position.x;
      newY = this.position.y;
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
    this.position.x = newX;
    this.position.y = newY;
  }
  
  stepRight() {
    let newX = this.position.x + 200000;
    let newY = this.position.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 240) {
      let choice = floor(random(7));
      newX = this.position.x;
      newY = this.position.y;
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
    this.position.x = newX;
    this.position.y = newY;
  }
 
  stepUpLeft() {
    let newX = this.position.x + 200000;
    let newY = this.position.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 240) {
      let choice = floor(random(6));
      newX = this.position.x;
      newY = this.position.y;
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
    this.position.x = newX;
    this.position.y = newY;
  }

  stepUpRight() {
    let newX = this.position.x + 200000;
    let newY = this.position.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 240) {
      let choice = floor(random(6));
      newX = this.position.x;
      newY = this.position.y;
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
    this.position.x = newX;
    this.position.y = newY;
  }


  stepDownLeft() {
    let newX = this.position.x + 200000;
    let newY = this.position.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 240) {
      let choice = floor(random(6));
      newX = this.position.x;
      newY = this.position.y;
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
    this.position.x = newX;
    this.position.y = newY;
  }
  
  stepDownRight() {
    let newX = this.position.x + 200000;
    let newY = this.position.y + 200000;
    while (dist(newX, newY, width / 2, height / 2) > 240) {
      let choice = floor(random(6));
      newX = this.position.x;
      newY = this.position.y;
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
    this.position.x = newX;
    this.position.y = newY;
  }
}