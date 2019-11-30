// this variable will hold our shader object
let theShader;
// this variable will hold our webcam video
let cam;
let mic;
let fft;
let micLevel;
let bass;
let mid;
let treble;
function preload() {
  // load the shader
  theShader = loadShader("shader.vert", "shader.frag");
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(710, 400, WEBGL);

  // noStroke();

  // initialize the createGraphics layers
  shaderTexture = createGraphics(710, 400, WEBGL);
  
  
  // turn off the createGraphics layers stroke
  shaderTexture.noStroke();

  cam = createCapture(VIDEO);
  cam.size(710, 400);

  mic = new p5.AudioIn();
  mic.start();
  
  fft = new p5.FFT();
  fft.setInput(mic);
  
  cam.hide();
}

function draw() {

  
  // shader() sets the active shader with our shader
  shader(theShader);

  // get micLevel
  micLevel = mic.getLevel();
  
  micLevel = Math.min(micLevel * 3, 0.999);
  
  fft.analyze();
  bass = fft.getEnergy("bass")/255;
  mid = fft.getEnergy("mid")/255;
  treble = fft.getEnergy("treble")/255;
  
  treble = Math.sqrt(treble);
  
  // Uniforms 
  theShader.setUniform("tex0", cam);
  theShader.setUniform("mic", micLevel);
  theShader.setUniform("bass", bass);
  theShader.setUniform("mid", mid);
  theShader.setUniform("treble", treble);
  
  
  rect(mouseX, mouseY, 100, 100);
}
