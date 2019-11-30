#ifdef GL_ES
precision mediump float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;

// mic level from p5
uniform float mic;

uniform float bass;
uniform float mid;
uniform float treble;



void main() {
  vec2 uv = vTexCoord;

  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;

  vec4 tex = texture2D(tex0, uv);

  float gray = (tex.r + tex.g + tex.b) / 3.0;

  float res = 11.0;
  float scl = res / (5.0);

  float threshR = (fract(floor(tex.r*res)/scl)*scl) * gray*bass*mic;
  float threshG = (fract(floor(tex.g*res)/scl)*scl) * gray*mid;
  float threshB = (fract(floor(tex.b*res)/scl)*scl) * gray*treble;
  vec3 thresh = vec3(threshR, threshG, threshB);

  // render the output
  gl_FragColor = vec4(thresh,1.0);
}