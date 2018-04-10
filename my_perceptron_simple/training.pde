float f(float x){
 // y = mx + b
 return -0.3 * x + 0.2;  
}


class Point {
  float x;
  float y;
  int label;
 
  Point() {
    x = random(0, width);
    y = random(0, height);
    
    //float lineY = f(x);
    //if(y > lineY){
    if (x > y) {
      label = 1;
    } else {
      label = -1;
    }
  }
    
    //float pixelX(){
    // return map(x, -1, 1, 0, width); 
    //}
    
    //float pixelY(){
    //  return map(y, -1, 1, height, 0);
    //}
    
    void show() {
      if (label == 1) {
        fill(255);
      } else {
        fill(0);
      }
      //float px = pixelX();
      //float py = pixelY();
    ellipse(x, y, 16, 16);
    }
}