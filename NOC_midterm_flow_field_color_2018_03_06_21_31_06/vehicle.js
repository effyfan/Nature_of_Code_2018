class Vehicle {
  constructor(x, y, ms, mf) {
  this.color = 0 //加了一个参数color来记录当前的颜色
    this.acc = createVector(0, 0);
    this.vel = createVector(0, 0);
    this.pos = createVector(x, y);
    this.maxspeed = ms || 3;
    this.maxforce = mf || 0.05;
    this.r = 5;
  }

  run() {
    this.update();
    this.borders();
  }
  
  follow(flow) {
    //find out the vector of that sopt in the flow field
    let desired = flow.lookup(this.pos);
    desired.mult(this.maxspeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  
  let cc = flow.color_lookup(this.pos);//调整color的值，color_lookup在flowfields里面
  this.color = map(cc, 0, 85, 0, 255);
  }
  
  // Method to update location
  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  
 
  }

  applyForce(force) {
    this.acc.add(force);
  }
  
  borders() {
    if (this.pos.x < -this.r) this.pos.x = width + this.r;
    if (this.pos.y < -this.r) this.pos.y = height + this.r;
    if (this.pos.x > width + this.r) this.pos.x = -this.r;
    if (this.pos.y > height + this.r) this.pos.y = -this.r;
  }


  display() {
    var theta = this.vel.heading() + PI / 2;
  
    //乱写的一种调色，这种情况下变化更明显
    // colorMode(HSB, 100);
    
    //fill(this.color,100-this.color,3*(100-this.color));
    console.log(this.color);
  
    //这是正确的，从黑和灰之间变化，仔细看才能看出区别
    fill(this.color, this.color, 0);
    // fill(this.color)
    stroke(200);
    noStroke();
    push();
    translate(this.pos.x, this.pos.y);
    rotate(theta);
    beginShape();
    ellipse(0, 0, this.r, this.r*4);
    // vertex(0, -this.r * 2);
    // vertex(-this.r, this.r * 2);
    // vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}