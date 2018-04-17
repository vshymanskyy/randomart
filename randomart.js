function Alea(seed) {
    if(seed === undefined) {seed = +new Date() + Math.random();}
    function Mash() {
        var n = 4022871197;
        return function(r) {
            for(var t, s, u = 0, e = 0.02519603282416938; u < r.length; u++)
            s = r.charCodeAt(u), f = (e * (n += s) - (n*e|0)),
            n = 4294967296 * ((t = f * (e*n|0)) - (t|0)) + (t|0);
            return (n|0) * 2.3283064365386963e-10;
        }
    }
    return function() {
        var m = Mash(), a = m(" "), b = m(" "), c = m(" "), x = 1, y;
        seed = seed.toString(), a -= m(seed), b -= m(seed), c -= m(seed);
        a < 0 && a++, b < 0 && b++, c < 0 && c++;
        return function() {
            var y = x * 2.3283064365386963e-10 + a * 2091639; a = b, b = c;
            return c = y - (x = y|0);
        };
    }();
}

var a_table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D";
var b_table = a_table.split(' ').map(function(s){ return parseInt(s,16) });
function b_crc32 (str) {
    var crc = -1;
    for(var i=0, iTop=str.length; i<iTop; i++) {
        crc = ( crc >>> 8 ) ^ b_table[( crc ^ str.charCodeAt( i ) ) & 0xFF];
    }
    return (crc ^ (-1)) >>> 0;
};

let prng = Alea(b_crc32('hello'));

class random {

  static uniform(min = 0, max = 1) {
    return prng() * (max - min) + min;
  }

  static randrange(min, max) {
    if (max !== undefined) {
      min = Math.ceil(min);
      max = Math.floor(max);
    } else {
      min = 0;
      max = Math.ceil(min);
    }
    return Math.floor(prng() * (max - min)) + min;
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
    static get mindepth() { return 0 }

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
    static get mindepth() { return 0 }

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
