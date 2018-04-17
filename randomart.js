
class random {

  static uniform(min = 0, max = 1) {
    return Math.random() * (max - min) + min;
  }

  static randrange(min, max) {
    if (max !== undefined) {
      min = Math.ceil(min);
      max = Math.floor(max);
    } else {
      min = 0;
      max = Math.ceil(min);
    }
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static choice(arr) {
    let idx = this.randrange(0, arr.length)
    return arr[idx]
  }
}


function average(c1, c2, w = 0.5) {
    /* Compute the weighted average of two colors. With w = 0.5 we get the average. */
    var b1, b2, b3, g1, g2, g3, r1, r2, r3;
    [r1, g1, b1] = c1;
    [r2, g2, b2] = c2;
    r3 = ((w * r1) + ((1 - w) * r2));
    g3 = ((w * g1) + ((1 - w) * g2));
    b3 = ((w * b1) + ((1 - w) * b2));
    return [r3, g3, b3];
}

function well(x) {
    /* A function which looks a bit like a well. */
    return (1 - (2 / Math.pow((1 + (x * x)), 8)));
}
function tent(x) {
    /* A function that looks a bit like a tent. */
    return (1 - (2 * Math.abs(x)));
}

class VariableX {
    static get arity() { return 0 }
    static get mindepth() { return 4 }

    constructor() {
    }
    toString() {
        return "x";
    }
    eval(x, y) {
        return [x, x, x];
    }
}

class VariableY {
    static get arity() { return 0 }
    static get mindepth() { return 4 }

    constructor() {
    }
    toString() {
        return "y";
    }
    eval(x, y) {
        return [y, y, y];
    }
}

class Constant {
    static get arity() { return 0 }
    static get mindepth() { return 4 }

    constructor() {
        this.c = [random.uniform(-1, 1), random.uniform(-1, 1), random.uniform(-1, 1)];
    }
    toString() {
        return `Constant(${this.c[0].toFixed(2)}, ${this.c[1].toFixed(2)}, ${this.c[2].toFixed(2)})`;
    }
    eval(x, y) {
        return this.c;
    }
}

class Sum {
    static get arity() { return 2 }
    static get mindepth() { return 2 }

    constructor(e1, e2) {
        this.e1 = e1;
        this.e2 = e2;
    }
    toString() {
        return `Sum(${this.e1}, ${this.e2})`;
    }
    eval(x, y) {
        return average(this.e1.eval(x, y), this.e2.eval(x, y));
    }
}

class Product {
    static get arity() { return 2 }
    static get mindepth() { return 2 }

    constructor(e1, e2) {
        this.e1 = e1;
        this.e2 = e2;
    }
    toString() {
        return `Product(${this.e1}, ${this.e2})`;
    }
    eval(x, y) {
        var b1, b2, g1, g2, r1, r2;
        [r1, g1, b1] = this.e1.eval(x, y);
        [r2, g2, b2] = this.e2.eval(x, y);
        return [r1 * r2, g1 * g2, b1 * b2];
    }
}

class Mod {
    static get arity() { return 2 }
    static get mindepth() { return 3 }

    constructor(e1, e2) {
        this.e1 = e1;
        this.e2 = e2;
    }
    toString() {
        return `Mod(${this.e1}, ${this.e2})`;
    }
    eval(x, y) {
        var b1, b2, g1, g2, r1, r2;
        [r1, g1, b1] = this.e1.eval(x, y);
        [r2, g2, b2] = this.e2.eval(x, y);
        if (r2 == 0 || g2 == 0 || b2 == 0) {
          return [0, 0, 0];
        }
        return [r1 % r2, g1 % g2, b1 % b2];
    }
}

class Well {
    static get arity() { return 1 }
    static get mindepth() { return 3 }

    constructor(e) {
        this.e = e;
    }
    toString() {
        return `Well(${this.e})`;
    }
    eval(x, y) {
        var [r, g, b] = this.e.eval(x, y);
        return [well(r), well(g), well(b)];
    }
}

class Tent {
    static get arity() { return 1 }
    static get mindepth() { return 3 }

    constructor(e) {
        this.e = e;
    }
    toString() {
        return `Tent(${this.e})`;
    }
    eval(x, y) {
        var b, g, r;
        [r, g, b] = this.e.eval(x, y);
        return [tent(r), tent(g), tent(b)];
    }
}

class Sin {
    static get arity() { return 1 }
    static get mindepth() { return 0 }

    constructor(e) {
        this.e = e;
        this.phase = random.uniform(0, Math.PI);
        this.freq = random.uniform(1.0, 6.0);
    }
    toString() {
        return `Sin(${this.phase.toFixed(2)} + ${this.freq.toFixed(2)} * ${this.e})`;
    }
    eval(x, y) {
        var b1, b2, g1, g2, r1, r2;
        [r1, g1, b1] = this.e.eval(x, y);
        r2 = Math.sin((this.phase + (this.freq * r1)));
        g2 = Math.sin((this.phase + (this.freq * g1)));
        b2 = Math.sin((this.phase + (this.freq * b1)));
        return [r2, g2, b2];
    }
}

class Level {
    static get arity() { return 3 }
    static get mindepth() { return 0 }

    constructor(level, e1, e2) {
        this.treshold = random.uniform((- 1.0), 1.0);
        this.level = level;
        this.e1 = e1;
        this.e2 = e2;
    }
    toString() {
        return `Level(${this.treshold.toFixed(2)}, ${this.level}, ${this.e1}, ${this.e2})`;
    }
    eval(x, y) {
        var b1, b2, b3, b4, g1, g2, g3, g4, r1, r2, r3, r4;
        [r1, g1, b1] = this.level.eval(x, y);
        [r2, g2, b2] = this.e1.eval(x, y);
        [r3, g3, b3] = this.e2.eval(x, y);
        r4 = ((r1 < this.treshold) ? r2 : r3);
        g4 = ((g1 < this.treshold) ? g2 : g3);
        b4 = ((b1 < this.treshold) ? b2 : b3);
        return [r4, g4, b4];
    }
}

class Mix {
    static get arity() { return 3 }
    static get mindepth() { return 0 }

    constructor(w, e1, e2) {
        this.w = w;
        this.e1 = e1;
        this.e2 = e2;
    }
    toString() {
        return `Mix(${this.w}, ${this.e1}, ${this.e2})`;
    }
    eval(x, y) {
        var c1, c2, w;
        w = (0.5 * (this.w.eval(x, y)[0] + 1.0));
        c1 = this.e1.eval(x, y);
        c2 = this.e2.eval(x, y);
        return average(c1, c2);
    }
}

operators = [VariableX, VariableY, Constant, Sum, Product, Mod, Sin, Tent, Well, Level, Mix];
operators0 = operators.filter(i => (i.arity == 0))
operators1 = operators.filter(i => (i.arity > 0))

function generate(k = 50, depth = 0) {
    /* Randonly generate an expession of a given size. */
    if (depth >= k) {
        let op = random.choice(operators0);
        return new op();
    } else {
        let op = random.choice(operators1.filter(i => (depth >= i.mindepth)));
        let args = [];
        for (let i = 0; i<op.arity; i++) {
          args.push(generate(k, depth+i+1))
        }
        return new op(...args);
    }
}
