
 // this variable will hold our shader object
 let theShader;
 // this variable will hold our webcam video
 let cam;
  let mic;
let micLevel;
 function preload(){
   // load the shader
   theShader = loadShader('shader.vert', 'shader.frag');
 }

 function setup() {
   // shaders require WEBGL mode to work
   createCanvas(710, 400, WEBGL);
   noStroke();

   cam = createCapture(VIDEO);
   cam.size(710, 400);
   
  mic = new p5.AudioIn()
  mic.start();
  micLevel = mic.getLevel();
   
   cam.hide();
 }

 function draw() {
   // shader() sets the active shader with our shader
   shader(theShader);

   // passing cam as a texture
   theShader.setUniform('tex0', cam);
   
   // pass mic as float
   theShader.setUniform('mic', micLevel);

   // rect gives us some geometry on the screen
   rect(0,0,width,height);
 }
