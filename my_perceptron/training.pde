float f(float x){
 // y = mx + b
 return -0.3 * x + 0.2;  
}


class Point {
  float x;
  float y;
  int label;
  float bias = 1;
  
  Point(float x_, float y_) {
    x = x_;
    y = y_;
  }
  
  Point() {
    x = random(-1,1);
    y = random(-1,1);
    
    float lineY = f(x);
    if(y > lineY){
    //if (x > y) {
      label = 1;
    } else {
      label = -1;
    }
  }
    
    float pixelX(){
     return map(x, -1, 1, 0, width); 
    }
    
    float pixelY(){
     return map(y, -1, 1, height, 0);
    }
    
    void show() {
      if (label == 1) {
        fill(0);
      } else {
        fill(150);
      }
      float px = pixelX();
      float py = pixelY();
      ellipse(px, py, 16, 16);
    }
}