const shader_vert = `
  attribute vec2 position;

  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const shader_frag = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
  #endif

  uniform float size;
  uniform float frameT;
  vec2 pos;

  float brightness(vec3 c) {
    c += 1.0;
    return sqrt(0.299*(c.r*c.r) + 0.587*(c.g*c.g) + 0.114*(c.b*c.b)) - 1.0;
  }

  float well(float x) {
    return (1.0 - (2.0 / pow((1.0 + (x * x)), float(8.0))));
  }

  float tent(float x) {
    return (1.0 - (2.0 * abs(x)));
  }

  vec3 Const(float r, float g, float b) {
    return vec3(r, g, b);
  }

  vec3 BW(float f) {
    return vec3(f);
  }

  vec3 VarX() {
    return vec3(pos.x, pos.x, pos.x);
  }

  vec3 VarY() {
    return vec3(pos.y, pos.y, pos.y);
  }

  vec3 VarT() {
    return vec3(frameT, frameT, frameT);
  }

  vec3 RGB(vec3 c1, vec3 c2, vec3 c3) {
    return vec3(brightness(c1), brightness(c2), brightness(c3));
  }

  vec3 Sum(vec3 c1, vec3 c2) {
    return mix(c1, c2, vec3(0.5));
  }

  vec3 Mul(vec3 c1, vec3 c2) {
    return c1 * c2;
  }

  vec3 Mod(vec3 c1, vec3 c2) {
    if (c2.r == 0.0 || c2.g == 0.0 || c2.b == 0.0) return vec3(0.0);
    return mod(c1,c2);
  }

  vec3 Not(vec3 c1) {
    return float(-1.0) * c1;
  }

  vec3 Well(vec3 c1) {
    return vec3(well(c1.r),well(c1.g),well(c1.b));
  }

  vec3 Tent(vec3 c1) {
    return vec3(tent(c1.r),tent(c1.g),tent(c1.b));
  }

  vec3 Sin(float phase, float freq, vec3 c1) {
    return sin(phase + freq * c1);
  }

  vec3 Level(float treshold, vec3 level, vec3 c1, vec3 c2) {
    float r = ((level.r < treshold) ? c1.r : c2.r);
    float g = ((level.g < treshold) ? c1.g : c2.g);
    float b = ((level.b < treshold) ? c1.b : c2.b);
    return vec3(r,g,b);
  }

  vec3 Mix(vec3 w, vec3 c1, vec3 c2) {
    float weight = 0.5 * (w.r + 1.0);
    return mix(c2,c1,vec3(weight));
  }

  void main() {
    pos = (gl_FragCoord.xy / size) * float(2.0) - float(1.0);
    pos.y *= -1.0;

    //vec3 result = Sum(VarX(), Const(-1.0, 0.5, 1.2));

    vec3 result = $FORMULA;

    vec3 col = result * float(0.5) + float(0.5);
    gl_FragColor = vec4(col, 1);
  }
`;


  var canvasGL = document.createElement("canvas");
  const gl = canvasGL.getContext("webgl");

function render_glsl_DRAW(canvas, art, oversample = 2) {
  const renderW = canvas.width * oversample;
  const renderH = canvas.height * oversample;
  const aspect = renderW / renderH;

  canvasGL.width = renderW;
  canvasGL.height = renderH;

  //createGL_Context(renderW, renderH);

  gl.viewport(0, 0, renderW, renderH);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  var v = shader_vert;
  var f = shader_frag.replace('$FORMULA', art.toString());

  var vs = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vs, v);
  gl.compileShader(vs);

  var fs = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fs, f);
  gl.compileShader(fs);

  program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(vs));
    return;
  }

  if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(fs));
    return;
  }

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getProgramInfoLog(program));
  }

  const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const itemSize = 2;
  const numItems = vertices.length / itemSize;

  gl.useProgram(program);

  program.size = gl.getUniformLocation(program, 'size');
  gl.uniform1f(program.size, renderW);

  program.frameT = gl.getUniformLocation(program, 'frameT');
  gl.uniform1f(program.frameT, frameT);

  program.position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(program.position);
  gl.vertexAttribPointer(program.position, itemSize, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.TRIANGLES, 0, numItems);

  // draw in 2d canvas
  var ctx = canvas.getContext("2d");
  ctx.drawImage(gl.canvas, 0, 0, canvas.width, canvas.height);

}

let frameT = 0;
let moveT = 0.01;
let drawCanvas, drawArt;

function step(timestamp) {
  if (drawCanvas) {
    frameT += moveT;
    if (frameT > 1 || frameT < -1) {
      moveT = -moveT;
    }
    render_glsl_DRAW(drawCanvas, drawArt);
    console.log('render' + frameT);
  }
  window.requestAnimationFrame(step);
}

function render_glsl(canvas, art) {
  frameT = 0;
  drawCanvas = canvas;
  drawArt = art;
  render_glsl_DRAW(canvas, art);
}

//window.requestAnimationFrame(step);
