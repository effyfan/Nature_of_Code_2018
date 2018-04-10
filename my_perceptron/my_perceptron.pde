Perceptron brain;
Point[] points = new Point[100];

int trainingIndex = 0;

void setup(){
  size(500, 500);
  brain = new Perceptron(3);
  for(int i = 0; i < points.length; i++) {
    points[i] = new Point();
  }
  //float[] inputs = {-1, 0.5};
  //int guess = brain.guess(inputs); 
  //println(guess);
}

void draw(){
  background(255);
  stroke(0);
  //line(0, height, width, 0);
  
  float x1 = -1;
  float y1 = f(x1);
  float x2 = 1;
  float y2 = f(x2);
  Point p1 = new Point(x1, y1);
  Point p2 = new Point(x2, y2);
  line(p1.pixelX(), p1.pixelY(), p2.pixelX(), p2.pixelY());
  
  Point p3 = new Point(x1, brain.guessY(x1));
  Point p4 = new Point(x2, brain.guessY(x2));
  line(p3.pixelX(), p3.pixelY(), p4.pixelX(), p4.pixelY());
  
  
  for (Point pt : points) {
    pt.show();
  }
  for (Point pt : points) {
   float[] inputs = {pt.x, pt.y, pt.bias};
   int target = pt.label;
   int guess = brain.guess(inputs);
   if (guess == target){
     fill(0, 255, 0);
   } else {
     fill(255, 0, 0);
   }
     noStroke();
     ellipse(pt.pixelX(), pt.pixelY(), 8, 8);
  }
  Point training = points[trainingIndex];
   float[] inputs = {training.x, training.y, training.bias};
   int target = training.label;
   brain.train(inputs, target);
   trainingIndex++;
   if(trainingIndex == points.length) {
     trainingIndex=0;
   }
   
}

void mousePressed() {
 //for (Point pt : points) {
 //  float[] inputs = {pt.x, pt.y};
 //  int target = pt.label;
 //  brain.train(inputs, target);
 //}
}