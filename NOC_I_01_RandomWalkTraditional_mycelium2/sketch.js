let walker = [];
let walker1 = [];
let walker2 = [];
let walker3 = [];
let walker4 = [];
let walker5 = [];
let walker6 = [];
let walker7 = [];
let walker8 = [];

function setup() {
  createCanvas(640, 480);
  for (let i = 0; i < 10; i++) {
    walker[i] = new Walker();
    walker1[i] = new Walker();
    walker2[i] = new Walker();
    walker3[i] = new Walker();
    walker4[i] = new Walker();
    walker5[i] = new Walker();
    walker6[i] = new Walker();
    walker7[i] = new Walker();
    walker8[i] = new Walker();
  }
  background(0);
  // fill("red");
  // ellipse(width/2, height/2, 480, 480);
}

function draw() {
  for (let i = 0; i < 10; i++) {
    walker[i].render();
    walker[i].stepRandom();   
    walker[i].constrain(); 
    
    walker[i].render();
    walker[i].stepRandom();   
    walker[i].constrain();
    
    walker1[i].render();
    walker1[i].stepUp();
    walker1[i].constrain();
    
    walker2[i].render();
    walker2[i].stepDown();
    walker2[i].constrain();
    
    walker3[i].render();
    walker3[i].stepLeft();
    walker3[i].constrain();
    
    walker4[i].render();
    walker4[i].stepRight();
    walker4[i].constrain();
    
    walker5[i].render();
    walker5[i].stepUpLeft();
    walker5[i].constrain();
    
    walker6[i].render();
    walker6[i].stepUpRight();
    walker6[i].constrain();
    
    walker7[i].render();
    walker7[i].stepDownLeft();
    walker7[i].constrain();
    
    walker8[i].render();
    walker8[i].stepDownRight();
    walker8[i].constrain();
  }
}