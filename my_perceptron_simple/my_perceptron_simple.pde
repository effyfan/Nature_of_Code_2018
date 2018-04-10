Perceptron brain;
Point[] points = new Point[100];

void setup(){
  size(500, 500);
  brain = new Perceptron();
  for(int i = 0; i < points.length; i++) {
    points[i] = new Point();
  }
  float[] inputs = {-1, 0.5};
  int guess = brain.guess(inputs); 
  println(guess);
}

void draw(){
  background(255);
  stroke(0);
  line(0, 0, width, height);
  
  for (Point pt : points) {
    pt.show();
  }
  for (Point pt : points) {
   float[] inputs = {pt.x, pt.y};
   int target = pt.label;
   int guess = brain.guess(inputs);
   if (guess == target){
     fill(0, 255, 0);
   } else {
     fill(255, 0, 0);
   }
     noStroke();
     //ellipse(pt.pixelX(), pt.pixelY(), 8, 8);
     ellipse(pt.x, pt.y, 8, 8);
  }
}

void mousePressed() {
 for (Point pt : points) {
   float[] inputs = {pt.x, pt.y};
   int target = pt.label;
   //print(target);
   brain.train(inputs, target);
 }
}