/*
 * Pure JS evaluator
 */

function average(c1, c2, w = 0.5) {
    let r1, g1, b1; [r1, g1, b1] = c1;
    let r2, g2, b2; [r2, g2, b2] = c2;
    let r3 = ((w * r1) + ((1 - w) * r2));
    let g3 = ((w * g1) + ((1 - w) * g2));
    let b3 = ((w * b1) + ((1 - w) * b2));
    return [r3, g3, b3];
}

function brightness(R,G,B) {
    R = (1.0 + R);
    G = (1.0 + G);
    B = (1.0 + B);
    return Math.sqrt(0.299*(R*R) + 0.587*(G*G) + 0.114*(B*B)) - 1.0;
}

function well(x) {
    return (1 - (2 / Math.pow((1 + (x * x)), 8)));
}

function tent(x) {
    return (1 - (2 * Math.abs(x)));
}

function modulo(x,y) {
    return x - y * Math.floor(x/y);
}

function BW(v) { return [v,v,v] }
function Const(r,g,b) { return [r,g,b] }
function RGB(c1,c2,c3) { return [brightness(...c1), brightness(...c2), brightness(...c3)] }

function Sum(c1,c2) { return average(c1,c2) }
function Mul(c1,c2) {
  let r1, g1, b1; [r1, g1, b1] = c1;
  let r2, g2, b2; [r2, g2, b2] = c2;
  return [r1 * r2, g1 * g2, b1 * b2];
}
function Not(c1) {
  let r1, g1, b1; [r1, g1, b1] = c1;
  return [-r1, -g1, -b1]
}
function Mod(c1,c2) {
  let r1, g1, b1; [r1, g1, b1] = c1;
  let r2, g2, b2; [r2, g2, b2] = c2;

  if (r2 === 0 || g2 === 0 || b2 === 0) return [0, 0, 0];
  return [modulo(r1,r2),modulo(g1,g2),modulo(b1,b2)];
}

function Tent(c1) { let r,g,b; [r,g,b] = c1; return [tent(r), tent(g), tent(b)] }
function Well(c1) { let r,g,b; [r,g,b] = c1; return [well(r), well(g), well(b)] }

function Sin(phase,freq,c1) {
  let r,g,b; [r,g,b] = c1;
  return [Math.sin(phase+freq*r), Math.sin(phase+freq*g), Math.sin(phase+freq*b)]
}
function Mix(w,c1,c2) {
  w = brightness(...w);
  w = (0.5 * (w + 1.0));
  return average(c1, c2, w);
}
function Level(treshold,level,c1,c2) {
  let r1, g1, b1; [r1, g1, b1] = level;
  let r2, g2, b2; [r2, g2, b2] = c1;
  let r3, g3, b3; [r3, g3, b3] = c2;

  return [
    (r1 < treshold) ? r2 : r3,
    (g1 < treshold) ? g2 : g3,
    (b1 < treshold) ? b2 : b3
  ];
}
function Closest(tgt,c1,c2) {
  let r1, g1, b1; [r1, g1, b1] = tgt;
  let r2, g2, b2; [r2, g2, b2] = c1;
  let r3, g3, b3; [r3, g3, b3] = c2;

  let d1 = Math.sqrt((r2-r1)**2+(g2-g1)**2+(b2-b1)**2);
  let d2 = Math.sqrt((r3-r1)**2+(g3-g1)**2+(b3-b1)**2);

  return (d1 < d2) ? c1 : c2;
}

function getEvaluator(formula) {
  formula = formula.replace(/posX/g, '[x,x,x]');
  formula = formula.replace(/posY/g, '[y,y,y]');
  formula = formula.replace(/frmT/g, '[1,1,1]');

  return new Function('x', 'y', `return ${formula}`);
}

async function render_js(canvas, art) {
  const size = canvas.width;
  const size2 = size/2;

  const ctx = canvas.getContext("2d");
  const imagedata = ctx.createImageData(size, size);
  const d = imagedata.data;

  const compute = getEvaluator(art.toString())

  for (let y=0; y<size; y++) {
    for (let x=0; x<size; x++) {
      let u,v;
      [u,v] = [x,y].map(i => i/size2 - 1.0);

      let color = compute(u, v);
      color = color.map(i => (i+1.0) * 128);

      const idx = (y * size + x) * 4;
      d[idx]   = color[0]
      d[idx+1] = color[1]
      d[idx+2] = color[2]
      d[idx+3] = 0xFF
    }
    if ((y % 16) == 0) {
      ctx.putImageData(imagedata, 0, 0, 0, 0, size, y+2);
      await delay(1);
    }
  }
  ctx.putImageData(imagedata, 0, 0);
}
