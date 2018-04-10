int sign(float n) {
  if(n >= 0){
    return 1;
  } else {
    return -1;
  }
}

class Perceptron {
 float[] weights;
 float lr = 0.005;
 
 Perceptron(int n) {
   weights = new float[n];
   for (int i = 0; i < weights.length; i++){
     weights[i] = random(-1, 1);
   }
 }
 
 int guess(float[] inputs) {
   float sum = 0;
   for(int i = 0; i < weights.length; i++) {
     sum += inputs[i]*weights[i];
   }
   int output = sign(sum);
   return output;
 }
  
 void train(float[] inputs, int target){
   int guess = guess(inputs);
   int error = target - guess;
   for(int i = 0; i < weights.length; i++){
     // new weight = weight + change in weight
     // change in weight = error * input
     // error = target - guess
     // SO new weight += error * input
    weights[i] += error * inputs[i] * lr;
   }
 }
 
 // draw the reference line to show the learning progress
 float guessY(float x){
  //float m = weights[0] / weights[1];
  //float b = weights[2];
  //return m * x + b;
  float w0 = weights[0];
  float w1 = weights[1];
  float w2 = weights[2];
  return - (w2/w1) - (w0/w1) * x;
  
 }
  
  
}