(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
"use strict";

module.exports = '0.2.1';

},{}],2:[function(_dereq_,module,exports){
"use strict";

var somehow = _dereq_('somehow');

var drawGraph = function drawGraph(ticks, id) {
  var el = document.querySelector(id);
  var w = somehow({
    width: 500,
    height: 20
  });
  ticks.map(function (tick) {
    w.dot().at(tick.value, 1);
  });
  w.y.fit();
  w.x.fit(0, 1);
  w.yAxis.remove(); // w.xAxis.remove()

  el.innerHTML = w.build();
};

module.exports = drawGraph;

},{"somehow":23}],3:[function(_dereq_,module,exports){
"use strict";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<table class=\"f2 mud w7\">", "</table>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<tr >\n      <td class=\"\">", "</td>\n      <td class=\"light f09 m09\">", "</td>\n    </tr>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var htm = _dereq_('htm');

var vhtml = _dereq_('vhtml');

var h = htm.bind(vhtml);

var inputs = _dereq_('somehow-input');

var drawGraph = _dereq_('./_drawGraph');

var spacetimeTicks = _dereq_('../src');

var printTicks = function printTicks() {
  var start = document.querySelector('#start').querySelector('input').value;
  var end = document.querySelector('#end').querySelector('input').value;
  var n = document.querySelector('#ticks').querySelector('select').value;
  var ticks = spacetimeTicks(start, end, n);
  drawGraph(ticks, '#graph-two');
  ticks = ticks.map(function (o) {
    return h(_templateObject(), o.label, o.value);
  });
  document.querySelector('#results-two').innerHTML = h(_templateObject2(), ticks);
};

var start = inputs.input({
  label: 'start',
  value: 'June 5th 1998',
  width: 130,
  cb: function cb() {
    return printTicks();
  }
});
var end = inputs.input({
  label: 'end',
  value: 'Oct 4 2002',
  width: 130,
  cb: function cb() {
    return printTicks();
  }
});
var select = inputs.select({
  label: 'max-ticks',
  value: '6',
  width: 50,
  options: ['4', '5', '6', '7', '8', '9', '10', '11'],
  cb: function cb() {
    return printTicks();
  }
});
document.querySelector('#start').innerHTML = start.build();
document.querySelector('#ticks').innerHTML = select.build();
document.querySelector('#end').innerHTML = end.build();
printTicks();

},{"../src":51,"./_drawGraph":2,"htm":9,"somehow-input":10,"vhtml":49}],4:[function(_dereq_,module,exports){
"use strict";

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<table class=\"f2 mud w7\">", "</table>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<tr >\n    <td class=\"\">", "</td>\n    <td class=\"light f09 m09\">", "</td>\n  </tr>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var spacetime = _dereq_('spacetime');

var htm = _dereq_('htm');

var vhtml = _dereq_('vhtml');

var h = htm.bind(vhtml);

var inputs = _dereq_('somehow-input');

var drawGraph = _dereq_('./_drawGraph');

var spacetimeTicks = _dereq_('../src');

var printTicks = function printTicks() {
  var start = document.querySelector('#origin').querySelector('input').value;
  var duration = document.querySelector('#duration').querySelector('input').value;
  var n = document.querySelector('#ticks-two').querySelector('select').value;
  var end = spacetime(start).epoch + Number(duration);
  var ticks = spacetimeTicks(start, end, n);
  drawGraph(ticks, '#graph');
  ticks = ticks.map(function (o) {
    return h(_templateObject(), o.label, o.value);
  });
  document.querySelector('#results').innerHTML = h(_templateObject2(), ticks);
};

var start = inputs.input({
  label: 'start',
  value: 'June 5th 1998',
  width: 130,
  cb: function cb() {
    return printTicks();
  }
});
var select = inputs.select({
  label: 'max-ticks',
  value: '6',
  width: 50,
  options: ['4', '5', '6', '7', '8', '9', '10', '11'],
  cb: function cb() {
    return printTicks();
  }
});
var end = inputs.duration({
  label: '',
  value: {
    month: 3
  },
  max: {
    year: 4
  },
  min: {
    hour: 3
  },
  cb: function cb() {
    return printTicks();
  }
});
document.querySelector('#origin').innerHTML = start.build();
document.querySelector('#ticks-two').innerHTML = select.build();
document.querySelector('#duration').innerHTML = end.build();
printTicks();

},{"../src":51,"./_drawGraph":2,"htm":9,"somehow-input":10,"spacetime":47,"vhtml":49}],5:[function(_dereq_,module,exports){
"use strict";

_dereq_('./demo/duration');

_dereq_('./demo/custom');

},{"./demo/custom":3,"./demo/duration":4}],6:[function(_dereq_,module,exports){
// https://d3js.org/d3-path/ v1.0.8 Copyright 2019 Mike Bostock
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
typeof define === 'function' && define.amd ? define(['exports'], factory) :
(global = global || self, factory(global.d3 = global.d3 || {}));
}(this, function (exports) { 'use strict';

var pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon));

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r, ccw = !!ccw;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

exports.path = path;

Object.defineProperty(exports, '__esModule', { value: true });

}));

},{}],7:[function(_dereq_,module,exports){
// https://d3js.org/d3-shape/ v1.3.5 Copyright 2019 Mike Bostock
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, _dereq_('d3-path')) :
typeof define === 'function' && define.amd ? define(['exports', 'd3-path'], factory) :
(factory((global.d3 = global.d3 || {}),global.d3));
}(this, (function (exports,d3Path) { 'use strict';

function constant(x) {
  return function constant() {
    return x;
  };
}

var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max = Math.max;
var min = Math.min;
var sin = Math.sin;
var sqrt = Math.sqrt;

var epsilon = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = 2 * pi;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}

function arcInnerRadius(d) {
  return d.innerRadius;
}

function arcOuterRadius(d) {
  return d.outerRadius;
}

function arcStartAngle(d) {
  return d.startAngle;
}

function arcEndAngle(d) {
  return d.endAngle;
}

function arcPadAngle(d) {
  return d && d.padAngle; // Note: optional!
}

function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
  var x10 = x1 - x0, y10 = y1 - y0,
      x32 = x3 - x2, y32 = y3 - y2,
      t = y32 * x10 - x32 * y10;
  if (t * t < epsilon) return;
  t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
  return [x0 + t * x10, y0 + t * y10];
}

// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
  var x01 = x0 - x1,
      y01 = y0 - y1,
      lo = (cw ? rc : -rc) / sqrt(x01 * x01 + y01 * y01),
      ox = lo * y01,
      oy = -lo * x01,
      x11 = x0 + ox,
      y11 = y0 + oy,
      x10 = x1 + ox,
      y10 = y1 + oy,
      x00 = (x11 + x10) / 2,
      y00 = (y11 + y10) / 2,
      dx = x10 - x11,
      dy = y10 - y11,
      d2 = dx * dx + dy * dy,
      r = r1 - rc,
      D = x11 * y10 - x10 * y11,
      d = (dy < 0 ? -1 : 1) * sqrt(max(0, r * r * d2 - D * D)),
      cx0 = (D * dy - dx * d) / d2,
      cy0 = (-D * dx - dy * d) / d2,
      cx1 = (D * dy + dx * d) / d2,
      cy1 = (-D * dx + dy * d) / d2,
      dx0 = cx0 - x00,
      dy0 = cy0 - y00,
      dx1 = cx1 - x00,
      dy1 = cy1 - y00;

  // Pick the closer of the two intersection points.
  // TODO Is there a faster way to determine which intersection to use?
  if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;

  return {
    cx: cx0,
    cy: cy0,
    x01: -ox,
    y01: -oy,
    x11: cx0 * (r1 / r - 1),
    y11: cy0 * (r1 / r - 1)
  };
}

function arc() {
  var innerRadius = arcInnerRadius,
      outerRadius = arcOuterRadius,
      cornerRadius = constant(0),
      padRadius = null,
      startAngle = arcStartAngle,
      endAngle = arcEndAngle,
      padAngle = arcPadAngle,
      context = null;

  function arc() {
    var buffer,
        r,
        r0 = +innerRadius.apply(this, arguments),
        r1 = +outerRadius.apply(this, arguments),
        a0 = startAngle.apply(this, arguments) - halfPi,
        a1 = endAngle.apply(this, arguments) - halfPi,
        da = abs(a1 - a0),
        cw = a1 > a0;

    if (!context) context = buffer = d3Path.path();

    // Ensure that the outer radius is always larger than the inner radius.
    if (r1 < r0) r = r1, r1 = r0, r0 = r;

    // Is it a point?
    if (!(r1 > epsilon)) context.moveTo(0, 0);

    // Or is it a circle or annulus?
    else if (da > tau - epsilon) {
      context.moveTo(r1 * cos(a0), r1 * sin(a0));
      context.arc(0, 0, r1, a0, a1, !cw);
      if (r0 > epsilon) {
        context.moveTo(r0 * cos(a1), r0 * sin(a1));
        context.arc(0, 0, r0, a1, a0, cw);
      }
    }

    // Or is it a circular or annular sector?
    else {
      var a01 = a0,
          a11 = a1,
          a00 = a0,
          a10 = a1,
          da0 = da,
          da1 = da,
          ap = padAngle.apply(this, arguments) / 2,
          rp = (ap > epsilon) && (padRadius ? +padRadius.apply(this, arguments) : sqrt(r0 * r0 + r1 * r1)),
          rc = min(abs(r1 - r0) / 2, +cornerRadius.apply(this, arguments)),
          rc0 = rc,
          rc1 = rc,
          t0,
          t1;

      // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
      if (rp > epsilon) {
        var p0 = asin(rp / r0 * sin(ap)),
            p1 = asin(rp / r1 * sin(ap));
        if ((da0 -= p0 * 2) > epsilon) p0 *= (cw ? 1 : -1), a00 += p0, a10 -= p0;
        else da0 = 0, a00 = a10 = (a0 + a1) / 2;
        if ((da1 -= p1 * 2) > epsilon) p1 *= (cw ? 1 : -1), a01 += p1, a11 -= p1;
        else da1 = 0, a01 = a11 = (a0 + a1) / 2;
      }

      var x01 = r1 * cos(a01),
          y01 = r1 * sin(a01),
          x10 = r0 * cos(a10),
          y10 = r0 * sin(a10);

      // Apply rounded corners?
      if (rc > epsilon) {
        var x11 = r1 * cos(a11),
            y11 = r1 * sin(a11),
            x00 = r0 * cos(a00),
            y00 = r0 * sin(a00),
            oc;

        // Restrict the corner radius according to the sector angle.
        if (da < pi && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
          var ax = x01 - oc[0],
              ay = y01 - oc[1],
              bx = x11 - oc[0],
              by = y11 - oc[1],
              kc = 1 / sin(acos((ax * bx + ay * by) / (sqrt(ax * ax + ay * ay) * sqrt(bx * bx + by * by))) / 2),
              lc = sqrt(oc[0] * oc[0] + oc[1] * oc[1]);
          rc0 = min(rc, (r0 - lc) / (kc - 1));
          rc1 = min(rc, (r1 - lc) / (kc + 1));
        }
      }

      // Is the sector collapsed to a line?
      if (!(da1 > epsilon)) context.moveTo(x01, y01);

      // Does the sector’s outer ring have rounded corners?
      else if (rc1 > epsilon) {
        t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
        t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);

        context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc1, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r1, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
          context.arc(t1.cx, t1.cy, rc1, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the outer ring just a circular arc?
      else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);

      // Is there no inner ring, and it’s a circular sector?
      // Or perhaps it’s an annular sector collapsed due to padding?
      if (!(r0 > epsilon) || !(da0 > epsilon)) context.lineTo(x10, y10);

      // Does the sector’s inner ring (or point) have rounded corners?
      else if (rc0 > epsilon) {
        t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
        t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);

        context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);

        // Have the corners merged?
        if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t1.y01, t1.x01), !cw);

        // Otherwise, draw the two corners and the ring.
        else {
          context.arc(t0.cx, t0.cy, rc0, atan2(t0.y01, t0.x01), atan2(t0.y11, t0.x11), !cw);
          context.arc(0, 0, r0, atan2(t0.cy + t0.y11, t0.cx + t0.x11), atan2(t1.cy + t1.y11, t1.cx + t1.x11), cw);
          context.arc(t1.cx, t1.cy, rc0, atan2(t1.y11, t1.x11), atan2(t1.y01, t1.x01), !cw);
        }
      }

      // Or is the inner ring just a circular arc?
      else context.arc(0, 0, r0, a10, a00, cw);
    }

    context.closePath();

    if (buffer) return context = null, buffer + "" || null;
  }

  arc.centroid = function() {
    var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2,
        a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - pi / 2;
    return [cos(a) * r, sin(a) * r];
  };

  arc.innerRadius = function(_) {
    return arguments.length ? (innerRadius = typeof _ === "function" ? _ : constant(+_), arc) : innerRadius;
  };

  arc.outerRadius = function(_) {
    return arguments.length ? (outerRadius = typeof _ === "function" ? _ : constant(+_), arc) : outerRadius;
  };

  arc.cornerRadius = function(_) {
    return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : constant(+_), arc) : cornerRadius;
  };

  arc.padRadius = function(_) {
    return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : constant(+_), arc) : padRadius;
  };

  arc.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), arc) : startAngle;
  };

  arc.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), arc) : endAngle;
  };

  arc.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), arc) : padAngle;
  };

  arc.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), arc) : context;
  };

  return arc;
}

function Linear(context) {
  this._context = context;
}

Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: this._context.lineTo(x, y); break;
    }
  }
};

function curveLinear(context) {
  return new Linear(context);
}

function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}

function line() {
  var x$$1 = x,
      y$$1 = y,
      defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;

  function line(data) {
    var i,
        n = data.length,
        d,
        defined0 = false,
        buffer;

    if (context == null) output = curve(buffer = d3Path.path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x$$1(d, i, data), +y$$1(d, i, data));
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  line.x = function(_) {
    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant(+_), line) : x$$1;
  };

  line.y = function(_) {
    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant(+_), line) : y$$1;
  };

  line.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), line) : defined;
  };

  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };

  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };

  return line;
}

function area() {
  var x0 = x,
      x1 = null,
      y0 = constant(0),
      y1 = y,
      defined = constant(true),
      context = null,
      curve = curveLinear,
      output = null;

  function area(data) {
    var i,
        j,
        k,
        n = data.length,
        d,
        defined0 = false,
        buffer,
        x0z = new Array(n),
        y0z = new Array(n);

    if (context == null) output = curve(buffer = d3Path.path());

    for (i = 0; i <= n; ++i) {
      if (!(i < n && defined(d = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k = i - 1; k >= j; --k) {
            output.point(x0z[k], y0z[k]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
        output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
      }
    }

    if (buffer) return output = null, buffer + "" || null;
  }

  function arealine() {
    return line().defined(defined).curve(curve).context(context);
  }

  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), x1 = null, area) : x0;
  };

  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant(+_), area) : x0;
  };

  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : x1;
  };

  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), y1 = null, area) : y0;
  };

  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant(+_), area) : y0;
  };

  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant(+_), area) : y1;
  };

  area.lineX0 =
  area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };

  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };

  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };

  area.defined = function(_) {
    return arguments.length ? (defined = typeof _ === "function" ? _ : constant(!!_), area) : defined;
  };

  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };

  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };

  return area;
}

function descending(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

function identity(d) {
  return d;
}

function pie() {
  var value = identity,
      sortValues = descending,
      sort = null,
      startAngle = constant(0),
      endAngle = constant(tau),
      padAngle = constant(0);

  function pie(data) {
    var i,
        n = data.length,
        j,
        k,
        sum = 0,
        index = new Array(n),
        arcs = new Array(n),
        a0 = +startAngle.apply(this, arguments),
        da = Math.min(tau, Math.max(-tau, endAngle.apply(this, arguments) - a0)),
        a1,
        p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)),
        pa = p * (da < 0 ? -1 : 1),
        v;

    for (i = 0; i < n; ++i) {
      if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) {
        sum += v;
      }
    }

    // Optionally sort the arcs by previously-computed values or by data.
    if (sortValues != null) index.sort(function(i, j) { return sortValues(arcs[i], arcs[j]); });
    else if (sort != null) index.sort(function(i, j) { return sort(data[i], data[j]); });

    // Compute the arcs! They are stored in the original data's order.
    for (i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1) {
      j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
        data: data[j],
        index: i,
        value: v,
        startAngle: a0,
        endAngle: a1,
        padAngle: p
      };
    }

    return arcs;
  }

  pie.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), pie) : value;
  };

  pie.sortValues = function(_) {
    return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
  };

  pie.sort = function(_) {
    return arguments.length ? (sort = _, sortValues = null, pie) : sort;
  };

  pie.startAngle = function(_) {
    return arguments.length ? (startAngle = typeof _ === "function" ? _ : constant(+_), pie) : startAngle;
  };

  pie.endAngle = function(_) {
    return arguments.length ? (endAngle = typeof _ === "function" ? _ : constant(+_), pie) : endAngle;
  };

  pie.padAngle = function(_) {
    return arguments.length ? (padAngle = typeof _ === "function" ? _ : constant(+_), pie) : padAngle;
  };

  return pie;
}

var curveRadialLinear = curveRadial(curveLinear);

function Radial(curve) {
  this._curve = curve;
}

Radial.prototype = {
  areaStart: function() {
    this._curve.areaStart();
  },
  areaEnd: function() {
    this._curve.areaEnd();
  },
  lineStart: function() {
    this._curve.lineStart();
  },
  lineEnd: function() {
    this._curve.lineEnd();
  },
  point: function(a, r) {
    this._curve.point(r * Math.sin(a), r * -Math.cos(a));
  }
};

function curveRadial(curve) {

  function radial(context) {
    return new Radial(curve(context));
  }

  radial._curve = curve;

  return radial;
}

function lineRadial(l) {
  var c = l.curve;

  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;

  l.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return l;
}

function lineRadial$1() {
  return lineRadial(line().curve(curveRadialLinear));
}

function areaRadial() {
  var a = area().curve(curveRadialLinear),
      c = a.curve,
      x0 = a.lineX0,
      x1 = a.lineX1,
      y0 = a.lineY0,
      y1 = a.lineY1;

  a.angle = a.x, delete a.x;
  a.startAngle = a.x0, delete a.x0;
  a.endAngle = a.x1, delete a.x1;
  a.radius = a.y, delete a.y;
  a.innerRadius = a.y0, delete a.y0;
  a.outerRadius = a.y1, delete a.y1;
  a.lineStartAngle = function() { return lineRadial(x0()); }, delete a.lineX0;
  a.lineEndAngle = function() { return lineRadial(x1()); }, delete a.lineX1;
  a.lineInnerRadius = function() { return lineRadial(y0()); }, delete a.lineY0;
  a.lineOuterRadius = function() { return lineRadial(y1()); }, delete a.lineY1;

  a.curve = function(_) {
    return arguments.length ? c(curveRadial(_)) : c()._curve;
  };

  return a;
}

function pointRadial(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}

var slice = Array.prototype.slice;

function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link(curve) {
  var source = linkSource,
      target = linkTarget,
      x$$1 = x,
      y$$1 = y,
      context = null;

  function link() {
    var buffer, argv = slice.call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
    if (!context) context = buffer = d3Path.path();
    curve(context, +x$$1.apply(this, (argv[0] = s, argv)), +y$$1.apply(this, argv), +x$$1.apply(this, (argv[0] = t, argv)), +y$$1.apply(this, argv));
    if (buffer) return context = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x$$1 = typeof _ === "function" ? _ : constant(+_), link) : x$$1;
  };

  link.y = function(_) {
    return arguments.length ? (y$$1 = typeof _ === "function" ? _ : constant(+_), link) : y$$1;
  };

  link.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), link) : context;
  };

  return link;
}

function curveHorizontal(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
}

function curveVertical(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
}

function curveRadial$1(context, x0, y0, x1, y1) {
  var p0 = pointRadial(x0, y0),
      p1 = pointRadial(x0, y0 = (y0 + y1) / 2),
      p2 = pointRadial(x1, y0),
      p3 = pointRadial(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}

function linkHorizontal() {
  return link(curveHorizontal);
}

function linkVertical() {
  return link(curveVertical);
}

function linkRadial() {
  var l = link(curveRadial$1);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}

var circle = {
  draw: function(context, size) {
    var r = Math.sqrt(size / pi);
    context.moveTo(r, 0);
    context.arc(0, 0, r, 0, tau);
  }
};

var cross = {
  draw: function(context, size) {
    var r = Math.sqrt(size / 5) / 2;
    context.moveTo(-3 * r, -r);
    context.lineTo(-r, -r);
    context.lineTo(-r, -3 * r);
    context.lineTo(r, -3 * r);
    context.lineTo(r, -r);
    context.lineTo(3 * r, -r);
    context.lineTo(3 * r, r);
    context.lineTo(r, r);
    context.lineTo(r, 3 * r);
    context.lineTo(-r, 3 * r);
    context.lineTo(-r, r);
    context.lineTo(-3 * r, r);
    context.closePath();
  }
};

var tan30 = Math.sqrt(1 / 3),
    tan30_2 = tan30 * 2;

var diamond = {
  draw: function(context, size) {
    var y = Math.sqrt(size / tan30_2),
        x = y * tan30;
    context.moveTo(0, -y);
    context.lineTo(x, 0);
    context.lineTo(0, y);
    context.lineTo(-x, 0);
    context.closePath();
  }
};

var ka = 0.89081309152928522810,
    kr = Math.sin(pi / 10) / Math.sin(7 * pi / 10),
    kx = Math.sin(tau / 10) * kr,
    ky = -Math.cos(tau / 10) * kr;

var star = {
  draw: function(context, size) {
    var r = Math.sqrt(size * ka),
        x = kx * r,
        y = ky * r;
    context.moveTo(0, -r);
    context.lineTo(x, y);
    for (var i = 1; i < 5; ++i) {
      var a = tau * i / 5,
          c = Math.cos(a),
          s = Math.sin(a);
      context.lineTo(s * r, -c * r);
      context.lineTo(c * x - s * y, s * x + c * y);
    }
    context.closePath();
  }
};

var square = {
  draw: function(context, size) {
    var w = Math.sqrt(size),
        x = -w / 2;
    context.rect(x, x, w, w);
  }
};

var sqrt3 = Math.sqrt(3);

var triangle = {
  draw: function(context, size) {
    var y = -Math.sqrt(size / (sqrt3 * 3));
    context.moveTo(0, y * 2);
    context.lineTo(-sqrt3 * y, -y);
    context.lineTo(sqrt3 * y, -y);
    context.closePath();
  }
};

var c = -0.5,
    s = Math.sqrt(3) / 2,
    k = 1 / Math.sqrt(12),
    a = (k / 2 + 1) * 3;

var wye = {
  draw: function(context, size) {
    var r = Math.sqrt(size / a),
        x0 = r / 2,
        y0 = r * k,
        x1 = x0,
        y1 = r * k + r,
        x2 = -x1,
        y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
};

var symbols = [
  circle,
  cross,
  diamond,
  square,
  star,
  triangle,
  wye
];

function symbol() {
  var type = constant(circle),
      size = constant(64),
      context = null;

  function symbol() {
    var buffer;
    if (!context) context = buffer = d3Path.path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }

  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant(_), symbol) : type;
  };

  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant(+_), symbol) : size;
  };

  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };

  return symbol;
}

function noop() {}

function point(that, x, y) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x) / 6,
    (that._y0 + 4 * that._y1 + y) / 6
  );
}

function Basis(context) {
  this._context = context;
}

Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3: point(this, this._x1, this._y1); // proceed
      case 2: this._context.lineTo(this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basis(context) {
  return new Basis(context);
}

function BasisClosed(context) {
  this._context = context;
}

BasisClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x2 = x, this._y2 = y; break;
      case 1: this._point = 2; this._x3 = x, this._y3 = y; break;
      case 2: this._point = 3; this._x4 = x, this._y4 = y; this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6); break;
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basisClosed(context) {
  return new BasisClosed(context);
}

function BasisOpen(context) {
  this._context = context;
}

BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6; this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0); break;
      case 3: this._point = 4; // proceed
      default: point(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
  }
};

function basisOpen(context) {
  return new BasisOpen(context);
}

function Bundle(context, beta) {
  this._basis = new Basis(context);
  this._beta = beta;
}

Bundle.prototype = {
  lineStart: function() {
    this._x = [];
    this._y = [];
    this._basis.lineStart();
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        j = x.length - 1;

    if (j > 0) {
      var x0 = x[0],
          y0 = y[0],
          dx = x[j] - x0,
          dy = y[j] - y0,
          i = -1,
          t;

      while (++i <= j) {
        t = i / j;
        this._basis.point(
          this._beta * x[i] + (1 - this._beta) * (x0 + t * dx),
          this._beta * y[i] + (1 - this._beta) * (y0 + t * dy)
        );
      }
    }

    this._x = this._y = null;
    this._basis.lineEnd();
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

var bundle = (function custom(beta) {

  function bundle(context) {
    return beta === 1 ? new Basis(context) : new Bundle(context, beta);
  }

  bundle.beta = function(beta) {
    return custom(+beta);
  };

  return bundle;
})(0.85);

function point$1(that, x, y) {
  that._context.bezierCurveTo(
    that._x1 + that._k * (that._x2 - that._x0),
    that._y1 + that._k * (that._y2 - that._y0),
    that._x2 + that._k * (that._x1 - x),
    that._y2 + that._k * (that._y1 - y),
    that._x2,
    that._y2
  );
}

function Cardinal(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

Cardinal.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: point$1(this, this._x1, this._y1); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; this._x1 = x, this._y1 = y; break;
      case 2: this._point = 3; // proceed
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinal = (function custom(tension) {

  function cardinal(context) {
    return new Cardinal(context, tension);
  }

  cardinal.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal;
})(0);

function CardinalClosed(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalClosed = (function custom(tension) {

  function cardinal$$1(context) {
    return new CardinalClosed(context, tension);
  }

  cardinal$$1.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal$$1;
})(0);

function CardinalOpen(context, tension) {
  this._context = context;
  this._k = (1 - tension) / 6;
}

CardinalOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$1(this, x, y); break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var cardinalOpen = (function custom(tension) {

  function cardinal$$1(context) {
    return new CardinalOpen(context, tension);
  }

  cardinal$$1.tension = function(tension) {
    return custom(+tension);
  };

  return cardinal$$1;
})(0);

function point$2(that, x, y) {
  var x1 = that._x1,
      y1 = that._y1,
      x2 = that._x2,
      y2 = that._y2;

  if (that._l01_a > epsilon) {
    var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a,
        n = 3 * that._l01_a * (that._l01_a + that._l12_a);
    x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
    y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
  }

  if (that._l23_a > epsilon) {
    var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a,
        m = 3 * that._l23_a * (that._l23_a + that._l12_a);
    x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
    y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
  }

  that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}

function CatmullRom(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRom.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x2, this._y2); break;
      case 3: this.point(this._x2, this._y2); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; // proceed
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRom = (function custom(alpha) {

  function catmullRom(context) {
    return alpha ? new CatmullRom(context, alpha) : new Cardinal(context, 0);
  }

  catmullRom.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom;
})(0.5);

function CatmullRomClosed(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 =
    this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; this._x3 = x, this._y3 = y; break;
      case 1: this._point = 2; this._context.moveTo(this._x4 = x, this._y4 = y); break;
      case 2: this._point = 3; this._x5 = x, this._y5 = y; break;
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomClosed = (function custom(alpha) {

  function catmullRom$$1(context) {
    return alpha ? new CatmullRomClosed(context, alpha) : new CardinalClosed(context, 0);
  }

  catmullRom$$1.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom$$1;
})(0.5);

function CatmullRomOpen(context, alpha) {
  this._context = context;
  this._alpha = alpha;
}

CatmullRomOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 =
    this._y0 = this._y1 = this._y2 = NaN;
    this._l01_a = this._l12_a = this._l23_a =
    this._l01_2a = this._l12_2a = this._l23_2a =
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || (this._line !== 0 && this._point === 3)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;

    if (this._point) {
      var x23 = this._x2 - x,
          y23 = this._y2 - y;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
    }

    switch (this._point) {
      case 0: this._point = 1; break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2); break;
      case 3: this._point = 4; // proceed
      default: point$2(this, x, y); break;
    }

    this._l01_a = this._l12_a, this._l12_a = this._l23_a;
    this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
    this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
  }
};

var catmullRomOpen = (function custom(alpha) {

  function catmullRom$$1(context) {
    return alpha ? new CatmullRomOpen(context, alpha) : new CardinalOpen(context, 0);
  }

  catmullRom$$1.alpha = function(alpha) {
    return custom(+alpha);
  };

  return catmullRom$$1;
})(0.5);

function LinearClosed(context) {
  this._context = context;
}

LinearClosed.prototype = {
  areaStart: noop,
  areaEnd: noop,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x, y) {
    x = +x, y = +y;
    if (this._point) this._context.lineTo(x, y);
    else this._point = 1, this._context.moveTo(x, y);
  }
};

function linearClosed(context) {
  return new LinearClosed(context);
}

function sign(x) {
  return x < 0 ? -1 : 1;
}

// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0,
      h1 = x2 - that._x1,
      s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0),
      s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0),
      p = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}

// Calculate a one-sided slope.
function slope2(that, t) {
  var h = that._x1 - that._x0;
  return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}

// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point$3(that, t0, t1) {
  var x0 = that._x0,
      y0 = that._y0,
      x1 = that._x1,
      y1 = that._y1,
      dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}

function MonotoneX(context) {
  this._context = context;
}

MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 =
    this._y0 = this._y1 =
    this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2: this._context.lineTo(this._x1, this._y1); break;
      case 3: point$3(this, this._t0, slope2(this, this._t0)); break;
    }
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x, y) {
    var t1 = NaN;

    x = +x, y = +y;
    if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; break;
      case 2: this._point = 3; point$3(this, slope2(this, t1 = slope3(this, x, y)), t1); break;
      default: point$3(this, this._t0, t1 = slope3(this, x, y)); break;
    }

    this._x0 = this._x1, this._x1 = x;
    this._y0 = this._y1, this._y1 = y;
    this._t0 = t1;
  }
};

function MonotoneY(context) {
  this._context = new ReflectContext(context);
}

(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
  MonotoneX.prototype.point.call(this, y, x);
};

function ReflectContext(context) {
  this._context = context;
}

ReflectContext.prototype = {
  moveTo: function(x, y) { this._context.moveTo(y, x); },
  closePath: function() { this._context.closePath(); },
  lineTo: function(x, y) { this._context.lineTo(y, x); },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) { this._context.bezierCurveTo(y1, x1, y2, x2, y, x); }
};

function monotoneX(context) {
  return new MonotoneX(context);
}

function monotoneY(context) {
  return new MonotoneY(context);
}

function Natural(context) {
  this._context = context;
}

Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x = this._x,
        y = this._y,
        n = x.length;

    if (n) {
      this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
      if (n === 2) {
        this._context.lineTo(x[1], y[1]);
      } else {
        var px = controlPoints(x),
            py = controlPoints(y);
        for (var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
        }
      }
    }

    if (this._line || (this._line !== 0 && n === 1)) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x, y) {
    this._x.push(+x);
    this._y.push(+y);
  }
};

// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
  var i,
      n = x.length - 1,
      m,
      a = new Array(n),
      b = new Array(n),
      r = new Array(n);
  a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
  for (i = 1; i < n - 1; ++i) a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
  a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
  for (i = 1; i < n; ++i) m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
  a[n - 1] = r[n - 1] / b[n - 1];
  for (i = n - 2; i >= 0; --i) a[i] = (r[i] - a[i + 1]) / b[i];
  b[n - 1] = (x[n] + a[n - 1]) / 2;
  for (i = 0; i < n - 1; ++i) b[i] = 2 * x[i + 1] - a[i + 1];
  return [a, b];
}

function natural(context) {
  return new Natural(context);
}

function Step(context, t) {
  this._context = context;
  this._t = t;
}

Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || (this._line !== 0 && this._point === 1)) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x, y) {
    x = +x, y = +y;
    switch (this._point) {
      case 0: this._point = 1; this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y); break;
      case 1: this._point = 2; // proceed
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y);
          this._context.lineTo(x, y);
        } else {
          var x1 = this._x * (1 - this._t) + x * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y);
        }
        break;
      }
    }
    this._x = x, this._y = y;
  }
};

function step(context) {
  return new Step(context, 0.5);
}

function stepBefore(context) {
  return new Step(context, 0);
}

function stepAfter(context) {
  return new Step(context, 1);
}

function none(series, order) {
  if (!((n = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}

function none$1(series) {
  var n = series.length, o = new Array(n);
  while (--n >= 0) o[n] = n;
  return o;
}

function stackValue(d, key) {
  return d[key];
}

function stack() {
  var keys = constant([]),
      order = none$1,
      offset = none,
      value = stackValue;

  function stack(data) {
    var kz = keys.apply(this, arguments),
        i,
        m = data.length,
        n = kz.length,
        sz = new Array(n),
        oz;

    for (i = 0; i < n; ++i) {
      for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
        si[j] = sij = [0, +value(data[j], ki, j, data)];
        sij.data = data[j];
      }
      si.key = ki;
    }

    for (i = 0, oz = order(sz); i < n; ++i) {
      sz[oz[i]].index = i;
    }

    offset(sz, oz);
    return sz;
  }

  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant(slice.call(_)), stack) : keys;
  };

  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), stack) : value;
  };

  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? none$1 : typeof _ === "function" ? _ : constant(slice.call(_)), stack) : order;
  };

  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? none : _, stack) : offset;
  };

  return stack;
}

function expand(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, n, j = 0, m = series[0].length, y; j < m; ++j) {
    for (y = i = 0; i < n; ++i) y += series[i][j][1] || 0;
    if (y) for (i = 0; i < n; ++i) series[i][j][1] /= y;
  }
  none(series, order);
}

function diverging(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j) {
    for (yp = yn = 0, i = 0; i < n; ++i) {
      if ((dy = (d = series[order[i]][j])[1] - d[0]) >= 0) {
        d[0] = yp, d[1] = yp += dy;
      } else if (dy < 0) {
        d[1] = yn, d[0] = yn += dy;
      } else {
        d[0] = yp;
      }
    }
  }
}

function silhouette(series, order) {
  if (!((n = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j) {
    for (var i = 0, y = 0; i < n; ++i) y += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y / 2;
  }
  none(series, order);
}

function wiggle(series, order) {
  if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
  for (var y = 0, j = 1, s0, m, n; j < m; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n; ++i) {
      var si = series[order[i]],
          sij0 = si[j][1] || 0,
          sij1 = si[j - 1][1] || 0,
          s3 = (sij0 - sij1) / 2;
      for (var k = 0; k < i; ++k) {
        var sk = series[order[k]],
            skj0 = sk[j][1] || 0,
            skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y;
    if (s1) y -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y;
  none(series, order);
}

function appearance(series) {
  var peaks = series.map(peak);
  return none$1(series).sort(function(a, b) { return peaks[a] - peaks[b]; });
}

function peak(series) {
  var i = -1, j = 0, n = series.length, vi, vj = -Infinity;
  while (++i < n) if ((vi = +series[i][1]) > vj) vj = vi, j = i;
  return j;
}

function ascending(series) {
  var sums = series.map(sum);
  return none$1(series).sort(function(a, b) { return sums[a] - sums[b]; });
}

function sum(series) {
  var s = 0, i = -1, n = series.length, v;
  while (++i < n) if (v = +series[i][1]) s += v;
  return s;
}

function descending$1(series) {
  return ascending(series).reverse();
}

function insideOut(series) {
  var n = series.length,
      i,
      j,
      sums = series.map(sum),
      order = appearance(series),
      top = 0,
      bottom = 0,
      tops = [],
      bottoms = [];

  for (i = 0; i < n; ++i) {
    j = order[i];
    if (top < bottom) {
      top += sums[j];
      tops.push(j);
    } else {
      bottom += sums[j];
      bottoms.push(j);
    }
  }

  return bottoms.reverse().concat(tops);
}

function reverse(series) {
  return none$1(series).reverse();
}

exports.arc = arc;
exports.area = area;
exports.line = line;
exports.pie = pie;
exports.areaRadial = areaRadial;
exports.radialArea = areaRadial;
exports.lineRadial = lineRadial$1;
exports.radialLine = lineRadial$1;
exports.pointRadial = pointRadial;
exports.linkHorizontal = linkHorizontal;
exports.linkVertical = linkVertical;
exports.linkRadial = linkRadial;
exports.symbol = symbol;
exports.symbols = symbols;
exports.symbolCircle = circle;
exports.symbolCross = cross;
exports.symbolDiamond = diamond;
exports.symbolSquare = square;
exports.symbolStar = star;
exports.symbolTriangle = triangle;
exports.symbolWye = wye;
exports.curveBasisClosed = basisClosed;
exports.curveBasisOpen = basisOpen;
exports.curveBasis = basis;
exports.curveBundle = bundle;
exports.curveCardinalClosed = cardinalClosed;
exports.curveCardinalOpen = cardinalOpen;
exports.curveCardinal = cardinal;
exports.curveCatmullRomClosed = catmullRomClosed;
exports.curveCatmullRomOpen = catmullRomOpen;
exports.curveCatmullRom = catmullRom;
exports.curveLinearClosed = linearClosed;
exports.curveLinear = curveLinear;
exports.curveMonotoneX = monotoneX;
exports.curveMonotoneY = monotoneY;
exports.curveNatural = natural;
exports.curveStep = step;
exports.curveStepAfter = stepAfter;
exports.curveStepBefore = stepBefore;
exports.stack = stack;
exports.stackOffsetExpand = expand;
exports.stackOffsetDiverging = diverging;
exports.stackOffsetNone = none;
exports.stackOffsetSilhouette = silhouette;
exports.stackOffsetWiggle = wiggle;
exports.stackOrderAppearance = appearance;
exports.stackOrderAscending = ascending;
exports.stackOrderDescending = descending$1;
exports.stackOrderInsideOut = insideOut;
exports.stackOrderNone = none$1;
exports.stackOrderReverse = reverse;

Object.defineProperty(exports, '__esModule', { value: true });

})));

},{"d3-path":6}],8:[function(_dereq_,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).fitAspect=e()}}(function(){return function a(o,s,d){function c(t,e){if(!s[t]){if(!o[t]){var i="function"==typeof _dereq_&&_dereq_;if(!e&&i)return i(t,!0);if(l)return l(t,!0);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}var r=s[t]={exports:{}};o[t][0].call(r.exports,function(e){return c(o[t][1][e]||e)},r,r.exports,a,o,s,d)}return s[t].exports}for(var l="function"==typeof _dereq_&&_dereq_,e=0;e<d.length;e++)c(d[e]);return c}({1:[function(e,t,i){"use strict";var n=[{names:["square","1:1","instagram"],description:"Square",decimal:1,orientation:"landscape"},{names:["4:3","fullscreen","four three","1.33:1","ipad","pythagorean"],description:"Traditional TVs",decimal:1.333333,orientation:"landscape"},{names:["a4","√2:1","paper","lichtenberg","1:1.41"],description:"A4 paper",decimal:1.41},{names:["imax","1.43:1"],description:"IMAX film",decimal:1.43,orientation:"landscape"},{names:["3:2","35mm","photo","1.5:1","1.5"],description:"35mm photos",decimal:1.5,orientation:"landscape"},{names:["business card","bank card","1.58:1"],description:"Bank Cards",decimal:1.58577,orientation:"landscape"},{names:["golden","kepler","1.618","1.6:1"],description:"Golden ratio",decimal:1.61803,orientation:"landscape"},{names:["16:9","hd","hdtv","fhd","tv","computer","iphone","4k","8k","1.78:1"],description:"HD video",decimal:1.77777,orientation:"landscape"},{names:["widescreen","1.85:1"],description:"Movie-theatres",decimal:1.85,orientation:"landscape"},{names:["2:1","univisium","mobile","18:9"],description:"2:1",decimal:2,orientation:"landscape"},{names:["cinemascope","widescreen","wide","2.35:1","2.39:1"],description:"Widescreen",decimal:2.35,orientation:"landscape"},{names:["silver","1 + √2","2.41:1"],description:"Silver ratio",decimal:2.41,orientation:"landscape"}],r=n.map(function(e){return(e=Object.assign({},e)).decimal=1/e.decimal,e.orientation="portrait",e}),a={};n.forEach(function(t){t.names.forEach(function(e){a[e]=t})}),t.exports={lookup:a,portraits:r,list:n}},{}],2:[function(e,t,i){"use strict";var n=e("./aspects");t.exports=function(e,t){var i=e/t;return(i=parseInt(100*i,10)/100)<1?function(e,t){for(var i=0;i<t.length;i+=1)if(e>t[i].decimal){if(t[i-1]){var n=Math.abs(e-t[i].decimal);if(Math.abs(e-t[i-1].decimal)<n)return t[i-1]}return t[i]}return t[t.length-1]}(i,n.portraits):function(e,t){for(var i=0;i<t.length;i+=1)if(e<=t[i].decimal){if(t[i-1]){var n=Math.abs(e-t[i].decimal);if(Math.abs(e-t[i-1].decimal)<n)return t[i-1]}return t[i]}return t[t.length-1]}(i,n.list)}},{"./aspects":1}],3:[function(e,t,i){"use strict";var n=function(e,t){var i=1/t.decimal,n=e.orientation||"landscape";"portrait"===n&&(i=1/i);var r=e.width*i;return r=Math.round(r),{closest:t,width:e.width,height:r,orientation:n,original:e}},r=function(e,t){var i=t.decimal,n=e.orientation||"landscape";"portrait"===n&&(i=1/i);var r=e.height*i;return{closest:t,width:r=Math.round(r),height:e.height,orientation:n,original:e}};t.exports={both:function(e,t){var i=r(e,t);return i.width>e.width?n(e,t):i},width:r,height:n}},{}],4:[function(i,n,e){(function(e){"use strict";var o=i("./find-best-ratio"),s=i("./parse-ratio"),d=i("./fit"),t=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};if(!e.aspect&&!e.ratio){var t=o(e.width,e.height),i=1/t.decimal,n=e.width*i,r=(n-e.height)/e.height;return r=parseInt(1e3*r,10)/10,n=Math.round(n),{closest:t,percent_change:r,width:e.width,height:n}}var a=s(e.aspect||e.ratio||"");return null===a?(console.error("find-aspect-ratio error: Could not find a given aspect ratio."),e):"number"==typeof e.width&&"number"==typeof e.height?d.both(e,a):"number"==typeof e.width?d.height(e,a):"number"==typeof e.height?d.width(e,a):(console.error("find-aspect-ratio error: Please supply a height, width, or ratio value."),e)};"undefined"!=typeof self?self.nlp=t:"undefined"!=typeof window?window.nlp=t:void 0!==e&&(e.nlp=t),void 0!==n&&(n.exports=t)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./find-best-ratio":2,"./fit":3,"./parse-ratio":5}],5:[function(e,t,i){"use strict";var n=e("./aspects"),r=/^[0-9\.]+:[0-9\.]+$/;t.exports=function(e){if(e=(e=(e=(e=e.toLowerCase()).trim()).replace(" ratio","")).replace("-"," "),!0===n.lookup.hasOwnProperty(e))return n.lookup[e];if(!0!==r.test(e))return null;var t=e.split(":");return{description:"custom",decimal:parseFloat(t[0])/parseFloat(t[1])}}},{"./aspects":1}]},{},[4])(4)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(_dereq_,module,exports){
!function(){var n=function(t,e,u,r){for(var o=1;o<e.length;o++){var s=e[o],f="number"==typeof s?u[s]:s,p=e[++o];1===p?r[0]=f:3===p?r[1]=Object.assign(r[1]||{},f):5===p?(r[1]=r[1]||{})[e[++o]]=f:6===p?r[1][e[++o]]+=f+"":r.push(p?t.apply(null,n(t,f,u,["",null])):f)}return r},t=function(n){for(var t,e,u=1,r="",o="",s=[0],f=function(n){1===u&&(n||(r=r.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(n||r,0):3===u&&(n||r)?(s.push(n||r,1),u=2):2===u&&"..."===r&&n?s.push(n,3):2===u&&r&&!n?s.push(!0,5,r):u>=5&&((r||!n&&5===u)&&(s.push(r,u,e),u=6),n&&(s.push(n,u,e),u=6)),r=""},p=0;p<n.length;p++){p&&(1===u&&f(),f(p));for(var h=0;h<n[p].length;h++)t=n[p][h],1===u?"<"===t?(f(),s=[s],u=3):r+=t:4===u?"--"===r&&">"===t?(u=1,r=""):r=t+r[0]:o?t===o?o="":r+=t:'"'===t||"'"===t?o=t:">"===t?(f(),u=1):u&&("="===t?(u=5,e=r,r=""):"/"===t&&(u<5||">"===n[p][h+1])?(f(),3===u&&(s=s[0]),u=s,(s=s[0]).push(u,2),u=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(f(),u=2):r+=t),3===u&&"!--"===r&&(u=4,s=s[0])}return f(),s},e="function"==typeof Map,u=e?new Map:{},r=e?function(n){var e=u.get(n);return e||u.set(n,e=t(n)),e}:function(n){for(var e="",r=0;r<n.length;r++)e+=n[r].length+"-"+n[r];return u[e]||(u[e]=t(n))},o=function(t){var e=n(this,r(t),arguments,[]);return e.length>1?e:e[0]};"undefined"!=typeof module?module.exports=o:self.htm=o}();

},{}],10:[function(_dereq_,module,exports){
(function (global){
/* somehow v0.0.9
   github.com/spencermountain/somehow-input
   MIT
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.somehowInput = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof _dereq_&&_dereq_;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof _dereq_&&_dereq_,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
!function(){var n=function(t,e,r,u){for(var o=1;o<e.length;o++){var f=e[o++],s="number"==typeof f?r[f]:f;1===e[o]?u[0]=s:2===e[o]?(u[1]=u[1]||{})[e[++o]]=s:3===e[o]?u[1]=Object.assign(u[1]||{},s):u.push(e[o]?t.apply(null,n(t,s,r,["",null])):s)}return u},t=function(n){for(var t,e,r=1,u="",o="",f=[0],s=function(n){1===r&&(n||(u=u.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?f.push(n||u,0):3===r&&(n||u)?(f.push(n||u,1),r=2):2===r&&"..."===u&&n?f.push(n,3):2===r&&u&&!n?f.push(!0,2,u):4===r&&e&&(f.push(n||u,2,e),e=""),u=""},p=0;p<n.length;p++){p&&(1===r&&s(),s(p));for(var h=0;h<n[p].length;h++)t=n[p][h],1===r?"<"===t?(s(),f=[f],r=3):u+=t:o?t===o?o="":u+=t:'"'===t||"'"===t?o=t:">"===t?(s(),r=1):r&&("="===t?(r=4,e=u,u=""):"/"===t?(s(),3===r&&(f=f[0]),r=f,(f=f[0]).push(r,4),r=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(s(),r=2):u+=t)}return s(),f},e="function"==typeof Map,r=e?new Map:{},u=e?function(n){var e=r.get(n);return e||r.set(n,e=t(n)),e}:function(n){for(var e="",u=0;u<n.length;u++)e+=n[u].length+"-"+n[u];return r[e]||(r[e]=t(n))},o=function(t){var e=n(this,u(t),arguments,[]);return e.length>1?e:e[0]};"undefined"!=typeof module?module.exports=o:self.htm=o}();

},{}],2:[function(_dereq_,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).spencerColor=e()}}(function(){return function u(i,a,c){function f(r,e){if(!a[r]){if(!i[r]){var o="function"==typeof _dereq_&&_dereq_;if(!e&&o)return o(r,!0);if(d)return d(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var t=a[r]={exports:{}};i[r][0].call(t.exports,function(e){return f(i[r][1][e]||e)},t,t.exports,u,i,a,c)}return a[r].exports}for(var d="function"==typeof _dereq_&&_dereq_,e=0;e<c.length;e++)f(c[e]);return f}({1:[function(e,r,o){"use strict";r.exports={blue:"#6699cc",green:"#6accb2",yellow:"#e1e6b3",red:"#cc7066",pink:"#F2C0BB",brown:"#705E5C",orange:"#cc8a66",purple:"#d8b3e6",navy:"#335799",olive:"#7f9c6c",fuscia:"#735873",beige:"#e6d7b3",slate:"#8C8C88",suede:"#9c896c",burnt:"#603a39",sea:"#50617A",sky:"#2D85A8",night:"#303b50",rouge:"#914045",grey:"#838B91",mud:"#C4ABAB",royal:"#275291",cherry:"#cc6966",tulip:"#e6b3bc",rose:"#D68881",fire:"#AB5850",greyblue:"#72697D",greygreen:"#8BA3A2",greypurple:"#978BA3",burn:"#6D5685",slategrey:"#bfb0b3",light:"#a3a5a5",lighter:"#d7d5d2",fudge:"#4d4d4d",lightgrey:"#949a9e",white:"#fbfbfb",dimgrey:"#606c74",softblack:"#463D4F",dark:"#443d3d",black:"#333333"}},{}],2:[function(e,r,o){"use strict";var n=e("./colors"),t={juno:["blue","mud","navy","slate","pink","burn"],barrow:["rouge","red","orange","burnt","brown","greygreen"],roma:["#8a849a","#b5b0bf","rose","lighter","greygreen","mud"],palmer:["red","navy","olive","pink","suede","sky"],mark:["#848f9a","#9aa4ac","slate","#b0b8bf","mud","grey"],salmon:["sky","sea","fuscia","slate","mud","fudge"],dupont:["green","brown","orange","red","olive","blue"],bloor:["night","navy","beige","rouge","mud","grey"],yukon:["mud","slate","brown","sky","beige","red"],david:["blue","green","yellow","red","pink","light"],neste:["mud","cherry","royal","rouge","greygreen","greypurple"],ken:["red","sky","#c67a53","greygreen","#dfb59f","mud"]};Object.keys(t).forEach(function(e){t[e]=t[e].map(function(e){return n[e]||e})}),r.exports=t},{"./colors":1}],3:[function(e,r,o){"use strict";var n=e("./colors"),t=e("./combos"),u={colors:n,list:Object.keys(n).map(function(e){return n[e]}),combos:t};r.exports=u},{"./colors":1,"./combos":2}]},{},[3])(3)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(_dereq_,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.vhtml = factory());
}(this, (function () { 'use strict';

var emptyTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

var esc = function esc(str) {
	return String(str).replace(/[&<>"']/g, function (s) {
		return '&' + map[s] + ';';
	});
};
var map = { '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', "'": 'apos' };

var sanitized = {};

function h(name, attrs) {
	var stack = [];
	for (var i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}

	if (typeof name === 'function') {
		(attrs || (attrs = {})).children = stack.reverse();
		return name(attrs);
	}

	var s = '<' + name;
	if (attrs) for (var _i in attrs) {
		if (attrs[_i] !== false && attrs[_i] != null) {
			s += ' ' + esc(_i) + '="' + esc(attrs[_i]) + '"';
		}
	}

	if (emptyTags.indexOf(name) === -1) {
		s += '>';

		while (stack.length) {
			var child = stack.pop();
			if (child) {
				if (child.pop) {
					for (var _i2 = child.length; _i2--;) {
						stack.push(child[_i2]);
					}
				} else {
					s += sanitized[child] === true ? child : esc(child);
				}
			}
		}

		s += '</' + name + '>';
	} else {
		s += '>';
	}

	sanitized[s] = true;
	return s;
}

return h;

})));


},{}],4:[function(_dereq_,module,exports){
"use strict";

var Input = _dereq_('./inputs/Input');

var Slider = _dereq_('./inputs/Slider');

var Vslider = _dereq_('./inputs/Vslider');

var PlusMinus = _dereq_('./inputs/PlusMinus');

var Textarea = _dereq_('./inputs/Textarea');

var Duration = _dereq_('./inputs/Duration');

var Tabs = _dereq_('./inputs/Tabs');

var Legend = _dereq_('./inputs/Legend');

var Select = _dereq_('./inputs/Select');

var Button = _dereq_('./inputs/Button');

var ColorPicker = _dereq_('./inputs/ColorPicker');

var inputs = {
  input: function input(obj) {
    return new Input(obj);
  },
  slider: function slider(obj) {
    return new Slider(obj);
  },
  vslider: function vslider(obj) {
    return new Vslider(obj);
  },
  plusMinus: function plusMinus(obj) {
    return new PlusMinus(obj);
  },
  textarea: function textarea(obj) {
    return new Textarea(obj);
  },
  duration: function duration(obj) {
    return new Duration(obj);
  },
  legend: function legend(obj) {
    return new Legend(obj);
  },
  tabs: function tabs(obj) {
    return new Tabs(obj);
  },
  select: function select(obj) {
    return new Select(obj);
  },
  button: function button(obj) {
    return new Button(obj);
  },
  colorPicker: function colorPicker(obj) {
    return new ColorPicker(obj);
  }
};
module.exports = inputs;

},{"./inputs/Button":5,"./inputs/ColorPicker":6,"./inputs/Duration":7,"./inputs/Input":8,"./inputs/Legend":9,"./inputs/PlusMinus":10,"./inputs/Select":11,"./inputs/Slider":12,"./inputs/Tabs":13,"./inputs/Textarea":14,"./inputs/Vslider":15}],5:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["<div class=\"col maxw7\">\n      <div class=\"grey center ulblue\">", "</div>\n      <div class=\"grey pointer ullighter b3 white\" style=", " id=\"", "\">\n    ", "\n    </div>\n      </div>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Input = _dereq_('./Input'); // const colors = require('spencer-color').colors


var uid = _dereq_('../uid');

var defaults = {
  color: '#2D85A8'
};

var Button =
/*#__PURE__*/
function (_Input) {
  _inherits(Button, _Input);

  function Button() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Button);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Button).call(this, obj));
    _this.attrs = Object.assign({}, defaults, _this.attrs);
    _this._id = obj.id || uid('_btn');
    _this.labels = obj.labels || {};
    _this.color = obj.color || defaults.color;
    return _this;
  }

  _createClass(Button, [{
    key: "setCallback",
    value: function setCallback() {
      var _this2 = this;

      setTimeout(function () {
        var el = document.getElementById(_this2._id);
        el.addEventListener('click', function (e) {
          _this2.callback(e.target.value);
        });
      }, 50);
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.h;
      this.setCallback();
      var label = '';

      if (this._label) {
        label = this._label + ':';
      }

      var style = 'padding:0.5rem; margin-left:0.5rem; user-select: none; background-color: ' + this.color;
      return h(_templateObject(), label, style, this._id, this.attrs.value); // <button ...${this.attrs} class="f2">${this.attrs.value}</button>
    }
  }]);

  return Button;
}(Input);

module.exports = Button;

},{"../uid":17,"./Input":8}],6:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n    <div class=\"col\">\n      <div class=\"grey center ulblue\">", "</div>\n      <div class=\"row nowrap\" id=\"", "\">\n        ", "\n      </div>\n    </div>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<div class=\"h3 w3 shadow colorChoice\" style=\"", "\"></div>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Input = _dereq_('./Input');

var uid = _dereq_('../uid');

var defaults = {};

var ColorPicker =
/*#__PURE__*/
function (_Input) {
  _inherits(ColorPicker, _Input);

  function ColorPicker() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ColorPicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ColorPicker).call(this, obj));
    _this.attrs = Object.assign({}, defaults, _this.attrs);
    _this._id = obj.id || uid('_color');
    _this.labels = obj.labels || {};
    _this.color = obj.color || defaults.color;
    return _this;
  }

  _createClass(ColorPicker, [{
    key: "setCallback",
    value: function setCallback() {
      var _this2 = this;

      setTimeout(function () {
        var el = document.getElementById(_this2._id);
        el.addEventListener('click', function (e) {
          _this2.callback(e.target.value);
        });
      }, 50);
    }
  }, {
    key: "chooseColor",
    value: function chooseColor() {
      var _this3 = this;

      this.debounce(function () {
        _this3.callback(e.target.value);
      }, 300);
    }
  }, {
    key: "moreCallbacks",
    value: function moreCallbacks() {
      var _this4 = this;

      setTimeout(function () {
        document.getElementById(_this4._id).onclick = function () {
          console.log('hi');
        };
      });
    }
  }, {
    key: "drawBox",
    value: function drawBox(c) {
      var style = "background-color:".concat(c, ";");

      if (this.attrs.value === c) {
        style += 'border:3px solid whitesmoke;';
      }

      return this.h(_templateObject(), style);
    }
  }, {
    key: "build",
    value: function build() {
      var _this5 = this;

      var h = this.h;
      this.setCallback();
      var label = '';

      if (this._label) {
        label = this._label + ':';
      }

      var options = this.attrs.options.map(function (c) {
        return _this5.drawBox(c);
      });
      return h(_templateObject2(), label, this._id, options);
    }
  }]);

  return ColorPicker;
}(Input);

module.exports = ColorPicker;

},{"../uid":17,"./Input":8}],7:[function(_dereq_,module,exports){
"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["<div class=\"col w100p\">\n      <div class=\"grey\">", "</div>\n      <input class=\"w100p\" type=\"range\" id=\"", "\" value=", " ...", "/>\n      <div id=\"", "\" class=\"grey\">", "</div>\n    </div>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Input = _dereq_('./Input');

var uid = _dereq_('../uid');

var mil = _dereq_('../milliseconds');

var defaults = {
  min: 0,
  max: mil.year,
  value: mil.month * 6,
  step: mil.day,
  debounce: false
};

var Slider =
/*#__PURE__*/
function (_Input) {
  _inherits(Slider, _Input);

  function Slider() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Slider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slider).call(this, obj));
    _this.attrs = Object.assign({}, defaults, _this.attrs);
    _this._id = obj.id || uid('duration');
    _this.display_id = _this._id + 'display';

    if (obj.show_number === undefined) {
      obj.show_number = true;
    }

    _this.show_number = obj.show_number;

    if (_typeof(obj.max) === 'object') {
      _this.attrs.max = _this.parseObj(obj.max);
    }

    if (_typeof(obj.min) === 'object') {
      _this.attrs.min = _this.parseObj(obj.min);
    }

    _this._value = _this.attrs.value;

    if (_typeof(obj.value) === 'object') {
      _this._value = _this.parseObj(obj.value);
    } else {
      _this._value = obj.value;
    }

    return _this;
  }

  _createClass(Slider, [{
    key: "parseObj",
    value: function parseObj(obj) {
      var val = 0;
      Object.keys(obj).forEach(function (k) {
        val += (mil[k] || 0) * obj[k];
      });
      val *= 1.01;
      return val;
    }
  }, {
    key: "round",
    value: function round(val) {
      if (this.attrs.decimal) {
        return parseInt(val * 10, 10) / 10;
      }

      return parseInt(val, 10);
    }
  }, {
    key: "displayText",
    value: function displayText() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (val >= mil.year * 0.99) {
        return this.round(val / mil.year) + ' years';
      }

      if (val >= mil.month * 0.99) {
        return this.round(val / mil.month) + ' months';
      }

      if (val >= mil.week * 0.99) {
        return this.round(val / mil.week) + ' weeks';
      }

      if (val >= mil.day * 0.99) {
        return this.round(val / mil.day) + ' days';
      }

      return this.round(val / mil.hour) + ' hours';
    }
  }, {
    key: "redraw",
    value: function redraw() {
      if (this.show_number) {
        var el = document.getElementById(this.display_id);
        el.innerHTML = this.displayText(this._value);
      }
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.h;
      this.setCallback();
      var label = '';

      if (this._label) {
        label = this._label + ':';
      }

      return h(_templateObject(), label, this._id, this._value, this.attrs, this.display_id, this.displayText(this._value));
    }
  }]);

  return Slider;
}(Input);

module.exports = Slider;

},{"../milliseconds":16,"../uid":17,"./Input":8}],8:[function(_dereq_,module,exports){
"use strict";

function _templateObject() {
  var data = _taggedTemplateLiteral(["<div class=\"col\">\n      <div class=\"grey\">", "</div>\n      <input id=\"", "\" class=\"input\" style=\"max-width:8rem; padding-right:0px;\" type=\"text\" style=", " value=\"", "\"/>\n    </div>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var htm = _dereq_('htm');

var vhtml = _dereq_('vhtml');

var uid = _dereq_('../uid');

var urlParam = _dereq_('../url-param');

var defaults = {};

var Input =
/*#__PURE__*/
function () {
  function Input() {
    var _this = this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Input);

    if (typeof obj === 'string') {
      this._id = obj;
      obj = {};
    }

    this.attrs = Object.assign({}, defaults, obj);
    this._id = obj.id || uid('input');
    this._value = obj.value || ''; //override value from url param

    if (this.attrs.param) {
      this._value = urlParam.get(this.attrs.param) || this._value;
    }

    this._label = obj.label || '';

    var cb = obj.cb || function () {};

    this.callback = function (val) {
      _this._value = val;

      _this.redraw();

      cb(val);
    };

    this.timeout = null;
    this.el = null;
    this.h = htm.bind(vhtml);
    this.el = obj.el || null;
  }

  _createClass(Input, [{
    key: "bind",
    value: function bind(fn) {
      this.h = htm.bind(fn);
    }
  }, {
    key: "debounce",
    value: function debounce(cb, duration) {
      //support immediate-mode
      if (this.attrs.debounce === false) {
        cb();
        return;
      }

      if (this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(cb, duration);
    }
  }, {
    key: "setUrl",
    value: function setUrl(val) {
      if (this.attrs.param) {
        var url = urlParam.set(window.location.href, this.attrs.param, val);
        window.history.replaceState('', '', url);
      }
    }
  }, {
    key: "setCallback",
    value: function setCallback() {
      var _this2 = this;

      setTimeout(function () {
        var el = document.getElementById(_this2._id);
        el.addEventListener('input', function (e) {
          _this2.debounce(function () {
            var val = e.target.value;

            _this2.setUrl(val);

            _this2.callback(val);
          }, 300);
        });
      }, 50);
    }
  }, {
    key: "redraw",
    value: function redraw() {}
  }, {
    key: "build",
    value: function build() {
      var label = '';

      if (this._label) {
        label = this._label + ':';
      }

      this.setCallback();
      var style = '';

      if (this.attrs.width) {
        style = "max-width:".concat(this.attrs.width, "px; min-width:10px;");
      }

      return this.h(_templateObject(), label, this._id, style, this._value);
    }
  }]);

  return Input;
}();

module.exports = Input;

},{"../uid":17,"../url-param":18,"htm":1,"vhtml":3}],9:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<div class=\"col maxw7\" id=\"", "\">\n      <div class=\"grey center ulblue\">", "</div>\n      ", "\n      </div>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<div class=\"row-left pointer legend-row\">\n        <div class=\"w2 rounded m1\" style=\"", "\"></div>\n        <div class=\"grey\">", "</div>\n      </div>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Input = _dereq_('./Input');

var colors = _dereq_('spencer-color').colors;

var uid = _dereq_('../uid');

var defaults = {};

var Legend =
/*#__PURE__*/
function (_Input) {
  _inherits(Legend, _Input);

  function Legend() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Legend);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Legend).call(this, obj));
    _this.attrs = Object.assign({}, defaults, _this.attrs);
    _this._id = obj.id || uid('slider');
    _this.labels = obj.labels || {};
    return _this;
  }

  _createClass(Legend, [{
    key: "build",
    value: function build() {
      var _this2 = this;

      var h = this.h;
      this.setCallback();
      var label = '';

      if (this._label) {
        label = this._label + ':';
      }

      var labels = Object.keys(this.labels).map(function (k) {
        var color = colors[_this2.labels[k]] || _this2.labels[k];
        var bar = "height:5px; background-color:".concat(color, ";");
        return h(_templateObject(), bar, k);
      });
      return h(_templateObject2(), this._id, label, labels);
    }
  }]);

  return Legend;
}(Input);

module.exports = Legend;

},{"../uid":17,"./Input":8,"spencer-color":2}],10:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["<div class=\"col\">\n      <div class=\"grey\">", "</div>\n      <div class=\"row\" style=\"justify-content: center;\">\n        <div class=\"bggreygreen rounded h2 w3 white f1 shadow\" style=", " id=\"", "\">\u2212</div>\n        <input id=\"", "\" class=\"input shadow center f1\" min=", " max=", " style=\"max-width:4rem; margin:0px; font-size:1rem; height:1.2rem;\" type=\"number\" value=\"", "\"/>\n        <div class=\"bggreygreen rounded h2 w3 white f1 shadow\" style=", " id=\"", "\">+</div>\n      </div>\n    </div>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Input = _dereq_('./Input');

var uid = _dereq_('../uid');

var defaults = {
  min: -100,
  max: 100,
  step: 1,
  size: 200
};

var PlusMinus =
/*#__PURE__*/
function (_Input) {
  _inherits(PlusMinus, _Input);

  function PlusMinus() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, PlusMinus);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PlusMinus).call(this, obj));
    _this.attrs = Object.assign({}, defaults, _this.attrs);
    _this._id = obj.id || uid('plusminus');
    return _this;
  }

  _createClass(PlusMinus, [{
    key: "moreCallbacks",
    value: function moreCallbacks() {
      var _this2 = this;

      setTimeout(function () {
        var _this2$attrs = _this2.attrs,
            min = _this2$attrs.min,
            max = _this2$attrs.max;
        var el = document.getElementById(_this2._id);

        document.getElementById(_this2._id + 'plus').onclick = function () {
          var num = Number(el.value) + 1;

          if (num > min && num < max) {
            el.value = num;
          }
        };

        document.getElementById(_this2._id + 'minus').onclick = function () {
          var num = Number(el.value) - 1;

          if (num > min && num < max) {
            el.value = num;
          }
        };
      }, 60);
    }
  }, {
    key: "build",
    value: function build() {
      var label = '';

      if (this._label) {
        label = this._label + ':';
      }

      var buttonStyle = 'cursor:pointer; user-select: none; -moz-user-select: none;';
      this.setCallback();
      this.moreCallbacks();
      var _this$attrs = this.attrs,
          min = _this$attrs.min,
          max = _this$attrs.max;
      return this.h(_templateObject(), label, buttonStyle, this._id + 'minus', this._id, min, max, this._value, buttonStyle, this._id + 'plus');
    }
  }]);

  return PlusMinus;
}(Input);

module.exports = PlusMinus;

},{"../uid":17,"./Input":8}],11:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<div class=\"col maxw7\" >\n        <div class=\"grey\">", "</div>\n        <select id=\"", "\" value=\"", "\" style=", ">\n        ", "\n        </select>\n      </div>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<option ...", ">\n        ", "\n      </options>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Input = _dereq_('./Input');

var uid = _dereq_('../uid');

var defaults = {};

var Select =
/*#__PURE__*/
function (_Input) {
  _inherits(Select, _Input);

  function Select() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Select);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Select).call(this, obj));
    _this.attrs = Object.assign({}, defaults, _this.attrs);
    _this._id = obj.id || uid('select');
    _this.options = obj.options || [];
    return _this;
  }

  _createClass(Select, [{
    key: "setCallback",
    value: function setCallback() {
      var _this2 = this;

      setTimeout(function () {
        var el = document.getElementById(_this2._id);
        el.addEventListener('change', function (e) {
          _this2.callback(e.target.value);
        });
      }, 50);
    }
  }, {
    key: "build",
    value: function build() {
      var _this3 = this;

      var h = this.h;
      this.setCallback();
      var label = '';

      if (this._label) {
        label = this._label + ':';
      }

      var options = this.options.map(function (str) {
        var attr = {};

        if (str === _this3.attrs.value) {
          attr.selected = "selected";
        }

        return h(_templateObject(), attr, str);
      });
      var style = '';

      if (this.attrs.width) {
        style = "max-width:".concat(this.attrs.width, "px; min-width:10px;");
      }

      return h(_templateObject2(), label, this._id, this.attrs.value, style, options);
    }
  }]);

  return Select;
}(Input);

module.exports = Select;

},{"../uid":17,"./Input":8}],12:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["<div class=\"col w100p\">\n      <div class=\"grey\">", "</div>\n      <input style=\"height: 20px;\" class=\"w100p\" type=\"range\" id=\"", "\" value=", " />\n      <div id=\"", "\" class=\"grey\">", "</div>\n    </div>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Input = _dereq_('./Input');

var uid = _dereq_('../uid');

var defaults = {
  min: -100,
  max: 100,
  step: 1,
  size: 200,
  debounce: false
};

var Slider =
/*#__PURE__*/
function (_Input) {
  _inherits(Slider, _Input);

  function Slider() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Slider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slider).call(this, obj));
    _this.attrs = Object.assign({}, defaults, _this.attrs);
    _this._id = obj.id || uid('slider');
    _this.display_id = _this._id + 'display';

    if (obj.show_number === undefined) {
      obj.show_number = true;
    }

    _this.show_number = obj.show_number;
    return _this;
  }

  _createClass(Slider, [{
    key: "redraw",
    value: function redraw() {
      if (this.show_number) {
        var el = document.getElementById(this.display_id);
        el.innerHTML = this._value;
      }
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.h;
      this.setCallback();
      var label = '';

      if (this._label) {
        label = this._label + ':';
      }

      return h(_templateObject(), label, this._id, this._value, this.display_id, this._value);
    }
  }]);

  return Slider;
}(Input);

module.exports = Slider;

},{"../uid":17,"./Input":8}],13:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<div class=\"col w100p\" style=\"user-select: none; -moz-user-select: none;\">\n      <div class=\"grey ullight b05 mb1\">", "</div>\n      <div class=\"row\" id=", ">", "</div>\n    </div>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<div class=\"pointer somehow-tab f1 grow\" style=\"", "\">", "</div>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Input = _dereq_('./Input');

var uid = _dereq_('../uid');

var defaults = {
  light: '#b5bbbf',
  lighter: '#b5bbbf',
  selected: '#2D85A8',
  tabs: []
};

var Tabs =
/*#__PURE__*/
function (_Input) {
  _inherits(Tabs, _Input);

  function Tabs() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Tabs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tabs).call(this, obj));
    _this.attrs = Object.assign({}, defaults, _this.attrs);
    _this._id = obj.id || uid('slider');
    _this.tabs = obj.tabs || defaults.tabs;
    _this.value = obj.value || _this.tabs[0];
    return _this;
  }

  _createClass(Tabs, [{
    key: "moreCallbacks",
    value: function moreCallbacks() {
      var _this2 = this;

      setTimeout(function () {
        // document.queryString('.somehow-tab')
        var tabs = document.querySelectorAll('.somehow-tab');

        var _loop = function _loop(i) {
          var tab = tabs[i];

          tab.onclick = function (e) {
            for (var j = 0; j < tabs.length; j += 1) {
              tabs[j].style.color = defaults.light;
              tabs[j].style['border-color'] = 'rgba(181, 187, 191, 0.1)';
            }

            e.target.style.color = defaults.selected;
            e.target.style['border-color'] = defaults.selected;

            _this2.callback(_this2.tabs[i]);
          };
        };

        for (var i = 0; i < tabs.length; i += 1) {
          _loop(i);
        }
      }, 60);
    }
  }, {
    key: "makeTabs",
    value: function makeTabs() {
      var _this3 = this;

      var h = this.h;
      var tabs = this.tabs.map(function (str) {
        var style = "margin-left:4px; margin-right:4px; padding-left:4px; padding-right:4px; ";
        style += 'transition: all 0.1s cubic-bezier(0.250, 0.460, 0.450, 0.940);';

        if (_this3.value !== str) {
          style += "border-bottom:3px solid rgba(181, 187, 191, 0.1); color:".concat(defaults.light);
        } else {
          style += "border-bottom:3px solid ".concat(defaults.selected, "; color:").concat(defaults.selected);
        }

        return h(_templateObject(), style, str);
      });
      return tabs;
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.h;
      this.setCallback();
      this.moreCallbacks();
      var label = '';

      if (this._label) {
        label = this._label + ' :';
      }

      var tabs = this.makeTabs();
      return h(_templateObject2(), label, this._id, tabs);
    }
  }]);

  return Tabs;
}(Input);

module.exports = Tabs;

},{"../uid":17,"./Input":8}],14:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["<div class=\"col w9\">\n      ", "\n      <textarea class=\"w7\" id=\"", "\" style=", " ...", ">", "</textarea>\n    </div>"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<div class=\"grey pointer ullighter b3 white\" style=", " id=\"", "\">\n      ", "\n      <span class=\"white f2\" style=\"margin:0.5rem;\">+</span>\n      </div>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Input = _dereq_('./Input');

var uid = _dereq_('../uid');

var defaults = {
  show: true,
  color: '#2D85A8',
  height: '16rem',
  width: '10rem'
};

var Textarea =
/*#__PURE__*/
function (_Input) {
  _inherits(Textarea, _Input);

  function Textarea() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Textarea);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Textarea).call(this, obj));
    _this.attrs = Object.assign({}, defaults, _this.attrs);
    _this._id = obj.id || uid('textarea');
    _this.display_id = _this._id + 'display';
    _this.show = _this.attrs.show;
    _this.height = _this.attrs.height;
    _this.width = _this.attrs.width;
    _this.color = obj.color || defaults.color;
    return _this;
  }

  _createClass(Textarea, [{
    key: "moreCallbacks",
    value: function moreCallbacks() {
      var _this2 = this;

      setTimeout(function () {
        document.getElementById(_this2._id + '_btn').onclick = function () {
          _this2.show = !_this2.show;
          var el = document.getElementById(_this2._id);

          if (_this2.show) {
            el.style.height = _this2.height;
            el.style.padding = '1rem';
            el.style.visibility = 'visible';
            el.style.resize = 'both';
            el.scrollTop = el.scrollHeight;
          } else {
            el.style.height = '0rem';
            el.style.padding = '0rem';
            el.style.visibility = 'hidden';
            el.style.resize = 'none';
          }
        };
      }, 60);
    }
  }, {
    key: "makeStyle",
    value: function makeStyle() {
      var style = 'transition: all 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940); font-size:10px; font-family: monospace;';
      style += " visibility: visible; height:".concat(this.height, "; padding:1rem; resize: both;");
      style += " border:6px solid ".concat(this.color, "; color:").concat(this.color, "; width:").concat(this.width, "; border-radius:7px; ");
      style += "border-left:1px solid ".concat(this.color, "; border-right:1px solid ").concat(this.color, ";");
      return style;
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.h;
      this.setCallback();
      this.moreCallbacks();
      var label = '';

      if (this._label) {
        label = this._label + ':';
      }

      var style = 'padding:0.5rem; user-select: none; margin-left:0.5rem; background-color: ' + this.color;
      var button = h(_templateObject(), style, this._id + '_btn', label);

      if (this.show) {
        button = null;
      }

      return h(_templateObject2(), button, this._id, this.makeStyle(), this.attrs, this._value);
    }
  }]);

  return Textarea;
}(Input);

module.exports = Textarea;

},{"../uid":17,"./Input":8}],15:[function(_dereq_,module,exports){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["<div class=\"col w100p\">\n      <div class=\"grey\">", "</div>\n      <input class=\"w100p\" type=\"range\" id=\"", "\" orient=\"vertical\" style=", " value=", " ...", "  />\n      <div id=\"", "\" class=\"grey\">", "</div>\n    </div>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Input = _dereq_('./Input');

var uid = _dereq_('../uid');

var defaults = {
  min: -100,
  max: 100,
  step: 1,
  size: 200,
  debounce: false
};

var Vslider =
/*#__PURE__*/
function (_Input) {
  _inherits(Vslider, _Input);

  function Vslider() {
    var _this;

    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Vslider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Vslider).call(this, obj));
    _this.attrs = Object.assign({}, defaults, _this.attrs);
    _this._id = obj.id || uid('slider');
    _this.display_id = _this._id + 'display';

    if (obj.show_number === undefined) {
      obj.show_number = true;
    }

    _this.show_number = obj.show_number;
    _this.reverse = obj.reverse || false;
    return _this;
  }

  _createClass(Vslider, [{
    key: "redraw",
    value: function redraw() {
      if (this.show_number) {
        var el = document.getElementById(this.display_id);
        el.innerHTML = this._value;
      }
    }
  }, {
    key: "buildStyle",
    value: function buildStyle() {
      var style = 'writing-mode: bt-lr;';
      /* IE */

      style += '-webkit-appearance: slider-vertical;';
      /* WebKit */

      style += 'width: 8px; height: 175px; padding: 0 5px;';

      if (!this.reverse) {
        style += 'transform: rotateZ(180deg);';
      }

      return style;
    }
  }, {
    key: "build",
    value: function build() {
      var h = this.h;
      this.setCallback();
      var label = '';

      if (this._label) {
        label = this._label + ':';
      }

      return h(_templateObject(), label, this._id, this.buildStyle(), this._value, this.attrs, this.display_id, this._value);
    }
  }]);

  return Vslider;
}(Input);

module.exports = Vslider;

},{"../uid":17,"./Input":8}],16:[function(_dereq_,module,exports){
"use strict";

var o = {
  millisecond: 1
};
o.second = 1000;
o.minute = 60000;
o.hour = 3.6e6; // dst is supported post-hoc

o.day = 8.64e7; //

o.date = o.day;
o.month = 8.64e7 * 29.5; //(average)

o.week = 6.048e8;
o.year = 3.154e10; // leap-years are supported post-hoc
//add plurals

Object.keys(o).forEach(function (k) {
  o[k + 's'] = o[k];
});
module.exports = o;

},{}],17:[function(_dereq_,module,exports){
"use strict";

//may need to change when the term really-transforms? not sure.
var uid = function uid(str) {
  var nums = '';

  for (var i = 0; i < 5; i++) {
    nums += parseInt(Math.random() * 9, 10);
  }

  return str + '-' + nums;
};

module.exports = uid;

},{}],18:[function(_dereq_,module,exports){
"use strict";

function setParam(url, param, paramVal) {
  var newAdditionalURL = '';
  var tempArray = url.split('?');
  var baseURL = tempArray[0];
  var additionalURL = tempArray[1];
  var temp = '';

  if (additionalURL) {
    tempArray = additionalURL.split('&');

    for (var i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split('=')[0] !== param) {
        newAdditionalURL += temp + tempArray[i];
        temp = '&';
      }
    }
  }

  var rows_txt = temp + '' + param + '=' + paramVal;
  return baseURL + '?' + newAdditionalURL + rows_txt;
}

var getParam = function getParam(param) {
  var url = new URL(window.location.href);
  return url.searchParams.get(param);
};

module.exports = {
  get: getParam,
  set: setParam
};

},{}]},{},[4])(4)
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(_dereq_,module,exports){
(function (global){
/* somehow v0.0.3
   github.com/spencermountain/somehow-ticks
   MIT
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.somehowTicks = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof _dereq_&&_dereq_;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof _dereq_&&_dereq_,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(_dereq_,module,exports){
"use strict";

module.exports = {
  trillion: 1000000000000,
  billion: 1000000000,
  million: 1000000,
  hundredThousand: 100000,
  tenThousand: 10000,
  thousand: 1000,
  hundred: 100,
  ten: 10,
  one: 1,
  tenth: 0.1,
  hundredth: 0.01,
  thousandth: 0.01
};

},{}],2:[function(_dereq_,module,exports){
"use strict";

var n = _dereq_('./_constants');

var prettyNum = function prettyNum(num) {
  num = parseFloat(num);

  if (num >= n.trillion) {
    num = parseInt(num / 100000000000, 10) * 100000000000;
    return num / n.trillion + 't';
  }

  if (num >= n.billion) {
    num = parseInt(num / 100000000, 10) * 100000000;
    return num / n.billion + 'b';
  }

  if (num >= n.million) {
    num = parseInt(num / 100000, 10) * 100000;
    return num / n.million + 'm';
  }

  if (num >= n.tenThousand) {
    num = parseInt(num / n.thousand, 10) * n.thousand;
    return num / n.thousand + 'k';
  }

  if (num >= n.thousand) {
    num = parseInt(num / n.hundred, 10) * n.hundred;
    return num / n.thousand + 'k';
  }

  return num.toLocaleString();
};

module.exports = prettyNum;

},{"./_constants":1}],3:[function(_dereq_,module,exports){
"use strict";

// const zeroPad = (str, len = 2) => {
//   let pad = '0'
//   str = str + ''
//   return str.length >= len
//     ? str
//     : new Array(len - str.length + 1).join(pad) + str
// }
//
// const preferZeros = function(arr, ticks) {
//   const max = String(arr[arr.length - 1] || '').length
//   const zeroArr = arr.map(a => {
//     let str = zeroPad(String(a), max)
//     const zeros = (str.match(/0/g) || []).length
//     return [a, zeros]
//   })
//   let ranked = zeroArr.sort((a, b) => (a[1] < b[1] ? 1 : -1))
//   console.log(ranked)
//   return ranked
//     .map(a => a[0])
//     .slice(0, ticks)
//     .sort()
// }
var reduceTo = function reduceTo(arr, n) {
  if (arr.length <= n || arr.length <= 5) {
    return arr;
  } //try filtering-down by # of non-zero digits used
  // let tmp = preferZeros(arr, n)
  // if (tmp.length > 0 && tmp.length <= n) {
  //   return tmp
  // }
  //otherwise, remove every other selection (less good)


  while (arr.length > n) {
    arr = arr.filter(function (o, i) {
      return i % 2 === 0;
    });

    if (arr.length <= n || arr.length <= 5) {
      return arr;
    }
  }

  return arr;
};

module.exports = reduceTo;

},{}],4:[function(_dereq_,module,exports){
"use strict";

var methods = _dereq_('./methods');

var chooseMethod = function chooseMethod(start, end) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;
  var diff = Math.abs(end - start);

  if (diff === 0) {
    return [];
  } //1 million


  if (diff > 3000000) {
    return methods.millions(start, end, n);
  } //100k


  if (diff > 300000) {
    return methods.hundredKs(start, end, n);
  } //1k


  if (diff > 3000) {
    return methods.thousands(start, end, n);
  } //100


  if (diff > 300) {
    return methods.hundreds(start, end, n);
  } //10


  if (diff > 30) {
    return methods.tens(start, end, n);
  } //1


  if (diff > 3) {
    return methods.ones(start, end, n);
  } //.1


  if (diff > 0.3) {
    return methods.tenths(start, end, n);
  } //.01


  return methods.hundredths(start, end, n);
}; //flip it around backwards


var reverseTicks = function reverseTicks(ticks) {
  ticks = ticks.map(function (o) {
    o.value = 1 - o.value;
    return o;
  });
  return ticks.reverse();
}; //


var somehowTicks = function somehowTicks(start, end, n) {
  var reverse = false;
  start = Number(start);
  end = Number(end); //reverse them, if necessary

  if (start > end) {
    reverse = true;
    var tmp = start;
    start = end;
    end = tmp;
  }

  var ticks = chooseMethod(start, end, n); //support backwards ticks

  if (reverse === true) {
    ticks = reverseTicks(ticks);
  }

  return ticks;
};

module.exports = somehowTicks;

},{"./methods":5}],5:[function(_dereq_,module,exports){
"use strict";

var reduceTo = _dereq_('./_reduce');

var prettyNum = _dereq_('./_prettyNum');

var c = _dereq_('./_constants');

var roundDown = function roundDown(n, unit) {
  return Math.floor(n / unit) * unit;
}; //increment by this unit


var allTicks = function allTicks(start, end, unit) {
  var inc = unit / 2; //increment by .5

  var ticks = [];
  start = start += unit;
  start = roundDown(start, unit);

  while (start < end) {
    ticks.push(start);
    start = start += inc;
  }

  return ticks;
};

var formatTicks = function formatTicks(arr, fmt, start, end) {
  var delta = end - start;
  return arr.map(function (s) {
    var percent = (s - start) / delta;
    return {
      label: prettyNum(s),
      number: s,
      value: parseInt(percent * 1000, 10) / 1000
    };
  });
};

var methods = {
  millions: function millions(start, end, n) {
    var ticks = allTicks(start, end, c.million);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, 'm', start, end);
    return ticks;
  },
  hundredKs: function hundredKs(start, end, n) {
    var ticks = allTicks(start, end, c.hundredThousand);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, 'k', start, end);
    return ticks;
  },
  thousands: function thousands(start, end, n) {
    var ticks = allTicks(start, end, c.thousand);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, 'm', start, end);
    return ticks;
  },
  hundreds: function hundreds(start, end, n) {
    var ticks = allTicks(start, end, c.hundred);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, 'm', start, end);
    return ticks;
  },
  tens: function tens(start, end, n) {
    var ticks = allTicks(start, end, c.ten);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, '', start, end);
    return ticks;
  },
  ones: function ones(start, end, n) {
    var ticks = allTicks(start, end, c.one);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, '', start, end);
    return ticks;
  },
  tenths: function tenths(start, end, n) {
    var ticks = allTicks(start, end, c.tenth);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, '', start, end);
    return ticks;
  },
  hundredths: function hundredths(start, end, n) {
    var ticks = allTicks(start, end, c.hundredth);
    ticks = reduceTo(ticks, n);
    ticks = formatTicks(ticks, '', start, end);
    return ticks;
  }
};
module.exports = methods;

},{"./_constants":1,"./_prettyNum":2,"./_reduce":3}]},{},[4])(4)
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(_dereq_,module,exports){
module.exports = '0.3.1'
},{}],13:[function(_dereq_,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.spacetime = factory());
}(this, function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	function getCjsExportFromNamespace (n) {
		return n && n['default'] || n;
	}

	var fns = createCommonjsModule(function (module, exports) {
	  //git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html
	  exports.isLeapYear = function (year) {
	    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	  }; // unsurprisingly-nasty `typeof date` call


	  exports.isDate = function (d) {
	    return Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf());
	  };

	  exports.isArray = function (input) {
	    return Object.prototype.toString.call(input) === '[object Array]';
	  };

	  exports.isObject = function (input) {
	    return Object.prototype.toString.call(input) === '[object Object]';
	  };

	  exports.zeroPad = function (str) {
	    var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	    var pad = '0';
	    str = str + '';
	    return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
	  };

	  exports.titleCase = function (str) {
	    if (!str) {
	      return '';
	    }

	    return str[0].toUpperCase() + str.substr(1);
	  };

	  exports.ordinal = function (i) {
	    var j = i % 10;
	    var k = i % 100;

	    if (j === 1 && k !== 11) {
	      return i + 'st';
	    }

	    if (j === 2 && k !== 12) {
	      return i + 'nd';
	    }

	    if (j === 3 && k !== 13) {
	      return i + 'rd';
	    }

	    return i + 'th';
	  }; //strip 'st' off '1st'..


	  exports.toCardinal = function (str) {
	    str = String(str);
	    str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1');
	    return parseInt(str, 10);
	  }; //used mostly for cleanup of unit names, like 'months'


	  exports.normalize = function () {
	    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    str = str.toLowerCase().trim();
	    str = str.replace(/ies$/, 'y'); //'centuries'

	    str = str.replace(/s$/, '');
	    str = str.replace(/-/g, '');

	    if (str === 'day') {
	      return 'date';
	    }

	    return str;
	  };

	  exports.getEpoch = function (tmp) {
	    //support epoch
	    if (typeof tmp === 'number') {
	      return tmp;
	    } //suport date objects


	    if (exports.isDate(tmp)) {
	      return tmp.getTime();
	    }

	    if (tmp.epoch) {
	      return tmp.epoch;
	    }

	    return null;
	  }; //make sure this input is a spacetime obj


	  exports.beADate = function (d, s) {
	    if (exports.isObject(d) === false) {
	      return s.clone().set(d);
	    }

	    return d;
	  };

	  exports.formatTimezone = function (offset) {
	    var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var absOffset = Math.abs(offset);
	    var sign = offset > 0 ? '+' : '-';
	    return "".concat(sign).concat(exports.zeroPad(absOffset)).concat(delimiter, "00");
	  };
	});
	var fns_1 = fns.isLeapYear;
	var fns_2 = fns.isDate;
	var fns_3 = fns.isArray;
	var fns_4 = fns.isObject;
	var fns_5 = fns.zeroPad;
	var fns_6 = fns.titleCase;
	var fns_7 = fns.ordinal;
	var fns_8 = fns.toCardinal;
	var fns_9 = fns.normalize;
	var fns_10 = fns.getEpoch;
	var fns_11 = fns.beADate;
	var fns_12 = fns.formatTimezone;

	var zeroPad = fns.zeroPad;

	var toString = function toString(d) {
	  return zeroPad(d.getMonth() + 1) + '/' + zeroPad(d.getDate()) + ':' + zeroPad(d.getHours());
	}; // a timezone will begin with a specific offset in january
	// then some will switch to something else between november-march


	var shouldChange = function shouldChange(epoch, start, end, defaultOffset) {
	  //note: this has a cray order-of-operations issue
	  //we can't get the date, without knowing the timezone, and vice-versa
	  //it's possible that we can miss a dst-change by a few hours.
	  var d = new Date(epoch); //(try to mediate this a little?)

	  var bias = d.getTimezoneOffset() || 0;
	  var shift = bias + defaultOffset * 60; //in minutes

	  shift = shift * 60 * 1000; //in ms

	  d = new Date(epoch + shift);
	  var current = toString(d); //eg. is it after ~november?

	  if (current >= start) {
	    //eg. is it before ~march~ too?
	    if (current < end) {
	      return true;
	    }
	  }

	  return false;
	};

	var summerTime = shouldChange;

	// it reproduces some things in ./index.js, but speeds up spacetime considerably

	var quickOffset = function quickOffset(s) {
	  var zones = s.timezones;
	  var obj = zones[s.tz];

	  if (obj === undefined) {
	    console.warn("Warning: couldn't find timezone " + s.tz);
	    return 0;
	  }

	  if (obj.dst === undefined) {
	    return obj.offset;
	  } //get our two possible offsets


	  var jul = obj.offset;
	  var dec = obj.offset + 1; // assume it's the same for now

	  if (obj.hem === 'n') {
	    dec = jul - 1;
	  }

	  var split = obj.dst.split('->');
	  var inSummer = summerTime(s.epoch, split[0], split[1], jul);

	  if (inSummer === true) {
	    return jul;
	  }

	  return dec;
	};

	var quick = quickOffset;

	var _build = {
		"9|s": "2/dili,2/jayapura",
		"9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,11/palau",
		"9.5|s|04/07:03->10/06:02": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
		"9.5|s": "4/darwin,4/north",
		"8|s": "12/casey,2/kuala_lumpur,2/makassar,2/singapore,4/perth,4/west",
		"8|n|03/25:03->09/29:23": "2/ulan_bator",
		"8|n": "2/brunei,2/choibalsan,2/chongqing,2/chungking,2/harbin,2/hong_kong,2/irkutsk,2/kuching,2/macao,2/macau,2/manila,2/shanghai,2/taipei,2/ujung_pandang,2/ulaanbaatar",
		"8.75|s": "4/eucla",
		"7|s": "12/davis,2/jakarta,9/christmas",
		"7|n": "2/bangkok,2/barnaul,2/ho_chi_minh,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/saigon,2/tomsk,2/vientiane",
		"6|s": "12/vostok",
		"6|n": "2/almaty,2/bishkek,2/dacca,2/dhaka,2/kashgar,2/omsk,2/qyzylorda,2/thimbu,2/thimphu,2/urumqi,9/chagos",
		"6.5|n": "2/rangoon,9/cocos",
		"5|s": "12/mawson,9/kerguelen",
		"5|n": "2/aqtau,2/aqtobe,2/ashgabat,2/ashkhabad,2/atyrau,2/baku,2/dushanbe,2/karachi,2/oral,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives",
		"5.75|n": "2/kathmandu,2/katmandu",
		"5.5|n": "2/calcutta,2/colombo,2/kolkata",
		"4|s": "9/reunion",
		"4|n": "2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,8/volgograd,2/volgograd,9/mahe,9/mauritius",
		"4.5|n|03/22:00->09/21:24": "2/tehran",
		"4.5|n": "2/kabul",
		"3|s": "12/syowa,9/antananarivo",
		"3|n|03/31:03->10/27:04": "2/nicosia,8/athens,8/bucharest,8/helsinki,8/kiev,8/mariehamn,8/nicosia,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye",
		"3|n|03/31:02->10/27:03": "8/chisinau,8/tiraspol",
		"3|n|03/31:00->10/26:24": "2/beirut",
		"3|n|03/29:02->10/27:02": "2/jerusalem,2/tel_aviv",
		"3|n|03/29:00->10/25:01": "2/amman",
		"3|n|03/29:00->10/24:24": "2/damascus",
		"3|n|03/23:01->10/26:01": "2/gaza,2/hebron",
		"3|n": "0/addis_ababa,0/asmara,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/baghdad,2/bahrain,2/istanbul,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,9/comoro,9/mayotte",
		"2|s|03/31:02->10/27:02": "12/troll",
		"2|s": "0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane",
		"2|n|03/31:02->10/27:03": "0/ceuta,arctic/longyearbyen,3/jan_mayen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich",
		"2|n": "0/blantyre,0/bujumbura,0/cairo,0/khartoum,0/kigali,0/tripoli,8/kaliningrad",
		"1|s|04/02:01->09/03:03": "0/windhoek",
		"1|s": "0/kinshasa,0/luanda",
		"1|n|05/05:03->06/09:02": "0/casablanca,0/el_aaiun",
		"1|n|03/31:01->10/27:02": "3/canary,3/faeroe,3/faroe,3/madeira,8/belfast,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london",
		"1|n": "0/algiers,0/bangui,0/brazzaville,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
		"14|n": "11/kiritimati",
		"13|s|04/07:04->09/29:03": "11/apia",
		"13|s|01/15:02->11/05:03": "11/tongatapu",
		"13|n": "11/enderbury,11/fakaofo",
		"12|s|04/07:03->09/29:02": "12/mcmurdo,12/south_pole,11/auckland",
		"12|s|01/13:03->11/03:02": "11/fiji",
		"12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis",
		"12.75|s|04/07:03->04/07:02": "11/chatham",
		"11|s": "12/macquarie,11/bougainville",
		"11|n": "2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/pohnpei,11/ponape",
		"11.5|n": "11/norfolk",
		"10|s|04/07:03->10/06:02": "4/act,4/canberra,4/currie,4/hobart,4/melbourne,4/nsw,4/sydney,4/tasmania,4/victoria",
		"10|s": "12/dumontdurville,4/brisbane,4/lindeman,4/queensland",
		"10|n": "2/ust-nera,2/vladivostok,2/yakutsk,11/chuuk,11/guam,11/port_moresby,11/saipan,11/truk,11/yap",
		"10.5|s|04/07:01->10/06:02": "4/lhi,4/lord_howe",
		"0|n|03/31:00->10/27:01": "1/scoresbysund,3/azores",
		"0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,0/timbuktu,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/gmt+0,13/gmt-0,13/gmt0,13/greenwich,13/utc,13/universal,13/zulu",
		"-9|n|03/10:02->11/03:02": "1/adak,1/atka",
		"-9|n": "11/gambier",
		"-9.5|n": "11/marquesas",
		"-8|n|03/10:02->11/03:02": "1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat",
		"-8|n": "11/pitcairn",
		"-7|n|03/10:02->11/03:02": "1/dawson,1/ensenada,1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,1/whitehorse,6/pacific,6/yukon,10/bajanorte",
		"-7|n": "1/creston,1/dawson_creek,1/hermosillo,1/phoenix",
		"-6|s|04/06:22->09/07:22": "7/easterisland,11/easter",
		"-6|n|04/07:02->10/27:02": "1/chihuahua,1/mazatlan,10/bajasur",
		"-6|n|03/10:02->11/03:02": "1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/ojinaga,1/shiprock,1/yellowknife,6/mountain",
		"-6|n": "1/belize,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/regina,1/swift_current,1/tegucigalpa,6/east-saskatchewan,6/saskatchewan,11/galapagos",
		"-5|s": "1/lima,1/rio_branco,5/acre",
		"-5|n|04/07:02->10/27:02": "1/bahia_banderas,1/merida,1/mexico_city,1/monterrey,10/general",
		"-5|n|03/12:03->11/05:01": "1/north_dakota",
		"-5|n|03/10:02->11/03:02": "1/chicago,1/knox_in,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,6/central",
		"-5|n": "1/atikokan,1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/panama,1/porto_acre",
		"-4|s|05/13:23->08/13:01": "12/palmer",
		"-4|s|04/06:24->09/08:00": "1/santiago,7/continental",
		"-4|s|03/23:24->10/06:00": "1/asuncion",
		"-4|s|02/16:24->11/03:00": "1/campo_grande,1/cuiaba",
		"-4|s": "1/la_paz,1/manaus,5/west",
		"-4|n|03/12:03->11/05:01": "1/indiana,1/kentucky",
		"-4|n|03/10:02->11/03:02": "1/detroit,1/fort_wayne,1/grand_turk,1/indianapolis,1/iqaluit,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,6/eastern",
		"-4|n|03/10:00->11/03:01": "1/havana",
		"-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin",
		"-3|s|02/16:24->11/03:00": "1/sao_paulo,5/east",
		"-3|s": "1/argentina,1/buenos_aires,1/cordoba,1/fortaleza,1/montevideo,1/punta_arenas,12/rothera,3/stanley",
		"-3|n|03/10:02->11/03:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
		"-3|n": "1/araguaina,1/bahia,1/belem,1/catamarca,1/cayenne,1/jujuy,1/maceio,1/mendoza,1/paramaribo,1/recife,1/rosario,1/santarem",
		"-2|s": "5/denoronha",
		"-2|n|03/30:22->10/26:23": "1/godthab",
		"-2|n|03/10:02->11/03:02": "1/miquelon",
		"-2|n": "1/noronha,3/south_georgia",
		"-2.5|n|03/10:02->11/03:02": "1/st_johns,6/newfoundland",
		"-1|n": "3/cape_verde",
		"-11|n": "11/midway,11/niue,11/pago_pago,11/samoa",
		"-10|n": "11/honolulu,11/johnston,11/rarotonga,11/tahiti"
	};

	var _build$1 = /*#__PURE__*/Object.freeze({
		'default': _build
	});

	//prefixes for iana names..
	var _prefixes = ['africa', 'america', 'asia', 'atlantic', 'australia', 'brazil', 'canada', 'chile', 'europe', 'indian', 'mexico', 'pacific', 'antarctica', 'etc'];

	var data = getCjsExportFromNamespace(_build$1);

	var all = {};
	Object.keys(data).forEach(function (k) {
	  var split = k.split('|');
	  var obj = {
	    offset: Number(split[0]),
	    hem: split[1]
	  };

	  if (split[2]) {
	    obj.dst = split[2];
	  }

	  var names = data[k].split(',');
	  names.forEach(function (str) {
	    str = str.replace(/(^[0-9]+)\//, function (before, num) {
	      num = Number(num);
	      return _prefixes[num] + '/';
	    });
	    all[str] = obj;
	  });
	});
	all['utc'] = {
	  offset: 0,
	  hem: 'n' //(sorry)
	  //add etc/gmt+n

	};

	for (var i = -13; i <= 13; i += 0.5) {
	  var num = i;

	  if (num > 0) {
	    num = '+' + num;
	  }

	  var name = 'etc/gmt' + num;
	  all[name] = {
	    offset: i * -1,
	    //they're negative!
	    hem: 'n' //(sorry)

	  };
	  name = 'utc/gmt' + num; //this one too, why not.

	  all[name] = {
	    offset: i * -1,
	    hem: 'n'
	  };
	} // console.log(all)
	// console.log(Object.keys(all).length)


	var unpack = all;

	//find the implicit iana code for this machine.
	//safely query the Intl object
	//based on - https://bitbucket.org/pellepim/jstimezonedetect/src
	var fallbackTZ = 'utc'; //
	//this Intl object is not supported often, yet

	var safeIntl = function safeIntl() {
	  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
	    return null;
	  }

	  var format = Intl.DateTimeFormat();

	  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
	    return null;
	  }

	  var timezone = format.resolvedOptions().timeZone;

	  if (!timezone) {
	    return null;
	  }

	  return timezone.toLowerCase();
	};

	var guessTz = function guessTz() {
	  var timezone = safeIntl();

	  if (timezone === null) {
	    return fallbackTZ;
	  }

	  return timezone;
	}; //do it once per computer


	var guessTz_1 = guessTz;

	var isOffset = /(\-?[0-9]+)h(rs)?/i;
	var isNumber = /(\-?[0-9]+)/;
	var utcOffset = /utc([\-+]?[0-9]+)/i;
	var gmtOffset = /gmt([\-+]?[0-9]+)/i;

	var toIana = function toIana(num) {
	  num = Number(num);

	  if (num > -13 && num < 13) {
	    num = num * -1; //it's opposite!

	    num = (num > 0 ? '+' : '') + num; //add plus sign

	    return 'etc/gmt' + num;
	  }

	  return null;
	};

	var parseOffset = function parseOffset(tz) {
	  // '+5hrs'
	  var m = tz.match(isOffset);

	  if (m !== null) {
	    return toIana(m[1]);
	  } // 'utc+5'


	  m = tz.match(utcOffset);

	  if (m !== null) {
	    return toIana(m[1]);
	  } // 'GMT-5' (not opposite)


	  m = tz.match(gmtOffset);

	  if (m !== null) {
	    var num = Number(m[1]) * -1;
	    return toIana(num);
	  } // '+5'


	  m = tz.match(isNumber);

	  if (m !== null) {
	    return toIana(m[1]);
	  }

	  return null;
	};

	var parseOffset_1 = parseOffset;

	var local = guessTz_1(); //add all the city names by themselves

	var cities = Object.keys(unpack).reduce(function (h, k) {
	  var city = k.split('/')[1] || '';
	  city = city.replace(/_/g, ' ');
	  h[city] = k;
	  return h;
	}, {}); //try to match these against iana form

	var normalize = function normalize(tz) {
	  tz = tz.replace(/ time/g, '');
	  tz = tz.replace(/ (standard|daylight|summer)/g, '');
	  tz = tz.replace(/\b(east|west|north|south)ern/g, '$1');
	  tz = tz.replace(/\b(africa|america|australia)n/g, '$1');
	  tz = tz.replace(/\beuropean/g, 'europe');
	  tz = tz.replace(/\islands/g, 'island');
	  return tz;
	}; // try our best to reconcile the timzone to this given string


	var lookupTz = function lookupTz(str, zones) {
	  if (!str) {
	    return local;
	  }

	  var tz = str.trim();
	  var split = str.split('/'); //support long timezones like 'America/Argentina/Rio_Gallegos'

	  if (split.length > 2 && zones.hasOwnProperty(tz) === false) {
	    tz = split[0] + '/' + split[1];
	  }

	  tz = tz.toLowerCase();

	  if (zones.hasOwnProperty(tz) === true) {
	    return tz;
	  } //lookup more loosely..


	  tz = normalize(tz);

	  if (zones.hasOwnProperty(tz) === true) {
	    return tz;
	  } //try city-names


	  if (cities.hasOwnProperty(tz) === true) {
	    return cities[tz];
	  } // //try to parse '-5h'


	  if (/[0-9]/.test(tz) === true) {
	    var id = parseOffset_1(tz);

	    if (id) {
	      return id;
	    }
	  }

	  throw new Error("Spacetime: Cannot find timezone named: '" + str + "'. Please enter an IANA timezone id.");
	};

	var find = lookupTz;

	var o = {
	  millisecond: 1
	};
	o.second = 1000;
	o.minute = 60000;
	o.hour = 3.6e6; // dst is supported post-hoc

	o.day = 8.64e7; //

	o.date = o.day;
	o.month = 8.64e7 * 29.5; //(average)

	o.week = 6.048e8;
	o.year = 3.154e10; // leap-years are supported post-hoc
	//add plurals

	Object.keys(o).forEach(function (k) {
	  o[k + 's'] = o[k];
	});
	var milliseconds = o;

	var walk = function walk(s, n, fn, unit, previous) {
	  var current = s.d[fn]();

	  if (current === n) {
	    return; //already there
	  }

	  var startUnit = previous === null ? null : s.d[previous]();
	  var original = s.epoch; //try to get it as close as we can

	  var diff = n - current;
	  s.epoch += milliseconds[unit] * diff; //DST edge-case: if we are going many days, be a little conservative

	  if (unit === 'day' && Math.abs(diff) > 28) {
	    //but don't push it over a month
	    if (n < 28) {
	      s.epoch += milliseconds.hour;
	    }
	  } //repair it if we've gone too far or something
	  //(go by half-steps, just in case)


	  var halfStep = milliseconds[unit] / 2;

	  while (s.d[fn]() < n) {
	    s.epoch += halfStep;
	  }

	  while (s.d[fn]() > n) {
	    s.epoch -= halfStep;
	  } //oops, did we change previous unit? revert it.


	  if (previous !== null && startUnit !== s.d[previous]()) {
	    // console.warn('spacetime warning: missed setting ' + unit)
	    s.epoch = original; // i mean, but make it close...

	    s.epoch += milliseconds[unit] * diff * 0.97; // i guess?
	  }
	}; //find the desired date by a increment/check while loop


	var units = {
	  year: {
	    valid: function valid(n) {
	      return n > -4000 && n < 4000;
	    },
	    walkTo: function walkTo(s, n) {
	      return walk(s, n, 'getFullYear', 'year', null);
	    }
	  },
	  month: {
	    valid: function valid(n) {
	      return n >= 0 && n <= 11;
	    },
	    walkTo: function walkTo(s, n) {
	      var d = s.d;
	      var current = d.getMonth();
	      var original = s.epoch;
	      var startUnit = d.getYear();

	      if (current === n) {
	        return;
	      } //try to get it as close as we can..


	      var diff = n - current;
	      s.epoch += milliseconds.day * (diff * 28); //special case
	      //oops, did we change the year? revert it.

	      if (startUnit !== s.d.getYear()) {
	        s.epoch = original;
	      } //incriment by day


	      while (s.d.getMonth() < n) {
	        s.epoch += milliseconds.day;
	      }

	      while (s.d.getMonth() > n) {
	        s.epoch -= milliseconds.day;
	      }
	    }
	  },
	  date: {
	    valid: function valid(n) {
	      return n > 0 && n <= 31;
	    },
	    walkTo: function walkTo(s, n) {
	      return walk(s, n, 'getDate', 'day', 'getMonth');
	    }
	  },
	  hour: {
	    valid: function valid(n) {
	      return n >= 0 && n < 24;
	    },
	    walkTo: function walkTo(s, n) {
	      return walk(s, n, 'getHours', 'hour', 'getDate');
	    }
	  },
	  minute: {
	    valid: function valid(n) {
	      return n >= 0 && n < 60;
	    },
	    walkTo: function walkTo(s, n) {
	      return walk(s, n, 'getMinutes', 'minute', 'getHours');
	    }
	  },
	  second: {
	    valid: function valid(n) {
	      return n >= 0 && n < 60;
	    },
	    walkTo: function walkTo(s, n) {
	      //do this one directly
	      s.epoch = s.seconds(n).epoch;
	    }
	  },
	  millisecond: {
	    valid: function valid(n) {
	      return n >= 0 && n < 1000;
	    },
	    walkTo: function walkTo(s, n) {
	      //do this one directly
	      s.epoch = s.milliseconds(n).epoch;
	    }
	  }
	};

	var walkTo = function walkTo(s, wants) {
	  var keys = Object.keys(units);
	  var old = s.clone();

	  for (var i = 0; i < keys.length; i++) {
	    var k = keys[i];
	    var n = wants[k];

	    if (n === undefined) {
	      n = old[k]();
	    }

	    if (typeof n === 'string') {
	      n = parseInt(n, 10);
	    } //make-sure it's valid


	    if (!units[k].valid(n)) {
	      s.epoch = null;

	      if (s.silent === false) {
	        console.warn('invalid ' + k + ': ' + n);
	      }

	      return;
	    } // console.log(k, n)


	    units[k].walkTo(s, n);
	  }

	  return;
	};

	var walk_1 = walkTo;

	var shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
	var longMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

	function buildMapping() {
	  var obj = {
	    sep: 8 //support this format

	  };

	  for (var i = 0; i < shortMonths.length; i++) {
	    obj[shortMonths[i]] = i;
	  }

	  for (var _i = 0; _i < longMonths.length; _i++) {
	    obj[longMonths[_i]] = _i;
	  }

	  return obj;
	}

	var months = {
	  "short": function short() {
	    return shortMonths;
	  },
	  "long": function long() {
	    return longMonths;
	  },
	  mapping: function mapping() {
	    return buildMapping();
	  },
	  set: function set(i18n) {
	    shortMonths = i18n["short"] || shortMonths;
	    longMonths = i18n["long"] || longMonths;
	  }
	};

	//pull-apart ISO offsets, like "+0100"
	var parseOffset$1 = function parseOffset(s, offset) {
	  if (!offset) {
	    return s;
	  } //this is a fancy-move


	  if (offset === 'Z') {
	    offset = '+0000';
	  } // according to ISO8601, tz could be hh:mm, hhmm or hh
	  // so need few more steps before the calculation.


	  var num = 0; // for (+-)hh:mm

	  if (/^[\+-]?[0-9]{2}:[0-9]{2}$/.test(offset)) {
	    //support "+01:00"
	    if (/:00/.test(offset) === true) {
	      offset = offset.replace(/:00/, '');
	    } //support "+01:30"


	    if (/:30/.test(offset) === true) {
	      offset = offset.replace(/:30/, '.5');
	    }
	  } // for (+-)hhmm


	  if (/^[\+-]?[0-9]{4}$/.test(offset)) {
	    offset = offset.replace(/30$/, '.5');
	  }

	  num = parseFloat(offset); //divide by 100 or 10 - , "+0100", "+01"

	  if (Math.abs(num) > 100) {
	    num = num / 100;
	  } //okay, try to match it to a utc timezone
	  //remember - this is opposite! a -5 offset maps to Etc/GMT+5  ¯\_(:/)_/¯
	  //https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem


	  num *= -1;

	  if (num >= 0) {
	    num = '+' + num;
	  }

	  var tz = 'etc/gmt' + num;
	  var zones = s.timezones;

	  if (zones[tz]) {
	    // log a warning if we're over-writing a given timezone?
	    // console.log('changing timezone to: ' + tz)
	    s.tz = tz;
	  }

	  return s;
	};

	var parseOffset_1$1 = parseOffset$1;

	var parseTime = function parseTime(s) {
	  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	  str = str.replace(/^\s+/, '').toLowerCase(); //trim
	  //formal time formats - 04:30.23

	  var arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);

	  if (arr !== null) {
	    //validate it a little
	    var h = Number(arr[1]);

	    if (h < 0 || h > 24) {
	      return s.startOf('day');
	    }

	    var m = Number(arr[2]); //don't accept '5:3pm'

	    if (arr[2].length < 2 || m < 0 || m > 59) {
	      return s.startOf('day');
	    }

	    s = s.hour(h);
	    s = s.minute(m);
	    s = s.seconds(arr[3] || 0);
	    s = s.millisecond(arr[4] || 0); //parse-out am/pm

	    var ampm = str.match(/[\b0-9](am|pm)\b/);

	    if (ampm !== null && ampm[1]) {
	      s = s.ampm(ampm[1]);
	    }

	    return s;
	  } //try an informal form - 5pm (no minutes)


	  arr = str.match(/([0-9]+) ?(am|pm)/);

	  if (arr !== null && arr[1]) {
	    var _h = Number(arr[1]); //validate it a little..


	    if (_h > 12 || _h < 1) {
	      return s.startOf('day');
	    }

	    s = s.hour(arr[1] || 0);
	    s = s.ampm(arr[2]);
	    s = s.startOf('hour');
	    return s;
	  } //no time info found, use start-of-day


	  s = s.startOf('day');
	  return s;
	};

	var parseTime_1 = parseTime;

	var monthLengths = [31, // January - 31 days
	28, // February - 28 days in a common year and 29 days in leap years
	31, // March - 31 days
	30, // April - 30 days
	31, // May - 31 days
	30, // June - 30 days
	31, // July - 31 days
	31, // August - 31 days
	30, // September - 30 days
	31, // October - 31 days
	30, // November - 30 days
	31 // December - 31 days
	];
	var monthLengths_1 = monthLengths;

	var isLeapYear = fns.isLeapYear; //given a month, return whether day number exists in it

	var hasDate = function hasDate(obj) {
	  //invalid values
	  if (monthLengths_1.hasOwnProperty(obj.month) !== true) {
	    return false;
	  } //support leap-year in february


	  if (obj.month === 1) {
	    if (isLeapYear(obj.year) && obj.date <= 29) {
	      return true;
	    } else {
	      return obj.date <= 28;
	    }
	  } //is this date too-big for this month?


	  var max = monthLengths_1[obj.month] || 0;

	  if (obj.date <= max) {
	    return true;
	  }

	  return false;
	};

	var hasDate_1 = hasDate;

	var months$1 = months.mapping();

	var parseYear = function parseYear() {
	  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  //support '18 -> 2018
	  // str = str.replace(/^'([0-9]{2})/, '20$1')
	  // str = str.replace('([0-9]+) ?b\.?c\.?$', '-$1')
	  var year = parseInt(str.trim(), 10);
	  year = year || new Date().getFullYear();
	  return year;
	};

	var strFmt = [//iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
	{
	  reg: /^(\-?0?0?[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/,
	  parse: function parse(s, arr, givenTz, options) {
	    var month = parseInt(arr[2], 10) - 1;
	    var obj = {
	      year: arr[1],
	      month: month,
	      date: arr[3]
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    parseOffset_1$1(s, arr[5]);
	    walk_1(s, obj);
	    s = parseTime_1(s, arr[4]);
	    return s;
	  }
	}, //iso "2015-03-25" or "2015/03/25" //0-based-months!
	{
	  reg: /^([0-9]{4})[\-\/]([0-9]{1,2})[\-\/]([0-9]{1,2})$/,
	  parse: function parse(s, arr) {
	    var obj = {
	      year: arr[1],
	      month: parseInt(arr[2], 10) - 1,
	      date: parseInt(arr[3], 10)
	    };

	    if (obj.month >= 12) {
	      //support yyyy/dd/mm (weird, but ok)
	      obj.date = parseInt(arr[2], 10);
	      obj.month = parseInt(arr[3], 10) - 1;
	    }

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s);
	    return s;
	  }
	}, //short - uk "03/25/2015"  //0-based-months!
	{
	  reg: /^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]?([0-9]{4})?$/,
	  parse: function parse(s, arr) {
	    var month = parseInt(arr[1], 10) - 1;
	    var date = parseInt(arr[2], 10);

	    if (month >= 12) {
	      //support yyyy/dd/mm (weird, but ok)
	      month = parseInt(arr[2], 10) - 1;
	      date = parseInt(arr[1], 10);
	    }

	    var year = arr[3] || new Date().getFullYear();
	    var obj = {
	      year: year,
	      month: month,
	      date: date
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s);
	    return s;
	  }
	}, //Long "Mar 25 2015"
	//February 22, 2017 15:30:00
	{
	  reg: /^([a-z]+) ([0-9]{1,2}(?:st|nd|rd|th)?),?( [0-9]{4})?( ([0-9:]+( ?am| ?pm)?))?$/i,
	  parse: function parse(s, arr) {
	    var month = months$1[arr[1].toLowerCase()];
	    var year = parseYear(arr[3]);
	    var obj = {
	      year: year,
	      month: month,
	      date: fns.toCardinal(arr[2] || '')
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s, arr[4]);
	    return s;
	  }
	}, //February 2017 (implied date)
	{
	  reg: /^([a-z]+) ([0-9]{4})$/i,
	  parse: function parse(s, arr) {
	    var month = months$1[arr[1].toLowerCase()];
	    var year = parseYear(arr[2]);
	    var obj = {
	      year: year,
	      month: month,
	      date: 1
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s, arr[4]);
	    return s;
	  }
	}, //Long "25 Mar 2015"
	{
	  reg: /^([0-9]{1,2}(?:st|nd|rd|th)?) ([a-z]+),?( [0-9]{4})?$/i,
	  parse: function parse(s, arr) {
	    var month = months$1[arr[2].toLowerCase()];
	    var year = parseYear(arr[3]);
	    var obj = {
	      year: year,
	      month: month,
	      date: fns.toCardinal(arr[1])
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s);
	    return s;
	  }
	}, {
	  // '1992'
	  reg: /^[0-9]{4}$/i,
	  parse: function parse(s, arr) {
	    var year = parseYear(arr[0]);
	    var d = new Date();
	    var obj = {
	      year: year,
	      month: d.getMonth(),
	      date: d.getDate()
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s);
	    return s;
	  }
	}, {
	  // '200bc'
	  reg: /^[0-9,]+ ?b\.?c\.?$/i,
	  parse: function parse(s, arr) {
	    var str = arr[0] || ''; //make negative-year

	    str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1'); //remove commas

	    str = str.replace(/,/g, '');
	    var year = parseInt(str.trim(), 10);
	    var d = new Date();
	    var obj = {
	      year: year,
	      month: d.getMonth(),
	      date: d.getDate()
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s);
	    return s;
	  }
	}];
	var strParse = strFmt;

	var dates = {
	  now: function now(s) {
	    s.epoch = Date.now();
	    return s;
	  },
	  tonight: function tonight(s) {
	    s.epoch = Date.now();
	    s = s.hour(18);
	    return s;
	  },
	  today: function today(s) {
	    s.epoch = Date.now();
	    return s;
	  },
	  tomorrow: function tomorrow(s) {
	    s.epoch = Date.now();
	    s = s.add(1, 'day');
	    s = s.startOf('day');
	    return s;
	  },
	  yesterday: function yesterday(s) {
	    s.epoch = Date.now();
	    s = s.subtract(1, 'day');
	    s = s.startOf('day');
	    return s;
	  },
	  christmas: function christmas(s) {
	    var year = new Date().getFullYear();
	    s = s.set([year, 11, 25, 18, 0, 0]); // Dec 25

	    return s;
	  },
	  'new years': function newYears(s) {
	    var year = new Date().getFullYear();
	    s = s.set([year, 11, 31, 18, 0, 0]); // Dec 31

	    return s;
	  }
	};
	dates['new years eve'] = dates['new years'];
	var namedDates = dates;

	//  -  can't use built-in js parser ;(
	//=========================================
	// ISO Date	  "2015-03-25"
	// Short Date	"03/25/2015" or "2015/03/25"
	// Long Date	"Mar 25 2015" or "25 Mar 2015"
	// Full Date	"Wednesday March 25 2015"
	//=========================================
	//-- also -
	// if the given epoch is really small, they've probably given seconds and not milliseconds
	// anything below this number is likely (but not necessarily) a mistaken input.
	// this may seem like an arbitrary number, but it's 'within jan 1970'
	// this is only really ambiguous until 2054 or so

	var minimumEpoch = 2500000000;
	var defaults = {
	  year: new Date().getFullYear(),
	  month: 0,
	  date: 1 //support [2016, 03, 01] format

	};

	var handleArray = function handleArray(s, arr) {
	  var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

	  for (var i = 0; i < order.length; i++) {
	    var num = arr[i] || defaults[order[i]] || 0;
	    s = s[order[i]](num);
	  }

	  return s;
	}; //support {year:2016, month:3} format


	var handleObject = function handleObject(s, obj) {
	  obj = Object.assign({}, defaults, obj);
	  var keys = Object.keys(obj);

	  for (var i = 0; i < keys.length; i++) {
	    var unit = keys[i]; //make sure we have this method

	    if (s[unit] === undefined || typeof s[unit] !== 'function') {
	      continue;
	    } //make sure the value is a number


	    if (obj[unit] === null || obj[unit] === undefined || obj[unit] === '') {
	      continue;
	    }

	    var num = obj[unit] || defaults[unit] || 0;
	    s = s[unit](num);
	  }

	  return s;
	}; //find the epoch from different input styles


	var parseInput = function parseInput(s, input, givenTz) {
	  //if we've been given a epoch number, it's easy
	  if (typeof input === 'number') {
	    if (input > 0 && input < minimumEpoch && s.silent === false) {
	      console.warn('  - Warning: You are setting the date to January 1970.');
	      console.warn('       -   did input seconds instead of milliseconds?');
	    }

	    s.epoch = input;
	    return s;
	  } //set tmp time


	  s.epoch = Date.now();

	  if (input === null || input === undefined) {
	    return s; //k, we're good.
	  } //support input of Date() object


	  if (fns.isDate(input) === true) {
	    s.epoch = input.getTime();
	    return s;
	  } //support [2016, 03, 01] format


	  if (fns.isArray(input) === true) {
	    s = handleArray(s, input);
	    return s;
	  } //support {year:2016, month:3} format


	  if (fns.isObject(input) === true) {
	    //support spacetime object as input
	    if (input.epoch) {
	      s.epoch = input.epoch;
	      s.tz = input.tz;
	      return s;
	    }

	    s = handleObject(s, input);
	    return s;
	  } //input as a string..


	  if (typeof input !== 'string') {
	    return s;
	  } //little cleanup..


	  input = input.replace(/\b(mon|tues|wed|wednes|thu|thurs|fri|sat|satur|sun)(day)?\b/i, '');
	  input = input.replace(/,/g, '');
	  input = input.replace(/ +/g, ' ').trim(); //try some known-words, like 'now'

	  if (namedDates.hasOwnProperty(input) === true) {
	    s = namedDates[input](s);
	    return s;
	  } //try each text-parse template, use the first good result


	  for (var i = 0; i < strParse.length; i++) {
	    var m = input.match(strParse[i].reg);

	    if (m) {
	      s = strParse[i].parse(s, m, givenTz);
	      return s;
	    }
	  }

	  if (s.silent === false) {
	    console.warn("Warning: couldn't parse date-string: '" + input + "'");
	  }

	  s.epoch = null;
	  return s;
	};

	var input = parseInput;

	var shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
	var longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	var days = {
	  "short": function short() {
	    return shortDays;
	  },
	  "long": function long() {
	    return longDays;
	  },
	  set: function set(i18n) {
	    shortDays = i18n["short"] || shortDays;
	    longDays = i18n["long"] || longDays;
	  }
	};

	// it's kind of nuts how involved this is
	// "+01:00", "+0100", or simply "+01"

	var isoOffset = function isoOffset(s) {
	  var offset = s.timezone().current.offset;
	  var isNegative = offset < 0;
	  var minute = '00'; //handle 5.5 → '5:30'

	  if (Math.abs(offset % 1) === 0.5) {
	    minute = '30';

	    if (offset >= 0) {
	      offset = Math.floor(offset);
	    } else {
	      offset = Math.ceil(offset);
	    }
	  }

	  if (isNegative) {
	    //handle negative sign
	    offset *= -1;
	    offset = fns.zeroPad(offset, 2);
	    offset = '-' + offset;
	  } else {
	    offset = fns.zeroPad(offset, 2);
	    offset = '+' + offset;
	  }

	  offset = offset + ':' + minute; //'Z' means 00

	  if (offset === '+00:00') {
	    offset = 'Z';
	  }

	  return offset;
	};

	var _offset = isoOffset;

	var format = {
	  day: function day(s) {
	    return fns.titleCase(s.dayName());
	  },
	  'day-short': function dayShort(s) {
	    return fns.titleCase(days["short"]()[s.day()]);
	  },
	  'day-number': function dayNumber(s) {
	    return s.day();
	  },
	  'day-ordinal': function dayOrdinal(s) {
	    return fns.ordinal(s.day());
	  },
	  'day-pad': function dayPad(s) {
	    return fns.zeroPad(s.day());
	  },
	  date: function date(s) {
	    return s.date();
	  },
	  'date-ordinal': function dateOrdinal(s) {
	    return fns.ordinal(s.date());
	  },
	  'date-pad': function datePad(s) {
	    return fns.zeroPad(s.date());
	  },
	  month: function month(s) {
	    return fns.titleCase(s.monthName());
	  },
	  'month-short': function monthShort(s) {
	    return fns.titleCase(months["short"]()[s.month()]);
	  },
	  'month-number': function monthNumber(s) {
	    return s.month();
	  },
	  'month-ordinal': function monthOrdinal(s) {
	    return fns.ordinal(s.month());
	  },
	  'month-pad': function monthPad(s) {
	    return fns.zeroPad(s.month());
	  },
	  'iso-month': function isoMonth(s) {
	    return fns.zeroPad(s.month() + 1);
	  },
	  //1-based months
	  year: function year(s) {
	    var year = s.year();

	    if (year > 0) {
	      return year;
	    }

	    year = Math.abs(year);
	    return year + ' BC';
	  },
	  'year-short': function yearShort(s) {
	    var year = s.year();

	    if (year > 0) {
	      return "'".concat(String(s.year()).substr(2, 4));
	    }

	    year = Math.abs(year);
	    return year + ' BC';
	  },
	  'iso-year': function isoYear(s) {
	    var year = s.year();
	    var isNegative = year < 0;
	    var str = fns.zeroPad(Math.abs(year), 4); //0-padded

	    if (isNegative) {
	      //negative years are for some reason 6-digits ('-00008')
	      str = fns.zeroPad(str, 6);
	      str = '-' + str;
	    }

	    return str;
	  },
	  time: function time(s) {
	    return s.time();
	  },
	  'time-24': function time24(s) {
	    return "".concat(s.hour24(), ":").concat(fns.zeroPad(s.minute()));
	  },
	  hour: function hour(s) {
	    return s.hour12();
	  },
	  'hour-pad': function hourPad(s) {
	    return fns.zeroPad(s.hour12());
	  },
	  'hour-24': function hour24(s) {
	    return s.hour24();
	  },
	  'hour-24-pad': function hour24Pad(s) {
	    return fns.zeroPad(s.hour24());
	  },
	  minute: function minute(s) {
	    return s.minute();
	  },
	  'minute-pad': function minutePad(s) {
	    return fns.zeroPad(s.minute());
	  },
	  second: function second(s) {
	    return s.second();
	  },
	  'second-pad': function secondPad(s) {
	    return fns.zeroPad(s.second());
	  },
	  ampm: function ampm(s) {
	    return s.ampm();
	  },
	  quarter: function quarter(s) {
	    return 'Q' + s.quarter();
	  },
	  season: function season(s) {
	    return s.season();
	  },
	  era: function era(s) {
	    return s.era();
	  },
	  timezone: function timezone(s) {
	    return s.timezone().name;
	  },
	  offset: function offset(s) {
	    return _offset(s);
	  },
	  numeric: function numeric(s) {
	    return "".concat(s.year(), "/").concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()));
	  },
	  // yyyy/mm/dd
	  'numeric-us': function numericUs(s) {
	    return "".concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()), "/").concat(s.year());
	  },
	  // mm/dd/yyyy
	  'numeric-uk': function numericUk(s) {
	    return "".concat(fns.zeroPad(s.date()), "/").concat(fns.zeroPad(s.month() + 1), "/").concat(s.year());
	  },
	  //dd/mm/yyyy
	  'mm/dd': function mmDd(s) {
	    return "".concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()));
	  },
	  //mm/dd
	  // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
	  iso: function iso(s) {
	    var year = s.format('iso-year');
	    var month = fns.zeroPad(s.month() + 1); //1-based months

	    var date = fns.zeroPad(s.date());
	    var hour = fns.zeroPad(s.h24());
	    var minute = fns.zeroPad(s.minute());
	    var second = fns.zeroPad(s.second());
	    var ms = fns.zeroPad(s.millisecond(), 3);
	    var offset = _offset(s);
	    return "".concat(year, "-").concat(month, "-").concat(date, "T").concat(hour, ":").concat(minute, ":").concat(second, ".").concat(ms).concat(offset); //2018-03-09T08:50:00.000-05:00
	  },
	  'iso-short': function isoShort(s) {
	    var month = fns.zeroPad(s.month() + 1); //1-based months

	    var date = fns.zeroPad(s.date());
	    return "".concat(s.year(), "-").concat(month, "-").concat(date); //2017-02-15
	  },
	  'iso-utc': function isoUtc(s) {
	    return new Date(s.epoch).toISOString(); //2017-03-08T19:45:28.367Z
	  },
	  //i made these up
	  nice: function nice(s) {
	    return "".concat(months["short"]()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
	  },
	  'nice-year': function niceYear(s) {
	    return "".concat(months["short"]()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.year());
	  },
	  'nice-day': function niceDay(s) {
	    return "".concat(days["short"]()[s.day()], " ").concat(fns.titleCase(months["short"]()[s.month()]), " ").concat(fns.ordinal(s.date()));
	  },
	  'nice-full': function niceFull(s) {
	    return "".concat(s.dayName(), " ").concat(fns.titleCase(s.monthName()), " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
	  } //aliases

	};
	var aliases = {
	  'day-name': 'day',
	  'month-name': 'month',
	  'iso 8601': 'iso',
	  'time-h24': 'time-24',
	  'time-12': 'time',
	  'time-h12': 'time',
	  tz: 'timezone',
	  'day-num': 'day-number',
	  'month-num': 'month-number',
	  'month-iso': 'iso-month',
	  'year-iso': 'iso-year',
	  'nice-short': 'nice',
	  mdy: 'numeric-us',
	  dmy: 'numeric-uk',
	  ymd: 'numeric',
	  'yyyy/mm/dd': 'numeric',
	  'mm/dd/yyyy': 'numeric-us',
	  'dd/mm/yyyy': 'numeric-us',
	  'little-endian': 'numeric-uk',
	  'big-endian': 'numeric',
	  'day-nice': 'nice-day'
	};
	Object.keys(aliases).forEach(function (k) {
	  return format[k] = format[aliases[k]];
	});

	var printFormat = function printFormat(s) {
	  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	  //don't print anything if it's an invalid date
	  if (s.isValid() !== true) {
	    return '';
	  } //support .format('month')


	  if (format.hasOwnProperty(str)) {
	    var out = String(format[str](s) || '');

	    if (str !== 'ampm') {
	      out = fns.titleCase(out);
	    }

	    return out;
	  } //support '{hour}:{minute}' notation


	  if (str.indexOf('{') !== -1) {
	    var sections = /\{(.+?)\}/g;
	    str = str.replace(sections, function (_, fmt) {
	      fmt = fmt.toLowerCase().trim();

	      if (format.hasOwnProperty(fmt)) {
	        return String(format[fmt](s) || '');
	      }

	      return '';
	    });
	    return str;
	  }

	  return s.format('iso-short');
	};

	var format_1 = printFormat;

	var pad = fns.zeroPad;
	var formatTimezone = fns.formatTimezone; //parse this insane unix-time-templating thing, from the 19th century
	//http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns
	//time-symbols we support

	var mapping = {
	  G: function G(s) {
	    return s.era();
	  },
	  GG: function GG(s) {
	    return s.era();
	  },
	  GGG: function GGG(s) {
	    return s.era();
	  },
	  GGGG: function GGGG(s) {
	    return s.era() === 'AD' ? 'Anno Domini' : 'Before Christ';
	  },
	  //year
	  y: function y(s) {
	    return s.year();
	  },
	  yy: function yy(s) {
	    //last two chars
	    return parseInt(String(s.year()).substr(2, 4), 10);
	  },
	  yyy: function yyy(s) {
	    return s.year();
	  },
	  yyyy: function yyyy(s) {
	    return s.year();
	  },
	  yyyyy: function yyyyy(s) {
	    return '0' + s.year();
	  },
	  // u: (s) => {},//extended non-gregorian years
	  //quarter
	  Q: function Q(s) {
	    return s.quarter();
	  },
	  QQ: function QQ(s) {
	    return s.quarter();
	  },
	  QQQ: function QQQ(s) {
	    return s.quarter();
	  },
	  QQQQ: function QQQQ(s) {
	    return s.quarter();
	  },
	  //month
	  M: function M(s) {
	    return s.month() + 1;
	  },
	  MM: function MM(s) {
	    return pad(s.month() + 1);
	  },
	  MMM: function MMM(s) {
	    return s.format('month-short');
	  },
	  MMMM: function MMMM(s) {
	    return s.format('month');
	  },
	  //week
	  w: function w(s) {
	    return s.week();
	  },
	  ww: function ww(s) {
	    return pad(s.week());
	  },
	  //week of month
	  // W: (s) => s.week(),
	  //date of month
	  d: function d(s) {
	    return s.date();
	  },
	  dd: function dd(s) {
	    return pad(s.date());
	  },
	  //date of year
	  D: function D(s) {
	    return s.dayOfYear();
	  },
	  DD: function DD(s) {
	    return pad(s.dayOfYear());
	  },
	  DDD: function DDD(s) {
	    return pad(s.dayOfYear(), 3);
	  },
	  // F: (s) => {},//date of week in month
	  // g: (s) => {},//modified julian day
	  //day
	  E: function E(s) {
	    return s.format('day-short');
	  },
	  EE: function EE(s) {
	    return s.format('day-short');
	  },
	  EEE: function EEE(s) {
	    return s.format('day-short');
	  },
	  EEEE: function EEEE(s) {
	    return s.format('day');
	  },
	  EEEEE: function EEEEE(s) {
	    return s.format('day')[0];
	  },
	  e: function e(s) {
	    return s.day();
	  },
	  ee: function ee(s) {
	    return s.day();
	  },
	  eee: function eee(s) {
	    return s.format('day-short');
	  },
	  eeee: function eeee(s) {
	    return s.format('day');
	  },
	  eeeee: function eeeee(s) {
	    return s.format('day')[0];
	  },
	  //am/pm
	  a: function a(s) {
	    return s.ampm().toUpperCase();
	  },
	  aa: function aa(s) {
	    return s.ampm().toUpperCase();
	  },
	  aaa: function aaa(s) {
	    return s.ampm().toUpperCase();
	  },
	  aaaa: function aaaa(s) {
	    return s.ampm().toUpperCase();
	  },
	  //hour
	  h: function h(s) {
	    return s.h12();
	  },
	  hh: function hh(s) {
	    return pad(s.h12());
	  },
	  H: function H(s) {
	    return s.hour();
	  },
	  HH: function HH(s) {
	    return pad(s.hour());
	  },
	  // j: (s) => {},//weird hour format
	  m: function m(s) {
	    return s.minute();
	  },
	  mm: function mm(s) {
	    return pad(s.minute());
	  },
	  s: function s(_s) {
	    return _s.second();
	  },
	  ss: function ss(s) {
	    return pad(s.second());
	  },
	  //milliseconds in the day
	  A: function A(s) {
	    return s.epoch - s.startOf('day').epoch;
	  },
	  //timezone
	  z: function z(s) {
	    return s.timezone().name;
	  },
	  zz: function zz(s) {
	    return s.timezone().name;
	  },
	  zzz: function zzz(s) {
	    return s.timezone().name;
	  },
	  zzzz: function zzzz(s) {
	    return s.timezone().name;
	  },
	  Z: function Z(s) {
	    return formatTimezone(s.timezone().current.offset);
	  },
	  ZZ: function ZZ(s) {
	    return formatTimezone(s.timezone().current.offset);
	  },
	  ZZZ: function ZZZ(s) {
	    return formatTimezone(s.timezone().current.offset);
	  },
	  ZZZZ: function ZZZZ(s) {
	    return formatTimezone(s.timezone().current.offset, ':');
	  }
	};

	var addAlias = function addAlias(_char, to, n) {
	  var name = _char;
	  var toName = to;

	  for (var i = 0; i < n; i += 1) {
	    mapping[name] = mapping[toName];
	    name += _char;
	    toName += to;
	  }
	};

	addAlias('q', 'Q', 4);
	addAlias('L', 'M', 4);
	addAlias('Y', 'y', 4);
	addAlias('c', 'e', 4);
	addAlias('k', 'H', 2);
	addAlias('K', 'h', 2);
	addAlias('S', 's', 2);
	addAlias('v', 'z', 4);
	addAlias('V', 'Z', 4);

	var unixFmt = function unixFmt(s, str) {
	  var chars = str.split(''); //combine consecutive chars, like 'yyyy' as one.

	  var arr = [chars[0]];
	  var quoteOn = false;

	  for (var i = 1; i < chars.length; i += 1) {
	    //support quoted substrings
	    if (chars[i] === "'") {
	      quoteOn = !quoteOn; //support '', meaning one tick

	      if (quoteOn === true && chars[i + 1] && chars[i + 1] === "'") {
	        quoteOn = true;
	      } else {
	        continue;
	      }
	    } //merge it with the last one


	    if (quoteOn === true || chars[i] === arr[arr.length - 1][0]) {
	      arr[arr.length - 1] += chars[i];
	    } else {
	      arr.push(chars[i]);
	    }
	  }

	  return arr.reduce(function (txt, c) {
	    if (mapping[c] !== undefined) {
	      txt += mapping[c](s) || '';
	    } else {
	      txt += c;
	    }

	    return txt;
	  }, '');
	};

	var unixFmt_1 = unixFmt;

	var units$1 = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute'];

	var doUnit = function doUnit(s, k) {
	  var start = s.clone().startOf(k);
	  var end = s.clone().endOf(k);
	  var duration = end.epoch - start.epoch;
	  var percent = (s.epoch - start.epoch) / duration;
	  return parseFloat(percent.toFixed(2));
	}; //how far it is along, from 0-1


	var progress = function progress(s, unit) {
	  if (unit) {
	    unit = fns.normalize(unit);
	    return doUnit(s, unit);
	  }

	  var obj = {};
	  units$1.forEach(function (k) {
	    obj[k] = doUnit(s, k);
	  });
	  return obj;
	};

	var progress_1 = progress;

	var nearest = function nearest(s, unit) {
	  //how far have we gone?
	  var prog = s.progress();
	  unit = fns.normalize(unit); //fix camel-case for this one

	  if (unit === 'quarterhour') {
	    unit = 'quarterHour';
	  }

	  if (prog[unit] !== undefined) {
	    // go forward one?
	    if (prog[unit] > 0.5) {
	      s = s.add(1, unit);
	    } // go to start


	    s = s.startOf(unit);
	  } else if (s.silent === false) {
	    console.warn("no known unit '" + unit + "'");
	  }

	  return s;
	};

	var nearest_1 = nearest;

	//increment until dates are the same
	var climb = function climb(a, b, unit) {
	  var i = 0;
	  a = a.clone();

	  while (a.isBefore(b)) {
	    //do proper, expensive increment to catch all-the-tricks
	    a = a.add(1, unit);
	    i += 1;
	  } //oops, we went too-far..


	  if (a.isAfter(b, unit)) {
	    i -= 1;
	  }

	  return i;
	}; // do a thurough +=1 on the unit, until they match
	// for speed-reasons, only used on day, month, week.


	var diffOne = function diffOne(a, b, unit) {
	  if (a.isBefore(b)) {
	    return climb(a, b, unit);
	  } else {
	    return climb(b, a, unit) * -1; //reverse it
	  }
	};

	var one = diffOne;

	// 2020 - 2019 may be 1 year, or 0 years
	// - '1 year difference' means 366 days during a leap year

	var fastYear = function fastYear(a, b) {
	  var years = b.year() - a.year(); // should we decrement it by 1?

	  a = a.year(b.year());

	  if (a.isAfter(b)) {
	    years -= 1;
	  }

	  return years;
	}; // use a waterfall-method for computing a diff of any 'pre-knowable' units
	// compute years, then compute months, etc..
	// ... then ms-math for any very-small units


	var diff = function diff(a, b) {
	  // an hour is always the same # of milliseconds
	  // so these units can be 'pre-calculated'
	  var msDiff = b.epoch - a.epoch;
	  var obj = {
	    milliseconds: msDiff,
	    seconds: parseInt(msDiff / 1000, 10)
	  };
	  obj.minutes = parseInt(obj.seconds / 60, 10);
	  obj.hours = parseInt(obj.minutes / 60, 10); //do the year

	  var tmp = a.clone();
	  obj.years = fastYear(tmp, b);
	  tmp = a.add(obj.years, 'year'); //there's always 12 months in a year...

	  obj.months = obj.years * 12;
	  tmp = a.add(obj.months, 'month');
	  obj.months += one(tmp, b, 'month'); // there's always atleast 52 weeks in a year..
	  // (month * 4) isn't as close

	  obj.weeks = obj.years * 52;
	  tmp = a.add(obj.weeks, 'week');
	  obj.weeks += one(tmp, b, 'week'); // there's always atleast 7 days in a week

	  obj.days = obj.weeks * 7;
	  tmp = a.add(obj.days, 'day');
	  obj.days += one(tmp, b, 'day');
	  return obj;
	};

	var waterfall = diff;

	var reverseDiff = function reverseDiff(obj) {
	  Object.keys(obj).forEach(function (k) {
	    obj[k] *= -1;
	  });
	  return obj;
	}; // this method counts a total # of each unit, between a, b.
	// '1 month' means 28 days in february
	// '1 year' means 366 days in a leap year


	var main = function main(a, b, unit) {
	  b = fns.beADate(b, a); //reverse values, if necessary

	  var reversed = false;

	  if (a.isAfter(b)) {
	    var tmp = a;
	    a = b;
	    b = tmp;
	    reversed = true;
	  } //compute them all (i know!)


	  var obj = waterfall(a, b);

	  if (reversed) {
	    obj = reverseDiff(obj);
	  } //return just the requested unit


	  if (unit) {
	    //make sure it's plural-form
	    unit = fns.normalize(unit);

	    if (/s$/.test(unit) !== true) {
	      unit += 's';
	    }

	    if (unit === 'dates') {
	      unit = 'days';
	    }

	    return obj[unit];
	  }

	  return obj;
	};

	var diff$1 = main;

	//our conceptual 'break-points' for each unit

	var qualifiers = {
	  months: {
	    almost: 10,
	    over: 4
	  },
	  days: {
	    almost: 25,
	    over: 10
	  },
	  hours: {
	    almost: 20,
	    over: 8
	  },
	  minutes: {
	    almost: 50,
	    over: 20
	  },
	  seconds: {
	    almost: 50,
	    over: 20
	  } //get number of hours/minutes... between the two dates

	};

	function getDiff(a, b) {
	  var isBefore = a.isBefore(b);
	  var later = isBefore ? b : a;
	  var earlier = isBefore ? a : b;
	  earlier = earlier.clone();
	  var diff = {
	    years: 0,
	    months: 0,
	    days: 0,
	    hours: 0,
	    minutes: 0,
	    seconds: 0
	  };
	  Object.keys(diff).forEach(function (unit) {
	    if (earlier.isSame(later, unit)) {
	      return;
	    }

	    var max = earlier.diff(later, unit);
	    earlier = earlier.add(max, unit);
	    diff[unit] = max;
	  }); //reverse it, if necessary

	  if (isBefore) {
	    Object.keys(diff).forEach(function (u) {
	      if (diff[u] !== 0) {
	        diff[u] *= -1;
	      }
	    });
	  }

	  return diff;
	} // Expects a plural unit arg


	function pluralize(value, unit) {
	  if (value === 1) {
	    unit = unit.slice(0, -1);
	  }

	  return value + ' ' + unit;
	} //create the human-readable diff between the two dates


	var since = function since(start, end) {
	  end = fns.beADate(end, start);
	  var diff = getDiff(start, end);
	  var isNow = Object.keys(diff).every(function (u) {
	    return !diff[u];
	  });

	  if (isNow === true) {
	    return {
	      diff: diff,
	      rounded: 'now',
	      qualified: 'now',
	      precise: 'now'
	    };
	  }

	  var rounded;
	  var qualified;
	  var precise;
	  var englishValues = []; //go through each value and create its text-representation

	  Object.keys(diff).forEach(function (unit, i, units) {
	    var value = Math.abs(diff[unit]);

	    if (value === 0) {
	      return;
	    }

	    var englishValue = pluralize(value, unit);
	    englishValues.push(englishValue);

	    if (!rounded) {
	      rounded = qualified = englishValue;

	      if (i > 4) {
	        return;
	      } //is it a 'almost' something, etc?


	      var nextUnit = units[i + 1];
	      var nextValue = Math.abs(diff[nextUnit]);

	      if (nextValue > qualifiers[nextUnit].almost) {
	        rounded = pluralize(value + 1, unit);
	        qualified = 'almost ' + rounded;
	      } else if (nextValue > qualifiers[nextUnit].over) qualified = 'over ' + englishValue;
	    }
	  }); //make them into a string

	  precise = englishValues.splice(0, 2).join(', '); //handle before/after logic

	  if (start.isAfter(end) === true) {
	    rounded += ' ago';
	    qualified += ' ago';
	    precise += ' ago';
	  } else {
	    rounded = 'in ' + rounded;
	    qualified = 'in ' + qualified;
	    precise = 'in ' + precise;
	  }

	  return {
	    diff: diff,
	    rounded: rounded,
	    qualified: qualified,
	    precise: precise
	  };
	};

	var since_1 = since;

	//https://www.timeanddate.com/calendar/aboutseasons.html
	// Spring - from March 1 to May 31;
	// Summer - from June 1 to August 31;
	// Fall (autumn) - from September 1 to November 30; and,
	// Winter - from December 1 to February 28 (February 29 in a leap year).
	var seasons = {
	  north: [['spring', 2, 1], //spring march 1
	  ['summer', 5, 1], //june 1
	  ['fall', 8, 1], //sept 1
	  ['autumn', 8, 1], //sept 1
	  ['winter', 11, 1] //dec 1
	  ],
	  south: [['fall', 2, 1], //march 1
	  ['autumn', 2, 1], //march 1
	  ['winter', 5, 1], //june 1
	  ['spring', 8, 1], //sept 1
	  ['summer', 11, 1] //dec 1
	  ]
	};

	var quarters = [null, [0, 1], //jan 1
	[3, 1], //apr 1
	[6, 1], //july 1
	[9, 1] //oct 1
	];

	var units$2 = {
	  minute: function minute(s) {
	    walk_1(s, {
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  quarterhour: function quarterhour(s) {
	    var minute = s.minutes();

	    if (minute >= 45) {
	      s = s.minutes(45);
	    } else if (minute >= 30) {
	      s = s.minutes(30);
	    } else if (minute >= 15) {
	      s = s.minutes(15);
	    } else {
	      s = s.minutes(0);
	    }

	    walk_1(s, {
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  hour: function hour(s) {
	    walk_1(s, {
	      minute: 0,
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  day: function day(s) {
	    walk_1(s, {
	      hour: 0,
	      minute: 0,
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  week: function week(s) {
	    var original = s.clone();
	    s = s.day(s._weekStart); //monday

	    if (s.isAfter(original)) {
	      s = s.subtract(1, 'week');
	    }

	    walk_1(s, {
	      hour: 0,
	      minute: 0,
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  month: function month(s) {
	    walk_1(s, {
	      date: 1,
	      hour: 0,
	      minute: 0,
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  quarter: function quarter(s) {
	    var q = s.quarter();

	    if (quarters[q]) {
	      walk_1(s, {
	        month: quarters[q][0],
	        date: quarters[q][1],
	        hour: 0,
	        minute: 0,
	        second: 0,
	        millisecond: 0
	      });
	    }

	    return s;
	  },
	  season: function season(s) {
	    var current = s.season();
	    var hem = 'north';

	    if (s.hemisphere() === 'South') {
	      hem = 'south';
	    }

	    for (var i = 0; i < seasons[hem].length; i++) {
	      if (seasons[hem][i][0] === current) {
	        //winter goes between years
	        var year = s.year();

	        if (current === 'winter' && s.month() < 3) {
	          year -= 1;
	        }

	        walk_1(s, {
	          year: year,
	          month: seasons[hem][i][1],
	          date: seasons[hem][i][2],
	          hour: 0,
	          minute: 0,
	          second: 0,
	          millisecond: 0
	        });
	        return s;
	      }
	    }

	    return s;
	  },
	  year: function year(s) {
	    walk_1(s, {
	      month: 0,
	      date: 1,
	      hour: 0,
	      minute: 0,
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  decade: function decade(s) {
	    s = s.startOf('year');
	    var year = s.year();
	    var decade = parseInt(year / 10, 10) * 10;
	    s = s.year(decade);
	    return s;
	  },
	  century: function century(s) {
	    s = s.startOf('year');
	    var year = s.year();
	    var decade = parseInt(year / 100, 10) * 100;
	    s = s.year(decade);
	    return s;
	  }
	};
	units$2.date = units$2.day;

	var startOf = function startOf(a, unit) {
	  var s = a.clone();
	  unit = fns.normalize(unit);

	  if (units$2[unit]) {
	    return units$2[unit](s);
	  }

	  if (unit === 'summer' || unit === 'winter') {
	    s = s.season(unit);
	    return units$2.season(s);
	  }

	  return s;
	}; //piggy-backs off startOf


	var endOf = function endOf(a, unit) {
	  var s = a.clone();
	  unit = fns.normalize(unit);

	  if (units$2[unit]) {
	    s = units$2[unit](s);
	    s = s.add(1, unit);
	    s = s.subtract(1, 'milliseconds');
	    return s;
	  }

	  return s;
	};

	var startOf_1 = {
	  startOf: startOf,
	  endOf: endOf
	};

	var isDay = function isDay(unit) {
	  if (days["short"]().find(function (s) {
	    return s === unit;
	  })) {
	    return true;
	  }

	  if (days["long"]().find(function (s) {
	    return s === unit;
	  })) {
	    return true;
	  }

	  return false;
	}; // return a list of the weeks/months/days between a -> b
	// returns spacetime objects in the timezone of the input


	var every = function every(start) {
	  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	  var end = arguments.length > 2 ? arguments[2] : undefined;

	  if (!unit || !end) {
	    return [];
	  } //cleanup unit param


	  unit = fns.normalize(unit); //cleanup to param

	  end = start.clone().set(end); //swap them, if they're backwards

	  if (start.isAfter(end)) {
	    var tmp = start;
	    start = end;
	    end = tmp;
	  } //support 'every wednesday'


	  var d = start.clone();

	  if (isDay(unit)) {
	    d = d.next(unit);
	    unit = 'week';
	  } else {
	    d = d.next(unit);
	  } //okay, actually start doing it


	  var result = [];

	  while (d.isBefore(end)) {
	    result.push(d);
	    d = d.add(1, unit);
	  }

	  return result;
	};

	var every_1 = every;

	var parseDst = function parseDst(dst) {
	  if (!dst) {
	    return [];
	  }

	  return dst.split('->');
	};

	var titleCase = function titleCase(str) {
	  str = str[0].toUpperCase() + str.substr(1);
	  str = str.replace(/\/gmt/, '/GMT');
	  str = str.replace(/[\/_]([a-z])/gi, function (s) {
	    return s.toUpperCase();
	  });
	  return str;
	}; //get metadata about this timezone


	var timezone = function timezone(s) {
	  var zones = s.timezones;
	  var tz = s.tz;

	  if (zones.hasOwnProperty(tz) === false) {
	    tz = find(s.tz, zones);
	  }

	  if (tz === null) {
	    if (s.silent === false) {
	      console.warn("Warn: could not find given or local timezone - '" + s.tz + "'");
	    }

	    return {
	      current: {
	        epochShift: 0
	      }
	    };
	  }

	  var found = zones[tz];
	  var result = {
	    name: titleCase(tz),
	    hasDst: Boolean(found.dst),
	    default_offset: found.offset,
	    //do north-hemisphere version as default (sorry!)
	    hemisphere: found.hem === 's' ? 'South' : 'North',
	    current: {}
	  };

	  if (result.hasDst) {
	    var arr = parseDst(found.dst);
	    result.change = {
	      start: arr[0],
	      back: arr[1]
	    };
	  } //find the offsets for summer/winter times
	  //(these variable names are north-centric)


	  var summer = found.offset; // (july)

	  var winter = summer; // (january) assume it's the same for now

	  if (result.hasDst === true) {
	    if (result.hemisphere === 'North') {
	      winter = summer - 1;
	    } else {
	      //southern hemisphere
	      winter = found.offset + 1;
	    }
	  } //find out which offset to use right now
	  //use 'summer' time july-time


	  if (result.hasDst === false) {
	    result.current.offset = summer;
	    result.current.isDST = false;
	  } else if (summerTime(s.epoch, result.change.start, result.change.back, summer) === true) {
	    result.current.offset = summer;
	    result.current.isDST = result.hemisphere === 'North'; //dst 'on' in winter in north
	  } else {
	    //use 'winter' january-time
	    result.current.offset = winter;
	    result.current.isDST = result.hemisphere === 'South'; //dst 'on' in summer in south
	  }

	  return result;
	};

	var timezone_1 = timezone;

	var methods = {
	  set: function set(input$1, tz) {
	    var s = this.clone();
	    s = input(s, input$1);

	    if (tz) {
	      this.tz = find(tz);
	    }

	    return s;
	  },
	  timezone: function timezone() {
	    return timezone_1(this);
	  },
	  isDST: function isDST() {
	    return timezone_1(this).current.isDST;
	  },
	  hasDST: function hasDST() {
	    return timezone_1(this).hasDst;
	  },
	  offset: function offset() {
	    return timezone_1(this).current.offset * 60;
	  },
	  hemisphere: function hemisphere() {
	    return timezone_1(this).hemisphere;
	  },
	  format: function format(fmt) {
	    return format_1(this, fmt);
	  },
	  unixFmt: function unixFmt(fmt) {
	    return unixFmt_1(this, fmt);
	  },
	  startOf: function startOf(unit) {
	    return startOf_1.startOf(this, unit);
	  },
	  endOf: function endOf(unit) {
	    return startOf_1.endOf(this, unit);
	  },
	  leapYear: function leapYear() {
	    var year = this.year();
	    return fns.isLeapYear(year);
	  },
	  progress: function progress(unit) {
	    return progress_1(this, unit);
	  },
	  nearest: function nearest(unit) {
	    return nearest_1(this, unit);
	  },
	  diff: function diff(d, unit) {
	    return diff$1(this, d, unit);
	  },
	  since: function since(d) {
	    if (!d) {
	      d = this.clone().set();
	    }

	    return since_1(this, d);
	  },
	  next: function next(unit) {
	    var s = this.add(1, unit);
	    return s.startOf(unit);
	  },
	  //the start of the previous year/week/century
	  last: function last(unit) {
	    var s = this.subtract(1, unit);
	    return s.startOf(unit);
	  },
	  isValid: function isValid() {
	    //null/undefined epochs
	    if (!this.epoch && this.epoch !== 0) {
	      return false;
	    }

	    return !isNaN(this.d.getTime());
	  },
	  //travel to this timezone
	  "goto": function goto(tz) {
	    var s = this.clone();
	    s.tz = find(tz, s.timezones); //science!

	    return s;
	  },
	  //get each week/month/day between a -> b
	  every: function every(unit, to) {
	    return every_1(this, unit, to);
	  },
	  isAwake: function isAwake() {
	    var hour = this.hour(); //10pm -> 8am

	    if (hour < 8 || hour > 22) {
	      return false;
	    }

	    return true;
	  },
	  isAsleep: function isAsleep() {
	    return !this.isAwake();
	  },
	  //pretty-printing
	  log: function log() {
	    console.log('');
	    console.log(format_1(this, 'nice-short'));
	    return this;
	  },
	  logYear: function logYear() {
	    console.log('');
	    console.log(format_1(this, 'full-short'));
	    return this;
	  },
	  debug: function debug() {
	    var tz = this.timezone();
	    var date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year();
	    date += '\n     - ' + this.format('time');
	    console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')');
	    return this;
	  },
	  //alias of 'since' but opposite - like moment.js
	  from: function from(d) {
	    d = this.clone().set(d);
	    return d.since(this);
	  },
	  fromNow: function fromNow() {
	    var d = this.clone().set(Date.now());
	    return d.since(this);
	  },
	  weekStart: function weekStart(input) {
	    //accept a number directly
	    if (typeof input === 'number') {
	      this._weekStart = input;
	      return this;
	    }

	    if (typeof input === 'string') {
	      // accept 'wednesday'
	      input = input.toLowerCase().trim();
	      var num = days["short"]().indexOf(input);

	      if (num === -1) {
	        num = days["long"]().indexOf(input);
	      }

	      if (num === -1) {
	        num = 1; //go back to default
	      }

	      this._weekStart = num;
	    } else {
	      console.warn('Spacetime Error: Cannot understand .weekStart() input:', input);
	    }

	    return this;
	  } // aliases

	};
	methods.inDST = methods.isDST;
	methods.round = methods.nearest;
	methods.each = methods.every;
	var methods_1 = methods;

	//these methods wrap around them.

	var validate = function validate(n) {
	  //handle number as a string
	  if (typeof n === 'string') {
	    n = parseInt(n, 10);
	  }

	  return n;
	};

	var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']; //reduce hostile micro-changes when moving dates by millisecond

	var confirm = function confirm(s, tmp, unit) {
	  var n = order.indexOf(unit);
	  var arr = order.slice(n, order.length);

	  for (var i = 0; i < arr.length; i++) {
	    var want = tmp[arr[i]]();
	    s[arr[i]](want);
	  }

	  return s;
	};

	var set = {
	  milliseconds: function milliseconds(s, n) {
	    n = validate(n);
	    var current = s.millisecond();
	    var diff = current - n; //milliseconds to shift by

	    return s.epoch - diff;
	  },
	  seconds: function seconds(s, n) {
	    n = validate(n);
	    var diff = s.second() - n;
	    var shift = diff * milliseconds.second;
	    return s.epoch - shift;
	  },
	  minutes: function minutes(s, n) {
	    n = validate(n);
	    var old = s.clone();
	    var diff = s.minute() - n;
	    var shift = diff * milliseconds.minute;
	    s.epoch -= shift;
	    confirm(s, old, 'second');
	    return s.epoch;
	  },
	  hours: function hours(s, n) {
	    n = validate(n);

	    if (n >= 24) {
	      n = 24;
	    } else if (n < 0) {
	      n = 0;
	    }

	    var old = s.clone();
	    var diff = s.hour() - n;
	    var shift = diff * milliseconds.hour;
	    s.epoch -= shift;
	    walk_1(s, {
	      hour: n
	    });
	    confirm(s, old, 'minute');
	    return s.epoch;
	  },
	  //support setting time by '4:25pm' - this isn't very-well developed..
	  time: function time(s, str) {
	    var m = str.match(/([0-9]{1,2}):([0-9]{1,2})(am|pm)?/);

	    if (!m) {
	      //fallback to support just '2am'
	      m = str.match(/([0-9]{1,2})(am|pm)/);

	      if (!m) {
	        return s.epoch;
	      }

	      m.splice(2, 0, '0'); //add implicit 0 minutes
	    }

	    var h24 = false;
	    var hour = parseInt(m[1], 10);
	    var minute = parseInt(m[2], 10);

	    if (hour > 12) {
	      h24 = true;
	    } //make the hour into proper 24h time


	    if (h24 === false) {
	      if (m[3] === 'am' && hour === 12) {
	        //12am is midnight
	        hour = 0;
	      }

	      if (m[3] === 'pm' && hour < 12) {
	        //12pm is noon
	        hour += 12;
	      }
	    }

	    s = s.hour(hour);
	    s = s.minute(minute);
	    s = s.second(0);
	    s = s.millisecond(0);
	    return s.epoch;
	  },
	  date: function date(s, n) {
	    n = validate(n); //avoid setting february 31st

	    if (n > 28) {
	      var max = monthLengths_1[s.month()];

	      if (n > max) {
	        n = max;
	      }
	    } //avoid setting < 0


	    if (n <= 0) {
	      n = 1;
	    }

	    walk_1(s, {
	      date: n
	    });
	    return s.epoch;
	  },
	  //this one's tricky
	  month: function month(s, n) {
	    if (typeof n === 'string') {
	      n = months.mapping()[n.toLowerCase()];
	    }

	    n = validate(n); //don't go past december

	    if (n >= 12) {
	      n = 11;
	    }

	    if (n <= 0) {
	      n = 0;
	    }

	    var date = s.date(); //there's no 30th of february, etc.

	    if (date > monthLengths_1[n]) {
	      //make it as close as we can..
	      date = monthLengths_1[n];
	    }

	    walk_1(s, {
	      month: n,
	      date: date
	    });
	    return s.epoch;
	  },
	  year: function year(s, n) {
	    n = validate(n);
	    walk_1(s, {
	      year: n
	    });
	    return s.epoch;
	  },
	  dayOfYear: function dayOfYear(s, n) {
	    n = validate(n);
	    var old = s.clone();
	    n -= 1; //days are 1-based

	    if (n <= 0) {
	      n = 0;
	    } else if (n >= 365) {
	      n = 364;
	    }

	    s = s.startOf('year');
	    s = s.add(n, 'day');
	    confirm(s, old, 'hour');
	    return s.epoch;
	  }
	};

	var methods$1 = {
	  millisecond: function millisecond(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.milliseconds(s, num);
	      return s;
	    }

	    return this.d.getMilliseconds();
	  },
	  second: function second(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.seconds(s, num);
	      return s;
	    }

	    return this.d.getSeconds();
	  },
	  minute: function minute(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.minutes(s, num);
	      return s;
	    }

	    return this.d.getMinutes();
	  },
	  hour: function hour(num) {
	    var d = this.d;

	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.hours(s, num);
	      return s;
	    }

	    return d.getHours();
	  },
	  //'3:30' is 3.5
	  hourFloat: function hourFloat(num) {
	    if (num !== undefined) {
	      var s = this.clone();

	      var _minute = num % 1;

	      _minute = _minute * 60;

	      var _hour = parseInt(num, 10);

	      s.epoch = set.hours(s, _hour);
	      s.epoch = set.minutes(s, _minute);
	      return s;
	    }

	    var d = this.d;
	    var hour = d.getHours();
	    var minute = d.getMinutes();
	    minute = minute / 60;
	    return hour + minute;
	  },
	  // hour in 12h format
	  hour12: function hour12(str) {
	    var d = this.d;

	    if (str !== undefined) {
	      var s = this.clone();
	      str = '' + str;
	      var m = str.match(/^([0-9]+)(am|pm)$/);

	      if (m) {
	        var hour = parseInt(m[1], 10);

	        if (m[2] === 'pm') {
	          hour += 12;
	        }

	        s.epoch = set.hours(s, hour);
	      }

	      return s;
	    } //get the hour


	    var hour12 = d.getHours();

	    if (hour12 > 12) {
	      hour12 = hour12 - 12;
	    }

	    if (hour12 === 0) {
	      hour12 = 12;
	    }

	    return hour12;
	  },
	  //some ambiguity here with 12/24h
	  time: function time(str) {
	    if (str !== undefined) {
	      var s = this.clone();
	      s.epoch = set.time(s, str);
	      return s;
	    }

	    return "".concat(this.h12(), ":").concat(fns.zeroPad(this.minute())).concat(this.ampm());
	  },
	  // either 'am' or 'pm'
	  ampm: function ampm(input) {
	    var which = 'am';
	    var hour = this.hour();

	    if (hour >= 12) {
	      which = 'pm';
	    }

	    if (typeof input !== 'string') {
	      return which;
	    } //okay, we're doing a setter


	    var s = this.clone();
	    input = input.toLowerCase().trim(); //ampm should never change the day
	    // - so use `.hour(n)` instead of `.minus(12,'hour')`

	    if (hour >= 12 && input === 'am') {
	      //noon is 12pm
	      hour -= 12;
	      return s.hour(hour);
	    }

	    if (hour < 12 && input === 'pm') {
	      hour += 12;
	      return s.hour(hour);
	    }

	    return s;
	  },
	  //some hard-coded times of day, like 'noon'
	  dayTime: function dayTime(str) {
	    if (str !== undefined) {
	      var times = {
	        morning: '7:00am',
	        breakfast: '7:00am',
	        noon: '12:00am',
	        lunch: '12:00pm',
	        afternoon: '2:00pm',
	        evening: '6:00pm',
	        dinner: '6:00pm',
	        night: '11:00pm',
	        midnight: '23:59pm'
	      };
	      var s = this.clone();
	      str = str || '';
	      str = str.toLowerCase();

	      if (times.hasOwnProperty(str) === true) {
	        s = s.time(times[str]);
	      }

	      return s;
	    }

	    var h = this.hour();

	    if (h < 6) {
	      return 'night';
	    }

	    if (h < 12) {
	      //until noon
	      return 'morning';
	    }

	    if (h < 17) {
	      //until 5pm
	      return 'afternoon';
	    }

	    if (h < 22) {
	      //until 10pm
	      return 'evening';
	    }

	    return 'night';
	  },
	  //parse a proper iso string
	  iso: function iso(num) {
	    if (num !== undefined) {
	      return this.set(num);
	    }

	    return this.format('iso');
	  }
	};
	var _01Time = methods$1;

	var methods$2 = {
	  // # day in the month
	  date: function date(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.date(s, num);
	      return s;
	    }

	    return this.d.getDate();
	  },
	  //like 'wednesday' (hard!)
	  day: function day(input) {
	    if (input === undefined) {
	      return this.d.getDay();
	    }

	    var original = this.clone();
	    var want = input; // accept 'wednesday'

	    if (typeof input === 'string') {
	      input = input.toLowerCase();
	      want = days["short"]().indexOf(input);

	      if (want === -1) {
	        want = days["long"]().indexOf(input);
	      }
	    } //move approx


	    var day = this.d.getDay();
	    var diff = day - want;
	    var s = this.subtract(diff * 24, 'hours'); //tighten it back up

	    walk_1(s, {
	      hour: original.hour(),
	      minute: original.minute(),
	      second: original.second()
	    });
	    return s;
	  },
	  //these are helpful name-wrappers
	  dayName: function dayName(input) {
	    if (input === undefined) {
	      return days["long"]()[this.day()];
	    }

	    var s = this.clone();
	    s = s.day(input);
	    return s;
	  },
	  //either name or number
	  month: function month(input) {
	    if (input !== undefined) {
	      var s = this.clone();
	      s.epoch = set.month(s, input);
	      return s;
	    }

	    return this.d.getMonth();
	  }
	};
	var _02Date = methods$2;

	var clearMinutes = function clearMinutes(s) {
	  s = s.minute(0);
	  s = s.second(0);
	  s = s.millisecond(1);
	  return s;
	};

	var methods$3 = {
	  // day 0-366
	  dayOfYear: function dayOfYear(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.dayOfYear(s, num);
	      return s;
	    } //days since newyears - jan 1st is 1, jan 2nd is 2...


	    var sum = 0;
	    var month = this.d.getMonth();
	    var tmp; //count the num days in each month

	    for (var i = 1; i <= month; i++) {
	      tmp = new Date();
	      tmp.setDate(1);
	      tmp.setYear(this.d.getFullYear()); //the year matters, because leap-years

	      tmp.setHours(1);
	      tmp.setMinutes(1);
	      tmp.setMonth(i);
	      tmp.setHours(-2); //the last day of the month

	      sum += tmp.getDate();
	    }

	    return sum + this.d.getDate();
	  },
	  //since the start of the year
	  week: function week(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s = s.month(0);
	      s = s.date(1);
	      s = s.day('monday');
	      s = clearMinutes(s); //don't go into last-year

	      if (s.monthName() === 'december') {
	        s = s.add(1, 'week');
	      }

	      num -= 1; //1-based

	      s = s.add(num, 'weeks');
	      return s;
	    } //find-out which week it is


	    var tmp = this.clone();
	    tmp = tmp.month(0);
	    tmp = tmp.date(1);
	    tmp = clearMinutes(tmp);
	    tmp = tmp.day('monday'); //don't go into last-year

	    if (tmp.monthName() === 'december') {
	      tmp = tmp.add(1, 'week');
	    }

	    var thisOne = this.epoch; //if the week technically hasn't started yet

	    if (tmp.epoch > thisOne) {
	      return 1;
	    } //speed it up, if we can


	    var i = 0;
	    var skipWeeks = this.month() * 4;
	    tmp.epoch += milliseconds.week * skipWeeks;
	    i += skipWeeks;

	    for (; i < 52; i++) {
	      if (tmp.epoch > thisOne) {
	        return i;
	      }

	      tmp = tmp.add(1, 'week');
	    }

	    return 52;
	  },
	  //'january'
	  monthName: function monthName(input) {
	    if (input === undefined) {
	      return months["long"]()[this.month()];
	    }

	    var s = this.clone();
	    s = s.month(input);
	    return s;
	  },
	  //q1, q2, q3, q4
	  quarter: function quarter(num) {
	    if (num !== undefined) {
	      if (typeof num === 'string') {
	        num = num.replace(/^q/i, '');
	        num = parseInt(num, 10);
	      }

	      if (quarters[num]) {
	        var s = this.clone();
	        var _month = quarters[num][0];
	        s = s.month(_month);
	        s = s.date(1);
	        s = s.startOf('day');
	        return s;
	      }
	    }

	    var month = this.d.getMonth();

	    for (var i = 1; i < quarters.length; i++) {
	      if (month < quarters[i][0]) {
	        return i - 1;
	      }
	    }

	    return 4;
	  },
	  //spring, summer, winter, fall
	  season: function season(input) {
	    var hem = 'north';

	    if (this.hemisphere() === 'South') {
	      hem = 'south';
	    }

	    if (input !== undefined) {
	      var s = this.clone();

	      for (var i = 0; i < seasons[hem].length; i++) {
	        if (input === seasons[hem][i][0]) {
	          s = s.month(seasons[hem][i][1]);
	          s = s.date(1);
	          s = s.startOf('day');
	        }
	      }

	      return s;
	    }

	    var month = this.d.getMonth();

	    for (var _i = 0; _i < seasons[hem].length - 1; _i++) {
	      if (month >= seasons[hem][_i][1] && month < seasons[hem][_i + 1][1]) {
	        return seasons[hem][_i][0];
	      }
	    }

	    return 'winter';
	  },
	  //the year number
	  year: function year(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.year(s, num);
	      return s;
	    }

	    return this.d.getFullYear();
	  },
	  //bc/ad years
	  era: function era(str) {
	    if (str !== undefined) {
	      var s = this.clone();
	      str = str.toLowerCase(); //TODO: there is no year-0AD i think. may have off-by-1 error here

	      var year = s.d.getFullYear(); //make '1992' into 1992bc..

	      if (str === 'bc' && year > 0) {
	        s.epoch = set.year(s, year * -1);
	      } //make '1992bc' into '1992'


	      if (str === 'ad' && year < 0) {
	        s.epoch = set.year(s, year * -1);
	      }

	      return s;
	    }

	    if (this.d.getFullYear() < 0) {
	      return 'BC';
	    }

	    return 'AD';
	  }
	};
	var _03Year = methods$3;

	var methods$4 = Object.assign({}, _01Time, _02Date, _03Year); //aliases

	methods$4.milliseconds = methods$4.millisecond;
	methods$4.seconds = methods$4.second;
	methods$4.minutes = methods$4.minute;
	methods$4.hours = methods$4.hour;
	methods$4.hour24 = methods$4.hour;
	methods$4.h12 = methods$4.hour12;
	methods$4.h24 = methods$4.hour24;
	methods$4.days = methods$4.day;

	var addMethods = function addMethods(Space) {
	  //hook the methods into prototype
	  Object.keys(methods$4).forEach(function (k) {
	    Space.prototype[k] = methods$4[k];
	  });
	};

	var query = addMethods;

	var order$1 = ['millisecond', 'second', 'minute', 'hour', 'date', 'month'];
	var keep = {
	  second: order$1.slice(0, 1),
	  minute: order$1.slice(0, 2),
	  quarterhour: order$1.slice(0, 2),
	  hour: order$1.slice(0, 3),
	  date: order$1.slice(0, 4),
	  month: order$1.slice(0, 4),
	  quarter: order$1.slice(0, 4),
	  season: order$1.slice(0, 4),
	  year: order$1,
	  decade: order$1,
	  century: order$1
	};
	keep.week = keep.hour;
	keep.season = keep.date;
	keep.quarter = keep.date; // Units need to be dst adjuested

	var dstAwareUnits = {
	  year: true,
	  quarter: true,
	  season: true,
	  month: true,
	  week: true,
	  day: true
	};
	var keepDate = {
	  month: true,
	  quarter: true,
	  season: true,
	  year: true //month is the only thing we 'model/compute'
	  //- because ms-shifting can be off by enough

	};

	var rollMonth = function rollMonth(want, old) {
	  //increment year
	  if (want.month > 0) {
	    var years = parseInt(want.month / 12, 10);
	    want.year = old.year() + years;
	    want.month = want.month % 12;
	  } else if (want.month < 0) {
	    //decrement year
	    var _years = Math.floor(Math.abs(want.month) / 13, 10);

	    _years = Math.abs(_years) + 1;
	    want.year = old.year() - _years; //ignore extras

	    want.month = want.month % 12;
	    want.month = want.month + 12;

	    if (want.month === 12) {
	      want.month = 0;
	    }
	  }

	  return want;
	};

	var addMethods$1 = function addMethods(SpaceTime) {
	  SpaceTime.prototype.add = function (num, unit) {
	    var s = this.clone();

	    if (!unit || num === 0) {
	      return s; //don't bother
	    }

	    var old = this.clone();
	    unit = fns.normalize(unit); //move forward by the estimated milliseconds (rough)

	    if (milliseconds[unit]) {
	      s.epoch += milliseconds[unit] * num;
	    } else if (unit === 'week') {
	      s.epoch += milliseconds.day * (num * 7);
	    } else if (unit === 'quarter' || unit === 'season') {
	      s.epoch += milliseconds.month * (num * 4);
	    } else if (unit === 'season') {
	      s.epoch += milliseconds.month * (num * 4);
	    } else if (unit === 'quarterhour') {
	      s.epoch += milliseconds.minute * 15 * num;
	    } //now ensure our milliseconds/etc are in-line


	    var want = {};

	    if (keep[unit]) {
	      keep[unit].forEach(function (u) {
	        want[u] = old[u]();
	      });
	    }

	    if (dstAwareUnits[unit]) {
	      var diff = old.timezone().current.offset - s.timezone().current.offset;
	      s.epoch += diff * 3600 * 1000;
	    } //ensure month/year has ticked-over


	    if (unit === 'month') {
	      want.month = old.month() + num; //month is the one unit we 'model' directly

	      want = rollMonth(want, old);
	    } //support coercing a week, too


	    if (unit === 'week') {
	      var sum = old.date() + num * 7;

	      if (sum <= 28 && sum > 1) {
	        want.date = sum;
	      }
	    } //support 25-hour day-changes on dst-changes
	    else if (unit === 'date') {
	        //specify a naive date number, if it's easy to do...
	        var _sum = old.date() + num;

	        if (_sum <= 28 && _sum > 1) {
	          want.date = _sum;
	        } //or if we haven't moved at all..
	        else if (num !== 0 && old.isSame(s, 'day')) {
	            want.date = old.date() + num;
	          }
	      } //ensure year has changed (leap-years)
	      else if (unit === 'year' && s.year() === old.year()) {
	          s.epoch += milliseconds.week;
	        } //these are easier
	        else if (unit === 'decade') {
	            want.year = s.year() + 10;
	          } else if (unit === 'century') {
	            want.year = s.year() + 100;
	          } //keep current date, unless the month doesn't have it.


	    if (keepDate[unit]) {
	      var max = monthLengths_1[want.month];
	      want.date = old.date();

	      if (want.date > max) {
	        want.date = max;
	      }
	    }

	    walk_1(s, want);
	    return s;
	  }; //subtract is only add *-1


	  SpaceTime.prototype.subtract = function (num, unit) {
	    var s = this.clone();
	    return s.add(num * -1, unit);
	  }; //add aliases


	  SpaceTime.prototype.minus = SpaceTime.prototype.subtract;
	  SpaceTime.prototype.plus = SpaceTime.prototype.add;
	};

	var add = addMethods$1;

	//make a string, for easy comparison between dates
	var print = {
	  millisecond: function millisecond(s) {
	    return s.epoch;
	  },
	  second: function second(s) {
	    return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join('-');
	  },
	  minute: function minute(s) {
	    return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join('-');
	  },
	  hour: function hour(s) {
	    return [s.year(), s.month(), s.date(), s.hour()].join('-');
	  },
	  day: function day(s) {
	    return [s.year(), s.month(), s.date()].join('-');
	  },
	  week: function week(s) {
	    return [s.year(), s.week()].join('-');
	  },
	  month: function month(s) {
	    return [s.year(), s.month()].join('-');
	  },
	  quarter: function quarter(s) {
	    return [s.year(), s.quarter()].join('-');
	  },
	  year: function year(s) {
	    return s.year();
	  }
	};
	print.date = print.day;

	var addMethods$2 = function addMethods(SpaceTime) {
	  SpaceTime.prototype.isSame = function (b, unit) {
	    var a = this;

	    if (!unit) {
	      return null;
	    }

	    if (typeof b === 'string' || typeof b === 'number') {
	      b = new SpaceTime(b, this.timezone.name);
	    } //support 'seconds' aswell as 'second'


	    unit = unit.replace(/s$/, '');

	    if (print[unit]) {
	      return print[unit](a) === print[unit](b);
	    }

	    return null;
	  };
	};

	var same = addMethods$2;

	var addMethods$3 = function addMethods(SpaceTime) {
	  var methods = {
	    isAfter: function isAfter(d) {
	      d = fns.beADate(d, this);
	      var epoch = fns.getEpoch(d);

	      if (epoch === null) {
	        return null;
	      }

	      return this.epoch > epoch;
	    },
	    isBefore: function isBefore(d) {
	      d = fns.beADate(d, this);
	      var epoch = fns.getEpoch(d);

	      if (epoch === null) {
	        return null;
	      }

	      return this.epoch < epoch;
	    },
	    isEqual: function isEqual(d) {
	      d = fns.beADate(d, this);
	      var epoch = fns.getEpoch(d);

	      if (epoch === null) {
	        return null;
	      }

	      return this.epoch === epoch;
	    },
	    isBetween: function isBetween(start, end) {
	      start = fns.beADate(start, this);
	      end = fns.beADate(end, this);
	      var startEpoch = fns.getEpoch(start);

	      if (startEpoch === null) {
	        return null;
	      }

	      var endEpoch = fns.getEpoch(end);

	      if (endEpoch === null) {
	        return null;
	      }

	      return startEpoch < this.epoch && this.epoch < endEpoch;
	    } //hook them into proto

	  };
	  Object.keys(methods).forEach(function (k) {
	    SpaceTime.prototype[k] = methods[k];
	  });
	};

	var compare = addMethods$3;

	var addMethods$4 = function addMethods(SpaceTime) {
	  var methods = {
	    i18n: function i18n(data) {
	      //change the day names
	      if (fns.isObject(data.days)) {
	        days.set(data.days);
	      } //change the month names


	      if (fns.isObject(data.months)) {
	        months.set(data.months);
	      }
	    } //hook them into proto

	  };
	  Object.keys(methods).forEach(function (k) {
	    SpaceTime.prototype[k] = methods[k];
	  });
	};

	var i18n = addMethods$4;

	var timezones = unpack; //fake timezone-support, for fakers (es5 class)

	var SpaceTime = function SpaceTime(input$1, tz) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  //the holy moment
	  this.epoch = null; //the shift for the given timezone

	  this.tz = find(tz, timezones); //whether to output warnings to console

	  this.silent = options.silent || true; //does the week start on sunday, or monday:

	  this._weekStart = 1; //default to monday

	  if (options.weekStart !== undefined) {
	    this._weekStart = options.weekStart;
	  } //add getter/setters


	  Object.defineProperty(this, 'd', {
	    //return a js date object
	    get: function get() {
	      var offset = quick(this); //every computer is somewhere- get this computer's built-in offset

	      var bias = new Date(this.epoch).getTimezoneOffset() || 0; //movement

	      var shift = bias + offset * 60; //in minutes

	      shift = shift * 60 * 1000; //in ms
	      //remove this computer's offset

	      var epoch = this.epoch + shift;
	      var d = new Date(epoch);
	      return d;
	    }
	  }); //add this data on the object, to allow adding new timezones

	  Object.defineProperty(this, 'timezones', {
	    get: function get() {
	      return timezones;
	    },
	    set: function set(obj) {
	      timezones = obj;
	      return obj;
	    }
	  }); //parse the various formats

	  if (input$1 !== undefined || input$1 === null) {
	    var tmp = input(this, input$1, tz);
	    this.epoch = tmp.epoch;
	  }
	}; //(add instance methods to prototype)


	Object.keys(methods_1).forEach(function (k) {
	  SpaceTime.prototype[k] = methods_1[k];
	}); // ¯\_(ツ)_/¯

	SpaceTime.prototype.clone = function () {
	  return new SpaceTime(this.epoch, this.tz, {
	    silent: this.silent,
	    weekStart: this._weekStart
	  });
	}; //append more methods


	query(SpaceTime);
	add(SpaceTime);
	same(SpaceTime);
	compare(SpaceTime);
	i18n(SpaceTime);
	var spacetime = SpaceTime;

	var whereIts = function whereIts(a, b) {
	  var start = new spacetime(null);
	  var end = new spacetime(null);
	  start = start.time(a); //if b is undefined, use as 'within one hour'

	  if (b) {
	    end = end.time(b);
	  } else {
	    end = start.add(59, 'minutes');
	  }

	  var startHour = start.hour();
	  var endHour = end.hour();
	  var tzs = Object.keys(start.timezones).filter(function (tz) {
	    if (tz.indexOf('/') === -1) {
	      return false;
	    }

	    var m = new spacetime(null, tz);
	    var hour = m.hour(); //do 'calendar-compare' not real-time-compare

	    if (hour >= startHour && hour <= endHour) {
	      //test minutes too, if applicable
	      if (hour === startHour && m.minute() < start.minute()) {
	        return false;
	      }

	      if (hour === endHour && m.minute() > end.minute()) {
	        return false;
	      }

	      return true;
	    }

	    return false;
	  });
	  return tzs;
	};

	var whereIts_1 = whereIts;

	var _version = '6.0.1';

	var main$1 = function main(input, tz, options) {
	  return new spacetime(input, tz, options);
	}; //some helper functions on the main method


	main$1.now = function (tz, options) {
	  return new spacetime(new Date().getTime(), tz, options);
	};

	main$1.today = function (tz, options) {
	  var s = new spacetime(new Date().getTime(), tz, options);
	  return s.startOf('day');
	};

	main$1.tomorrow = function (tz, options) {
	  var s = new spacetime(new Date().getTime(), tz, options);
	  return s.add(1, 'day').startOf('day');
	};

	main$1.yesterday = function (tz, options) {
	  var s = new spacetime(new Date().getTime(), tz, options);
	  return s.subtract(1, 'day').startOf('day');
	};

	main$1.extend = function (obj) {
	  Object.keys(obj).forEach(function (k) {
	    spacetime.prototype[k] = obj[k];
	  });
	  return this;
	}; //find tz by time


	main$1.whereIts = whereIts_1;
	main$1.version = _version; //aliases:

	main$1.plugin = main$1.extend;
	var src = main$1;

	return src;

}));


},{}],14:[function(_dereq_,module,exports){
const fitAspect = _dereq_('fit-aspect-ratio')
const htm = _dereq_('htm')
const vhtml = _dereq_('vhtml')
const methods = _dereq_('./methods')
const clipShapes = _dereq_('./_clip')
const YScale = _dereq_('./scales/YScale')
const XScale = _dereq_('./scales/Scale')
const XAxis = _dereq_('./axis/XAxis')
const YAxis = _dereq_('./axis/YAxis')

const Shape = _dereq_('./shapes/Shape')
const Area = _dereq_('./shapes/Area')
const Rect = _dereq_('./shapes/Rect')
const Line = _dereq_('./shapes/Line')
const Text = _dereq_('./shapes/Text')
const Dot = _dereq_('./shapes/Dot')
const Annotation = _dereq_('./shapes/Annotation')
const MidArea = _dereq_('./shapes/MidArea')
const Bar = _dereq_('./shapes/Bar')
const Image = _dereq_('./shapes/Image')
const Arrow = _dereq_('./shapes/Arrow')
const Now = _dereq_('./shapes/Now')
const Title = _dereq_('./shapes/Title')

class World {
  constructor(obj = {}) {
    this.width = 100
    this.height = 100
    obj.aspect = obj.aspect || 'widescreen'
    if (obj.aspect) {
      this.aspect = obj.aspect
      let res = fitAspect({
        aspect: obj.aspect,
        width: 100
      })
      this.width = res.width || 100
      this.height = res.height || 100
    }
    this.shapes = []
    //give the points a little bit of space.
    this.wiggle_room = 1.05
    this.x = new XScale(obj, this)
    this.y = new YScale(obj, this)
    this.xAxis = new XAxis({}, this)
    this.yAxis = new YAxis({}, this)
    this.html = htm.bind(vhtml)
    this.inputs = []
    this.state = {}
    this.state.time = Date.now()
    this._title = ''
    this.el = obj.el || null
    if (typeof this.el === 'string') {
      this.el = document.querySelector(this.el)
    }
  }
  bind(fn) {
    this.html = htm.bind(fn)
  }
  line(obj) {
    let line = new Line(obj, this)
    this.shapes.push(line)
    return line
  }
  dot(obj) {
    let dot = new Dot(obj, this)
    this.shapes.push(dot)
    return dot
  }
  text(obj) {
    let text = new Text(obj, this)
    this.shapes.push(text)
    return text
  }
  area(obj) {
    let shape = new Area(obj, this)
    this.shapes.push(shape)
    return shape
  }
  midArea(obj) {
    let shape = new MidArea(obj, this)
    this.shapes.push(shape)
    return shape
  }
  rect(obj) {
    let shape = new Rect(obj, this)
    this.shapes.push(shape)
    return shape
  }
  bar(obj) {
    let shape = new Bar(obj, this)
    this.shapes.push(shape)
    return shape
  }
  annotation(obj) {
    let shape = new Annotation(obj, this)
    this.shapes.push(shape)
    return shape
  }
  image(obj) {
    let shape = new Image(obj, this)
    this.shapes.push(shape)
    return shape
  }
  arrow(obj) {
    let shape = new Arrow(obj, this)
    this.shapes.push(shape)
    return shape
  }
  now(obj) {
    let shape = new Now(obj, this)
    this.shapes.push(shape)
    return shape
  }
  title(obj) {
    let shape = new Title(obj, this)
    this.shapes.push(shape)
    return shape
  }
  shape(obj) {
    let shape = new Shape(obj, this)
    this.shapes.push(shape)
    return shape
  }
  getShape(id) {
    return this.shapes.find(shape => shape.id === id || shape._id === id)
  }
  redraw() {
    if (this.el) {
      this.el.innerHTML = this.build()
    } else {
      console.log('must define world html element')
    }
  }
  breakpoints() {
    return this.html`<style scoped>
      .somehow-legible {
        font-size: 2px;
      }
      @media (max-width: 600px) {
        .somehow-legible {
          font-size: 4px;
        }
      }
      }
    </style>`
  }
  clip() {
    this.x.clip()
    this.y.clip()
    return this
  }
  build() {
    let h = this.html
    let shapes = this.shapes.sort((a, b) => (a._order > b._order ? 1 : -1))
    //remove shapes outside of max/mins
    shapes = clipShapes(shapes, this.x, this.y)
    let elements = []
    if (this.xAxis) {
      elements.push(this.xAxis.build())
    }
    if (this.yAxis) {
      elements.push(this.yAxis.build())
    }
    elements = elements.concat(shapes.map(shape => shape.build()))
    let attrs = {
      // width: this.width,
      // height: this.height,
      viewBox: `0,0,${this.width},${this.height}`,
      preserveAspectRatio: 'xMidYMid meet',
      style: 'overflow:visible; margin: 10px 20px 25px 25px;' // border:1px solid lightgrey;
    }
    return h`<svg ...${attrs}>
      ${this.breakpoints()}
      ${elements}
    </svg>`
  }
}
Object.keys(methods).forEach(k => {
  World.prototype[k] = methods[k]
})
const aliases = {
  plusminus: 'plusMinus'
}
Object.keys(aliases).forEach(k => {
  World.prototype[k] = methods[aliases[k]]
})
module.exports = World

},{"./_clip":15,"./axis/XAxis":18,"./axis/YAxis":19,"./methods":24,"./scales/Scale":26,"./scales/YScale":27,"./shapes/Annotation":29,"./shapes/Area":30,"./shapes/Arrow":31,"./shapes/Bar":32,"./shapes/Dot":33,"./shapes/Image":34,"./shapes/Line":35,"./shapes/MidArea":36,"./shapes/Now":37,"./shapes/Rect":38,"./shapes/Shape":39,"./shapes/Text":40,"./shapes/Title":41,"fit-aspect-ratio":8,"htm":9,"vhtml":49}],15:[function(_dereq_,module,exports){
//remove shapes outside of boundaries
const clipShapes = function(shapes, xScale, yScale) {
  shapes = shapes.filter(s => {
    //ignore
    if (s.ignore_clip === true) {
      return true
    }
    let { x, y } = s.extent()
    //clip according to x-axis
    if (xScale._clip) {
      //support reversed min/max values
      let min = xScale.min
      let max = xScale.max
      if (min > max) {
        let tmp = min
        min = max
        max = tmp
      }
      if (x.min < min) {
        return false
      }
      if (x.max > max) {
        return false
      }
      if (x.min > max || x.max < min) {
        return false
      }
    }
    if (yScale._clip) {
      //support reversed min/max values
      let min = yScale.min
      let max = yScale.max
      if (min > max) {
        let tmp = min
        min = max
        max = tmp
      }
      if (y.min < min) {
        return false
      }
      if (y.max > max) {
        return false
      }
      if (y.min > max || y.max < min) {
        return false
      }
    }
    return true
  })

  return shapes
}
module.exports = clipShapes

},{}],16:[function(_dereq_,module,exports){
const extent = function(arr) {
  let min = null
  let max = null
  arr.forEach(a => {
    if (min === null || a < min) {
      min = a
    }
    if (max === null || a > max) {
      max = a
    }
  })
  return {
    min: min,
    max: max
  }
}

/* eslint no-bitwise: 0 */
//may need to change when the term really-transforms? not sure.
const uid = str => {
  let nums = ''
  for (let i = 0; i < 5; i++) {
    nums += parseInt(Math.random() * 9, 10)
  }
  return str + '-' + nums
}

module.exports = {
  extent: extent,
  uid: uid
}

},{}],17:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color')
const ticks = _dereq_('./_ticks')
const drawTick = _dereq_('./_custom')

const defaults = {
  stroke: '#d7d5d2',
  'stroke-width': 1,
  'vector-effect': 'non-scaling-stroke'
}

class Axis {
  constructor(obj = {}, world) {
    this.world = world
    this.attrs = Object.assign({}, defaults, obj)
    this.scale = null
    this._tickCount = 6
    this._fmt = undefined
    this._given = undefined
    this._show = true
    this._label = ''
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    return this
  }
  label(str) {
    this._label = str
    return this
  }
  remove() {
    this._show = false
    return this
  }
  format(str) {
    this._fmt = str
    return this
  }
  show() {
    this._show = true
    return this
  }
  ticks(n) {
    if (typeof n === 'number') {
      this._tickCount = n
    } else if (typeof n === 'object') {
      this._given = n
    }
    if (this._given) {
      return this._given.map(o => drawTick(o, this))
    }
    if (this.scale.format() === 'date') {
      return ticks.date(this, this._tickCount)
    }
    return ticks.generic(this, this._tickCount)
  }
}
module.exports = Axis

},{"./_custom":20,"./_ticks":22,"spencer-color":48}],18:[function(_dereq_,module,exports){
const Axis = _dereq_('./Axis')

class XAxis extends Axis {
  constructor(obj = {}, world) {
    super(obj, world)
    this.scale = world.x
  }
  drawTicks(y) {
    let h = this.world.html
    return this.ticks().map(o => {
      return h`<text x="${o.value * 100 + '%'}" y="${y + 3}" fill="${
        this.attrs.stroke
      }" text-anchor="middle" class="somehow-legible">
        ${o.label}
      </text>`
    })
  }
  build() {
    let h = this.world.html
    if (this._show === false) {
      return ''
    }
    let attrs = this.attrs
    let width = this.world.width
    let y = this.world.height
    let ticks = this.drawTicks(y)
    let textAttrs = {
      x: '50%',
      y: '115%',
      fill: this.attrs.stroke,
      style: 'text-anchor:middle;'
    }
    return h`<g>
      ${ticks}
      <line x1="${0}" y1="${y}" x2="${width}" y2="${y}" ...${attrs} stroke="#d7d5d2" />
      <text ...${textAttrs}>
        ${this._label}
      </text>
    </g>`
  }
}
module.exports = XAxis

},{"./Axis":17}],19:[function(_dereq_,module,exports){
const Axis = _dereq_('./Axis')

class YAxis extends Axis {
  constructor(obj = {}, world) {
    super(obj, world)
    this.scale = world.y
  }
  drawTicks(x) {
    let h = this.world.html
    return this.ticks().map(o => {
      let percent = o.value * 100
      percent = 100 - percent
      return h`<text x="${x}" y="${percent + '%'}" dy="0" dx="-2px" fill="${
        this.attrs.stroke
      }" text-anchor="end" class="somehow-legible">
        ${o.label}
      </text>`
    })
  }
  build() {
    let h = this.world.html
    if (this._show === false) {
      return ''
    }
    let attrs = this.attrs
    let height = this.world.height
    let x = 0
    let ticks = this.drawTicks(x)
    let textAttrs = {
      x: '-5%',
      y: '50%',
      fill: this.attrs.stroke,
      style: 'text-anchor:end;'
    }
    return h`<g>
      ${ticks}
      <line x1="${x}" y1="${0}" x2="${x}" y2="${height}" ...${attrs}/>
      <text ...${textAttrs}>
        ${this._label}
      </text>
    </g>`
  }
}
module.exports = YAxis

},{"./Axis":17}],20:[function(_dereq_,module,exports){
const spacetime = _dereq_('spacetime')
const prettyNum = _dereq_('./_prettyNum')

const drawTick = function(s, axis) {
  let scale = axis.scale.scale
  let label = null
  //support {label, value} format
  if (typeof s === 'object' && s !== null) {
    label = s.label
    s = s.value
  }
  //support 'june 5th'
  if (typeof s === 'string') {
    s = spacetime(s)
    return {
      num: s.epoch, //val
      pos: parseInt(scale(s.epoch), 10), //x/y
      label: label || s.format(axis._fmt || '{month} {year}') //text
    }
  }
  //support '52'
  let num = Number(s)
  return {
    num: num,
    pos: parseInt(scale(num), 10),
    label: label || prettyNum(num)
  }
}
module.exports = drawTick

},{"./_prettyNum":21,"spacetime":13}],21:[function(_dereq_,module,exports){
const bil = 1000000000
const mil = 1000000
const tenThou = 10000
const thou = 1000

const prettyNum = function(num) {
  num = parseFloat(num)
  if (num >= bil) {
    num = parseInt(num / 100000000, 10) * 100000000
    return num / mil + 'b'
  }
  if (num >= mil) {
    num = parseInt(num / 100000, 10) * 100000
    return num / mil + 'm'
  }
  if (num >= tenThou) {
    num = parseInt(num / thou, 10) * thou
    return num / thou + 'k'
  }
  if (num >= thou) {
    num = parseInt(num / 100, 10) * 100
    return num / thou + 'k'
  }
  return num.toLocaleString()
}
module.exports = prettyNum

},{}],22:[function(_dereq_,module,exports){
const spacetimeTicks = _dereq_('spacetime-ticks')
const somehowTicks = _dereq_('somehow-ticks')

const generic = function(axis, n = 5) {
  let scale = axis.scale
  let start = scale.min || 0
  let end = scale.max || 0
  let ticks = somehowTicks(start, end, n)
  return ticks
}

const date = function(axis, n = 5) {
  let scale = axis.scale
  let start = scale.min || 0
  let end = scale.max || 0
  let ticks = spacetimeTicks(start, end, n)
  return ticks
}
module.exports = {
  generic: generic,
  date: date
}

},{"somehow-ticks":11,"spacetime-ticks":45}],23:[function(_dereq_,module,exports){
const World = _dereq_('./World')
const version = _dereq_('../_version')

// ...people call this a 'factory'
const somehow = function(obj) {
  return new World(obj)
}
somehow.version = version
module.exports = somehow

},{"../_version":12,"./World":14}],24:[function(_dereq_,module,exports){
const { parseX, parseY } = _dereq_('./parse')
const fns = _dereq_('./_fns')

const has = function(x) {
  return x !== undefined && x !== null
}

let methods = {
  //add new minimums
  from: function(x, y) {
    if (has(x) === true) {
      x = parseX(x, this)

      this.x.min = x
      this.x.rescale()
    }
    if (has(y) === true) {
      y = parseY(y, this).value
      this.y.min = y
      this.y.rescale()
    }
    return this
  },

  //add new maximums
  to: function(x, y) {
    if (has(x) === true) {
      x = parseX(x, this).value
      this.c.max = x
      this.c.rescale()
    }
    if (has(y) === true) {
      y = parseX(y, this).value
      this.y.max = y
      this.y.rescale()
    }
    return this
  },

  fitX: function(x) {
    let arr = this.shapes.map(s => s.extent()).filter(n => n !== null)
    let minX = fns.extent(arr.map(o => o.x.min).filter(n => n !== null)).min || 0
    let maxX = fns.extent(arr.map(o => o.x.max).filter(n => n !== null)).max || 0
    //keep graphs from 0, if you can...
    this.x.min = minX > 0 ? 0 : minX
    this.x.max = maxX
    if (this.x.format() === 'date') {
      this.x.min = minX
      this.x.max = maxX
    }
    this.x.rescale()
    if (has(x) === true) {
      x = parseX(x, this).value
      if (x > this.x.max) {
        this.x.max = x
      } else if (x < this.x.min) {
        this.x.min = x
      }
      this.x.rescale()
    }
    return this
  },
  fitY: function(y) {
    let arr = this.shapes.map(s => s.extent()).filter(n => n !== null)
    let minY = fns.extent(arr.map(o => o.y.min).filter(n => n !== null)).min || 0
    let maxY = fns.extent(arr.map(o => o.y.max).filter(n => n !== null)).max || 0
    this.y.min = minY > 0 ? 0 : minY
    this.y.max = maxY
    if (this.y.format() === 'date') {
      this.y.min = minY
      this.y.max = maxY
    }
    this.y.rescale()
    if (has(y) === true) {
      y = parseY(y, this).value
      if (y > this.y.max) {
        this.y.max = y
      } else if (y < this.y.min) {
        this.y.min = y
      }
      this.y.rescale()
    }
    return this
  },

  fit: function(x, y) {
    this.fitX(x)
    this.fitY(y)
    return this
  }
}
module.exports = methods

},{"./_fns":16,"./parse":25}],25:[function(_dereq_,module,exports){
const spacetime = _dereq_('spacetime')
//
const parse = function(str) {
  if (typeof str === 'number') {
    return {
      type: 'number',
      value: str
    }
  }
  //support pixels
  if (/[0-9]px$/.test(str)) {
    return {
      type: 'pixel',
      value: Number(str.replace(/px/, ''))
    }
  }
  //support percentages
  if (/[0-9]%$/.test(str)) {
    let num = Number(str.replace(/%/, ''))
    return {
      type: 'percent',
      value: num
    }
  }
  //try a straight-up number
  let num = Number(str)
  if (!isNaN(num)) {
    return {
      type: 'number',
      value: num
    }
  }
  //try a date
  let s = spacetime(str)
  if (s.isValid()) {
    return {
      type: 'date',
      value: s.epoch
    }
  }
  console.warn("Counldn't parse: " + str)
  return {
    type: 'unknown',
    value: null
  }
}

const parseX = function(str, world) {
  let res = parse(str)
  if (res.type === 'date') {
    world.x.format(res.type)
  }
  return res
}

const parseY = function(str, world) {
  let res = parse(str)
  if (res.type === 'date') {
    world.y.format(res.type)
  }
  return res
}

module.exports = {
  parseX: parseX,
  parseY: parseY
}

},{"spacetime":13}],26:[function(_dereq_,module,exports){
// const scaleLinear = require('d3-scale').scaleLinear
const scaleLinear = _dereq_('./_linear')
const { parseX } = _dereq_('../parse')

const has = function(x) {
  return x !== undefined && x !== null
}

class Scale {
  constructor(data, world) {
    this.world = world
    this.min = 0
    this.max = 1

    this.from = 0
    this.to = world.width

    this._format = 'number'
    this.parse = parseX
    this.is_y = false
    this._clip = false
    this.rescale()
  }
  rescale() {
    this.scale = scaleLinear({
      world: [this.from, this.to],
      minmax: [this.min, this.max]
    })
    return this
  }
  fit(a, b) {
    if (has(a) === false && has(b) === false) {
      if (this.is_y) {
        this.world.fitY()
      } else {
        this.world.fitX()
      }
      this.rescale()
      return this
    }
    if (has(a) === true) {
      let num = this.parse(a, this.world).value
      this.min = num
    }
    if (has(b) === true) {
      let num = this.parse(b, this.world).value
      this.max = num
    }
    this.rescale()
    return this
  }
  place(obj) {
    //from=top
    //to=bottom
    if (obj.type === 'pixel') {
      if (this.is_y) {
        return this.to - obj.value //flip grid
      }
      return obj.value
    }
    if (obj.type === 'percent') {
      let num = this.byPercent(obj.value)
      let val = this.scale.backward(num)
      if (this.is_y) {
        console.log(num, val)
        return this.to - val
      }
      return val
    }
    return this.scale(obj.value)
  }
  byPercent(num = 0) {
    num = num / 100
    let diff = this.max - this.min
    return diff * num + this.min
  }
  format(format) {
    if (format === undefined) {
      return this._format
    }
    this._format = format
    return this
  }
  clip(bool) {
    if (bool === undefined) {
      bool = true
    }
    this._clip = bool
  }
  reverse() {
    let tmp = this.min
    this.min = this.max
    this.max = tmp
    this.rescale()
    return tmp
  }
}

module.exports = Scale

},{"../parse":25,"./_linear":28}],27:[function(_dereq_,module,exports){
const Scale = _dereq_('./Scale')
const scaleLinear = _dereq_('./_linear')
// const scaleLinear = require('d3-scale').scaleLinear
const { parseY } = _dereq_('../parse')

class YScale extends Scale {
  constructor(data, world) {
    super(data, world)
    //use height instead of width
    this.to = world.height
    this.is_y = true
    this.parse = parseY
    this.rescale()
  }
  rescale() {
    this.scale = scaleLinear({
      world: [this.from, this.to],
      minmax: [this.max, this.min]
    })
  }
}
module.exports = YScale

},{"../parse":25,"./Scale":26,"./_linear":28}],28:[function(_dereq_,module,exports){
//a very-tiny version of d3-scale's scaleLinear
const scaleLinear = function(obj) {
  let world = obj.world || []
  let minmax = obj.minmax || []
  const calc = num => {
    let range = minmax[1] - minmax[0]
    let percent = (num - minmax[0]) / range
    let size = world[1] - world[0]
    return parseInt(size * percent, 10)
  }
  // invert the calculation. return a %?
  calc.backward = num => {
    let size = world[1] - world[0]
    let range = minmax[1] - minmax[0]
    let percent = (num - world[0]) / size
    return parseInt(percent * range, 10)
  }
  return calc
}
module.exports = scaleLinear

// let scale = scaleLinear({
//   world: [0, 300],
//   minmax: [0, 100]
// })
// console.log(scale(50))
// console.log(scale.backward(150))

},{}],29:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const Text = _dereq_('./Text')

const defaults = {
  'text-anchor': 'start',
  'font-size': 5,
  class: 'somehow-legible'
}

class Annotation extends Text {
  constructor(obj = {}, world) {
    super(obj, world)
    this.attrs = Object.assign({}, defaults, this.attrs)
    this._nudge = {
      x: 0,
      y: 0
    }
    this._title = ''
  }
  on(x, y) {
    this.at(x, y)
    return this
  }
  title(txt) {
    this._title = txt
    return this
  }
  nudge(x, y) {
    //always in pixels
    this._nudge.x = x
    this._nudge.y = y
    return this
  }
  drawText() {
    let h = this.world.html
    let nudge = this._nudge
    let textArr = this.textLines
    if (this.textFn !== null) {
      textArr = this.textFn(this.world)
      textArr = typeof textArr === 'string' ? [textArr] : textArr
    }
    let inside = textArr.map(str => h`<tspan x="0" dy="1.2em">${String(str)}</tspan>`)
    let point = this.position()
    let estimate = this.estimate()
    let place = {
      x: point.x + nudge.x,
      y: point.y - nudge.y //- estimate.height,
    }
    let transform = `translate(${place.x} ${place.y})`
    return h`<g transform="${transform}" style="${this.drawSyle()}">
      <text ...${this.attrs}>
        ${inside}
      </text>
      <line x1="${-2}" y1="${estimate.height}" x2="${estimate.width}" y2="${
      estimate.height
    }" style="stroke-width:1.5px; shapeRendering:optimizeQuality; vector-effect: non-scaling-stroke;"  stroke=${
      colors.grey
    }/>
    </g>`
  }
  drawRange() {
    let h = this.world.html
    let points = this.points()
    if (points.length <= 1) {
      return null
    }
    let size = 4
    let style =
      'stroke-width:2px; shapeRendering:optimizeQuality; vector-effect: non-scaling-stroke;'
    let top = points[0]
    let bottom = points[1]
    //for a vertical range...
    let ticks = h`<g>
      <line x1="${top[0] - size}" y1="${top[1]}" x2="${top[0] + size}" y2="${
      top[1]
    }" style="${style}" stroke=${colors.grey}/>
      <line x1="${bottom[0] - size}" y1="${bottom[1]}" x2="${bottom[0] + size}" y2="${
      bottom[1]
    }" style="${style}" stroke=${colors.grey}/>
    </g>
    `
    //for a horizontal range
    if (top[0] !== bottom[0]) {
      ticks = h`<g>
        <line x1="${top[0]}" y1="${top[1] - size}" x2="${top[0]}" y2="${top[1] +
        size}" style="${style}" stroke=${colors.grey}/>
        <line x1="${bottom[0]}" y1="${bottom[1] - size}" x2="${bottom[0]}" y2="${bottom[1] +
        size}" style="${style}" stroke=${colors.grey}/>
      </g>
      `
    }
    return h`<g>
      <line x1="${top[0]}" y1="${top[1]}" x2="${bottom[0]}" y2="${
      bottom[1]
    }" style="${style}" stroke=${colors.grey}/>
      ${ticks}
    </g>`
  }
  getPoint() {
    let points = this.points()
    if (points.length <= 1) {
      return points[0]
    }
    //the middle point?
    let xDiff = points[0][0] - points[1][0]
    let yDiff = points[0][1] - points[1][1]
    return [points[0][0] - xDiff / 2, points[0][1] - yDiff / 2]
  }
  drawLine() {
    let h = this.world.html
    let nudge = this._nudge
    let point = this.getPoint()
    let start = this.points()[0]
    let textPoint = {
      x: start[0] + nudge.x,
      y: start[1] - nudge.y + 4
    }
    //touch the right side, instead
    if (nudge.x < 0) {
      let estimate = this.estimate()
      textPoint.x += estimate.width
    }
    return h`<line id="line" x1="${textPoint.x}" y1="${textPoint.y}" x2="${point[0]}" y2="${
      point[1]
    }" style="stroke-width:2px; shapeRendering:optimizeQuality;" vector-effect="non-scaling-stroke" stroke=${
      colors.grey
    }/>`
  }
  build() {
    let h = this.world.html
    this.onMount()
    return h`<g id="build">
      ${this.drawText()}
      ${this.drawLine()}
      ${this.drawRange()}
    </g>`
  }
}
module.exports = Annotation

},{"./Text":40,"spencer-color":48}],30:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const Shape = _dereq_('./Shape')
const d3Shape = _dereq_('d3-shape')
const { parseY } = _dereq_('../parse')

const defaults = {
  fill: colors.green,
  stroke: colors.green,
  'fill-opacity': 0.25,
  'stroke-width': 2
}

class Area extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._line = 2
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    this.attrs.fill = colors[color] || color
    return this
  }
  line(num) {
    this._line = num
  }
  opacity(n) {
    this.attrs['fill-opacity'] = n
    return this
  }
  areaPath() {
    let points = this.points()
    //support non-zero bottom
    if (points[0] && points[0].length === 3) {
      return d3Shape
        .area()
        .x(d => d[0])
        .y(d => d[1])
        .y1(d => d[2])
        .curve(this.curve)(points)
    }
    let zero = this.world.y.place(parseY(0))
    return d3Shape
      .area()
      .x0(d => d[0])
      .y0(d => d[1])
      .y1(zero)
      .curve(this.curve)(points)
  }
  linePath() {
    let points = this.points()
    //support non-zero bottom
    if (points[0] && points[0].length === 3) {
      return d3Shape
        .area()
        .x(d => d[0])
        .y(d => d[1])
        .y1(d => d[2])
        .curve(this.curve)(points)
    }
    return d3Shape
      .area()
      .x(d => d[0])
      .y(d => d[1])
      .curve(this.curve)(points)
  }
  build() {
    let h = this.world.html
    this.onMount()
    let areaAttr = Object.assign({}, this.attrs, {
      d: this.areaPath(),
      stroke: 'none'
    })
    //draw an area, and a line on top
    let area = h`<path ...${areaAttr} style="${this.drawSyle()}"/>`
    if (!this._line) {
      return area
    }
    //draw a line on top
    let lineAttr = Object.assign({}, this.attrs, {
      d: this.linePath(),
      fill: 'none'
    })
    let line = h`<path ...${lineAttr} style="${this.drawSyle()}">
        <title>${this._title}</title>
      </path>`
    return [line, area]
  }
}

module.exports = Area

},{"../parse":25,"./Shape":39,"d3-shape":7,"spencer-color":48}],31:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const d3Shape = _dereq_('d3-shape')
const Shape = _dereq_('./Shape')

const defaults = {
  fill: 'none',
  stroke: colors.grey,
  'stroke-width': 3,
  'stroke-linecap': 'round',
  'shape-rendering': 'optimizeQuality'
}

class Arrow extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._length = 35
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    return this
  }
  from(x, y) {
    this.set([this._data[0], [x, y]])
  }
  length(num) {
    this._length = num
    return this
  }
  width(num) {
    this.attrs['stroke-width'] = num
    return this
  }
  path() {
    let points = this.points()
    return d3Shape
      .line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(this.curve)(points)
  }
  getLength(start, end) {
    let x = start[0] - end[0]
    let y = start[1] - end[1]
    let h = Math.pow(x, 2) + Math.pow(y, 2) //x^2 + y^2 = h^2
    h = Math.sqrt(h)
    return h
  }
  getAngle(start, end) {
    let p1 = {
      x: start[0],
      y: start[1]
    }
    let p2 = {
      x: end[0],
      y: end[1]
    }
    var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x)
    return angleRadians
  }
  head(start, end) {
    let h = this.world.html
    let radian = this.getAngle(start, end)
    let leftAngle = radian - Math.PI / 4
    let rightAngle = radian + Math.PI / 4
    let length = this.getLength(start, end)
    length = length * 0.2
    //---soh cah toa--
    let left = {
      opp: Math.sin(leftAngle) * length,
      adj: Math.cos(leftAngle) * length
    }
    let right = {
      opp: Math.sin(rightAngle) * length,
      adj: Math.cos(rightAngle) * length
    }
    return h`<g>
      <line x1=${start[0]} y1=${start[1]} x2=${start[0] + left.adj} y2=${start[1] + left.opp} ...${
      this.attrs
    }/>
      <line x1=${start[0]} y1=${start[1]} x2=${start[0] + right.adj} y2=${start[1] +
      right.opp} ...${this.attrs}/>
    </g>`
  }
  build() {
    let h = this.world.html
    this.onMount()
    let points = this.points()
    let start = points[0]
    let end = points[1]
    if (!end) {
      end = [start[0] - this._length, start[1]]
    }
    return h`<g>
      <line x1=${start[0]} y1=${start[1]} x2=${end[0]} y2=${end[1]} ...${this.attrs}/>
      ${this.head(start, end)}
    </g>`
  }
}

module.exports = Arrow

},{"./Shape":39,"d3-shape":7,"spencer-color":48}],32:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const Rect = _dereq_('./Rect')
const { parseX, parseY } = _dereq_('../parse')

const defaults = {
  fill: colors.green,
  stroke: colors.green,
  'fill-opacity': 1,
  'stroke-width': 1
}

class Bar extends Rect {
  constructor(obj, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._rounded = 1
    this._width = 5
    this._zero = 0
  }
  width(w) {
    this._width = w
    return this
  }
  //point that it flips on
  zero(w) {
    this._zero = w
    return this
  }
  opacity(n) {
    this.attrs['fill-opacity'] = n
    return this
  }
  at(x, y) {
    this.data = [
      {
        x: parseX(x, this.world),
        y: parseY(0, this.world)
      },
      {
        x: parseX(x, this.world),
        y: parseY(y, this.world)
      }
    ]
    return this
  }
  build() {
    let h = this.world.html
    this.onMount()
    let points = this.points()
    let bottom = points[0][1]
    if (points[0][1] > points[1][1]) {
      bottom = points[1][1]
    }
    let height = Math.abs(points[1][1] - points[0][1])
    let attrs = Object.assign({}, this.attrs, {
      x: points[0][0],
      y: bottom,
      width: this._width,
      height: height,
      rx: this._rounded,
      title: this._title
    })
    return h`<rect ...${attrs} >
        <title>${this._title}</title>
      </rect>`
  }
}
module.exports = Bar

},{"../parse":25,"./Rect":38,"spencer-color":48}],33:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const Shape = _dereq_('./Shape')

const defaults = {
  fill: colors.blue,
  stroke: 'none'
}

class Dot extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._radius = obj.radius || 5
  }
  radius(r) {
    this._radius = r
    return this
  }
  build() {
    let h = this.world.html
    this.onMount()
    let point = this.points()[0]
    let attrs = Object.assign({}, this.attrs, {
      id: this._id,
      cx: point[0],
      cy: point[1],
      r: this._radius
    })
    return h`<circle ...${attrs} ><title>${this._title}</title></circle>`
  }
}

module.exports = Dot

},{"./Shape":39,"spencer-color":48}],34:[function(_dereq_,module,exports){
const Shape = _dereq_('./Shape')
const colors = _dereq_('spencer-color').colors

class Image extends Shape {
  constructor(obj, world) {
    super(obj, world)
    this._src = ''
    this._width = 100
    this._height = 200
    this._caption = ''
  }
  src(src) {
    this._src = src
    return this
  }
  caption(txt) {
    this._caption = txt
    return this
  }
  size(w, h) {
    this._width = w
    this._height = h
    return this
  }
  width(w) {
    this._width = w
    return this
  }
  height(h) {
    this._height = h
    return this
  }
  build() {
    let h = this.world.html
    this.onMount()
    let point = this.points()[0]
    if (!point) {
      point = [0, 0]
    }
    let caption = ''
    if (this._caption) {
      let y = point[1] + this._height + 15
      caption = h`<text x="${point[0]}" y="${y}" stroke="none" fill="${colors.grey}">${
        this._caption
      }</text>`
    }
    return h`<g>
      <image xlink:href="${this._src}" x="${point[0]}" y="${point[1]}" height="${
      this._width
    }" width="${this._height}" />
      ${caption}
    </g>
    `
    //preserveAspectRatio="slice"
  }
}
module.exports = Image

},{"./Shape":39,"spencer-color":48}],35:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const d3Shape = _dereq_('d3-shape')
const Shape = _dereq_('./Shape')

const defaults = {
  fill: 'none',
  stroke: colors.blue,
  'stroke-width': 4,
  'stroke-linecap': 'round'
}

class Line extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    return this
  }
  dotted(n) {
    if (n === true) {
      n = 4
    }
    this.attrs['stroke-dasharray'] = n || 4
    return this
  }
  width(num) {
    this.attrs['stroke-width'] = num
    return this
  }
  path() {
    let points = this.points()
    return d3Shape
      .line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(this.curve)(points)
  }
}

module.exports = Line

},{"./Shape":39,"d3-shape":7,"spencer-color":48}],36:[function(_dereq_,module,exports){
const Area = _dereq_('./Area')
const { parseY } = _dereq_('../parse')
const parseInput = _dereq_('./lib/parseInput')
const d3Shape = _dereq_('d3-shape')

class Midarea extends Area {
  constructor(obj, world) {
    super(obj, world)
    this._zero = this.world.y.place(parseY(0))
  }
  zero(y) {
    this._zero = y
  }
  opacity(n) {
    this.attrs['fill-opacity'] = n
    return this
  }
  set(str) {
    this.data = parseInput(str, this.world)
    //add the bottom part, to data
    this.data.forEach(o => {
      o.y.value /= 2
      o.y2 = Object.assign({}, o.y)
      o.y2.value *= -1
    })
    return this
  }
  topLine(points) {
    return d3Shape
      .line()
      .x(d => d[0])
      .y(d => d[1])
      .curve(this.curve)(points)
  }
  bottomLine(points) {
    return d3Shape
      .line()
      .x(d => d[0])
      .y(d => d[2])
      .curve(this.curve)(points)
  }
  build() {
    let h = this.world.html
    this.onMount()
    let areaAttr = Object.assign({}, this.attrs, {
      d: this.areaPath(),
      stroke: 'none'
    })
    //draw an area, and a line on top
    let area = h`<path ...${areaAttr} style="${this.drawSyle()}">
      <title>${this._title}</title>
    </path>`
    if (!this._line) {
      return area
    }
    let points = this.points()

    //draw a line on top
    let topLine = Object.assign({}, this.attrs, {
      d: this.topLine(points),
      fill: 'none'
    })
    topLine = h`<path ...${topLine} style="${this.drawSyle()}"/>`

    //draw a line on the bottom
    let bottomLine = Object.assign({}, this.attrs, {
      d: this.bottomLine(points),
      fill: 'none'
    })
    bottomLine = h`<path ...${bottomLine} style="${this.drawSyle()}"/>`
    return [topLine, area, bottomLine]
  }
}
module.exports = Midarea

},{"../parse":25,"./Area":30,"./lib/parseInput":42,"d3-shape":7}],37:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const Line = _dereq_('./Line')

const defaults = {
  fill: 'none',
  stroke: colors.lighter,
  'stroke-width': 2,
  'stroke-linecap': 'round'
}

class Now extends Line {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._label = ''
    this._y = '-5%'
    this.dotted(true)
    let d = Date.now()
    this.set([[d, '0%'], [d, '100%']])
  }
  label(str) {
    this._label = str
    return this
  }
  top() {
    this._y = '-5%'
  }
  bottom() {
    this._y = '105%'
  }
  build() {
    let h = this.world.html
    this.onMount()
    let attrs = Object.assign({}, this.attrs, {
      d: this.path()
    })
    let point = this.points()[0]
    let textAttrs = {
      x: point[0],
      y: this._y,
      fill: this.attrs.stroke,
      style: 'text-anchor:middle;'
    }
    return h`
      <g>
        <text ...${textAttrs}>
          ${this._label}
        </text>
        <path ...${attrs} id=${this._id} style="${this.drawSyle()}"/>
      </g>
    `
  }
}

module.exports = Now

},{"./Line":35,"spencer-color":48}],38:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const Shape = _dereq_('./Shape')

const defaults = {
  fill: colors.green,
  stroke: colors.green,
  'fill-opacity': 0.25,
  'stroke-width': 1
}

class Rect extends Shape {
  constructor(obj = {}, world) {
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._rounded = 3
    this._width = undefined
    this._height = undefined
  }
  color(color) {
    this.attrs.stroke = colors[color] || color
    this.attrs.fill = colors[color] || color
    return this
  }
  border(n) {
    this.attrs['stroke-width'] = n
    return this
  }
  opacity(n) {
    this.attrs['fill-opacity'] = n
    return this
  }
  width(n) {
    this._width = n
    return this
  }
  height(n) {
    this._height = n
    return this
  }
  rounded(r) {
    this._rounded = r
  }
  build() {
    let h = this.world.html
    this.onMount()
    let points = this.points()
    let a = points[0]
    let b = points[1] || 0
    let width = Math.abs(b[0] - a[0])
    let height = Math.abs(b[1] - a[1])
    if (this._width !== undefined) {
      width = this._width
    }
    if (this._height !== undefined) {
      height = this._height
    }
    let attrs = Object.assign({}, this.attrs, {
      x: a[0],
      y: a[1] - height,
      width: width,
      height: height,
      rx: this._rounded
    })
    return h`<rect ...${attrs} >
      <title>${this._title}</title>
    </rect>` //<rect x="120" y="0" width="100" height="100" rx="15" ry="15" />
  }
}

module.exports = Rect

},{"./Shape":39,"spencer-color":48}],39:[function(_dereq_,module,exports){
const d3Shape = _dereq_('d3-shape')
const colors = _dereq_('spencer-color').colors
const fns = _dereq_('../_fns')
const parseInput = _dereq_('./lib/parseInput')
const { parseX, parseY } = _dereq_('../parse')

const defaults = {
  fill: colors.blue,
  stroke: 'none',
  'shape-rendering': 'optimizeQuality',
  'vector-effect': 'non-scaling-stroke'
}

class Shape {
  constructor(obj = {}, world) {
    this.world = world
    this.data = obj.data || []
    this._id = obj.id || fns.uid('input')
    this.attrs = Object.assign({}, defaults, obj)
    this.style = {}
    this.curve = d3Shape.curveMonotoneX
    this._shape = 1
    this._title = ''
    this._click = obj.click
    this._hover = obj.hover
    //nudge pixels
    this._dx = 0
    this._dy = 0
    this.ignore_clip = false
  }
  //don't clip some shapes
  clip(bool) {
    this.ignore_clip = bool
    return this
  }
  straight() {
    this.curve = d3Shape.curveLinear
    return this
  }
  id(str) {
    this._id = str
    return this
  }
  soft() {
    this.curve = d3Shape.curveBasis
    return this
  }
  dx(n) {
    this._dx = n
    return this
  }
  dy(n) {
    this._dy = n
    return this
  }
  at(x, y) {
    if ((x || x === 0) && (y || y === 0)) {
      this.set([[x, y]])
      return this
    }
    //vertical line
    if (x || x === 0) {
      this.set([[x, '0%'], [x, '100%']])
      return this
    }
    //horizontal line
    if (y || y === 0) {
      this.set([['0%', y], ['100%', y]])
    }
    return this
  }
  extent() {
    let xArr = []
    let yArr = []
    this.data.forEach(o => {
      if (o.x.type !== 'pixel') {
        xArr.push(o.x.value)
      }
      if (o.y.type !== 'pixel') {
        yArr.push(o.y.value)
      }
      if (o.y2 && o.y2.type !== 'pixel') {
        yArr.push(o.y2.value)
      }
    })
    return {
      x: fns.extent(xArr),
      y: fns.extent(yArr)
    }
  }
  color(color) {
    this.attrs.fill = colors[color] || color
    return this
  }
  opacity(n) {
    this.attrs.opacity = n
    return this
  }
  title(str) {
    this._title = str
    return this
  }
  set(str) {
    this.data = parseInput(str, this.world)
    return this
  }
  from(x, y) {
    this.data[0] = {
      x: parseX(x, this.world),
      y: parseY(y, this.world)
    }
    return this
  }
  to(x, y) {
    this.data[1] = {
      x: parseX(x, this.world),
      y: parseY(y, this.world)
    }
    return this
  }
  //set any listeners on the dom element
  onMount() {
    if (!this._click && !this._hover) {
      return
    }
    //wait for mount
    setTimeout(() => {
      let el = document.getElementById(this._id)
      if (!el) {
        return
      }
      if (this._click) {
        el.addEventListener('click', () => {
          this._click(this)
        })
      }
      if (this._hover) {
        el.addEventListener('mouseenter', () => {
          this._hover(this)
        })
      }
    }, 50)
  }
  click(fn) {
    this._click = fn
  }
  hover(fn) {
    this._hover = fn
  }
  //x,y coordinates
  points() {
    let { x, y } = this.world
    let points = this.data.map(o => {
      let arr = [x.place(o.x), y.place(o.y)]
      if (o.y2 !== undefined) {
        arr.push(y.place(o.y2))
      }
      arr[0] += this._dx
      arr[1] += this._dy
      return arr
    })
    return points
  }
  path() {
    let zero = this.world.y.place(parseY(0))
    let points = this.points()
    return d3Shape
      .area()
      .x0(d => d[0])
      .y0(d => d[1])
      .y1(zero)
      .curve(d3Shape.curveMonotoneX)(points)
  }
  drawSyle() {
    return Object.keys(this.style)
      .map(k => {
        return `${k}:${this.style[k]};`
      })
      .join(' ')
  }
  build() {
    let h = this.world.html
    this.onMount()
    let attrs = Object.assign({}, this.attrs, {
      d: this.path()
    })
    return h`<path ...${attrs} id=${this._id} style="${this.drawSyle()}"/>`
  }
}
module.exports = Shape

},{"../_fns":16,"../parse":25,"./lib/parseInput":42,"d3-shape":7,"spencer-color":48}],40:[function(_dereq_,module,exports){
const Shape = _dereq_('./Shape')
const colors = _dereq_('spencer-color').colors

const defaults = {
  fill: 'grey',
  stroke: 'none',
  'stroke-width': 1,
  'stroke-linecap': 'round',
  'font-size': 5
}

class Text extends Shape {
  constructor(obj = {}, world) {
    let text = null
    let textFn = null
    if (typeof obj === 'string') {
      text = [obj]
      obj = {}
    } else if (typeof obj === 'function') {
      textFn = obj
      obj = {}
    } else if (Array.isArray(obj)) {
      text = obj
      obj = []
    }
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this.textLines = text || obj.text || []
    this.textFn = textFn
    if (typeof this.textLines === 'string') {
      this.textLines = [this.textLines]
    }
    this._order = 0
    this.data = [
      {
        x: {
          value: 50,
          type: 'percent'
        },
        y: {
          value: 50,
          type: 'percent'
        }
      }
    ]
    this._dodge = {
      x: 0,
      y: 4
    }
    this._underline = ''
  }
  before(x, y) {
    this.attrs['text-anchor'] = 'end'
    this.set([[x, y]])
    return this
  }
  after(x, y) {
    this.attrs['text-anchor'] = 'start'
    this.set([[x, y]])
    return this
  }
  center(x, y) {
    this.attrs['text-anchor'] = 'middle'
    if (x !== undefined) {
      this.set([[x, y]])
    }
    return this
  }
  left() {
    this.attrs['text-anchor'] = 'start'
    return this
  }
  right() {
    this.attrs['text-anchor'] = 'end'
    return this
  }
  color(color) {
    this.attrs.fill = colors[color] || color
    return this
  }
  dy(n = 0) {
    this._dodge.y = n * -1
    return this
  }
  dx(n = 0) {
    this._dodge.x = n
    return this
  }
  dodge(x, y) {
    x = x || this._dodge.x
    y = y || this._dodge.y
    this._dodge.x = x * -1
    this._dodge.y = y * -1
    return this
  }
  font(num) {
    if (typeof num === 'number') {
      num += 'px'
    }
    this.style['font-size'] = num
    return this
  }
  size(num) {
    return this.font(num)
  }
  extent() {
    // let longest = this.textLines.sort((a, b) => a.length < b.length ? 1 : -1)[0] || ''
    // let width = longest.length * 8
    // let height = this.textLines.length * 20
    let d = this.data[0] || {}
    return {
      x: {
        min: d.x.value,
        max: d.x.value
      },
      y: {
        min: d.y.value, // - height,
        max: d.y.value
      }
    }
  }
  text(text) {
    if (typeof text === 'string') {
      this.textLines = [text]
    } else if (typeof text === 'function') {
      this.textLines = []
      this.textFn = text
    } else {
      this.textLines = text
    }
    return this
  }
  path() {
    return ''
  }
  estimate() {
    let textArr = this.textLines
    if (this.textFn !== null) {
      textArr = this.textFn(this.world)
      textArr = typeof textArr === 'string' ? [textArr] : textArr
    }
    //calculate height
    let height = 24
    if (this.style['font-size']) {
      let num = this.style['font-size'].replace('px', '')
      num = Number(num)
      height = num * 1.5
    }
    height *= textArr.length
    //calculate width
    let width = 0
    textArr.forEach(str => {
      let w = str.length * 8
      if (w > width) {
        width = w
      }
    })
    return {
      height: height,
      width: width
    }
  }
  position() {
    let point = this.points()[0]
    let res = {
      x: 0,
      y: 0
    }
    if (!point) {
      return res
    }
    let { height, width } = this.estimate()
    res.height = height
    res.width = width
    res.y = point[1] + this._dodge.y - height
    res.x = point[0] + 2 + this._dodge.x
    return res
  }
  build() {
    let h = this.world.html
    this.onMount()
    let textArr = this.textLines
    if (this.textFn !== null) {
      textArr = this.textFn(this.world)
      textArr = typeof textArr === 'string' ? [textArr] : textArr
    }
    let inside = textArr.map(str => h`<tspan x="0" dy="1.2em" >${String(str)}</tspan>`)
    let { x, y } = this.position()
    let transform = `translate(${x} ${y})`
    return h`<g transform="${transform}" style="${this.drawSyle()}">
      <text ...${this.attrs} class="somehow-legible">
        ${inside}
      </text>
    </g>`
  }
}

module.exports = Text

},{"./Shape":39,"spencer-color":48}],41:[function(_dereq_,module,exports){
const colors = _dereq_('spencer-color').colors
const Text = _dereq_('./Text')

const defaults = {
  stroke: 'none',
  fill: colors.grey,
  'stroke-width': 2,
  'stroke-linecap': 'round',
  'text-anchor': 'middle',
  class: 'somehow-legible'
}

class Title extends Text {
  constructor(obj = {}, world) {
    let title = ''
    if (typeof obj === 'string') {
      title = obj
      obj = {}
    }
    obj = Object.assign({}, defaults, obj)
    super(obj, world)
    this._title = title
    this._y = '-5%'
    this._x = '50%'
    this.ignore_clip = true
  }
  extent() {
    return null
  }
  label(str) {
    this._label = str
    return this
  }
  color(c) {
    this.attrs.fill = c
    return this
  }
  top() {
    this._y = '-15%'
    return this
  }
  bottom() {
    this._y = '115%'
    return this
  }
  left() {
    this._x = '15%'
    this.attrs['text-anchor'] = 'start'
    return this
  }
  right() {
    this._x = '95%'
    this.attrs['text-anchor'] = 'end'
    return this
  }
  build() {
    let h = this.world.html
    let attrs = Object.assign({}, this.attrs, {
      x: this._x,
      y: this._y
    })
    return h`<text ...${attrs}>
          ${this._title}
        </text>`
  }
}

module.exports = Title

},{"./Text":40,"spencer-color":48}],42:[function(_dereq_,module,exports){
const { parseX, parseY } = _dereq_('../../parse')

//a very-flexible input language
const parseStr = function(str = '', world) {
  let lines = str.split(/\n/g)
  lines = lines.filter(l => l)
  lines = lines.map(line => {
    let split = line.split(/(,|\t) ?/).map(s => s.trim())
    let x = parseX(split[0], world)
    let y = parseY(split[2], world)
    let obj = {
      x: x,
      y: y
    }
    //y2 is bottom of an area
    if (split[4] !== undefined) {
      obj.y2 = parseY(split[4], world)
    }
    return obj
  })
  return lines
}

const parseInput = function(set, world) {
  if (typeof set === 'string') {
    return parseStr(set, world)
  }
  return set.map(a => {
    let x = parseX(a[0], world)
    let y = parseY(a[1], world)
    let obj = {
      x: x,
      y: y
    }
    //y2 is bottom of an area
    if (a[2] !== undefined) {
      obj.y2 = parseY(a[2], world)
    }
    return obj
  })
}

module.exports = parseInput

},{"../../parse":25}],43:[function(_dereq_,module,exports){
module.exports = '0.2.0'
},{}],44:[function(_dereq_,module,exports){
const reduceTo = function(arr, n) {
  if (arr.length <= n || arr.length <= 5) {
    return arr
  }
  while (arr.length > n) {
    //remove every other one
    arr = arr.filter((o, i) => {
      return i % 2 === 0
    })
    if (arr.length <= n || arr.length <= 5) {
      return arr
    }
  }
  return arr
}
module.exports = reduceTo

},{}],45:[function(_dereq_,module,exports){
const spacetime = _dereq_('spacetime')
const methods = _dereq_('./methods')
const version = _dereq_('../_version')

const chooseMethod = function(start, end, n = 6) {
  let diff = start.diff(end)
  if (diff.years > 300) {
    return methods.centuries(start, end, n)
  }
  if (diff.years > 30) {
    return methods.decades(start, end, n)
  }
  if (diff.years > 3) {
    return methods.years(start, end, n)
  }
  if (diff.months > 3) {
    return methods.months(start, end, n)
  }
  if (diff.days > 3) {
    return methods.days(start, end, n)
  }
  if (diff.hours > 3) {
    return methods.hours(start, end, n)
  }
  if (diff.minutes > 3) {
    return methods.minutes(start, end, n)
  }
  return methods.months(start, end, n)
}

//flip it around backwards
const reverseTicks = function(ticks) {
  ticks = ticks.map(o => {
    o.value = 1 - o.value
    return o
  })
  return ticks.reverse()
}

const spacetimeTicks = function(start, end, n = 6) {
  let reverse = false
  start = spacetime(start)
  end = spacetime(end)
  //reverse them, if necessary
  if (start.epoch > end.epoch) {
    reverse = true
    let tmp = start.epoch
    start.epoch = end.epoch
    end.epoch = tmp
  }
  let ticks = chooseMethod(start, end, n)
  //support backwards ticks
  if (reverse === true) {
    ticks = reverseTicks(ticks)
  }
  return ticks
}
spacetimeTicks.version = version

module.exports = spacetimeTicks

},{"../_version":43,"./methods":46,"spacetime":47}],46:[function(_dereq_,module,exports){
const reduceTo = _dereq_('./_reduce')

//increment by this unit
const allTicks = function(start, end, unit) {
  let ticks = []
  start = start.add(1, unit)
  start = start.startOf(unit)
  while (start.isBefore(end)) {
    ticks.push(start)
    start = start.add(1, unit)
  }
  return ticks
}

const formatTicks = function(arr, fmt, start, end) {
  let delta = end.epoch - start.epoch
  return arr.map(s => {
    let percent = (s.epoch - start.epoch) / delta
    return {
      label: s.format(fmt),
      epoch: s.epoch,
      value: parseInt(percent * 1000, 10) / 1000
    }
  })
}

const methods = {
  centuries: (start, end, n) => {
    let ticks = allTicks(start, end, 'century')
    ticks = reduceTo(ticks, n)
    let fmt = '{year}'
    if (start.diff(end, 'year') > 6) {
      fmt = '{year}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  decades: (start, end, n) => {
    let ticks = allTicks(start, end, 'decade')
    ticks = reduceTo(ticks, n)
    let fmt = '{year}'
    if (start.diff(end, 'year') > 6) {
      fmt = '{year}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  years: (start, end, n) => {
    let ticks = allTicks(start, end, 'year')
    ticks = reduceTo(ticks, n)
    let fmt = '{month-short} {year-short}'
    if (start.diff(end, 'year') > 6) {
      fmt = '{year}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  months: (start, end, n) => {
    let ticks = allTicks(start, end, 'month')
    ticks = reduceTo(ticks, n)
    let fmt = '{month-short} {date}'
    if (start.isSame(end, 'year') === false) {
      fmt = '{month-short} {year}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  days: (start, end, n) => {
    let ticks = allTicks(start, end, 'day')
    ticks = reduceTo(ticks, n)
    let fmt = '{month-short} {date}'
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  hours: (start, end, n) => {
    let ticks = allTicks(start, end, 'hour')
    ticks = reduceTo(ticks, n)
    let fmt = '{time}'
    if (start.isSame(end, 'day') === false) {
      fmt = '{day-short} {hour}{ampm}'
    }
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  },
  minutes: (start, end, n) => {
    let ticks = allTicks(start, end, 'minute')
    ticks = reduceTo(ticks, n)
    let fmt = '{time}'
    ticks = formatTicks(ticks, fmt, start, end)
    return ticks
  }
}
module.exports = methods

},{"./_reduce":44}],47:[function(_dereq_,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.spacetime = factory());
}(this, function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	function getCjsExportFromNamespace (n) {
		return n && n['default'] || n;
	}

	var fns = createCommonjsModule(function (module, exports) {
	  //git:blame @JuliasCaesar https://www.timeanddate.com/date/leapyear.html
	  exports.isLeapYear = function (year) {
	    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
	  }; // unsurprisingly-nasty `typeof date` call


	  exports.isDate = function (d) {
	    return Object.prototype.toString.call(d) === '[object Date]' && !isNaN(d.valueOf());
	  };

	  exports.isArray = function (input) {
	    return Object.prototype.toString.call(input) === '[object Array]';
	  };

	  exports.isObject = function (input) {
	    return Object.prototype.toString.call(input) === '[object Object]';
	  };

	  exports.zeroPad = function (str) {
	    var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
	    var pad = '0';
	    str = str + '';
	    return str.length >= len ? str : new Array(len - str.length + 1).join(pad) + str;
	  };

	  exports.titleCase = function (str) {
	    if (!str) {
	      return '';
	    }

	    return str[0].toUpperCase() + str.substr(1);
	  };

	  exports.ordinal = function (i) {
	    var j = i % 10;
	    var k = i % 100;

	    if (j === 1 && k !== 11) {
	      return i + 'st';
	    }

	    if (j === 2 && k !== 12) {
	      return i + 'nd';
	    }

	    if (j === 3 && k !== 13) {
	      return i + 'rd';
	    }

	    return i + 'th';
	  }; //strip 'st' off '1st'..


	  exports.toCardinal = function (str) {
	    str = String(str);
	    str = str.replace(/([0-9])(st|nd|rd|th)$/i, '$1');
	    return parseInt(str, 10);
	  }; //used mostly for cleanup of unit names, like 'months'


	  exports.normalize = function () {
	    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	    str = str.toLowerCase().trim();
	    str = str.replace(/ies$/, 'y'); //'centuries'

	    str = str.replace(/s$/, '');
	    str = str.replace(/-/g, '');

	    if (str === 'day') {
	      return 'date';
	    }

	    return str;
	  };

	  exports.getEpoch = function (tmp) {
	    //support epoch
	    if (typeof tmp === 'number') {
	      return tmp;
	    } //suport date objects


	    if (exports.isDate(tmp)) {
	      return tmp.getTime();
	    }

	    if (tmp.epoch) {
	      return tmp.epoch;
	    }

	    return null;
	  }; //make sure this input is a spacetime obj


	  exports.beADate = function (d, s) {
	    if (exports.isObject(d) === false) {
	      return s.clone().set(d);
	    }

	    return d;
	  };

	  exports.formatTimezone = function (offset) {
	    var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	    var absOffset = Math.abs(offset);
	    var sign = offset > 0 ? '+' : '-';
	    return "".concat(sign).concat(exports.zeroPad(absOffset)).concat(delimiter, "00");
	  };
	});
	var fns_1 = fns.isLeapYear;
	var fns_2 = fns.isDate;
	var fns_3 = fns.isArray;
	var fns_4 = fns.isObject;
	var fns_5 = fns.zeroPad;
	var fns_6 = fns.titleCase;
	var fns_7 = fns.ordinal;
	var fns_8 = fns.toCardinal;
	var fns_9 = fns.normalize;
	var fns_10 = fns.getEpoch;
	var fns_11 = fns.beADate;
	var fns_12 = fns.formatTimezone;

	var zeroPad = fns.zeroPad;

	var toString = function toString(d) {
	  return zeroPad(d.getMonth() + 1) + '/' + zeroPad(d.getDate()) + ':' + zeroPad(d.getHours());
	}; // a timezone will begin with a specific offset in january
	// then some will switch to something else between november-march


	var shouldChange = function shouldChange(epoch, start, end, defaultOffset) {
	  //note: this has a cray order-of-operations issue
	  //we can't get the date, without knowing the timezone, and vice-versa
	  //it's possible that we can miss a dst-change by a few hours.
	  var d = new Date(epoch); //(try to mediate this a little?)

	  var bias = d.getTimezoneOffset() || 0;
	  var shift = bias + defaultOffset * 60; //in minutes

	  shift = shift * 60 * 1000; //in ms

	  d = new Date(epoch + shift);
	  var current = toString(d); //eg. is it after ~november?

	  if (current >= start) {
	    //eg. is it before ~march~ too?
	    if (current < end) {
	      return true;
	    }
	  }

	  return false;
	};

	var summerTime = shouldChange;

	// it reproduces some things in ./index.js, but speeds up spacetime considerably

	var quickOffset = function quickOffset(s) {
	  var zones = s.timezones;
	  var obj = zones[s.tz];

	  if (obj === undefined) {
	    console.warn("Warning: couldn't find timezone " + s.tz);
	    return 0;
	  }

	  if (obj.dst === undefined) {
	    return obj.offset;
	  } //get our two possible offsets


	  var jul = obj.offset;
	  var dec = obj.offset + 1; // assume it's the same for now

	  if (obj.hem === 'n') {
	    dec = jul - 1;
	  }

	  var split = obj.dst.split('->');
	  var inSummer = summerTime(s.epoch, split[0], split[1], jul);

	  if (inSummer === true) {
	    return jul;
	  }

	  return dec;
	};

	var quick = quickOffset;

	var _build = {
		"9|s": "2/dili,2/jayapura",
		"9|n": "2/chita,2/khandyga,2/pyongyang,2/seoul,2/tokyo,11/palau",
		"9.5|s|04/07:03->10/06:02": "4/adelaide,4/broken_hill,4/south,4/yancowinna",
		"9.5|s": "4/darwin,4/north",
		"8|s": "12/casey,2/kuala_lumpur,2/makassar,2/singapore,4/perth,4/west",
		"8|n|03/25:03->09/29:23": "2/ulan_bator",
		"8|n": "2/brunei,2/choibalsan,2/chongqing,2/chungking,2/harbin,2/hong_kong,2/irkutsk,2/kuching,2/macao,2/macau,2/manila,2/shanghai,2/taipei,2/ujung_pandang,2/ulaanbaatar",
		"8.75|s": "4/eucla",
		"7|s": "12/davis,2/jakarta,9/christmas",
		"7|n": "2/bangkok,2/barnaul,2/ho_chi_minh,2/hovd,2/krasnoyarsk,2/novokuznetsk,2/novosibirsk,2/phnom_penh,2/pontianak,2/saigon,2/tomsk,2/vientiane",
		"6|s": "12/vostok",
		"6|n": "2/almaty,2/bishkek,2/dacca,2/dhaka,2/kashgar,2/omsk,2/qyzylorda,2/thimbu,2/thimphu,2/urumqi,9/chagos",
		"6.5|n": "2/rangoon,9/cocos",
		"5|s": "12/mawson,9/kerguelen",
		"5|n": "2/aqtau,2/aqtobe,2/ashgabat,2/ashkhabad,2/atyrau,2/baku,2/dushanbe,2/karachi,2/oral,2/samarkand,2/tashkent,2/yekaterinburg,9/maldives",
		"5.75|n": "2/kathmandu,2/katmandu",
		"5.5|n": "2/calcutta,2/colombo,2/kolkata",
		"4|s": "9/reunion",
		"4|n": "2/dubai,2/muscat,2/tbilisi,2/yerevan,8/astrakhan,8/samara,8/saratov,8/ulyanovsk,8/volgograd,2/volgograd,9/mahe,9/mauritius",
		"4.5|n|03/22:00->09/21:24": "2/tehran",
		"4.5|n": "2/kabul",
		"3|s": "12/syowa,9/antananarivo",
		"3|n|03/31:03->10/27:04": "2/nicosia,8/athens,8/bucharest,8/helsinki,8/kiev,8/mariehamn,8/nicosia,8/riga,8/sofia,8/tallinn,8/uzhgorod,8/vilnius,8/zaporozhye",
		"3|n|03/31:02->10/27:03": "8/chisinau,8/tiraspol",
		"3|n|03/31:00->10/26:24": "2/beirut",
		"3|n|03/29:02->10/27:02": "2/jerusalem,2/tel_aviv",
		"3|n|03/29:00->10/26:01": "2/gaza,2/hebron",
		"3|n|03/29:00->10/25:01": "2/amman",
		"3|n|03/29:00->10/24:24": "2/damascus",
		"3|n": "0/addis_ababa,0/asmara,0/asmera,0/dar_es_salaam,0/djibouti,0/juba,0/kampala,0/mogadishu,0/nairobi,2/aden,2/baghdad,2/bahrain,2/istanbul,2/kuwait,2/qatar,2/riyadh,8/istanbul,8/kirov,8/minsk,8/moscow,8/simferopol,9/comoro,9/mayotte",
		"2|s|03/31:02->10/27:02": "12/troll",
		"2|s": "0/gaborone,0/harare,0/johannesburg,0/lubumbashi,0/lusaka,0/maputo,0/maseru,0/mbabane",
		"2|n|03/31:02->10/27:03": "0/ceuta,arctic/longyearbyen,3/jan_mayen,8/amsterdam,8/andorra,8/belgrade,8/berlin,8/bratislava,8/brussels,8/budapest,8/busingen,8/copenhagen,8/gibraltar,8/ljubljana,8/luxembourg,8/madrid,8/malta,8/monaco,8/oslo,8/paris,8/podgorica,8/prague,8/rome,8/san_marino,8/sarajevo,8/skopje,8/stockholm,8/tirane,8/vaduz,8/vatican,8/vienna,8/warsaw,8/zagreb,8/zurich",
		"2|n": "0/blantyre,0/bujumbura,0/cairo,0/khartoum,0/kigali,0/tripoli,8/kaliningrad",
		"1|s|04/02:01->09/03:03": "0/windhoek",
		"1|s": "0/kinshasa,0/luanda",
		"1|n|05/05:03->06/09:02": "0/casablanca,0/el_aaiun",
		"1|n|03/31:01->10/27:02": "3/canary,3/faeroe,3/faroe,3/madeira,8/belfast,8/dublin,8/guernsey,8/isle_of_man,8/jersey,8/lisbon,8/london",
		"1|n": "0/algiers,0/bangui,0/brazzaville,0/douala,0/lagos,0/libreville,0/malabo,0/ndjamena,0/niamey,0/porto-novo,0/tunis",
		"14|n": "11/kiritimati",
		"13|s|04/07:04->09/29:03": "11/apia",
		"13|s|01/15:02->11/05:03": "11/tongatapu",
		"13|n": "11/enderbury,11/fakaofo",
		"12|s|04/07:03->09/29:02": "12/mcmurdo,12/south_pole,11/auckland",
		"12|s|01/13:03->11/03:02": "11/fiji",
		"12|n": "2/anadyr,2/kamchatka,2/srednekolymsk,11/funafuti,11/kwajalein,11/majuro,11/nauru,11/tarawa,11/wake,11/wallis",
		"12.75|s|04/07:03->04/07:02": "11/chatham",
		"11|s": "12/macquarie,11/bougainville",
		"11|n": "2/magadan,2/sakhalin,11/efate,11/guadalcanal,11/kosrae,11/noumea,11/pohnpei,11/ponape",
		"11.5|n": "11/norfolk",
		"10|s|04/07:03->10/06:02": "4/act,4/canberra,4/currie,4/hobart,4/melbourne,4/nsw,4/sydney,4/tasmania,4/victoria",
		"10|s": "12/dumontdurville,4/brisbane,4/lindeman,4/queensland",
		"10|n": "2/ust-nera,2/vladivostok,2/yakutsk,11/chuuk,11/guam,11/port_moresby,11/saipan,11/truk,11/yap",
		"10.5|s|04/07:01->10/06:02": "4/lhi,4/lord_howe",
		"0|n|03/31:00->10/27:01": "1/scoresbysund,3/azores",
		"0|n": "0/abidjan,0/accra,0/bamako,0/banjul,0/bissau,0/conakry,0/dakar,0/freetown,0/lome,0/monrovia,0/nouakchott,0/ouagadougou,0/sao_tome,0/timbuktu,1/danmarkshavn,3/reykjavik,3/st_helena,13/gmt,13/gmt+0,13/gmt-0,13/gmt0,13/greenwich,13/utc,13/universal,13/zulu",
		"-9|n|03/10:02->11/03:02": "1/adak,1/atka",
		"-9|n": "11/gambier",
		"-9.5|n": "11/marquesas",
		"-8|n|03/10:02->11/03:02": "1/anchorage,1/juneau,1/metlakatla,1/nome,1/sitka,1/yakutat",
		"-8|n": "11/pitcairn",
		"-7|n|03/10:02->11/03:02": "1/dawson,1/ensenada,1/los_angeles,1/santa_isabel,1/tijuana,1/vancouver,1/whitehorse,6/pacific,6/yukon,10/bajanorte",
		"-7|n": "1/creston,1/dawson_creek,1/hermosillo,1/phoenix",
		"-6|s|04/06:22->09/07:22": "7/easterisland,11/easter",
		"-6|n|04/07:02->10/27:02": "1/chihuahua,1/mazatlan,10/bajasur",
		"-6|n|03/10:02->11/03:02": "1/boise,1/cambridge_bay,1/denver,1/edmonton,1/inuvik,1/ojinaga,1/shiprock,1/yellowknife,6/mountain",
		"-6|n": "1/belize,1/costa_rica,1/el_salvador,1/guatemala,1/managua,1/regina,1/swift_current,1/tegucigalpa,6/east-saskatchewan,6/saskatchewan,11/galapagos",
		"-5|s": "1/lima,1/rio_branco,5/acre",
		"-5|n|04/07:02->10/27:02": "1/bahia_banderas,1/merida,1/mexico_city,1/monterrey,10/general",
		"-5|n|03/12:03->11/05:01": "1/north_dakota",
		"-5|n|03/10:02->11/03:02": "1/chicago,1/knox_in,1/matamoros,1/menominee,1/rainy_river,1/rankin_inlet,1/resolute,1/winnipeg,6/central",
		"-5|n": "1/atikokan,1/bogota,1/cancun,1/cayman,1/coral_harbour,1/eirunepe,1/guayaquil,1/jamaica,1/panama,1/porto_acre",
		"-4|s|05/13:23->08/13:01": "12/palmer",
		"-4|s|04/06:24->09/08:00": "1/santiago,7/continental",
		"-4|s|03/23:24->10/06:00": "1/asuncion",
		"-4|s|02/16:24->11/03:00": "1/campo_grande,1/cuiaba",
		"-4|s": "1/la_paz,1/manaus,5/west",
		"-4|n|03/12:03->11/05:01": "1/indiana,1/kentucky",
		"-4|n|03/10:02->11/03:02": "1/detroit,1/fort_wayne,1/grand_turk,1/indianapolis,1/iqaluit,1/louisville,1/montreal,1/nassau,1/new_york,1/nipigon,1/pangnirtung,1/port-au-prince,1/thunder_bay,1/toronto,6/eastern",
		"-4|n|03/10:00->11/03:01": "1/havana",
		"-4|n": "1/anguilla,1/antigua,1/aruba,1/barbados,1/blanc-sablon,1/boa_vista,1/caracas,1/curacao,1/dominica,1/grenada,1/guadeloupe,1/guyana,1/kralendijk,1/lower_princes,1/marigot,1/martinique,1/montserrat,1/port_of_spain,1/porto_velho,1/puerto_rico,1/santo_domingo,1/st_barthelemy,1/st_kitts,1/st_lucia,1/st_thomas,1/st_vincent,1/tortola,1/virgin",
		"-3|s|02/16:24->11/03:00": "1/sao_paulo,5/east",
		"-3|s": "1/argentina,1/buenos_aires,1/cordoba,1/fortaleza,1/montevideo,1/punta_arenas,12/rothera,3/stanley",
		"-3|n|03/10:02->11/03:02": "1/glace_bay,1/goose_bay,1/halifax,1/moncton,1/thule,3/bermuda,6/atlantic",
		"-3|n": "1/araguaina,1/bahia,1/belem,1/catamarca,1/cayenne,1/jujuy,1/maceio,1/mendoza,1/paramaribo,1/recife,1/rosario,1/santarem",
		"-2|s": "5/denoronha",
		"-2|n|03/30:22->10/26:23": "1/godthab",
		"-2|n|03/10:02->11/03:02": "1/miquelon",
		"-2|n": "1/noronha,3/south_georgia",
		"-2.5|n|03/10:02->11/03:02": "1/st_johns,6/newfoundland",
		"-1|n": "3/cape_verde",
		"-11|n": "11/midway,11/niue,11/pago_pago,11/samoa",
		"-10|n": "11/honolulu,11/johnston,11/rarotonga,11/tahiti"
	};

	var _build$1 = /*#__PURE__*/Object.freeze({
		'default': _build
	});

	//prefixes for iana names..
	var _prefixes = ['africa', 'america', 'asia', 'atlantic', 'australia', 'brazil', 'canada', 'chile', 'europe', 'indian', 'mexico', 'pacific', 'antarctica', 'etc'];

	var data = getCjsExportFromNamespace(_build$1);

	var all = {};
	Object.keys(data).forEach(function (k) {
	  var split = k.split('|');
	  var obj = {
	    offset: Number(split[0]),
	    hem: split[1]
	  };

	  if (split[2]) {
	    obj.dst = split[2];
	  }

	  var names = data[k].split(',');
	  names.forEach(function (str) {
	    str = str.replace(/(^[0-9]+)\//, function (before, num) {
	      num = Number(num);
	      return _prefixes[num] + '/';
	    });
	    all[str] = obj;
	  });
	});
	all['utc'] = {
	  offset: 0,
	  hem: 'n' //(sorry)

	}; //add etc/gmt+n

	for (var i = -14; i <= 14; i += 0.5) {
	  var num = i;

	  if (num > 0) {
	    num = '+' + num;
	  }

	  var name = 'etc/gmt' + num;
	  all[name] = {
	    offset: i * -1,
	    //they're negative!
	    hem: 'n' //(sorry)

	  };
	  name = 'utc/gmt' + num; //this one too, why not.

	  all[name] = {
	    offset: i * -1,
	    hem: 'n'
	  };
	} // console.log(all)
	// console.log(Object.keys(all).length)


	var unpack = all;

	//find the implicit iana code for this machine.
	//safely query the Intl object
	//based on - https://bitbucket.org/pellepim/jstimezonedetect/src
	var fallbackTZ = 'utc'; //
	//this Intl object is not supported often, yet

	var safeIntl = function safeIntl() {
	  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
	    return null;
	  }

	  var format = Intl.DateTimeFormat();

	  if (typeof format === 'undefined' || typeof format.resolvedOptions === 'undefined') {
	    return null;
	  }

	  var timezone = format.resolvedOptions().timeZone;

	  if (!timezone) {
	    return null;
	  }

	  return timezone.toLowerCase();
	};

	var guessTz = function guessTz() {
	  var timezone = safeIntl();

	  if (timezone === null) {
	    return fallbackTZ;
	  }

	  return timezone;
	}; //do it once per computer


	var guessTz_1 = guessTz;

	var isOffset = /(\-?[0-9]+)h(rs)?/i;
	var isNumber = /(\-?[0-9]+)/;
	var utcOffset = /utc([\-+]?[0-9]+)/i;
	var gmtOffset = /gmt([\-+]?[0-9]+)/i;

	var toIana = function toIana(num) {
	  num = Number(num);

	  if (num > -13 && num < 13) {
	    num = num * -1; //it's opposite!

	    num = (num > 0 ? '+' : '') + num; //add plus sign

	    return 'etc/gmt' + num;
	  }

	  return null;
	};

	var parseOffset = function parseOffset(tz) {
	  // '+5hrs'
	  var m = tz.match(isOffset);

	  if (m !== null) {
	    return toIana(m[1]);
	  } // 'utc+5'


	  m = tz.match(utcOffset);

	  if (m !== null) {
	    return toIana(m[1]);
	  } // 'GMT-5' (not opposite)


	  m = tz.match(gmtOffset);

	  if (m !== null) {
	    var num = Number(m[1]) * -1;
	    return toIana(num);
	  } // '+5'


	  m = tz.match(isNumber);

	  if (m !== null) {
	    return toIana(m[1]);
	  }

	  return null;
	};

	var parseOffset_1 = parseOffset;

	var local = guessTz_1(); //add all the city names by themselves

	var cities = Object.keys(unpack).reduce(function (h, k) {
	  var city = k.split('/')[1] || '';
	  city = city.replace(/_/g, ' ');
	  h[city] = k;
	  return h;
	}, {}); //try to match these against iana form

	var normalize = function normalize(tz) {
	  tz = tz.replace(/ time/g, '');
	  tz = tz.replace(/ (standard|daylight|summer)/g, '');
	  tz = tz.replace(/\b(east|west|north|south)ern/g, '$1');
	  tz = tz.replace(/\b(africa|america|australia)n/g, '$1');
	  tz = tz.replace(/\beuropean/g, 'europe');
	  tz = tz.replace(/\islands/g, 'island');
	  return tz;
	}; // try our best to reconcile the timzone to this given string


	var lookupTz = function lookupTz(str, zones) {
	  if (!str) {
	    return local;
	  }

	  var tz = str.trim();
	  var split = str.split('/'); //support long timezones like 'America/Argentina/Rio_Gallegos'

	  if (split.length > 2 && zones.hasOwnProperty(tz) === false) {
	    tz = split[0] + '/' + split[1];
	  }

	  tz = tz.toLowerCase();

	  if (zones.hasOwnProperty(tz) === true) {
	    return tz;
	  } //lookup more loosely..


	  tz = normalize(tz);

	  if (zones.hasOwnProperty(tz) === true) {
	    return tz;
	  } //try city-names


	  if (cities.hasOwnProperty(tz) === true) {
	    return cities[tz];
	  } // //try to parse '-5h'


	  if (/[0-9]/.test(tz) === true) {
	    var id = parseOffset_1(tz);

	    if (id) {
	      return id;
	    }
	  }

	  throw new Error("Spacetime: Cannot find timezone named: '" + str + "'. Please enter an IANA timezone id.");
	};

	var find = lookupTz;

	var o = {
	  millisecond: 1
	};
	o.second = 1000;
	o.minute = 60000;
	o.hour = 3.6e6; // dst is supported post-hoc

	o.day = 8.64e7; //

	o.date = o.day;
	o.month = 8.64e7 * 29.5; //(average)

	o.week = 6.048e8;
	o.year = 3.154e10; // leap-years are supported post-hoc
	//add plurals

	Object.keys(o).forEach(function (k) {
	  o[k + 's'] = o[k];
	});
	var milliseconds = o;

	var walk = function walk(s, n, fn, unit, previous) {
	  var current = s.d[fn]();

	  if (current === n) {
	    return; //already there
	  }

	  var startUnit = previous === null ? null : s.d[previous]();
	  var original = s.epoch; //try to get it as close as we can

	  var diff = n - current;
	  s.epoch += milliseconds[unit] * diff; //DST edge-case: if we are going many days, be a little conservative

	  if (unit === 'day' && Math.abs(diff) > 28) {
	    //but don't push it over a month
	    if (n < 28) {
	      s.epoch += milliseconds.hour;
	    }
	  } //repair it if we've gone too far or something
	  //(go by half-steps, just in case)


	  var halfStep = milliseconds[unit] / 2;

	  while (s.d[fn]() < n) {
	    s.epoch += halfStep;
	  }

	  while (s.d[fn]() > n) {
	    s.epoch -= halfStep;
	  } //oops, did we change previous unit? revert it.


	  if (previous !== null && startUnit !== s.d[previous]()) {
	    // console.warn('spacetime warning: missed setting ' + unit)
	    s.epoch = original; // i mean, but make it close...

	    s.epoch += milliseconds[unit] * diff * 0.97; // i guess?
	  }
	}; //find the desired date by a increment/check while loop


	var units = {
	  year: {
	    valid: function valid(n) {
	      return n > -4000 && n < 4000;
	    },
	    walkTo: function walkTo(s, n) {
	      return walk(s, n, 'getFullYear', 'year', null);
	    }
	  },
	  month: {
	    valid: function valid(n) {
	      return n >= 0 && n <= 11;
	    },
	    walkTo: function walkTo(s, n) {
	      var d = s.d;
	      var current = d.getMonth();
	      var original = s.epoch;
	      var startUnit = d.getYear();

	      if (current === n) {
	        return;
	      } //try to get it as close as we can..


	      var diff = n - current;
	      s.epoch += milliseconds.day * (diff * 28); //special case
	      //oops, did we change the year? revert it.

	      if (startUnit !== s.d.getYear()) {
	        s.epoch = original;
	      } //incriment by day


	      while (s.d.getMonth() < n) {
	        s.epoch += milliseconds.day;
	      }

	      while (s.d.getMonth() > n) {
	        s.epoch -= milliseconds.day;
	      }
	    }
	  },
	  date: {
	    valid: function valid(n) {
	      return n > 0 && n <= 31;
	    },
	    walkTo: function walkTo(s, n) {
	      return walk(s, n, 'getDate', 'day', 'getMonth');
	    }
	  },
	  hour: {
	    valid: function valid(n) {
	      return n >= 0 && n < 24;
	    },
	    walkTo: function walkTo(s, n) {
	      return walk(s, n, 'getHours', 'hour', 'getDate');
	    }
	  },
	  minute: {
	    valid: function valid(n) {
	      return n >= 0 && n < 60;
	    },
	    walkTo: function walkTo(s, n) {
	      return walk(s, n, 'getMinutes', 'minute', 'getHours');
	    }
	  },
	  second: {
	    valid: function valid(n) {
	      return n >= 0 && n < 60;
	    },
	    walkTo: function walkTo(s, n) {
	      //do this one directly
	      s.epoch = s.seconds(n).epoch;
	    }
	  },
	  millisecond: {
	    valid: function valid(n) {
	      return n >= 0 && n < 1000;
	    },
	    walkTo: function walkTo(s, n) {
	      //do this one directly
	      s.epoch = s.milliseconds(n).epoch;
	    }
	  }
	};

	var walkTo = function walkTo(s, wants) {
	  var keys = Object.keys(units);
	  var old = s.clone();

	  for (var i = 0; i < keys.length; i++) {
	    var k = keys[i];
	    var n = wants[k];

	    if (n === undefined) {
	      n = old[k]();
	    }

	    if (typeof n === 'string') {
	      n = parseInt(n, 10);
	    } //make-sure it's valid


	    if (!units[k].valid(n)) {
	      s.epoch = null;

	      if (s.silent === false) {
	        console.warn('invalid ' + k + ': ' + n);
	      }

	      return;
	    } // console.log(k, n)


	    units[k].walkTo(s, n);
	  }

	  return;
	};

	var walk_1 = walkTo;

	var shortMonths = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
	var longMonths = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

	function buildMapping() {
	  var obj = {
	    sep: 8 //support this format

	  };

	  for (var i = 0; i < shortMonths.length; i++) {
	    obj[shortMonths[i]] = i;
	  }

	  for (var _i = 0; _i < longMonths.length; _i++) {
	    obj[longMonths[_i]] = _i;
	  }

	  return obj;
	}

	var months = {
	  "short": function short() {
	    return shortMonths;
	  },
	  "long": function long() {
	    return longMonths;
	  },
	  mapping: function mapping() {
	    return buildMapping();
	  },
	  set: function set(i18n) {
	    shortMonths = i18n["short"] || shortMonths;
	    longMonths = i18n["long"] || longMonths;
	  }
	};

	//pull-apart ISO offsets, like "+0100"
	var parseOffset$1 = function parseOffset(s, offset) {
	  if (!offset) {
	    return s;
	  } //this is a fancy-move


	  if (offset === 'Z') {
	    offset = '+0000';
	  } // according to ISO8601, tz could be hh:mm, hhmm or hh
	  // so need few more steps before the calculation.


	  var num = 0; // for (+-)hh:mm

	  if (/^[\+-]?[0-9]{2}:[0-9]{2}$/.test(offset)) {
	    //support "+01:00"
	    if (/:00/.test(offset) === true) {
	      offset = offset.replace(/:00/, '');
	    } //support "+01:30"


	    if (/:30/.test(offset) === true) {
	      offset = offset.replace(/:30/, '.5');
	    }
	  } // for (+-)hhmm


	  if (/^[\+-]?[0-9]{4}$/.test(offset)) {
	    offset = offset.replace(/30$/, '.5');
	  }

	  num = parseFloat(offset); //divide by 100 or 10 - , "+0100", "+01"

	  if (Math.abs(num) > 100) {
	    num = num / 100;
	  } //okay, try to match it to a utc timezone
	  //remember - this is opposite! a -5 offset maps to Etc/GMT+5  ¯\_(:/)_/¯
	  //https://askubuntu.com/questions/519550/why-is-the-8-timezone-called-gmt-8-in-the-filesystem


	  num *= -1;

	  if (num >= 0) {
	    num = '+' + num;
	  }

	  var tz = 'etc/gmt' + num;
	  var zones = s.timezones;

	  if (zones[tz]) {
	    // log a warning if we're over-writing a given timezone?
	    // console.log('changing timezone to: ' + tz)
	    s.tz = tz;
	  }

	  return s;
	};

	var parseOffset_1$1 = parseOffset$1;

	var parseTime = function parseTime(s) {
	  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	  str = str.replace(/^\s+/, '').toLowerCase(); //trim
	  //formal time formats - 04:30.23

	  var arr = str.match(/([0-9]{1,2}):([0-9]{1,2}):?([0-9]{1,2})?[:\.]?([0-9]{1,4})?/);

	  if (arr !== null) {
	    //validate it a little
	    var h = Number(arr[1]);

	    if (h < 0 || h > 24) {
	      return s.startOf('day');
	    }

	    var m = Number(arr[2]); //don't accept '5:3pm'

	    if (arr[2].length < 2 || m < 0 || m > 59) {
	      return s.startOf('day');
	    }

	    s = s.hour(h);
	    s = s.minute(m);
	    s = s.seconds(arr[3] || 0);
	    s = s.millisecond(arr[4] || 0); //parse-out am/pm

	    var ampm = str.match(/[\b0-9](am|pm)\b/);

	    if (ampm !== null && ampm[1]) {
	      s = s.ampm(ampm[1]);
	    }

	    return s;
	  } //try an informal form - 5pm (no minutes)


	  arr = str.match(/([0-9]+) ?(am|pm)/);

	  if (arr !== null && arr[1]) {
	    var _h = Number(arr[1]); //validate it a little..


	    if (_h > 12 || _h < 1) {
	      return s.startOf('day');
	    }

	    s = s.hour(arr[1] || 0);
	    s = s.ampm(arr[2]);
	    s = s.startOf('hour');
	    return s;
	  } //no time info found, use start-of-day


	  s = s.startOf('day');
	  return s;
	};

	var parseTime_1 = parseTime;

	var monthLengths = [31, // January - 31 days
	28, // February - 28 days in a common year and 29 days in leap years
	31, // March - 31 days
	30, // April - 30 days
	31, // May - 31 days
	30, // June - 30 days
	31, // July - 31 days
	31, // August - 31 days
	30, // September - 30 days
	31, // October - 31 days
	30, // November - 30 days
	31 // December - 31 days
	];
	var monthLengths_1 = monthLengths;

	var isLeapYear = fns.isLeapYear; //given a month, return whether day number exists in it

	var hasDate = function hasDate(obj) {
	  //invalid values
	  if (monthLengths_1.hasOwnProperty(obj.month) !== true) {
	    return false;
	  } //support leap-year in february


	  if (obj.month === 1) {
	    if (isLeapYear(obj.year) && obj.date <= 29) {
	      return true;
	    } else {
	      return obj.date <= 28;
	    }
	  } //is this date too-big for this month?


	  var max = monthLengths_1[obj.month] || 0;

	  if (obj.date <= max) {
	    return true;
	  }

	  return false;
	};

	var hasDate_1 = hasDate;

	var months$1 = months.mapping();

	var parseYear = function parseYear() {
	  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  //support '18 -> 2018
	  // str = str.replace(/^'([0-9]{2})/, '20$1')
	  // str = str.replace('([0-9]+) ?b\.?c\.?$', '-$1')
	  var year = parseInt(str.trim(), 10);
	  year = year || new Date().getFullYear();
	  return year;
	};

	var strFmt = [//iso-this 1998-05-30T22:00:00:000Z, iso-that 2017-04-03T08:00:00-0700
	{
	  reg: /^(\-?0?0?[0-9]{3,4})-([0-9]{1,2})-([0-9]{1,2})[T| ]([0-9.:]+)(Z|[0-9\-\+:]+)?$/,
	  parse: function parse(s, arr, givenTz, options) {
	    var month = parseInt(arr[2], 10) - 1;
	    var obj = {
	      year: arr[1],
	      month: month,
	      date: arr[3]
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    parseOffset_1$1(s, arr[5]);
	    walk_1(s, obj);
	    s = parseTime_1(s, arr[4]);
	    return s;
	  }
	}, //iso "2015-03-25" or "2015/03/25" //0-based-months!
	{
	  reg: /^([0-9]{4})[\-\/]([0-9]{1,2})[\-\/]([0-9]{1,2})$/,
	  parse: function parse(s, arr) {
	    var obj = {
	      year: arr[1],
	      month: parseInt(arr[2], 10) - 1,
	      date: parseInt(arr[3], 10)
	    };

	    if (obj.month >= 12) {
	      //support yyyy/dd/mm (weird, but ok)
	      obj.date = parseInt(arr[2], 10);
	      obj.month = parseInt(arr[3], 10) - 1;
	    }

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s);
	    return s;
	  }
	}, //short - uk "03/25/2015"  //0-based-months!
	{
	  reg: /^([0-9]{1,2})[\-\/]([0-9]{1,2})[\-\/]?([0-9]{4})?$/,
	  parse: function parse(s, arr) {
	    var month = parseInt(arr[1], 10) - 1;
	    var date = parseInt(arr[2], 10);

	    if (month >= 12) {
	      //support yyyy/dd/mm (weird, but ok)
	      month = parseInt(arr[2], 10) - 1;
	      date = parseInt(arr[1], 10);
	    }

	    var year = arr[3] || new Date().getFullYear();
	    var obj = {
	      year: year,
	      month: month,
	      date: date
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s);
	    return s;
	  }
	}, //Long "Mar 25 2015"
	//February 22, 2017 15:30:00
	{
	  reg: /^([a-z]+) ([0-9]{1,2}(?:st|nd|rd|th)?),?( [0-9]{4})?( ([0-9:]+( ?am| ?pm)?))?$/i,
	  parse: function parse(s, arr) {
	    var month = months$1[arr[1].toLowerCase()];
	    var year = parseYear(arr[3]);
	    var obj = {
	      year: year,
	      month: month,
	      date: fns.toCardinal(arr[2] || '')
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s, arr[4]);
	    return s;
	  }
	}, //February 2017 (implied date)
	{
	  reg: /^([a-z]+) ([0-9]{4})$/i,
	  parse: function parse(s, arr) {
	    var month = months$1[arr[1].toLowerCase()];
	    var year = parseYear(arr[2]);
	    var obj = {
	      year: year,
	      month: month,
	      date: 1
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s, arr[4]);
	    return s;
	  }
	}, //Long "25 Mar 2015"
	{
	  reg: /^([0-9]{1,2}(?:st|nd|rd|th)?) ([a-z]+),?( [0-9]{4})?$/i,
	  parse: function parse(s, arr) {
	    var month = months$1[arr[2].toLowerCase()];
	    var year = parseYear(arr[3]);
	    var obj = {
	      year: year,
	      month: month,
	      date: fns.toCardinal(arr[1])
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s);
	    return s;
	  }
	}, {
	  // '1992'
	  reg: /^[0-9]{4}$/i,
	  parse: function parse(s, arr) {
	    var year = parseYear(arr[0]);
	    var d = new Date();
	    var obj = {
	      year: year,
	      month: d.getMonth(),
	      date: d.getDate()
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s);
	    return s;
	  }
	}, {
	  // '200bc'
	  reg: /^[0-9,]+ ?b\.?c\.?$/i,
	  parse: function parse(s, arr) {
	    var str = arr[0] || ''; //make negative-year

	    str = str.replace(/^([0-9,]+) ?b\.?c\.?$/i, '-$1'); //remove commas

	    str = str.replace(/,/g, '');
	    var year = parseInt(str.trim(), 10);
	    var d = new Date();
	    var obj = {
	      year: year,
	      month: d.getMonth(),
	      date: d.getDate()
	    };

	    if (hasDate_1(obj) === false) {
	      s.epoch = null;
	      return s;
	    }

	    walk_1(s, obj);
	    s = parseTime_1(s);
	    return s;
	  }
	}];
	var strParse = strFmt;

	var dates = {
	  now: function now(s) {
	    s.epoch = Date.now();
	    return s;
	  },
	  tonight: function tonight(s) {
	    s.epoch = Date.now();
	    s = s.hour(18);
	    return s;
	  },
	  today: function today(s) {
	    s.epoch = Date.now();
	    return s;
	  },
	  tomorrow: function tomorrow(s) {
	    s.epoch = Date.now();
	    s = s.add(1, 'day');
	    s = s.startOf('day');
	    return s;
	  },
	  yesterday: function yesterday(s) {
	    s.epoch = Date.now();
	    s = s.subtract(1, 'day');
	    s = s.startOf('day');
	    return s;
	  },
	  christmas: function christmas(s) {
	    var year = new Date().getFullYear();
	    s = s.set([year, 11, 25, 18, 0, 0]); // Dec 25

	    return s;
	  },
	  'new years': function newYears(s) {
	    var year = new Date().getFullYear();
	    s = s.set([year, 11, 31, 18, 0, 0]); // Dec 31

	    return s;
	  }
	};
	dates['new years eve'] = dates['new years'];
	var namedDates = dates;

	//  -  can't use built-in js parser ;(
	//=========================================
	// ISO Date	  "2015-03-25"
	// Short Date	"03/25/2015" or "2015/03/25"
	// Long Date	"Mar 25 2015" or "25 Mar 2015"
	// Full Date	"Wednesday March 25 2015"
	//=========================================
	//-- also -
	// if the given epoch is really small, they've probably given seconds and not milliseconds
	// anything below this number is likely (but not necessarily) a mistaken input.
	// this may seem like an arbitrary number, but it's 'within jan 1970'
	// this is only really ambiguous until 2054 or so

	var minimumEpoch = 2500000000;
	var defaults = {
	  year: new Date().getFullYear(),
	  month: 0,
	  date: 1
	}; //support [2016, 03, 01] format

	var handleArray = function handleArray(s, arr) {
	  var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'];

	  for (var i = 0; i < order.length; i++) {
	    var num = arr[i] || defaults[order[i]] || 0;
	    s = s[order[i]](num);
	  }

	  return s;
	}; //support {year:2016, month:3} format


	var handleObject = function handleObject(s, obj) {
	  obj = Object.assign({}, defaults, obj);
	  var keys = Object.keys(obj);

	  for (var i = 0; i < keys.length; i++) {
	    var unit = keys[i]; //make sure we have this method

	    if (s[unit] === undefined || typeof s[unit] !== 'function') {
	      continue;
	    } //make sure the value is a number


	    if (obj[unit] === null || obj[unit] === undefined || obj[unit] === '') {
	      continue;
	    }

	    var num = obj[unit] || defaults[unit] || 0;
	    s = s[unit](num);
	  }

	  return s;
	}; //find the epoch from different input styles


	var parseInput = function parseInput(s, input, givenTz) {
	  //if we've been given a epoch number, it's easy
	  if (typeof input === 'number') {
	    if (input > 0 && input < minimumEpoch && s.silent === false) {
	      console.warn('  - Warning: You are setting the date to January 1970.');
	      console.warn('       -   did input seconds instead of milliseconds?');
	    }

	    s.epoch = input;
	    return s;
	  } //set tmp time


	  s.epoch = Date.now();

	  if (input === null || input === undefined) {
	    return s; //k, we're good.
	  } //support input of Date() object


	  if (fns.isDate(input) === true) {
	    s.epoch = input.getTime();
	    return s;
	  } //support [2016, 03, 01] format


	  if (fns.isArray(input) === true) {
	    s = handleArray(s, input);
	    return s;
	  } //support {year:2016, month:3} format


	  if (fns.isObject(input) === true) {
	    //support spacetime object as input
	    if (input.epoch) {
	      s.epoch = input.epoch;
	      s.tz = input.tz;
	      return s;
	    }

	    s = handleObject(s, input);
	    return s;
	  } //input as a string..


	  if (typeof input !== 'string') {
	    return s;
	  } //little cleanup..


	  input = input.replace(/\b(mon|tues|wed|wednes|thu|thurs|fri|sat|satur|sun)(day)?\b/i, '');
	  input = input.replace(/,/g, '');
	  input = input.replace(/ +/g, ' ').trim(); //try some known-words, like 'now'

	  if (namedDates.hasOwnProperty(input) === true) {
	    s = namedDates[input](s);
	    return s;
	  } //try each text-parse template, use the first good result


	  for (var i = 0; i < strParse.length; i++) {
	    var m = input.match(strParse[i].reg);

	    if (m) {
	      s = strParse[i].parse(s, m, givenTz);
	      return s;
	    }
	  }

	  if (s.silent === false) {
	    console.warn("Warning: couldn't parse date-string: '" + input + "'");
	  }

	  s.epoch = null;
	  return s;
	};

	var input = parseInput;

	var shortDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
	var longDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	var days = {
	  "short": function short() {
	    return shortDays;
	  },
	  "long": function long() {
	    return longDays;
	  },
	  set: function set(i18n) {
	    shortDays = i18n["short"] || shortDays;
	    longDays = i18n["long"] || longDays;
	  }
	};

	// it's kind of nuts how involved this is
	// "+01:00", "+0100", or simply "+01"

	var isoOffset = function isoOffset(s) {
	  var offset = s.timezone().current.offset;
	  var isNegative = offset < 0;
	  var minute = '00'; //handle 5.5 → '5:30'

	  if (Math.abs(offset % 1) === 0.5) {
	    minute = '30';

	    if (offset >= 0) {
	      offset = Math.floor(offset);
	    } else {
	      offset = Math.ceil(offset);
	    }
	  }

	  if (isNegative) {
	    //handle negative sign
	    offset *= -1;
	    offset = fns.zeroPad(offset, 2);
	    offset = '-' + offset;
	  } else {
	    offset = fns.zeroPad(offset, 2);
	    offset = '+' + offset;
	  }

	  offset = offset + ':' + minute; //'Z' means 00

	  if (offset === '+00:00') {
	    offset = 'Z';
	  }

	  return offset;
	};

	var _offset = isoOffset;

	var format = {
	  day: function day(s) {
	    return fns.titleCase(s.dayName());
	  },
	  'day-short': function dayShort(s) {
	    return fns.titleCase(days["short"]()[s.day()]);
	  },
	  'day-number': function dayNumber(s) {
	    return s.day();
	  },
	  'day-ordinal': function dayOrdinal(s) {
	    return fns.ordinal(s.day());
	  },
	  'day-pad': function dayPad(s) {
	    return fns.zeroPad(s.day());
	  },
	  date: function date(s) {
	    return s.date();
	  },
	  'date-ordinal': function dateOrdinal(s) {
	    return fns.ordinal(s.date());
	  },
	  'date-pad': function datePad(s) {
	    return fns.zeroPad(s.date());
	  },
	  month: function month(s) {
	    return fns.titleCase(s.monthName());
	  },
	  'month-short': function monthShort(s) {
	    return fns.titleCase(months["short"]()[s.month()]);
	  },
	  'month-number': function monthNumber(s) {
	    return s.month();
	  },
	  'month-ordinal': function monthOrdinal(s) {
	    return fns.ordinal(s.month());
	  },
	  'month-pad': function monthPad(s) {
	    return fns.zeroPad(s.month());
	  },
	  'iso-month': function isoMonth(s) {
	    return fns.zeroPad(s.month() + 1);
	  },
	  //1-based months
	  year: function year(s) {
	    var year = s.year();

	    if (year > 0) {
	      return year;
	    }

	    year = Math.abs(year);
	    return year + ' BC';
	  },
	  'year-short': function yearShort(s) {
	    var year = s.year();

	    if (year > 0) {
	      return "'".concat(String(s.year()).substr(2, 4));
	    }

	    year = Math.abs(year);
	    return year + ' BC';
	  },
	  'iso-year': function isoYear(s) {
	    var year = s.year();
	    var isNegative = year < 0;
	    var str = fns.zeroPad(Math.abs(year), 4); //0-padded

	    if (isNegative) {
	      //negative years are for some reason 6-digits ('-00008')
	      str = fns.zeroPad(str, 6);
	      str = '-' + str;
	    }

	    return str;
	  },
	  time: function time(s) {
	    return s.time();
	  },
	  'time-24': function time24(s) {
	    return "".concat(s.hour24(), ":").concat(fns.zeroPad(s.minute()));
	  },
	  hour: function hour(s) {
	    return s.hour12();
	  },
	  'hour-pad': function hourPad(s) {
	    return fns.zeroPad(s.hour12());
	  },
	  'hour-24': function hour24(s) {
	    return s.hour24();
	  },
	  'hour-24-pad': function hour24Pad(s) {
	    return fns.zeroPad(s.hour24());
	  },
	  minute: function minute(s) {
	    return s.minute();
	  },
	  'minute-pad': function minutePad(s) {
	    return fns.zeroPad(s.minute());
	  },
	  second: function second(s) {
	    return s.second();
	  },
	  'second-pad': function secondPad(s) {
	    return fns.zeroPad(s.second());
	  },
	  ampm: function ampm(s) {
	    return s.ampm();
	  },
	  quarter: function quarter(s) {
	    return 'Q' + s.quarter();
	  },
	  season: function season(s) {
	    return s.season();
	  },
	  era: function era(s) {
	    return s.era();
	  },
	  timezone: function timezone(s) {
	    return s.timezone().name;
	  },
	  offset: function offset(s) {
	    return _offset(s);
	  },
	  numeric: function numeric(s) {
	    return "".concat(s.year(), "/").concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()));
	  },
	  // yyyy/mm/dd
	  'numeric-us': function numericUs(s) {
	    return "".concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()), "/").concat(s.year());
	  },
	  // mm/dd/yyyy
	  'numeric-uk': function numericUk(s) {
	    return "".concat(fns.zeroPad(s.date()), "/").concat(fns.zeroPad(s.month() + 1), "/").concat(s.year());
	  },
	  //dd/mm/yyyy
	  'mm/dd': function mmDd(s) {
	    return "".concat(fns.zeroPad(s.month() + 1), "/").concat(fns.zeroPad(s.date()));
	  },
	  //mm/dd
	  // ... https://en.wikipedia.org/wiki/ISO_8601 ;(((
	  iso: function iso(s) {
	    var year = s.format('iso-year');
	    var month = fns.zeroPad(s.month() + 1); //1-based months

	    var date = fns.zeroPad(s.date());
	    var hour = fns.zeroPad(s.h24());
	    var minute = fns.zeroPad(s.minute());
	    var second = fns.zeroPad(s.second());
	    var ms = fns.zeroPad(s.millisecond(), 3);
	    var offset = _offset(s);
	    return "".concat(year, "-").concat(month, "-").concat(date, "T").concat(hour, ":").concat(minute, ":").concat(second, ".").concat(ms).concat(offset); //2018-03-09T08:50:00.000-05:00
	  },
	  'iso-short': function isoShort(s) {
	    var month = fns.zeroPad(s.month() + 1); //1-based months

	    var date = fns.zeroPad(s.date());
	    return "".concat(s.year(), "-").concat(month, "-").concat(date); //2017-02-15
	  },
	  'iso-utc': function isoUtc(s) {
	    return new Date(s.epoch).toISOString(); //2017-03-08T19:45:28.367Z
	  },
	  //i made these up
	  nice: function nice(s) {
	    return "".concat(months["short"]()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
	  },
	  'nice-year': function niceYear(s) {
	    return "".concat(months["short"]()[s.month()], " ").concat(fns.ordinal(s.date()), ", ").concat(s.year());
	  },
	  'nice-day': function niceDay(s) {
	    return "".concat(days["short"]()[s.day()], " ").concat(fns.titleCase(months["short"]()[s.month()]), " ").concat(fns.ordinal(s.date()));
	  },
	  'nice-full': function niceFull(s) {
	    return "".concat(s.dayName(), " ").concat(fns.titleCase(s.monthName()), " ").concat(fns.ordinal(s.date()), ", ").concat(s.time());
	  }
	}; //aliases

	var aliases = {
	  'day-name': 'day',
	  'month-name': 'month',
	  'iso 8601': 'iso',
	  'time-h24': 'time-24',
	  'time-12': 'time',
	  'time-h12': 'time',
	  tz: 'timezone',
	  'day-num': 'day-number',
	  'month-num': 'month-number',
	  'month-iso': 'iso-month',
	  'year-iso': 'iso-year',
	  'nice-short': 'nice',
	  mdy: 'numeric-us',
	  dmy: 'numeric-uk',
	  ymd: 'numeric',
	  'yyyy/mm/dd': 'numeric',
	  'mm/dd/yyyy': 'numeric-us',
	  'dd/mm/yyyy': 'numeric-us',
	  'little-endian': 'numeric-uk',
	  'big-endian': 'numeric',
	  'day-nice': 'nice-day'
	};
	Object.keys(aliases).forEach(function (k) {
	  return format[k] = format[aliases[k]];
	});

	var printFormat = function printFormat(s) {
	  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	  //don't print anything if it's an invalid date
	  if (s.isValid() !== true) {
	    return '';
	  } //support .format('month')


	  if (format.hasOwnProperty(str)) {
	    var out = String(format[str](s) || '');

	    if (str !== 'ampm') {
	      out = fns.titleCase(out);
	    }

	    return out;
	  } //support '{hour}:{minute}' notation


	  if (str.indexOf('{') !== -1) {
	    var sections = /\{(.+?)\}/g;
	    str = str.replace(sections, function (_, fmt) {
	      fmt = fmt.toLowerCase().trim();

	      if (format.hasOwnProperty(fmt)) {
	        return String(format[fmt](s) || '');
	      }

	      return '';
	    });
	    return str;
	  }

	  return s.format('iso-short');
	};

	var format_1 = printFormat;

	var pad = fns.zeroPad;
	var formatTimezone = fns.formatTimezone; //parse this insane unix-time-templating thing, from the 19th century
	//http://unicode.org/reports/tr35/tr35-25.html#Date_Format_Patterns
	//time-symbols we support

	var mapping = {
	  G: function G(s) {
	    return s.era();
	  },
	  GG: function GG(s) {
	    return s.era();
	  },
	  GGG: function GGG(s) {
	    return s.era();
	  },
	  GGGG: function GGGG(s) {
	    return s.era() === 'AD' ? 'Anno Domini' : 'Before Christ';
	  },
	  //year
	  y: function y(s) {
	    return s.year();
	  },
	  yy: function yy(s) {
	    //last two chars
	    return parseInt(String(s.year()).substr(2, 4), 10);
	  },
	  yyy: function yyy(s) {
	    return s.year();
	  },
	  yyyy: function yyyy(s) {
	    return s.year();
	  },
	  yyyyy: function yyyyy(s) {
	    return '0' + s.year();
	  },
	  // u: (s) => {},//extended non-gregorian years
	  //quarter
	  Q: function Q(s) {
	    return s.quarter();
	  },
	  QQ: function QQ(s) {
	    return s.quarter();
	  },
	  QQQ: function QQQ(s) {
	    return s.quarter();
	  },
	  QQQQ: function QQQQ(s) {
	    return s.quarter();
	  },
	  //month
	  M: function M(s) {
	    return s.month() + 1;
	  },
	  MM: function MM(s) {
	    return pad(s.month() + 1);
	  },
	  MMM: function MMM(s) {
	    return s.format('month-short');
	  },
	  MMMM: function MMMM(s) {
	    return s.format('month');
	  },
	  //week
	  w: function w(s) {
	    return s.week();
	  },
	  ww: function ww(s) {
	    return pad(s.week());
	  },
	  //week of month
	  // W: (s) => s.week(),
	  //date of month
	  d: function d(s) {
	    return s.date();
	  },
	  dd: function dd(s) {
	    return pad(s.date());
	  },
	  //date of year
	  D: function D(s) {
	    return s.dayOfYear();
	  },
	  DD: function DD(s) {
	    return pad(s.dayOfYear());
	  },
	  DDD: function DDD(s) {
	    return pad(s.dayOfYear(), 3);
	  },
	  // F: (s) => {},//date of week in month
	  // g: (s) => {},//modified julian day
	  //day
	  E: function E(s) {
	    return s.format('day-short');
	  },
	  EE: function EE(s) {
	    return s.format('day-short');
	  },
	  EEE: function EEE(s) {
	    return s.format('day-short');
	  },
	  EEEE: function EEEE(s) {
	    return s.format('day');
	  },
	  EEEEE: function EEEEE(s) {
	    return s.format('day')[0];
	  },
	  e: function e(s) {
	    return s.day();
	  },
	  ee: function ee(s) {
	    return s.day();
	  },
	  eee: function eee(s) {
	    return s.format('day-short');
	  },
	  eeee: function eeee(s) {
	    return s.format('day');
	  },
	  eeeee: function eeeee(s) {
	    return s.format('day')[0];
	  },
	  //am/pm
	  a: function a(s) {
	    return s.ampm().toUpperCase();
	  },
	  aa: function aa(s) {
	    return s.ampm().toUpperCase();
	  },
	  aaa: function aaa(s) {
	    return s.ampm().toUpperCase();
	  },
	  aaaa: function aaaa(s) {
	    return s.ampm().toUpperCase();
	  },
	  //hour
	  h: function h(s) {
	    return s.h12();
	  },
	  hh: function hh(s) {
	    return pad(s.h12());
	  },
	  H: function H(s) {
	    return s.hour();
	  },
	  HH: function HH(s) {
	    return pad(s.hour());
	  },
	  // j: (s) => {},//weird hour format
	  m: function m(s) {
	    return s.minute();
	  },
	  mm: function mm(s) {
	    return pad(s.minute());
	  },
	  s: function s(_s) {
	    return _s.second();
	  },
	  ss: function ss(s) {
	    return pad(s.second());
	  },
	  //milliseconds in the day
	  A: function A(s) {
	    return s.epoch - s.startOf('day').epoch;
	  },
	  //timezone
	  z: function z(s) {
	    return s.timezone().name;
	  },
	  zz: function zz(s) {
	    return s.timezone().name;
	  },
	  zzz: function zzz(s) {
	    return s.timezone().name;
	  },
	  zzzz: function zzzz(s) {
	    return s.timezone().name;
	  },
	  Z: function Z(s) {
	    return formatTimezone(s.timezone().current.offset);
	  },
	  ZZ: function ZZ(s) {
	    return formatTimezone(s.timezone().current.offset);
	  },
	  ZZZ: function ZZZ(s) {
	    return formatTimezone(s.timezone().current.offset);
	  },
	  ZZZZ: function ZZZZ(s) {
	    return formatTimezone(s.timezone().current.offset, ':');
	  }
	};

	var addAlias = function addAlias(_char, to, n) {
	  var name = _char;
	  var toName = to;

	  for (var i = 0; i < n; i += 1) {
	    mapping[name] = mapping[toName];
	    name += _char;
	    toName += to;
	  }
	};

	addAlias('q', 'Q', 4);
	addAlias('L', 'M', 4);
	addAlias('Y', 'y', 4);
	addAlias('c', 'e', 4);
	addAlias('k', 'H', 2);
	addAlias('K', 'h', 2);
	addAlias('S', 's', 2);
	addAlias('v', 'z', 4);
	addAlias('V', 'Z', 4);

	var unixFmt = function unixFmt(s, str) {
	  var chars = str.split(''); //combine consecutive chars, like 'yyyy' as one.

	  var arr = [chars[0]];
	  var quoteOn = false;

	  for (var i = 1; i < chars.length; i += 1) {
	    //support quoted substrings
	    if (chars[i] === "'") {
	      quoteOn = !quoteOn; //support '', meaning one tick

	      if (quoteOn === true && chars[i + 1] && chars[i + 1] === "'") {
	        quoteOn = true;
	      } else {
	        continue;
	      }
	    } //merge it with the last one


	    if (quoteOn === true || chars[i] === arr[arr.length - 1][0]) {
	      arr[arr.length - 1] += chars[i];
	    } else {
	      arr.push(chars[i]);
	    }
	  }

	  return arr.reduce(function (txt, c) {
	    if (mapping[c] !== undefined) {
	      txt += mapping[c](s) || '';
	    } else {
	      txt += c;
	    }

	    return txt;
	  }, '');
	};

	var unixFmt_1 = unixFmt;

	var units$1 = ['year', 'season', 'quarter', 'month', 'week', 'day', 'quarterHour', 'hour', 'minute'];

	var doUnit = function doUnit(s, k) {
	  var start = s.clone().startOf(k);
	  var end = s.clone().endOf(k);
	  var duration = end.epoch - start.epoch;
	  var percent = (s.epoch - start.epoch) / duration;
	  return parseFloat(percent.toFixed(2));
	}; //how far it is along, from 0-1


	var progress = function progress(s, unit) {
	  if (unit) {
	    unit = fns.normalize(unit);
	    return doUnit(s, unit);
	  }

	  var obj = {};
	  units$1.forEach(function (k) {
	    obj[k] = doUnit(s, k);
	  });
	  return obj;
	};

	var progress_1 = progress;

	var nearest = function nearest(s, unit) {
	  //how far have we gone?
	  var prog = s.progress();
	  unit = fns.normalize(unit); //fix camel-case for this one

	  if (unit === 'quarterhour') {
	    unit = 'quarterHour';
	  }

	  if (prog[unit] !== undefined) {
	    // go forward one?
	    if (prog[unit] > 0.5) {
	      s = s.add(1, unit);
	    } // go to start


	    s = s.startOf(unit);
	  } else if (s.silent === false) {
	    console.warn("no known unit '" + unit + "'");
	  }

	  return s;
	};

	var nearest_1 = nearest;

	//increment until dates are the same
	var climb = function climb(a, b, unit) {
	  var i = 0;
	  a = a.clone();

	  while (a.isBefore(b)) {
	    //do proper, expensive increment to catch all-the-tricks
	    a = a.add(1, unit);
	    i += 1;
	  } //oops, we went too-far..


	  if (a.isAfter(b, unit)) {
	    i -= 1;
	  }

	  return i;
	}; // do a thurough +=1 on the unit, until they match
	// for speed-reasons, only used on day, month, week.


	var diffOne = function diffOne(a, b, unit) {
	  if (a.isBefore(b)) {
	    return climb(a, b, unit);
	  } else {
	    return climb(b, a, unit) * -1; //reverse it
	  }
	};

	var one = diffOne;

	// 2020 - 2019 may be 1 year, or 0 years
	// - '1 year difference' means 366 days during a leap year

	var fastYear = function fastYear(a, b) {
	  var years = b.year() - a.year(); // should we decrement it by 1?

	  a = a.year(b.year());

	  if (a.isAfter(b)) {
	    years -= 1;
	  }

	  return years;
	}; // use a waterfall-method for computing a diff of any 'pre-knowable' units
	// compute years, then compute months, etc..
	// ... then ms-math for any very-small units


	var diff = function diff(a, b) {
	  // an hour is always the same # of milliseconds
	  // so these units can be 'pre-calculated'
	  var msDiff = b.epoch - a.epoch;
	  var obj = {
	    milliseconds: msDiff,
	    seconds: parseInt(msDiff / 1000, 10)
	  };
	  obj.minutes = parseInt(obj.seconds / 60, 10);
	  obj.hours = parseInt(obj.minutes / 60, 10); //do the year

	  var tmp = a.clone();
	  obj.years = fastYear(tmp, b);
	  tmp = a.add(obj.years, 'year'); //there's always 12 months in a year...

	  obj.months = obj.years * 12;
	  tmp = a.add(obj.months, 'month');
	  obj.months += one(tmp, b, 'month'); // there's always atleast 52 weeks in a year..
	  // (month * 4) isn't as close

	  obj.weeks = obj.years * 52;
	  tmp = a.add(obj.weeks, 'week');
	  obj.weeks += one(tmp, b, 'week'); // there's always atleast 7 days in a week

	  obj.days = obj.weeks * 7;
	  tmp = a.add(obj.days, 'day');
	  obj.days += one(tmp, b, 'day');
	  return obj;
	};

	var waterfall = diff;

	var reverseDiff = function reverseDiff(obj) {
	  Object.keys(obj).forEach(function (k) {
	    obj[k] *= -1;
	  });
	  return obj;
	}; // this method counts a total # of each unit, between a, b.
	// '1 month' means 28 days in february
	// '1 year' means 366 days in a leap year


	var main = function main(a, b, unit) {
	  b = fns.beADate(b, a); //reverse values, if necessary

	  var reversed = false;

	  if (a.isAfter(b)) {
	    var tmp = a;
	    a = b;
	    b = tmp;
	    reversed = true;
	  } //compute them all (i know!)


	  var obj = waterfall(a, b);

	  if (reversed) {
	    obj = reverseDiff(obj);
	  } //return just the requested unit


	  if (unit) {
	    //make sure it's plural-form
	    unit = fns.normalize(unit);

	    if (/s$/.test(unit) !== true) {
	      unit += 's';
	    }

	    if (unit === 'dates') {
	      unit = 'days';
	    }

	    return obj[unit];
	  }

	  return obj;
	};

	var diff$1 = main;

	//our conceptual 'break-points' for each unit

	var qualifiers = {
	  months: {
	    almost: 10,
	    over: 4
	  },
	  days: {
	    almost: 25,
	    over: 10
	  },
	  hours: {
	    almost: 20,
	    over: 8
	  },
	  minutes: {
	    almost: 50,
	    over: 20
	  },
	  seconds: {
	    almost: 50,
	    over: 20
	  }
	}; //get number of hours/minutes... between the two dates

	function getDiff(a, b) {
	  var isBefore = a.isBefore(b);
	  var later = isBefore ? b : a;
	  var earlier = isBefore ? a : b;
	  earlier = earlier.clone();
	  var diff = {
	    years: 0,
	    months: 0,
	    days: 0,
	    hours: 0,
	    minutes: 0,
	    seconds: 0
	  };
	  Object.keys(diff).forEach(function (unit) {
	    if (earlier.isSame(later, unit)) {
	      return;
	    }

	    var max = earlier.diff(later, unit);
	    earlier = earlier.add(max, unit);
	    diff[unit] = max;
	  }); //reverse it, if necessary

	  if (isBefore) {
	    Object.keys(diff).forEach(function (u) {
	      if (diff[u] !== 0) {
	        diff[u] *= -1;
	      }
	    });
	  }

	  return diff;
	} // Expects a plural unit arg


	function pluralize(value, unit) {
	  if (value === 1) {
	    unit = unit.slice(0, -1);
	  }

	  return value + ' ' + unit;
	} //create the human-readable diff between the two dates


	var since = function since(start, end) {
	  end = fns.beADate(end, start);
	  var diff = getDiff(start, end);
	  var isNow = Object.keys(diff).every(function (u) {
	    return !diff[u];
	  });

	  if (isNow === true) {
	    return {
	      diff: diff,
	      rounded: 'now',
	      qualified: 'now',
	      precise: 'now'
	    };
	  }

	  var rounded;
	  var qualified;
	  var precise;
	  var englishValues = []; //go through each value and create its text-representation

	  Object.keys(diff).forEach(function (unit, i, units) {
	    var value = Math.abs(diff[unit]);

	    if (value === 0) {
	      return;
	    }

	    var englishValue = pluralize(value, unit);
	    englishValues.push(englishValue);

	    if (!rounded) {
	      rounded = qualified = englishValue;

	      if (i > 4) {
	        return;
	      } //is it a 'almost' something, etc?


	      var nextUnit = units[i + 1];
	      var nextValue = Math.abs(diff[nextUnit]);

	      if (nextValue > qualifiers[nextUnit].almost) {
	        rounded = pluralize(value + 1, unit);
	        qualified = 'almost ' + rounded;
	      } else if (nextValue > qualifiers[nextUnit].over) qualified = 'over ' + englishValue;
	    }
	  }); //make them into a string

	  precise = englishValues.splice(0, 2).join(', '); //handle before/after logic

	  if (start.isAfter(end) === true) {
	    rounded += ' ago';
	    qualified += ' ago';
	    precise += ' ago';
	  } else {
	    rounded = 'in ' + rounded;
	    qualified = 'in ' + qualified;
	    precise = 'in ' + precise;
	  }

	  return {
	    diff: diff,
	    rounded: rounded,
	    qualified: qualified,
	    precise: precise
	  };
	};

	var since_1 = since;

	//https://www.timeanddate.com/calendar/aboutseasons.html
	// Spring - from March 1 to May 31;
	// Summer - from June 1 to August 31;
	// Fall (autumn) - from September 1 to November 30; and,
	// Winter - from December 1 to February 28 (February 29 in a leap year).
	var seasons = {
	  north: [['spring', 2, 1], //spring march 1
	  ['summer', 5, 1], //june 1
	  ['fall', 8, 1], //sept 1
	  ['autumn', 8, 1], //sept 1
	  ['winter', 11, 1] //dec 1
	  ],
	  south: [['fall', 2, 1], //march 1
	  ['autumn', 2, 1], //march 1
	  ['winter', 5, 1], //june 1
	  ['spring', 8, 1], //sept 1
	  ['summer', 11, 1] //dec 1
	  ]
	};

	var quarters = [null, [0, 1], //jan 1
	[3, 1], //apr 1
	[6, 1], //july 1
	[9, 1] //oct 1
	];

	var units$2 = {
	  minute: function minute(s) {
	    walk_1(s, {
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  quarterhour: function quarterhour(s) {
	    var minute = s.minutes();

	    if (minute >= 45) {
	      s = s.minutes(45);
	    } else if (minute >= 30) {
	      s = s.minutes(30);
	    } else if (minute >= 15) {
	      s = s.minutes(15);
	    } else {
	      s = s.minutes(0);
	    }

	    walk_1(s, {
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  hour: function hour(s) {
	    walk_1(s, {
	      minute: 0,
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  day: function day(s) {
	    walk_1(s, {
	      hour: 0,
	      minute: 0,
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  week: function week(s) {
	    var original = s.clone();
	    s = s.day(s._weekStart); //monday

	    if (s.isAfter(original)) {
	      s = s.subtract(1, 'week');
	    }

	    walk_1(s, {
	      hour: 0,
	      minute: 0,
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  month: function month(s) {
	    walk_1(s, {
	      date: 1,
	      hour: 0,
	      minute: 0,
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  quarter: function quarter(s) {
	    var q = s.quarter();

	    if (quarters[q]) {
	      walk_1(s, {
	        month: quarters[q][0],
	        date: quarters[q][1],
	        hour: 0,
	        minute: 0,
	        second: 0,
	        millisecond: 0
	      });
	    }

	    return s;
	  },
	  season: function season(s) {
	    var current = s.season();
	    var hem = 'north';

	    if (s.hemisphere() === 'South') {
	      hem = 'south';
	    }

	    for (var i = 0; i < seasons[hem].length; i++) {
	      if (seasons[hem][i][0] === current) {
	        //winter goes between years
	        var year = s.year();

	        if (current === 'winter' && s.month() < 3) {
	          year -= 1;
	        }

	        walk_1(s, {
	          year: year,
	          month: seasons[hem][i][1],
	          date: seasons[hem][i][2],
	          hour: 0,
	          minute: 0,
	          second: 0,
	          millisecond: 0
	        });
	        return s;
	      }
	    }

	    return s;
	  },
	  year: function year(s) {
	    walk_1(s, {
	      month: 0,
	      date: 1,
	      hour: 0,
	      minute: 0,
	      second: 0,
	      millisecond: 0
	    });
	    return s;
	  },
	  decade: function decade(s) {
	    s = s.startOf('year');
	    var year = s.year();
	    var decade = parseInt(year / 10, 10) * 10;
	    s = s.year(decade);
	    return s;
	  },
	  century: function century(s) {
	    s = s.startOf('year');
	    var year = s.year();
	    var decade = parseInt(year / 100, 10) * 100;
	    s = s.year(decade);
	    return s;
	  }
	};
	units$2.date = units$2.day;

	var startOf = function startOf(a, unit) {
	  var s = a.clone();
	  unit = fns.normalize(unit);

	  if (units$2[unit]) {
	    return units$2[unit](s);
	  }

	  if (unit === 'summer' || unit === 'winter') {
	    s = s.season(unit);
	    return units$2.season(s);
	  }

	  return s;
	}; //piggy-backs off startOf


	var endOf = function endOf(a, unit) {
	  var s = a.clone();
	  unit = fns.normalize(unit);

	  if (units$2[unit]) {
	    s = units$2[unit](s);
	    s = s.add(1, unit);
	    s = s.subtract(1, 'milliseconds');
	    return s;
	  }

	  return s;
	};

	var startOf_1 = {
	  startOf: startOf,
	  endOf: endOf
	};

	var isDay = function isDay(unit) {
	  if (days["short"]().find(function (s) {
	    return s === unit;
	  })) {
	    return true;
	  }

	  if (days["long"]().find(function (s) {
	    return s === unit;
	  })) {
	    return true;
	  }

	  return false;
	}; // return a list of the weeks/months/days between a -> b
	// returns spacetime objects in the timezone of the input


	var every = function every(start) {
	  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	  var end = arguments.length > 2 ? arguments[2] : undefined;

	  if (!unit || !end) {
	    return [];
	  } //cleanup unit param


	  unit = fns.normalize(unit); //cleanup to param

	  end = start.clone().set(end); //swap them, if they're backwards

	  if (start.isAfter(end)) {
	    var tmp = start;
	    start = end;
	    end = tmp;
	  } //support 'every wednesday'


	  var d = start.clone();

	  if (isDay(unit)) {
	    d = d.next(unit);
	    unit = 'week';
	  } else {
	    d = d.next(unit);
	  } //okay, actually start doing it


	  var result = [];

	  while (d.isBefore(end)) {
	    result.push(d);
	    d = d.add(1, unit);
	  }

	  return result;
	};

	var every_1 = every;

	var parseDst = function parseDst(dst) {
	  if (!dst) {
	    return [];
	  }

	  return dst.split('->');
	};

	var titleCase = function titleCase(str) {
	  str = str[0].toUpperCase() + str.substr(1);
	  str = str.replace(/\/gmt/, '/GMT');
	  str = str.replace(/[\/_]([a-z])/gi, function (s) {
	    return s.toUpperCase();
	  });
	  return str;
	}; //get metadata about this timezone


	var timezone = function timezone(s) {
	  var zones = s.timezones;
	  var tz = s.tz;

	  if (zones.hasOwnProperty(tz) === false) {
	    tz = find(s.tz, zones);
	  }

	  if (tz === null) {
	    if (s.silent === false) {
	      console.warn("Warn: could not find given or local timezone - '" + s.tz + "'");
	    }

	    return {
	      current: {
	        epochShift: 0
	      }
	    };
	  }

	  var found = zones[tz];
	  var result = {
	    name: titleCase(tz),
	    hasDst: Boolean(found.dst),
	    default_offset: found.offset,
	    //do north-hemisphere version as default (sorry!)
	    hemisphere: found.hem === 's' ? 'South' : 'North',
	    current: {}
	  };

	  if (result.hasDst) {
	    var arr = parseDst(found.dst);
	    result.change = {
	      start: arr[0],
	      back: arr[1]
	    };
	  } //find the offsets for summer/winter times
	  //(these variable names are north-centric)


	  var summer = found.offset; // (july)

	  var winter = summer; // (january) assume it's the same for now

	  if (result.hasDst === true) {
	    if (result.hemisphere === 'North') {
	      winter = summer - 1;
	    } else {
	      //southern hemisphere
	      winter = found.offset + 1;
	    }
	  } //find out which offset to use right now
	  //use 'summer' time july-time


	  if (result.hasDst === false) {
	    result.current.offset = summer;
	    result.current.isDST = false;
	  } else if (summerTime(s.epoch, result.change.start, result.change.back, summer) === true) {
	    result.current.offset = summer;
	    result.current.isDST = result.hemisphere === 'North'; //dst 'on' in winter in north
	  } else {
	    //use 'winter' january-time
	    result.current.offset = winter;
	    result.current.isDST = result.hemisphere === 'South'; //dst 'on' in summer in south
	  }

	  return result;
	};

	var timezone_1 = timezone;

	var methods = {
	  set: function set(input$1, tz) {
	    var s = this.clone();
	    s = input(s, input$1);

	    if (tz) {
	      this.tz = find(tz);
	    }

	    return s;
	  },
	  timezone: function timezone() {
	    return timezone_1(this);
	  },
	  isDST: function isDST() {
	    return timezone_1(this).current.isDST;
	  },
	  hasDST: function hasDST() {
	    return timezone_1(this).hasDst;
	  },
	  offset: function offset() {
	    return timezone_1(this).current.offset * 60;
	  },
	  hemisphere: function hemisphere() {
	    return timezone_1(this).hemisphere;
	  },
	  format: function format(fmt) {
	    return format_1(this, fmt);
	  },
	  unixFmt: function unixFmt(fmt) {
	    return unixFmt_1(this, fmt);
	  },
	  startOf: function startOf(unit) {
	    return startOf_1.startOf(this, unit);
	  },
	  endOf: function endOf(unit) {
	    return startOf_1.endOf(this, unit);
	  },
	  leapYear: function leapYear() {
	    var year = this.year();
	    return fns.isLeapYear(year);
	  },
	  progress: function progress(unit) {
	    return progress_1(this, unit);
	  },
	  nearest: function nearest(unit) {
	    return nearest_1(this, unit);
	  },
	  diff: function diff(d, unit) {
	    return diff$1(this, d, unit);
	  },
	  since: function since(d) {
	    if (!d) {
	      d = this.clone().set();
	    }

	    return since_1(this, d);
	  },
	  next: function next(unit) {
	    var s = this.add(1, unit);
	    return s.startOf(unit);
	  },
	  //the start of the previous year/week/century
	  last: function last(unit) {
	    var s = this.subtract(1, unit);
	    return s.startOf(unit);
	  },
	  isValid: function isValid() {
	    //null/undefined epochs
	    if (!this.epoch && this.epoch !== 0) {
	      return false;
	    }

	    return !isNaN(this.d.getTime());
	  },
	  //travel to this timezone
	  "goto": function goto(tz) {
	    var s = this.clone();
	    s.tz = find(tz, s.timezones); //science!

	    return s;
	  },
	  //get each week/month/day between a -> b
	  every: function every(unit, to) {
	    return every_1(this, unit, to);
	  },
	  isAwake: function isAwake() {
	    var hour = this.hour(); //10pm -> 8am

	    if (hour < 8 || hour > 22) {
	      return false;
	    }

	    return true;
	  },
	  isAsleep: function isAsleep() {
	    return !this.isAwake();
	  },
	  //pretty-printing
	  log: function log() {
	    console.log('');
	    console.log(format_1(this, 'nice-short'));
	    return this;
	  },
	  logYear: function logYear() {
	    console.log('');
	    console.log(format_1(this, 'full-short'));
	    return this;
	  },
	  debug: function debug() {
	    var tz = this.timezone();
	    var date = this.format('MM') + ' ' + this.format('date-ordinal') + ' ' + this.year();
	    date += '\n     - ' + this.format('time');
	    console.log('\n\n', date + '\n     - ' + tz.name + ' (' + tz.current.offset + ')');
	    return this;
	  },
	  //alias of 'since' but opposite - like moment.js
	  from: function from(d) {
	    d = this.clone().set(d);
	    return d.since(this);
	  },
	  fromNow: function fromNow() {
	    var d = this.clone().set(Date.now());
	    return d.since(this);
	  },
	  weekStart: function weekStart(input) {
	    //accept a number directly
	    if (typeof input === 'number') {
	      this._weekStart = input;
	      return this;
	    }

	    if (typeof input === 'string') {
	      // accept 'wednesday'
	      input = input.toLowerCase().trim();
	      var num = days["short"]().indexOf(input);

	      if (num === -1) {
	        num = days["long"]().indexOf(input);
	      }

	      if (num === -1) {
	        num = 1; //go back to default
	      }

	      this._weekStart = num;
	    } else {
	      console.warn('Spacetime Error: Cannot understand .weekStart() input:', input);
	    }

	    return this;
	  }
	}; // aliases

	methods.inDST = methods.isDST;
	methods.round = methods.nearest;
	methods.each = methods.every;
	var methods_1 = methods;

	//these methods wrap around them.

	var validate = function validate(n) {
	  //handle number as a string
	  if (typeof n === 'string') {
	    n = parseInt(n, 10);
	  }

	  return n;
	};

	var order = ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond']; //reduce hostile micro-changes when moving dates by millisecond

	var confirm = function confirm(s, tmp, unit) {
	  var n = order.indexOf(unit);
	  var arr = order.slice(n, order.length);

	  for (var i = 0; i < arr.length; i++) {
	    var want = tmp[arr[i]]();
	    s[arr[i]](want);
	  }

	  return s;
	};

	var set = {
	  milliseconds: function milliseconds(s, n) {
	    n = validate(n);
	    var current = s.millisecond();
	    var diff = current - n; //milliseconds to shift by

	    return s.epoch - diff;
	  },
	  seconds: function seconds(s, n) {
	    n = validate(n);
	    var diff = s.second() - n;
	    var shift = diff * milliseconds.second;
	    return s.epoch - shift;
	  },
	  minutes: function minutes(s, n) {
	    n = validate(n);
	    var old = s.clone();
	    var diff = s.minute() - n;
	    var shift = diff * milliseconds.minute;
	    s.epoch -= shift;
	    confirm(s, old, 'second');
	    return s.epoch;
	  },
	  hours: function hours(s, n) {
	    n = validate(n);

	    if (n >= 24) {
	      n = 24;
	    } else if (n < 0) {
	      n = 0;
	    }

	    var old = s.clone();
	    var diff = s.hour() - n;
	    var shift = diff * milliseconds.hour;
	    s.epoch -= shift;
	    walk_1(s, {
	      hour: n
	    });
	    confirm(s, old, 'minute');
	    return s.epoch;
	  },
	  //support setting time by '4:25pm' - this isn't very-well developed..
	  time: function time(s, str) {
	    var m = str.match(/([0-9]{1,2}):([0-9]{1,2})(am|pm)?/);

	    if (!m) {
	      //fallback to support just '2am'
	      m = str.match(/([0-9]{1,2})(am|pm)/);

	      if (!m) {
	        return s.epoch;
	      }

	      m.splice(2, 0, '0'); //add implicit 0 minutes
	    }

	    var h24 = false;
	    var hour = parseInt(m[1], 10);
	    var minute = parseInt(m[2], 10);

	    if (hour > 12) {
	      h24 = true;
	    } //make the hour into proper 24h time


	    if (h24 === false) {
	      if (m[3] === 'am' && hour === 12) {
	        //12am is midnight
	        hour = 0;
	      }

	      if (m[3] === 'pm' && hour < 12) {
	        //12pm is noon
	        hour += 12;
	      }
	    }

	    s = s.hour(hour);
	    s = s.minute(minute);
	    s = s.second(0);
	    s = s.millisecond(0);
	    return s.epoch;
	  },
	  date: function date(s, n) {
	    n = validate(n); //avoid setting february 31st

	    if (n > 28) {
	      var max = monthLengths_1[s.month()];

	      if (n > max) {
	        n = max;
	      }
	    } //avoid setting < 0


	    if (n <= 0) {
	      n = 1;
	    }

	    walk_1(s, {
	      date: n
	    });
	    return s.epoch;
	  },
	  //this one's tricky
	  month: function month(s, n) {
	    if (typeof n === 'string') {
	      n = months.mapping()[n.toLowerCase()];
	    }

	    n = validate(n); //don't go past december

	    if (n >= 12) {
	      n = 11;
	    }

	    if (n <= 0) {
	      n = 0;
	    }

	    var date = s.date(); //there's no 30th of february, etc.

	    if (date > monthLengths_1[n]) {
	      //make it as close as we can..
	      date = monthLengths_1[n];
	    }

	    walk_1(s, {
	      month: n,
	      date: date
	    });
	    return s.epoch;
	  },
	  year: function year(s, n) {
	    n = validate(n);
	    walk_1(s, {
	      year: n
	    });
	    return s.epoch;
	  },
	  dayOfYear: function dayOfYear(s, n) {
	    n = validate(n);
	    var old = s.clone();
	    n -= 1; //days are 1-based

	    if (n <= 0) {
	      n = 0;
	    } else if (n >= 365) {
	      n = 364;
	    }

	    s = s.startOf('year');
	    s = s.add(n, 'day');
	    confirm(s, old, 'hour');
	    return s.epoch;
	  }
	};

	var methods$1 = {
	  millisecond: function millisecond(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.milliseconds(s, num);
	      return s;
	    }

	    return this.d.getMilliseconds();
	  },
	  second: function second(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.seconds(s, num);
	      return s;
	    }

	    return this.d.getSeconds();
	  },
	  minute: function minute(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.minutes(s, num);
	      return s;
	    }

	    return this.d.getMinutes();
	  },
	  hour: function hour(num) {
	    var d = this.d;

	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.hours(s, num);
	      return s;
	    }

	    return d.getHours();
	  },
	  //'3:30' is 3.5
	  hourFloat: function hourFloat(num) {
	    if (num !== undefined) {
	      var s = this.clone();

	      var _minute = num % 1;

	      _minute = _minute * 60;

	      var _hour = parseInt(num, 10);

	      s.epoch = set.hours(s, _hour);
	      s.epoch = set.minutes(s, _minute);
	      return s;
	    }

	    var d = this.d;
	    var hour = d.getHours();
	    var minute = d.getMinutes();
	    minute = minute / 60;
	    return hour + minute;
	  },
	  // hour in 12h format
	  hour12: function hour12(str) {
	    var d = this.d;

	    if (str !== undefined) {
	      var s = this.clone();
	      str = '' + str;
	      var m = str.match(/^([0-9]+)(am|pm)$/);

	      if (m) {
	        var hour = parseInt(m[1], 10);

	        if (m[2] === 'pm') {
	          hour += 12;
	        }

	        s.epoch = set.hours(s, hour);
	      }

	      return s;
	    } //get the hour


	    var hour12 = d.getHours();

	    if (hour12 > 12) {
	      hour12 = hour12 - 12;
	    }

	    if (hour12 === 0) {
	      hour12 = 12;
	    }

	    return hour12;
	  },
	  //some ambiguity here with 12/24h
	  time: function time(str) {
	    if (str !== undefined) {
	      var s = this.clone();
	      s.epoch = set.time(s, str);
	      return s;
	    }

	    return "".concat(this.h12(), ":").concat(fns.zeroPad(this.minute())).concat(this.ampm());
	  },
	  // either 'am' or 'pm'
	  ampm: function ampm(input) {
	    var which = 'am';
	    var hour = this.hour();

	    if (hour >= 12) {
	      which = 'pm';
	    }

	    if (typeof input !== 'string') {
	      return which;
	    } //okay, we're doing a setter


	    var s = this.clone();
	    input = input.toLowerCase().trim(); //ampm should never change the day
	    // - so use `.hour(n)` instead of `.minus(12,'hour')`

	    if (hour >= 12 && input === 'am') {
	      //noon is 12pm
	      hour -= 12;
	      return s.hour(hour);
	    }

	    if (hour < 12 && input === 'pm') {
	      hour += 12;
	      return s.hour(hour);
	    }

	    return s;
	  },
	  //some hard-coded times of day, like 'noon'
	  dayTime: function dayTime(str) {
	    if (str !== undefined) {
	      var times = {
	        morning: '7:00am',
	        breakfast: '7:00am',
	        noon: '12:00am',
	        lunch: '12:00pm',
	        afternoon: '2:00pm',
	        evening: '6:00pm',
	        dinner: '6:00pm',
	        night: '11:00pm',
	        midnight: '23:59pm'
	      };
	      var s = this.clone();
	      str = str || '';
	      str = str.toLowerCase();

	      if (times.hasOwnProperty(str) === true) {
	        s = s.time(times[str]);
	      }

	      return s;
	    }

	    var h = this.hour();

	    if (h < 6) {
	      return 'night';
	    }

	    if (h < 12) {
	      //until noon
	      return 'morning';
	    }

	    if (h < 17) {
	      //until 5pm
	      return 'afternoon';
	    }

	    if (h < 22) {
	      //until 10pm
	      return 'evening';
	    }

	    return 'night';
	  },
	  //parse a proper iso string
	  iso: function iso(num) {
	    if (num !== undefined) {
	      return this.set(num);
	    }

	    return this.format('iso');
	  }
	};
	var _01Time = methods$1;

	var methods$2 = {
	  // # day in the month
	  date: function date(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.date(s, num);
	      return s;
	    }

	    return this.d.getDate();
	  },
	  //like 'wednesday' (hard!)
	  day: function day(input) {
	    if (input === undefined) {
	      return this.d.getDay();
	    }

	    var original = this.clone();
	    var want = input; // accept 'wednesday'

	    if (typeof input === 'string') {
	      input = input.toLowerCase();
	      want = days["short"]().indexOf(input);

	      if (want === -1) {
	        want = days["long"]().indexOf(input);
	      }
	    } //move approx


	    var day = this.d.getDay();
	    var diff = day - want;
	    var s = this.subtract(diff * 24, 'hours'); //tighten it back up

	    walk_1(s, {
	      hour: original.hour(),
	      minute: original.minute(),
	      second: original.second()
	    });
	    return s;
	  },
	  //these are helpful name-wrappers
	  dayName: function dayName(input) {
	    if (input === undefined) {
	      return days["long"]()[this.day()];
	    }

	    var s = this.clone();
	    s = s.day(input);
	    return s;
	  },
	  //either name or number
	  month: function month(input) {
	    if (input !== undefined) {
	      var s = this.clone();
	      s.epoch = set.month(s, input);
	      return s;
	    }

	    return this.d.getMonth();
	  }
	};
	var _02Date = methods$2;

	var clearMinutes = function clearMinutes(s) {
	  s = s.minute(0);
	  s = s.second(0);
	  s = s.millisecond(1);
	  return s;
	};

	var methods$3 = {
	  // day 0-366
	  dayOfYear: function dayOfYear(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.dayOfYear(s, num);
	      return s;
	    } //days since newyears - jan 1st is 1, jan 2nd is 2...


	    var sum = 0;
	    var month = this.d.getMonth();
	    var tmp; //count the num days in each month

	    for (var i = 1; i <= month; i++) {
	      tmp = new Date();
	      tmp.setDate(1);
	      tmp.setYear(this.d.getFullYear()); //the year matters, because leap-years

	      tmp.setHours(1);
	      tmp.setMinutes(1);
	      tmp.setMonth(i);
	      tmp.setHours(-2); //the last day of the month

	      sum += tmp.getDate();
	    }

	    return sum + this.d.getDate();
	  },
	  //since the start of the year
	  week: function week(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s = s.month(0);
	      s = s.date(1);
	      s = s.day('monday');
	      s = clearMinutes(s); //don't go into last-year

	      if (s.monthName() === 'december') {
	        s = s.add(1, 'week');
	      }

	      num -= 1; //1-based

	      s = s.add(num, 'weeks');
	      return s;
	    } //find-out which week it is


	    var tmp = this.clone();
	    tmp = tmp.month(0);
	    tmp = tmp.date(1);
	    tmp = clearMinutes(tmp);
	    tmp = tmp.day('monday'); //don't go into last-year

	    if (tmp.monthName() === 'december') {
	      tmp = tmp.add(1, 'week');
	    }

	    var thisOne = this.epoch; //if the week technically hasn't started yet

	    if (tmp.epoch > thisOne) {
	      return 1;
	    } //speed it up, if we can


	    var i = 0;
	    var skipWeeks = this.month() * 4;
	    tmp.epoch += milliseconds.week * skipWeeks;
	    i += skipWeeks;

	    for (; i < 52; i++) {
	      if (tmp.epoch > thisOne) {
	        return i;
	      }

	      tmp = tmp.add(1, 'week');
	    }

	    return 52;
	  },
	  //'january'
	  monthName: function monthName(input) {
	    if (input === undefined) {
	      return months["long"]()[this.month()];
	    }

	    var s = this.clone();
	    s = s.month(input);
	    return s;
	  },
	  //q1, q2, q3, q4
	  quarter: function quarter(num) {
	    if (num !== undefined) {
	      if (typeof num === 'string') {
	        num = num.replace(/^q/i, '');
	        num = parseInt(num, 10);
	      }

	      if (quarters[num]) {
	        var s = this.clone();
	        var _month = quarters[num][0];
	        s = s.month(_month);
	        s = s.date(1);
	        s = s.startOf('day');
	        return s;
	      }
	    }

	    var month = this.d.getMonth();

	    for (var i = 1; i < quarters.length; i++) {
	      if (month < quarters[i][0]) {
	        return i - 1;
	      }
	    }

	    return 4;
	  },
	  //spring, summer, winter, fall
	  season: function season(input) {
	    var hem = 'north';

	    if (this.hemisphere() === 'South') {
	      hem = 'south';
	    }

	    if (input !== undefined) {
	      var s = this.clone();

	      for (var i = 0; i < seasons[hem].length; i++) {
	        if (input === seasons[hem][i][0]) {
	          s = s.month(seasons[hem][i][1]);
	          s = s.date(1);
	          s = s.startOf('day');
	        }
	      }

	      return s;
	    }

	    var month = this.d.getMonth();

	    for (var _i = 0; _i < seasons[hem].length - 1; _i++) {
	      if (month >= seasons[hem][_i][1] && month < seasons[hem][_i + 1][1]) {
	        return seasons[hem][_i][0];
	      }
	    }

	    return 'winter';
	  },
	  //the year number
	  year: function year(num) {
	    if (num !== undefined) {
	      var s = this.clone();
	      s.epoch = set.year(s, num);
	      return s;
	    }

	    return this.d.getFullYear();
	  },
	  //bc/ad years
	  era: function era(str) {
	    if (str !== undefined) {
	      var s = this.clone();
	      str = str.toLowerCase(); //TODO: there is no year-0AD i think. may have off-by-1 error here

	      var year = s.d.getFullYear(); //make '1992' into 1992bc..

	      if (str === 'bc' && year > 0) {
	        s.epoch = set.year(s, year * -1);
	      } //make '1992bc' into '1992'


	      if (str === 'ad' && year < 0) {
	        s.epoch = set.year(s, year * -1);
	      }

	      return s;
	    }

	    if (this.d.getFullYear() < 0) {
	      return 'BC';
	    }

	    return 'AD';
	  }
	};
	var _03Year = methods$3;

	var methods$4 = Object.assign({}, _01Time, _02Date, _03Year); //aliases

	methods$4.milliseconds = methods$4.millisecond;
	methods$4.seconds = methods$4.second;
	methods$4.minutes = methods$4.minute;
	methods$4.hours = methods$4.hour;
	methods$4.hour24 = methods$4.hour;
	methods$4.h12 = methods$4.hour12;
	methods$4.h24 = methods$4.hour24;
	methods$4.days = methods$4.day;

	var addMethods = function addMethods(Space) {
	  //hook the methods into prototype
	  Object.keys(methods$4).forEach(function (k) {
	    Space.prototype[k] = methods$4[k];
	  });
	};

	var query = addMethods;

	var order$1 = ['millisecond', 'second', 'minute', 'hour', 'date', 'month'];
	var keep = {
	  second: order$1.slice(0, 1),
	  minute: order$1.slice(0, 2),
	  quarterhour: order$1.slice(0, 2),
	  hour: order$1.slice(0, 3),
	  date: order$1.slice(0, 4),
	  month: order$1.slice(0, 4),
	  quarter: order$1.slice(0, 4),
	  season: order$1.slice(0, 4),
	  year: order$1,
	  decade: order$1,
	  century: order$1
	};
	keep.week = keep.hour;
	keep.season = keep.date;
	keep.quarter = keep.date; // Units need to be dst adjuested

	var dstAwareUnits = {
	  year: true,
	  quarter: true,
	  season: true,
	  month: true,
	  week: true,
	  day: true
	};
	var keepDate = {
	  month: true,
	  quarter: true,
	  season: true,
	  year: true
	}; //month is the only thing we 'model/compute'
	//- because ms-shifting can be off by enough

	var rollMonth = function rollMonth(want, old) {
	  //increment year
	  if (want.month > 0) {
	    var years = parseInt(want.month / 12, 10);
	    want.year = old.year() + years;
	    want.month = want.month % 12;
	  } else if (want.month < 0) {
	    //decrement year
	    var _years = Math.floor(Math.abs(want.month) / 13, 10);

	    _years = Math.abs(_years) + 1;
	    want.year = old.year() - _years; //ignore extras

	    want.month = want.month % 12;
	    want.month = want.month + 12;

	    if (want.month === 12) {
	      want.month = 0;
	    }
	  }

	  return want;
	};

	var addMethods$1 = function addMethods(SpaceTime) {
	  SpaceTime.prototype.add = function (num, unit) {
	    var s = this.clone();

	    if (!unit || num === 0) {
	      return s; //don't bother
	    }

	    var old = this.clone();
	    unit = fns.normalize(unit); //move forward by the estimated milliseconds (rough)

	    if (milliseconds[unit]) {
	      s.epoch += milliseconds[unit] * num;
	    } else if (unit === 'week') {
	      s.epoch += milliseconds.day * (num * 7);
	    } else if (unit === 'quarter' || unit === 'season') {
	      s.epoch += milliseconds.month * (num * 4);
	    } else if (unit === 'season') {
	      s.epoch += milliseconds.month * (num * 4);
	    } else if (unit === 'quarterhour') {
	      s.epoch += milliseconds.minute * 15 * num;
	    } //now ensure our milliseconds/etc are in-line


	    var want = {};

	    if (keep[unit]) {
	      keep[unit].forEach(function (u) {
	        want[u] = old[u]();
	      });
	    }

	    if (dstAwareUnits[unit]) {
	      var diff = old.timezone().current.offset - s.timezone().current.offset;
	      s.epoch += diff * 3600 * 1000;
	    } //ensure month/year has ticked-over


	    if (unit === 'month') {
	      want.month = old.month() + num; //month is the one unit we 'model' directly

	      want = rollMonth(want, old);
	    } //support coercing a week, too


	    if (unit === 'week') {
	      var sum = old.date() + num * 7;

	      if (sum <= 28 && sum > 1) {
	        want.date = sum;
	      }
	    } //support 25-hour day-changes on dst-changes
	    else if (unit === 'date') {
	        //specify a naive date number, if it's easy to do...
	        var _sum = old.date() + num;

	        if (_sum <= 28 && _sum > 1) {
	          want.date = _sum;
	        } //or if we haven't moved at all..
	        else if (num !== 0 && old.isSame(s, 'day')) {
	            want.date = old.date() + num;
	          }
	      } //ensure year has changed (leap-years)
	      else if (unit === 'year' && s.year() === old.year()) {
	          s.epoch += milliseconds.week;
	        } //these are easier
	        else if (unit === 'decade') {
	            want.year = s.year() + 10;
	          } else if (unit === 'century') {
	            want.year = s.year() + 100;
	          } //keep current date, unless the month doesn't have it.


	    if (keepDate[unit]) {
	      var max = monthLengths_1[want.month];
	      want.date = old.date();

	      if (want.date > max) {
	        want.date = max;
	      }
	    }

	    walk_1(s, want);
	    return s;
	  }; //subtract is only add *-1


	  SpaceTime.prototype.subtract = function (num, unit) {
	    var s = this.clone();
	    return s.add(num * -1, unit);
	  }; //add aliases


	  SpaceTime.prototype.minus = SpaceTime.prototype.subtract;
	  SpaceTime.prototype.plus = SpaceTime.prototype.add;
	};

	var add = addMethods$1;

	//make a string, for easy comparison between dates
	var print = {
	  millisecond: function millisecond(s) {
	    return s.epoch;
	  },
	  second: function second(s) {
	    return [s.year(), s.month(), s.date(), s.hour(), s.minute(), s.second()].join('-');
	  },
	  minute: function minute(s) {
	    return [s.year(), s.month(), s.date(), s.hour(), s.minute()].join('-');
	  },
	  hour: function hour(s) {
	    return [s.year(), s.month(), s.date(), s.hour()].join('-');
	  },
	  day: function day(s) {
	    return [s.year(), s.month(), s.date()].join('-');
	  },
	  week: function week(s) {
	    return [s.year(), s.week()].join('-');
	  },
	  month: function month(s) {
	    return [s.year(), s.month()].join('-');
	  },
	  quarter: function quarter(s) {
	    return [s.year(), s.quarter()].join('-');
	  },
	  year: function year(s) {
	    return s.year();
	  }
	};
	print.date = print.day;

	var addMethods$2 = function addMethods(SpaceTime) {
	  SpaceTime.prototype.isSame = function (b, unit) {
	    var a = this;

	    if (!unit) {
	      return null;
	    }

	    if (typeof b === 'string' || typeof b === 'number') {
	      b = new SpaceTime(b, this.timezone.name);
	    } //support 'seconds' aswell as 'second'


	    unit = unit.replace(/s$/, '');

	    if (print[unit]) {
	      return print[unit](a) === print[unit](b);
	    }

	    return null;
	  };
	};

	var same = addMethods$2;

	var addMethods$3 = function addMethods(SpaceTime) {
	  var methods = {
	    isAfter: function isAfter(d) {
	      d = fns.beADate(d, this);
	      var epoch = fns.getEpoch(d);

	      if (epoch === null) {
	        return null;
	      }

	      return this.epoch > epoch;
	    },
	    isBefore: function isBefore(d) {
	      d = fns.beADate(d, this);
	      var epoch = fns.getEpoch(d);

	      if (epoch === null) {
	        return null;
	      }

	      return this.epoch < epoch;
	    },
	    isEqual: function isEqual(d) {
	      d = fns.beADate(d, this);
	      var epoch = fns.getEpoch(d);

	      if (epoch === null) {
	        return null;
	      }

	      return this.epoch === epoch;
	    },
	    isBetween: function isBetween(start, end) {
	      start = fns.beADate(start, this);
	      end = fns.beADate(end, this);
	      var startEpoch = fns.getEpoch(start);

	      if (startEpoch === null) {
	        return null;
	      }

	      var endEpoch = fns.getEpoch(end);

	      if (endEpoch === null) {
	        return null;
	      }

	      return startEpoch < this.epoch && this.epoch < endEpoch;
	    }
	  }; //hook them into proto

	  Object.keys(methods).forEach(function (k) {
	    SpaceTime.prototype[k] = methods[k];
	  });
	};

	var compare = addMethods$3;

	var addMethods$4 = function addMethods(SpaceTime) {
	  var methods = {
	    i18n: function i18n(data) {
	      //change the day names
	      if (fns.isObject(data.days)) {
	        days.set(data.days);
	      } //change the month names


	      if (fns.isObject(data.months)) {
	        months.set(data.months);
	      }
	    }
	  }; //hook them into proto

	  Object.keys(methods).forEach(function (k) {
	    SpaceTime.prototype[k] = methods[k];
	  });
	};

	var i18n = addMethods$4;

	var timezones = unpack; //fake timezone-support, for fakers (es5 class)

	var SpaceTime = function SpaceTime(input$1, tz) {
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  //the holy moment
	  this.epoch = null; //the shift for the given timezone

	  this.tz = find(tz, timezones); //whether to output warnings to console

	  this.silent = options.silent || true; //does the week start on sunday, or monday:

	  this._weekStart = 1; //default to monday

	  if (options.weekStart !== undefined) {
	    this._weekStart = options.weekStart;
	  } //add getter/setters


	  Object.defineProperty(this, 'd', {
	    //return a js date object
	    get: function get() {
	      var offset = quick(this); //every computer is somewhere- get this computer's built-in offset

	      var bias = new Date(this.epoch).getTimezoneOffset() || 0; //movement

	      var shift = bias + offset * 60; //in minutes

	      shift = shift * 60 * 1000; //in ms
	      //remove this computer's offset

	      var epoch = this.epoch + shift;
	      var d = new Date(epoch);
	      return d;
	    }
	  }); //add this data on the object, to allow adding new timezones

	  Object.defineProperty(this, 'timezones', {
	    get: function get() {
	      return timezones;
	    },
	    set: function set(obj) {
	      timezones = obj;
	      return obj;
	    }
	  }); //parse the various formats

	  if (input$1 !== undefined || input$1 === null) {
	    var tmp = input(this, input$1, tz);
	    this.epoch = tmp.epoch;
	  }
	}; //(add instance methods to prototype)


	Object.keys(methods_1).forEach(function (k) {
	  SpaceTime.prototype[k] = methods_1[k];
	}); // ¯\_(ツ)_/¯

	SpaceTime.prototype.clone = function () {
	  return new SpaceTime(this.epoch, this.tz, {
	    silent: this.silent,
	    weekStart: this._weekStart
	  });
	}; //append more methods


	query(SpaceTime);
	add(SpaceTime);
	same(SpaceTime);
	compare(SpaceTime);
	i18n(SpaceTime);
	var spacetime = SpaceTime;

	var whereIts = function whereIts(a, b) {
	  var start = new spacetime(null);
	  var end = new spacetime(null);
	  start = start.time(a); //if b is undefined, use as 'within one hour'

	  if (b) {
	    end = end.time(b);
	  } else {
	    end = start.add(59, 'minutes');
	  }

	  var startHour = start.hour();
	  var endHour = end.hour();
	  var tzs = Object.keys(start.timezones).filter(function (tz) {
	    if (tz.indexOf('/') === -1) {
	      return false;
	    }

	    var m = new spacetime(null, tz);
	    var hour = m.hour(); //do 'calendar-compare' not real-time-compare

	    if (hour >= startHour && hour <= endHour) {
	      //test minutes too, if applicable
	      if (hour === startHour && m.minute() < start.minute()) {
	        return false;
	      }

	      if (hour === endHour && m.minute() > end.minute()) {
	        return false;
	      }

	      return true;
	    }

	    return false;
	  });
	  return tzs;
	};

	var whereIts_1 = whereIts;

	var _version = '6.1.0';

	var main$1 = function main(input, tz, options) {
	  return new spacetime(input, tz, options);
	}; //some helper functions on the main method


	main$1.now = function (tz, options) {
	  return new spacetime(new Date().getTime(), tz, options);
	};

	main$1.today = function (tz, options) {
	  var s = new spacetime(new Date().getTime(), tz, options);
	  return s.startOf('day');
	};

	main$1.tomorrow = function (tz, options) {
	  var s = new spacetime(new Date().getTime(), tz, options);
	  return s.add(1, 'day').startOf('day');
	};

	main$1.yesterday = function (tz, options) {
	  var s = new spacetime(new Date().getTime(), tz, options);
	  return s.subtract(1, 'day').startOf('day');
	};

	main$1.extend = function (obj) {
	  Object.keys(obj).forEach(function (k) {
	    spacetime.prototype[k] = obj[k];
	  });
	  return this;
	}; //find tz by time


	main$1.whereIts = whereIts_1;
	main$1.version = _version; //aliases:

	main$1.plugin = main$1.extend;
	var src = main$1;

	return src;

}));


},{}],48:[function(_dereq_,module,exports){
(function (global){
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).spencerColor=e()}}(function(){return function u(i,a,c){function f(r,e){if(!a[r]){if(!i[r]){var o="function"==typeof _dereq_&&_dereq_;if(!e&&o)return o(r,!0);if(d)return d(r,!0);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}var t=a[r]={exports:{}};i[r][0].call(t.exports,function(e){return f(i[r][1][e]||e)},t,t.exports,u,i,a,c)}return a[r].exports}for(var d="function"==typeof _dereq_&&_dereq_,e=0;e<c.length;e++)f(c[e]);return f}({1:[function(e,r,o){"use strict";r.exports={blue:"#6699cc",green:"#6accb2",yellow:"#e1e6b3",red:"#cc7066",pink:"#F2C0BB",brown:"#705E5C",orange:"#cc8a66",purple:"#d8b3e6",navy:"#335799",olive:"#7f9c6c",fuscia:"#735873",beige:"#e6d7b3",slate:"#8C8C88",suede:"#9c896c",burnt:"#603a39",sea:"#50617A",sky:"#2D85A8",night:"#303b50",rouge:"#914045",grey:"#838B91",mud:"#C4ABAB",royal:"#275291",cherry:"#cc6966",tulip:"#e6b3bc",rose:"#D68881",fire:"#AB5850",greyblue:"#72697D",greygreen:"#8BA3A2",greypurple:"#978BA3",burn:"#6D5685",slategrey:"#bfb0b3",light:"#a3a5a5",lighter:"#d7d5d2",fudge:"#4d4d4d",lightgrey:"#949a9e",white:"#fbfbfb",dimgrey:"#606c74",softblack:"#463D4F",dark:"#443d3d",black:"#333333"}},{}],2:[function(e,r,o){"use strict";var n=e("./colors"),t={juno:["blue","mud","navy","slate","pink","burn"],barrow:["rouge","red","orange","burnt","brown","greygreen"],roma:["#8a849a","#b5b0bf","rose","lighter","greygreen","mud"],palmer:["red","navy","olive","pink","suede","sky"],mark:["#848f9a","#9aa4ac","slate","#b0b8bf","mud","grey"],salmon:["sky","sea","fuscia","slate","mud","fudge"],dupont:["green","brown","orange","red","olive","blue"],bloor:["night","navy","beige","rouge","mud","grey"],yukon:["mud","slate","brown","sky","beige","red"],david:["blue","green","yellow","red","pink","light"],neste:["mud","cherry","royal","rouge","greygreen","greypurple"],ken:["red","sky","#c67a53","greygreen","#dfb59f","mud"]};Object.keys(t).forEach(function(e){t[e]=t[e].map(function(e){return n[e]||e})}),r.exports=t},{"./colors":1}],3:[function(e,r,o){"use strict";var n=e("./colors"),t=e("./combos"),u={colors:n,list:Object.keys(n).map(function(e){return n[e]}),combos:t};r.exports=u},{"./colors":1,"./combos":2}]},{},[3])(3)});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],49:[function(_dereq_,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.vhtml = factory());
}(this, (function () { 'use strict';

var emptyTags = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

var esc = function esc(str) {
	return String(str).replace(/[&<>"']/g, function (s) {
		return '&' + map[s] + ';';
	});
};
var map = { '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', "'": 'apos' };

var sanitized = {};

function h(name, attrs) {
	var stack = [];
	for (var i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}

	if (typeof name === 'function') {
		(attrs || (attrs = {})).children = stack.reverse();
		return name(attrs);
	}

	var s = '<' + name;
	if (attrs) for (var _i in attrs) {
		if (attrs[_i] !== false && attrs[_i] != null) {
			s += ' ' + esc(_i) + '="' + esc(attrs[_i]) + '"';
		}
	}

	if (emptyTags.indexOf(name) === -1) {
		s += '>';

		while (stack.length) {
			var child = stack.pop();
			if (child) {
				if (child.pop) {
					for (var _i2 = child.length; _i2--;) {
						stack.push(child[_i2]);
					}
				} else {
					s += sanitized[child] === true ? child : esc(child);
				}
			}
		}

		s += '</' + name + '>';
	} else {
		s += '>';
	}

	sanitized[s] = true;
	return s;
}

return h;

})));


},{}],50:[function(_dereq_,module,exports){
"use strict";

var reduceTo = function reduceTo(arr, n) {
  if (arr.length <= n || arr.length <= 5) {
    return arr;
  }

  while (arr.length > n) {
    //remove every other one
    arr = arr.filter(function (o, i) {
      return i % 2 === 0;
    });

    if (arr.length <= n || arr.length <= 5) {
      return arr;
    }
  }

  return arr;
};

module.exports = reduceTo;

},{}],51:[function(_dereq_,module,exports){
"use strict";

var spacetime = _dereq_('spacetime');

var methods = _dereq_('./methods');

var version = _dereq_('../_version');

var chooseMethod = function chooseMethod(start, end) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;
  var diff = start.diff(end);

  if (diff.years > 300) {
    return methods.centuries(start, end, n);
  }

  if (diff.years > 30) {
    return methods.decades(start, end, n);
  }

  if (diff.years > 3) {
    return methods.years(start, end, n);
  }

  if (diff.months > 3) {
    return methods.months(start, end, n);
  }

  if (diff.days > 3) {
    return methods.days(start, end, n);
  }

  if (diff.hours > 3) {
    return methods.hours(start, end, n);
  }

  if (diff.minutes > 3) {
    return methods.minutes(start, end, n);
  }

  return methods.months(start, end, n);
}; //flip it around backwards


var reverseTicks = function reverseTicks(ticks) {
  ticks = ticks.map(function (o) {
    o.value = 1 - o.value;
    return o;
  });
  return ticks.reverse();
};

var spacetimeTicks = function spacetimeTicks(start, end) {
  var n = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;
  var reverse = false;
  start = spacetime(start);
  end = spacetime(end); //reverse them, if necessary

  if (start.epoch > end.epoch) {
    reverse = true;
    var tmp = start.epoch;
    start.epoch = end.epoch;
    end.epoch = tmp;
  } // nudge first one back 1 minute


  if (start.time() === '12:00am') {
    start = start.minus(1, 'minute');
  }

  var ticks = chooseMethod(start, end, n); //support backwards ticks

  if (reverse === true) {
    ticks = reverseTicks(ticks);
  }

  return ticks;
};

spacetimeTicks.version = version;
module.exports = spacetimeTicks;

},{"../_version":1,"./methods":52,"spacetime":47}],52:[function(_dereq_,module,exports){
"use strict";

var reduceTo = _dereq_('./_reduce'); //increment by this unit


var allTicks = function allTicks(start, end, unit) {
  var ticks = [];
  start = start.add(1, unit);
  start = start.startOf(unit);

  while (start.isBefore(end)) {
    ticks.push(start);
    start = start.add(1, unit);
  }

  return ticks;
};

var formatTicks = function formatTicks(arr, fmt, start, end) {
  var delta = end.epoch - start.epoch;
  return arr.map(function (s) {
    var percent = (s.epoch - start.epoch) / delta;
    return {
      label: s.format(fmt),
      epoch: s.epoch,
      value: parseInt(percent * 1000, 10) / 1000
    };
  });
};

var methods = {
  centuries: function centuries(start, end, n) {
    var ticks = allTicks(start, end, 'century');
    ticks = reduceTo(ticks, n);
    var fmt = '{year}';

    if (start.diff(end, 'year') > 6) {
      fmt = '{year}';
    }

    ticks = formatTicks(ticks, fmt, start, end);
    return ticks;
  },
  decades: function decades(start, end, n) {
    var ticks = allTicks(start, end, 'decade');
    ticks = reduceTo(ticks, n);
    var fmt = '{year}';

    if (start.diff(end, 'year') > 6) {
      fmt = '{year}';
    }

    ticks = formatTicks(ticks, fmt, start, end);
    return ticks;
  },
  years: function years(start, end, n) {
    var ticks = allTicks(start, end, 'year');
    ticks = reduceTo(ticks, n);
    var fmt = '{month-short} {year-short}';

    if (start.diff(end, 'year') > 6) {
      fmt = '{year}';
    }

    ticks = formatTicks(ticks, fmt, start, end);
    return ticks;
  },
  months: function months(start, end, n) {
    var ticks = allTicks(start, end, 'month');
    ticks = reduceTo(ticks, n);
    var fmt = '{month-short} {date}';

    if (start.isSame(end, 'year') === false) {
      fmt = '{month-short} {year}';
    }

    ticks = formatTicks(ticks, fmt, start, end);
    return ticks;
  },
  days: function days(start, end, n) {
    var ticks = allTicks(start, end, 'day');
    ticks = reduceTo(ticks, n);
    var fmt = '{month-short} {date}';
    ticks = formatTicks(ticks, fmt, start, end);
    return ticks;
  },
  hours: function hours(start, end, n) {
    var ticks = allTicks(start, end, 'hour');
    ticks = reduceTo(ticks, n);
    var fmt = '{time}';

    if (start.isSame(end, 'day') === false) {
      fmt = '{day-short} {hour}{ampm}';
    }

    ticks = formatTicks(ticks, fmt, start, end);
    return ticks;
  },
  minutes: function minutes(start, end, n) {
    var ticks = allTicks(start, end, 'minute');
    ticks = reduceTo(ticks, n);
    var fmt = '{time}';
    ticks = formatTicks(ticks, fmt, start, end);
    return ticks;
  }
};
module.exports = methods;

},{"./_reduce":50}]},{},[5]);
