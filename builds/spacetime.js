/* @smallwins/spacetime v0.0.1
  
*/
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.spacetime = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

/**
 * Module dependencies.
 */

var colors = _dereq_('colors/safe')
  , utils = _dereq_('./utils')
  , repeat = utils.repeat
  , truncate = utils.truncate
  , pad = utils.pad;

/**
 * Table constructor
 *
 * @param {Object} options
 * @api public
 */

function Table (options){
  this.options = utils.options({
      chars: {
          'top': '─'
        , 'top-mid': '┬'
        , 'top-left': '┌'
        , 'top-right': '┐'
        , 'bottom': '─'
        , 'bottom-mid': '┴'
        , 'bottom-left': '└'
        , 'bottom-right': '┘'
        , 'left': '│'
        , 'left-mid': '├'
        , 'mid': '─'
        , 'mid-mid': '┼'
        , 'right': '│'
        , 'right-mid': '┤'
        , 'middle': '│'
      }
    , truncate: '…'
    , colWidths: []
    , colAligns: []
    , style: {
          'padding-left': 1
        , 'padding-right': 1
        , head: ['red']
        , border: ['grey']
        , compact : false
      }
    , head: []
  }, options);
};

/**
 * Inherit from Array.
 */

Table.prototype.__proto__ = Array.prototype;

/**
 * Width getter
 *
 * @return {Number} width
 * @api public
 */

Table.prototype.__defineGetter__('width', function (){
  var str = this.toString().split("\n");
  if (str.length) return str[0].length;
  return 0;
});

/**
 * Render to a string.
 *
 * @return {String} table representation
 * @api public
 */

Table.prototype.render
Table.prototype.toString = function (){
  var ret = ''
    , options = this.options
    , style = options.style
    , head = options.head
    , chars = options.chars
    , truncater = options.truncate
      , colWidths = options.colWidths || new Array(this.head.length)
      , totalWidth = 0;

    if (!head.length && !this.length) return '';

    if (!colWidths.length){
      var all_rows = this.slice(0);
      if (head.length) { all_rows = all_rows.concat([head]) };

      all_rows.forEach(function(cells){
        // horizontal (arrays)
        if (typeof cells === 'object' && cells.length) {
          extractColumnWidths(cells);

        // vertical (objects)
        } else {
          var header_cell = Object.keys(cells)[0]
            , value_cell = cells[header_cell];

          colWidths[0] = Math.max(colWidths[0] || 0, get_width(header_cell) || 0);

          // cross (objects w/ array values)
          if (typeof value_cell === 'object' && value_cell.length) {
            extractColumnWidths(value_cell, 1);
          } else {
            colWidths[1] = Math.max(colWidths[1] || 0, get_width(value_cell) || 0);
          }
        }
    });
  };

  totalWidth = (colWidths.length == 1 ? colWidths[0] : colWidths.reduce(
    function (a, b){
      return a + b
    })) + colWidths.length + 1;

  function extractColumnWidths(arr, offset) {
    var offset = offset || 0;
    arr.forEach(function(cell, i){
      colWidths[i + offset] = Math.max(colWidths[i + offset] || 0, get_width(cell) || 0);
    });
  };

  function get_width(obj) {
    return typeof obj == 'object' && obj.width != undefined
         ? obj.width
         : ((typeof obj == 'object' ? utils.strlen(obj.text) : utils.strlen(obj)) + (style['padding-left'] || 0) + (style['padding-right'] || 0))
  }

  // draws a line
  function line (line, left, right, intersection){
    var width = 0
      , line =
          left
        + repeat(line, totalWidth - 2)
        + right;

    colWidths.forEach(function (w, i){
      if (i == colWidths.length - 1) return;
      width += w + 1;
      line = line.substr(0, width) + intersection + line.substr(width + 1);
    });

    return applyStyles(options.style.border, line);
  };

  // draws the top line
  function lineTop (){
    var l = line(chars.top
               , chars['top-left'] || chars.top
               , chars['top-right'] ||  chars.top
               , chars['top-mid']);
    if (l)
      ret += l + "\n";
  };

  function generateRow (items, style) {
    var cells = []
      , max_height = 0;

    // prepare vertical and cross table data
    if (!Array.isArray(items) && typeof items === "object") {
      var key = Object.keys(items)[0]
        , value = items[key]
        , first_cell_head = true;

      if (Array.isArray(value)) {
        items = value;
        items.unshift(key);
      } else {
        items = [key, value];
      }
    }

    // transform array of item strings into structure of cells
    items.forEach(function (item, i) {
      var contents = item.toString().split("\n").reduce(function (memo, l) {
        memo.push(string(l, i));
        return memo;
      }, [])

      var height = contents.length;
      if (height > max_height) { max_height = height };

      cells.push({ contents: contents , height: height });
    });

    // transform vertical cells into horizontal lines
    var lines = new Array(max_height);
    cells.forEach(function (cell, i) {
      cell.contents.forEach(function (line, j) {
        if (!lines[j]) { lines[j] = [] };
        if (style || (first_cell_head && i === 0 && options.style.head)) {
          line = applyStyles(options.style.head, line)
        }

        lines[j].push(line);
      });

      // populate empty lines in cell
      for (var j = cell.height, l = max_height; j < l; j++) {
        if (!lines[j]) { lines[j] = [] };
        lines[j].push(string('', i));
      }
    });
    var ret = "";
    lines.forEach(function (line, index) {
      if (ret.length > 0) {
        ret += "\n" + applyStyles(options.style.border, chars.left);
      }

      ret += line.join(applyStyles(options.style.border, chars.middle)) + applyStyles(options.style.border, chars.right);
    });

    return applyStyles(options.style.border, chars.left) + ret;
  };

  function applyStyles(styles, subject) {
    if (!subject)
      return '';
    styles.forEach(function(style) {
      subject = colors[style](subject);
    });
    return subject;
  };

  // renders a string, by padding it or truncating it
  function string (str, index){
    var str = String(typeof str == 'object' && str.text ? str.text : str)
      , length = utils.strlen(str)
      , width = colWidths[index]
          - (style['padding-left'] || 0)
          - (style['padding-right'] || 0)
      , align = options.colAligns[index] || 'left';

    return repeat(' ', style['padding-left'] || 0)
         + (length == width ? str :
             (length < width
              ? pad(str, ( width + (str.length - length) ), ' ', align == 'left' ? 'right' :
                  (align == 'middle' ? 'both' : 'left'))
              : (truncater ? truncate(str, width, truncater) : str))
           )
         + repeat(' ', style['padding-right'] || 0);
  };

  if (head.length){
    lineTop();

    ret += generateRow(head, style.head) + "\n"
  }

  if (this.length)
    this.forEach(function (cells, i){
      if (!head.length && i == 0)
        lineTop();
      else {
        if (!style.compact || i<(!!head.length) ?1:0 || cells.length == 0){
          var l = line(chars.mid
                     , chars['left-mid']
                     , chars['right-mid']
                     , chars['mid-mid']);
          if (l)
            ret += l + "\n"
        }
      }

      if (cells.hasOwnProperty("length") && !cells.length) {
        return
      } else {
        ret += generateRow(cells) + "\n";
      };
    });

  var l = line(chars.bottom
             , chars['bottom-left'] || chars.bottom
             , chars['bottom-right'] || chars.bottom
             , chars['bottom-mid']);
  if (l)
    ret += l;
  else
    // trim the last '\n' if we didn't add the bottom decoration
    ret = ret.slice(0, -1);

  return ret;
};

/**
 * Module exports.
 */

module.exports = Table;

module.exports.version = '0.0.1';

},{"./utils":2,"colors/safe":12}],2:[function(_dereq_,module,exports){

/**
 * Repeats a string.
 *
 * @param {String} char(s)
 * @param {Number} number of times
 * @return {String} repeated string
 */

exports.repeat = function (str, times){
  return Array(times + 1).join(str);
};

/**
 * Pads a string
 *
 * @api public
 */

exports.pad = function (str, len, pad, dir) {
  if (len + 1 >= str.length)
    switch (dir){
      case 'left':
        str = Array(len + 1 - str.length).join(pad) + str;
        break;

      case 'both':
        var right = Math.ceil((padlen = len - str.length) / 2);
        var left = padlen - right;
        str = Array(left + 1).join(pad) + str + Array(right + 1).join(pad);
        break;

      default:
        str = str + Array(len + 1 - str.length).join(pad);
    };

  return str;
};

/**
 * Truncates a string
 *
 * @api public
 */

exports.truncate = function (str, length, chr){
  chr = chr || '…';
  return str.length >= length ? str.substr(0, length - chr.length) + chr : str;
};

/**
 * Copies and merges options with defaults.
 *
 * @param {Object} defaults
 * @param {Object} supplied options
 * @return {Object} new (merged) object
 */

function options(defaults, opts) {
  for (var p in opts) {
    if (opts[p] && opts[p].constructor && opts[p].constructor === Object) {
      defaults[p] = defaults[p] || {};
      options(defaults[p], opts[p]);
    } else {
      defaults[p] = opts[p];
    }
  }
  return defaults;
};
exports.options = options;

//
// For consideration of terminal "color" programs like colors.js,
// which can add ANSI escape color codes to strings,
// we destyle the ANSI color escape codes for padding calculations.
//
// see: http://en.wikipedia.org/wiki/ANSI_escape_code
//
exports.strlen = function(str){
  var code = /\u001b\[(?:\d*;){0,5}\d*m/g;
  var stripped = ("" + str).replace(code,'');
  var split = stripped.split("\n");
  return split.reduce(function (memo, s) { return (s.length > memo) ? s.length : memo }, 0);
}

},{}],3:[function(_dereq_,module,exports){
/*

The MIT License (MIT)

Original Library 
  - Copyright (c) Marak Squires

Additional functionality
 - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var colors = {};
module['exports'] = colors;

colors.themes = {};

var ansiStyles = colors.styles = _dereq_('./styles');
var defineProps = Object.defineProperties;

colors.supportsColor = _dereq_('./system/supports-colors');

if (typeof colors.enabled === "undefined") {
  colors.enabled = colors.supportsColor;
}

colors.stripColors = colors.strip = function(str){
  return ("" + str).replace(/\x1B\[\d+m/g, '');
};


var stylize = colors.stylize = function stylize (str, style) {
  return ansiStyles[style].open + str + ansiStyles[style].close;
}

var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
var escapeStringRegexp = function (str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str.replace(matchOperatorsRe,  '\\$&');
}

function build(_styles) {
  var builder = function builder() {
    return applyStyle.apply(builder, arguments);
  };
  builder._styles = _styles;
  // __proto__ is used because we must return a function, but there is
  // no way to create a function with a different prototype.
  builder.__proto__ = proto;
  return builder;
}

var styles = (function () {
  var ret = {};
  ansiStyles.grey = ansiStyles.gray;
  Object.keys(ansiStyles).forEach(function (key) {
    ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
    ret[key] = {
      get: function () {
        return build(this._styles.concat(key));
      }
    };
  });
  return ret;
})();

var proto = defineProps(function colors() {}, styles);

function applyStyle() {
  var args = arguments;
  var argsLen = args.length;
  var str = argsLen !== 0 && String(arguments[0]);
  if (argsLen > 1) {
    for (var a = 1; a < argsLen; a++) {
      str += ' ' + args[a];
    }
  }

  if (!colors.enabled || !str) {
    return str;
  }

  var nestedStyles = this._styles;

  var i = nestedStyles.length;
  while (i--) {
    var code = ansiStyles[nestedStyles[i]];
    str = code.open + str.replace(code.closeRe, code.open) + code.close;
  }

  return str;
}

function applyTheme (theme) {
  for (var style in theme) {
    (function(style){
      colors[style] = function(str){
        return colors[theme[style]](str);
      };
    })(style)
  }
}

colors.setTheme = function (theme) {
  if (typeof theme === 'string') {
    try {
      colors.themes[theme] = _dereq_(theme);
      applyTheme(colors.themes[theme]);
      return colors.themes[theme];
    } catch (err) {
      console.log(err);
      return err;
    }
  } else {
    applyTheme(theme);
  }
};

function init() {
  var ret = {};
  Object.keys(styles).forEach(function (name) {
    ret[name] = {
      get: function () {
        return build([name]);
      }
    };
  });
  return ret;
}

var sequencer = function sequencer (map, str) {
  var exploded = str.split(""), i = 0;
  exploded = exploded.map(map);
  return exploded.join("");
};

// custom formatter methods
colors.trap = _dereq_('./custom/trap');
colors.zalgo = _dereq_('./custom/zalgo');

// maps
colors.maps = {};
colors.maps.america = _dereq_('./maps/america');
colors.maps.zebra = _dereq_('./maps/zebra');
colors.maps.rainbow = _dereq_('./maps/rainbow');
colors.maps.random = _dereq_('./maps/random')

for (var map in colors.maps) {
  (function(map){
    colors[map] = function (str) {
      return sequencer(colors.maps[map], str);
    }
  })(map)
}

defineProps(colors, init());
},{"./custom/trap":4,"./custom/zalgo":5,"./maps/america":6,"./maps/rainbow":7,"./maps/random":8,"./maps/zebra":9,"./styles":10,"./system/supports-colors":11}],4:[function(_dereq_,module,exports){
module['exports'] = function runTheTrap (text, options) {
  var result = "";
  text = text || "Run the trap, drop the bass";
  text = text.split('');
  var trap = {
    a: ["\u0040", "\u0104", "\u023a", "\u0245", "\u0394", "\u039b", "\u0414"],
    b: ["\u00df", "\u0181", "\u0243", "\u026e", "\u03b2", "\u0e3f"],
    c: ["\u00a9", "\u023b", "\u03fe"],
    d: ["\u00d0", "\u018a", "\u0500" , "\u0501" ,"\u0502", "\u0503"],
    e: ["\u00cb", "\u0115", "\u018e", "\u0258", "\u03a3", "\u03be", "\u04bc", "\u0a6c"],
    f: ["\u04fa"],
    g: ["\u0262"],
    h: ["\u0126", "\u0195", "\u04a2", "\u04ba", "\u04c7", "\u050a"],
    i: ["\u0f0f"],
    j: ["\u0134"],
    k: ["\u0138", "\u04a0", "\u04c3", "\u051e"],
    l: ["\u0139"],
    m: ["\u028d", "\u04cd", "\u04ce", "\u0520", "\u0521", "\u0d69"],
    n: ["\u00d1", "\u014b", "\u019d", "\u0376", "\u03a0", "\u048a"],
    o: ["\u00d8", "\u00f5", "\u00f8", "\u01fe", "\u0298", "\u047a", "\u05dd", "\u06dd", "\u0e4f"],
    p: ["\u01f7", "\u048e"],
    q: ["\u09cd"],
    r: ["\u00ae", "\u01a6", "\u0210", "\u024c", "\u0280", "\u042f"],
    s: ["\u00a7", "\u03de", "\u03df", "\u03e8"],
    t: ["\u0141", "\u0166", "\u0373"],
    u: ["\u01b1", "\u054d"],
    v: ["\u05d8"],
    w: ["\u0428", "\u0460", "\u047c", "\u0d70"],
    x: ["\u04b2", "\u04fe", "\u04fc", "\u04fd"],
    y: ["\u00a5", "\u04b0", "\u04cb"],
    z: ["\u01b5", "\u0240"]
  }
  text.forEach(function(c){
    c = c.toLowerCase();
    var chars = trap[c] || [" "];
    var rand = Math.floor(Math.random() * chars.length);
    if (typeof trap[c] !== "undefined") {
      result += trap[c][rand];
    } else {
      result += c;
    }
  });
  return result;

}

},{}],5:[function(_dereq_,module,exports){
// please no
module['exports'] = function zalgo(text, options) {
  text = text || "   he is here   ";
  var soul = {
    "up" : [
      '̍', '̎', '̄', '̅',
      '̿', '̑', '̆', '̐',
      '͒', '͗', '͑', '̇',
      '̈', '̊', '͂', '̓',
      '̈', '͊', '͋', '͌',
      '̃', '̂', '̌', '͐',
      '̀', '́', '̋', '̏',
      '̒', '̓', '̔', '̽',
      '̉', 'ͣ', 'ͤ', 'ͥ',
      'ͦ', 'ͧ', 'ͨ', 'ͩ',
      'ͪ', 'ͫ', 'ͬ', 'ͭ',
      'ͮ', 'ͯ', '̾', '͛',
      '͆', '̚'
    ],
    "down" : [
      '̖', '̗', '̘', '̙',
      '̜', '̝', '̞', '̟',
      '̠', '̤', '̥', '̦',
      '̩', '̪', '̫', '̬',
      '̭', '̮', '̯', '̰',
      '̱', '̲', '̳', '̹',
      '̺', '̻', '̼', 'ͅ',
      '͇', '͈', '͉', '͍',
      '͎', '͓', '͔', '͕',
      '͖', '͙', '͚', '̣'
    ],
    "mid" : [
      '̕', '̛', '̀', '́',
      '͘', '̡', '̢', '̧',
      '̨', '̴', '̵', '̶',
      '͜', '͝', '͞',
      '͟', '͠', '͢', '̸',
      '̷', '͡', ' ҉'
    ]
  },
  all = [].concat(soul.up, soul.down, soul.mid),
  zalgo = {};

  function randomNumber(range) {
    var r = Math.floor(Math.random() * range);
    return r;
  }

  function is_char(character) {
    var bool = false;
    all.filter(function (i) {
      bool = (i === character);
    });
    return bool;
  }
  

  function heComes(text, options) {
    var result = '', counts, l;
    options = options || {};
    options["up"] = options["up"] || true;
    options["mid"] = options["mid"] || true;
    options["down"] = options["down"] || true;
    options["size"] = options["size"] || "maxi";
    text = text.split('');
    for (l in text) {
      if (is_char(l)) {
        continue;
      }
      result = result + text[l];
      counts = {"up" : 0, "down" : 0, "mid" : 0};
      switch (options.size) {
      case 'mini':
        counts.up = randomNumber(8);
        counts.min = randomNumber(2);
        counts.down = randomNumber(8);
        break;
      case 'maxi':
        counts.up = randomNumber(16) + 3;
        counts.min = randomNumber(4) + 1;
        counts.down = randomNumber(64) + 3;
        break;
      default:
        counts.up = randomNumber(8) + 1;
        counts.mid = randomNumber(6) / 2;
        counts.down = randomNumber(8) + 1;
        break;
      }

      var arr = ["up", "mid", "down"];
      for (var d in arr) {
        var index = arr[d];
        for (var i = 0 ; i <= counts[index]; i++) {
          if (options[index]) {
            result = result + soul[index][randomNumber(soul[index].length)];
          }
        }
      }
    }
    return result;
  }
  // don't summon him
  return heComes(text);
}

},{}],6:[function(_dereq_,module,exports){
var colors = _dereq_('../colors');

module['exports'] = (function() {
  return function (letter, i, exploded) {
    if(letter === " ") return letter;
    switch(i%3) {
      case 0: return colors.red(letter);
      case 1: return colors.white(letter)
      case 2: return colors.blue(letter)
    }
  }
})();
},{"../colors":3}],7:[function(_dereq_,module,exports){
var colors = _dereq_('../colors');

module['exports'] = (function () {
  var rainbowColors = ['red', 'yellow', 'green', 'blue', 'magenta']; //RoY G BiV
  return function (letter, i, exploded) {
    if (letter === " ") {
      return letter;
    } else {
      return colors[rainbowColors[i++ % rainbowColors.length]](letter);
    }
  };
})();


},{"../colors":3}],8:[function(_dereq_,module,exports){
var colors = _dereq_('../colors');

module['exports'] = (function () {
  var available = ['underline', 'inverse', 'grey', 'yellow', 'red', 'green', 'blue', 'white', 'cyan', 'magenta'];
  return function(letter, i, exploded) {
    return letter === " " ? letter : colors[available[Math.round(Math.random() * (available.length - 1))]](letter);
  };
})();
},{"../colors":3}],9:[function(_dereq_,module,exports){
var colors = _dereq_('../colors');

module['exports'] = function (letter, i, exploded) {
  return i % 2 === 0 ? letter : colors.inverse(letter);
};
},{"../colors":3}],10:[function(_dereq_,module,exports){
/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var styles = {};
module['exports'] = styles;

var codes = {
  reset: [0, 0],

  bold: [1, 22],
  dim: [2, 22],
  italic: [3, 23],
  underline: [4, 24],
  inverse: [7, 27],
  hidden: [8, 28],
  strikethrough: [9, 29],

  black: [30, 39],
  red: [31, 39],
  green: [32, 39],
  yellow: [33, 39],
  blue: [34, 39],
  magenta: [35, 39],
  cyan: [36, 39],
  white: [37, 39],
  gray: [90, 39],
  grey: [90, 39],

  bgBlack: [40, 49],
  bgRed: [41, 49],
  bgGreen: [42, 49],
  bgYellow: [43, 49],
  bgBlue: [44, 49],
  bgMagenta: [45, 49],
  bgCyan: [46, 49],
  bgWhite: [47, 49],

  // legacy styles for colors pre v1.0.0
  blackBG: [40, 49],
  redBG: [41, 49],
  greenBG: [42, 49],
  yellowBG: [43, 49],
  blueBG: [44, 49],
  magentaBG: [45, 49],
  cyanBG: [46, 49],
  whiteBG: [47, 49]

};

Object.keys(codes).forEach(function (key) {
  var val = codes[key];
  var style = styles[key] = [];
  style.open = '\u001b[' + val[0] + 'm';
  style.close = '\u001b[' + val[1] + 'm';
});
},{}],11:[function(_dereq_,module,exports){
(function (process){
/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

var argv = process.argv;

module.exports = (function () {
  if (argv.indexOf('--no-color') !== -1 ||
    argv.indexOf('--color=false') !== -1) {
    return false;
  }

  if (argv.indexOf('--color') !== -1 ||
    argv.indexOf('--color=true') !== -1 ||
    argv.indexOf('--color=always') !== -1) {
    return true;
  }

  if (process.stdout && !process.stdout.isTTY) {
    return false;
  }

  if (process.platform === 'win32') {
    return true;
  }

  if ('COLORTERM' in process.env) {
    return true;
  }

  if (process.env.TERM === 'dumb') {
    return false;
  }

  if (/^screen|^xterm|^vt100|color|ansi|cygwin|linux/i.test(process.env.TERM)) {
    return true;
  }

  return false;
})();
}).call(this,_dereq_('_process'))
},{"_process":14}],12:[function(_dereq_,module,exports){
//
// Remark: Requiring this file will use the "safe" colors API which will not touch String.prototype
//
//   var colors = require('colors/safe);
//   colors.red("foo")
//
//
var colors = _dereq_('./lib/colors');
module['exports'] = colors;
},{"./lib/colors":3}],13:[function(_dereq_,module,exports){
;(function() {

// so, the only way we (reliably) get access to DST in javascript
// is via `Date#getTimezoneOffset`.
//
// this value will switch for a given date based on the presence or absence
// of DST at that date.

function find_dst_threshold (near, far) {
  var near_date = new Date(near)
    , far_date = new Date(far)
    , near_offs = near_date.getTimezoneOffset()
    , far_offs = far_date.getTimezoneOffset()

  if(near_offs === far_offs) return 0

  if(Math.abs(near_date - far_date) < 1000) return near_date

  return find_dst_threshold(near, near+(far-near)/2) || find_dst_threshold(near+(far-near)/2, far)
}


function find_dst_thresholds() {
  var d = new Date()
    , d = new Date(d.getFullYear(), 0, 1)
    , f = new Date(d.getFullYear(), 11, 31)
    , x
    , first
    , second

  x = (f - d) / -2
  first = find_dst_threshold(+d, d - x)
  second = find_dst_threshold(d - x, +f)

  return {
    spring_forward  : first ? (first.getTimezoneOffset() < second.getTimezoneOffset() ? second : first) - new Date(d.getFullYear(), 0, 1, 0, 0) : 0
  , fall_back       : first ? (first.getTimezoneOffset() < second.getTimezoneOffset() ? first : second) - new Date(d.getFullYear(), 0, 1, 0, 0) : 0
  }
}

var THRESHOLDS = find_dst_thresholds()

function is_dst(datetime, thresholds) {

  thresholds = thresholds || THRESHOLDS

  if(thresholds.spring_forward === thresholds.fall_back)
    return false

  var offset = datetime - new Date(datetime.getFullYear(), 0, 1, 0, 0)
    , dst_is_reversed = thresholds.spring_forward > thresholds.fall_back
    , max = Math.max(thresholds.fall_back, thresholds.spring_forward)
    , min = Math.min(thresholds.fall_back, thresholds.spring_forward)

  if(min < offset && offset < max)
    return !dst_is_reversed
  return dst_is_reversed
}

Date.prototype.isDST = function(thresholds) {
  return is_dst(this, thresholds) 
}

is_dst.find_thresholds = find_dst_thresholds

if(typeof module !== 'undefined') {
  module.exports = is_dst
} else {
  window.is_dst = is_dst 
}

})()

},{}],14:[function(_dereq_,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],15:[function(_dereq_,module,exports){
module.exports={
  "name": "@smallwins/spacetime",
  "version": "0.0.1",
  "description": "represent dates in remote timezones",
  "main": "./builds/spacetime.js",
  "license": "UNLICENSED",
  "scripts": {
    "build": "node ./scripts/build.js",
    "demo": "node ./scripts/demo.js",
    "watch": "node ./scripts/watch.js",
    "test": "./node_modules/tape/bin/tape ./test/**/*.test.js | ./node_modules/tap-spec/bin/cmd.js",
    "coverage": "node ./scripts/coverage.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/smallwins/spacetime.git"
  },
  "files": [
    "builds/"
  ],
  "dependencies": {
    "cli-table": "^0.3.1",
    "dst": "0.0.4"
  },
  "devDependencies": {
    "babel-preset-es2015": "6.9.0",
    "babel-preset-stage-2": "^6.11.0",
    "babelify": "7.3.0",
    "browserify": "13.0.1",
    "derequire": "^2.0.3",
    "eslint": "^3.1.1",
    "gaze": "^1.1.1",
    "shelljs": "^0.7.2",
    "tap-spec": "4.1.1",
    "tape": "4.6.0",
    "nyc": "^8.4.0",
    "uglify-js": "2.7.0"
  }
}

},{}],16:[function(_dereq_,module,exports){
'use strict';
//every computer is somewhere, and this effects their interpretation in the date object
//find the offset this computer has

var getBias = function getBias() {
  //get it with the new es6 Intl method
  // if (typeof Intl !== 'undefined') {
  //   let tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // }
  var d = new Date();
  return d.getTimezoneOffset() || 0;
};
module.exports = getBias;

},{}],17:[function(_dereq_,module,exports){
'use strict';

var dst = _dereq_('dst');
var timezones = _dereq_('./timezones');

var getOffset = function getOffset(tz) {
  if (!tz) {
    return 0;
  }
  //get offset from timezone file
  var offset = timezones[tz] || 0;

  //add another hour to offset if dst is currently off (in winter)
  //this is not perfect, but it handles us + europe mostly.
  var inDst = dst(new Date());
  if (inDst === false) {
    offset -= 60;
  }
  return offset;
};
module.exports = getOffset;

},{"./timezones":18,"dst":13}],18:[function(_dereq_,module,exports){
'use strict';

//https://github.com/substack/timezone-name-offsets
module.exports = {
  'Africa/Abidjan': 0,
  'Africa/Accra': 0,
  'Africa/Addis_Ababa': 180,
  'Africa/Algiers': 60,
  'Africa/Asmara': 180,
  'Africa/Asmera': 180,
  'Africa/Bamako': 0,
  'Africa/Bangui': 60,
  'Africa/Banjul': 0,
  'Africa/Bissau': 0,
  'Africa/Blantyre': 120,
  'Africa/Brazzaville': 60,
  'Africa/Bujumbura': 120,
  'Africa/Cairo': 120,
  'Africa/Casablanca': 60,
  'Africa/Ceuta': 120,
  'Africa/Conakry': 0,
  'Africa/Dakar': 0,
  'Africa/Dar_es_Salaam': 180,
  'Africa/Djibouti': 180,
  'Africa/Douala': 60,
  'Africa/El_Aaiun': 60,
  'Africa/Freetown': 0,
  'Africa/Gaborone': 120,
  'Africa/Harare': 120,
  'Africa/Johannesburg': 120,
  'Africa/Juba': 180,
  'Africa/Kampala': 180,
  'Africa/Khartoum': 180,
  'Africa/Kigali': 120,
  'Africa/Kinshasa': 60,
  'Africa/Lagos': 60,
  'Africa/Libreville': 60,
  'Africa/Lome': 0,
  'Africa/Luanda': 60,
  'Africa/Lubumbashi': 120,
  'Africa/Lusaka': 120,
  'Africa/Malabo': 60,
  'Africa/Maputo': 120,
  'Africa/Maseru': 120,
  'Africa/Mbabane': 120,
  'Africa/Mogadishu': 180,
  'Africa/Monrovia': 0,
  'Africa/Nairobi': 180,
  'Africa/Ndjamena': 60,
  'Africa/Niamey': 60,
  'Africa/Nouakchott': 0,
  'Africa/Ouagadougou': 0,
  'Africa/Porto-Novo': 60,
  'Africa/Sao_Tome': 0,
  'Africa/Timbuktu': 0,
  'Africa/Tripoli': 120,
  'Africa/Tunis': 60,
  'Africa/Windhoek': 60,
  'America/Adak': -540,
  'America/Anchorage': -480,
  'America/Anguilla': -240,
  'America/Antigua': -240,
  'America/Araguaina': -180,
  'America/Argentina/Buenos_Aires': -180,
  'America/Argentina/Catamarca': -180,
  'America/Argentina/ComodRivadavia': -180,
  'America/Argentina/Cordoba': -180,
  'America/Argentina/Jujuy': -180,
  'America/Argentina/La_Rioja': -180,
  'America/Argentina/Mendoza': -180,
  'America/Argentina/Rio_Gallegos': -180,
  'America/Argentina/Salta': -180,
  'America/Argentina/San_Juan': -180,
  'America/Argentina/San_Luis': -180,
  'America/Argentina/Tucuman': -180,
  'America/Argentina/Ushuaia': -180,
  'America/Aruba': -240,
  'America/Asuncion': -240,
  'America/Atikokan': -300,
  'America/Atka': -540,
  'America/Bahia': -180,
  'America/Bahia_Banderas': -300,
  'America/Barbados': -240,
  'America/Belem': -180,
  'America/Belize': -360,
  'America/Blanc-Sablon': -240,
  'America/Boa_Vista': -240,
  'America/Bogota': -300,
  'America/Boise': -360,
  'America/Buenos_Aires': -180,
  'America/Cambridge_Bay': -360,
  'America/Campo_Grande': -240,
  'America/Cancun': -300,
  'America/Caracas': -270,
  'America/Catamarca': -180,
  'America/Cayenne': -180,
  'America/Cayman': -300,
  'America/Chicago': -300,
  'America/Chihuahua': -360,
  'America/Coral_Harbour': -300,
  'America/Cordoba': -180,
  'America/Costa_Rica': -360,
  'America/Creston': -420,
  'America/Cuiaba': -240,
  'America/Curacao': -240,
  'America/Danmarkshavn': 0,
  'America/Dawson': -420,
  'America/Dawson_Creek': -420,
  'America/Denver': -360,
  'America/Detroit': -240,
  'America/Dominica': -240,
  'America/Edmonton': -360,
  'America/Eirunepe': -300,
  'America/El_Salvador': -360,
  'America/Ensenada': -420,
  'America/Fort_Wayne': -240,
  'America/Fortaleza': -180,
  'America/Glace_Bay': -180,
  'America/Godthab': -120,
  'America/Goose_Bay': -180,
  'America/Grand_Turk': -240,
  'America/Grenada': -240,
  'America/Guadeloupe': -240,
  'America/Guatemala': -360,
  'America/Guayaquil': -300,
  'America/Guyana': -240,
  'America/Halifax': -180,
  'America/Havana': -240,
  'America/Hermosillo': -420,
  'America/Indiana/Indianapolis': -240,
  'America/Indiana/Knox': -300,
  'America/Indiana/Marengo': -240,
  'America/Indiana/Petersburg': -240,
  'America/Indiana/Tell_City': -300,
  'America/Indiana/Vevay': -240,
  'America/Indiana/Vincennes': -240,
  'America/Indiana/Winamac': -240,
  'America/Indianapolis': -240,
  'America/Inuvik': -360,
  'America/Iqaluit': -240,
  'America/Jamaica': -300,
  'America/Jujuy': -180,
  'America/Juneau': -480,
  'America/Kentucky/Louisville': -240,
  'America/Kentucky/Monticello': -240,
  'America/Knox_IN': -300,
  'America/Kralendijk': -240,
  'America/La_Paz': -240,
  'America/Lima': -300,
  'America/Los_Angeles': -420,
  'America/Louisville': -240,
  'America/Lower_Princes': -240,
  'America/Maceio': -180,
  'America/Managua': -360,
  'America/Manaus': -240,
  'America/Marigot': -240,
  'America/Martinique': -240,
  'America/Matamoros': -300,
  'America/Mazatlan': -360,
  'America/Mendoza': -180,
  'America/Menominee': -300,
  'America/Merida': -300,
  'America/Metlakatla': -480,
  'America/Mexico_City': -300,
  'America/Miquelon': -120,
  'America/Moncton': -180,
  'America/Monterrey': -300,
  'America/Montevideo': -180,
  'America/Montreal': -240,
  'America/Montserrat': -240,
  'America/Nassau': -240,
  'America/New_York': -240,
  'America/Nipigon': -240,
  'America/Nome': -480,
  'America/Noronha': -120,
  'America/North_Dakota/Beulah': -300,
  'America/North_Dakota/Center': -300,
  'America/North_Dakota/New_Salem': -300,
  'America/Ojinaga': -360,
  'America/Panama': -300,
  'America/Pangnirtung': -240,
  'America/Paramaribo': -180,
  'America/Phoenix': -420,
  'America/Port-au-Prince': -240,
  'America/Port_of_Spain': -240,
  'America/Porto_Acre': -300,
  'America/Porto_Velho': -240,
  'America/Puerto_Rico': -240,
  'America/Rainy_River': -300,
  'America/Rankin_Inlet': -300,
  'America/Recife': -180,
  'America/Regina': -360,
  'America/Resolute': -300,
  'America/Rio_Branco': -300,
  'America/Rosario': -180,
  'America/Santa_Isabel': -420,
  'America/Santarem': -180,
  'America/Santiago': -180,
  'America/Santo_Domingo': -240,
  'America/Sao_Paulo': -180,
  'America/Scoresbysund': 0,
  'America/Shiprock': -360,
  'America/Sitka': -480,
  'America/St_Barthelemy': -240,
  'America/St_Johns': -150,
  'America/St_Kitts': -240,
  'America/St_Lucia': -240,
  'America/St_Thomas': -240,
  'America/St_Vincent': -240,
  'America/Swift_Current': -360,
  'America/Tegucigalpa': -360,
  'America/Thule': -180,
  'America/Thunder_Bay': -240,
  'America/Tijuana': -420,
  'America/Toronto': -240,
  'America/Tortola': -240,
  'America/Vancouver': -420,
  'America/Virgin': -240,
  'America/Whitehorse': -420,
  'America/Winnipeg': -300,
  'America/Yakutat': -480,
  'America/Yellowknife': -360,
  'Antarctica/Casey': 480,
  'Antarctica/Davis': 420,
  'Antarctica/DumontDUrville': 600,
  'Antarctica/Macquarie': 660,
  'Antarctica/Mawson': 300,
  'Antarctica/McMurdo': 720,
  'Antarctica/Palmer': -180,
  'Antarctica/Rothera': -180,
  'Antarctica/South_Pole': 720,
  'Antarctica/Syowa': 180,
  'Antarctica/Troll': 120,
  'Antarctica/Vostok': 360,
  'Arctic/Longyearbyen': 120,
  'Asia/Aden': 180,
  'Asia/Almaty': 360,
  'Asia/Amman': 180,
  'Asia/Anadyr': 720,
  'Asia/Aqtau': 300,
  'Asia/Aqtobe': 300,
  'Asia/Ashgabat': 300,
  'Asia/Ashkhabad': 300,
  'Asia/Baghdad': 180,
  'Asia/Bahrain': 180,
  'Asia/Baku': 300,
  'Asia/Bangkok': 420,
  'Asia/Beirut': 180,
  'Asia/Bishkek': 360,
  'Asia/Brunei': 480,
  'Asia/Calcutta': 330,
  'Asia/Chita': 480,
  'Asia/Choibalsan': 480,
  'Asia/Chongqing': 480,
  'Asia/Chungking': 480,
  'Asia/Colombo': 330,
  'Asia/Dacca': 360,
  'Asia/Damascus': 180,
  'Asia/Dhaka': 360,
  'Asia/Dili': 540,
  'Asia/Dubai': 240,
  'Asia/Dushanbe': 300,
  'Asia/Gaza': 180,
  'Asia/Harbin': 480,
  'Asia/Hebron': 180,
  'Asia/Ho_Chi_Minh': 420,
  'Asia/Hong_Kong': 480,
  'Asia/Hovd': 420,
  'Asia/Irkutsk': 480,
  'Asia/Istanbul': 180,
  'Asia/Jakarta': 420,
  'Asia/Jayapura': 540,
  'Asia/Jerusalem': 180,
  'Asia/Kabul': 270,
  'Asia/Kamchatka': 720,
  'Asia/Karachi': 300,
  'Asia/Kashgar': 360,
  'Asia/Kathmandu': 345,
  'Asia/Katmandu': 345,
  'Asia/Khandyga': 540,
  'Asia/Kolkata': 330,
  'Asia/Krasnoyarsk': 420,
  'Asia/Kuala_Lumpur': 480,
  'Asia/Kuching': 480,
  'Asia/Kuwait': 180,
  'Asia/Macao': 480,
  'Asia/Macau': 480,
  'Asia/Magadan': 600,
  'Asia/Makassar': 480,
  'Asia/Manila': 480,
  'Asia/Muscat': 240,
  'Asia/Nicosia': 180,
  'Asia/Novokuznetsk': 420,
  'Asia/Novosibirsk': 360,
  'Asia/Omsk': 360,
  'Asia/Oral': 300,
  'Asia/Phnom_Penh': 420,
  'Asia/Pontianak': 420,
  'Asia/Pyongyang': 540,
  'Asia/Qatar': 180,
  'Asia/Qyzylorda': 360,
  'Asia/Rangoon': 390,
  'Asia/Riyadh': 180,
  'Asia/Saigon': 420,
  'Asia/Sakhalin': 600,
  'Asia/Samarkand': 300,
  'Asia/Seoul': 540,
  'Asia/Shanghai': 480,
  'Asia/Singapore': 480,
  'Asia/Srednekolymsk': 660,
  'Asia/Taipei': 480,
  'Asia/Tashkent': 300,
  'Asia/Tbilisi': 240,
  'Asia/Tehran': 270,
  'Asia/Tel_Aviv': 180,
  'Asia/Thimbu': 360,
  'Asia/Thimphu': 360,
  'Asia/Tokyo': 540,
  'Asia/Ujung_Pandang': 480,
  'Asia/Ulaanbaatar': 480,
  'Asia/Ulan_Bator': 480,
  'Asia/Urumqi': 360,
  'Asia/Ust-Nera': 600,
  'Asia/Vientiane': 420,
  'Asia/Vladivostok': 600,
  'Asia/Yakutsk': 540,
  'Asia/Yekaterinburg': 300,
  'Asia/Yerevan': 240,
  'Atlantic/Azores': 0,
  'Atlantic/Bermuda': -180,
  'Atlantic/Canary': 60,
  'Atlantic/Cape_Verde': -60,
  'Atlantic/Faeroe': 60,
  'Atlantic/Faroe': 60,
  'Atlantic/Jan_Mayen': 120,
  'Atlantic/Madeira': 60,
  'Atlantic/Reykjavik': 0,
  'Atlantic/South_Georgia': -120,
  'Atlantic/St_Helena': 0,
  'Atlantic/Stanley': -180,
  'Australia/ACT': 600,
  'Australia/Adelaide': 570,
  'Australia/Brisbane': 600,
  'Australia/Broken_Hill': 570,
  'Australia/Canberra': 600,
  'Australia/Currie': 600,
  'Australia/Darwin': 570,
  'Australia/Eucla': 525,
  'Australia/Hobart': 600,
  'Australia/LHI': 630,
  'Australia/Lindeman': 600,
  'Australia/Lord_Howe': 630,
  'Australia/Melbourne': 600,
  'Australia/NSW': 600,
  'Australia/North': 570,
  'Australia/Perth': 480,
  'Australia/Queensland': 600,
  'Australia/South': 570,
  'Australia/Sydney': 600,
  'Australia/Tasmania': 600,
  'Australia/Victoria': 600,
  'Australia/West': 480,
  'Australia/Yancowinna': 570,
  'Brazil/Acre': -300,
  'Brazil/DeNoronha': -120,
  'Brazil/East': -180,
  'Brazil/West': -240,
  'Canada/Atlantic': -180,
  'Canada/Central': -300,
  'Canada/East-Saskatchewan': -360,
  'Canada/Eastern': -240,
  'Canada/Mountain': -360,
  'Canada/Newfoundland': -150,
  'Canada/Pacific': -420,
  'Canada/Saskatchewan': -360,
  'Canada/Yukon': -420,
  'Chile/Continental': -180,
  'Chile/EasterIsland': -300,
  'Etc/GMT': 0,
  'Etc/GMT+0': 0,
  'Etc/GMT+1': -60,
  'Etc/GMT+10': -600,
  'Etc/GMT+11': -660,
  'Etc/GMT+12': -720,
  'Etc/GMT+2': -120,
  'Etc/GMT+3': -180,
  'Etc/GMT+4': -240,
  'Etc/GMT+5': -300,
  'Etc/GMT+6': -360,
  'Etc/GMT+7': -420,
  'Etc/GMT+8': -480,
  'Etc/GMT+9': -540,
  'Etc/GMT-0': 0,
  'Etc/GMT-1': 60,
  'Etc/GMT-10': 600,
  'Etc/GMT-11': 660,
  'Etc/GMT-12': 720,
  'Etc/GMT-13': 780,
  'Etc/GMT-14': 840,
  'Etc/GMT-2': 120,
  'Etc/GMT-3': 180,
  'Etc/GMT-4': 240,
  'Etc/GMT-5': 300,
  'Etc/GMT-6': 360,
  'Etc/GMT-7': 420,
  'Etc/GMT-8': 480,
  'Etc/GMT-9': 540,
  'Etc/GMT0': 0,
  'Etc/Greenwich': 0,
  'Etc/UCT': 0,
  'Etc/UTC': 0,
  'Etc/Universal': 0,
  'Etc/Zulu': 0,
  'Europe/Amsterdam': 120,
  'Europe/Andorra': 120,
  'Europe/Athens': 180,
  'Europe/Belfast': 60,
  'Europe/Belgrade': 120,
  'Europe/Berlin': 120,
  'Europe/Bratislava': 120,
  'Europe/Brussels': 120,
  'Europe/Bucharest': 180,
  'Europe/Budapest': 120,
  'Europe/Busingen': 120,
  'Europe/Chisinau': 180,
  'Europe/Copenhagen': 120,
  'Europe/Dublin': 60,
  'Europe/Gibraltar': 120,
  'Europe/Guernsey': 60,
  'Europe/Helsinki': 180,
  'Europe/Isle_of_Man': 60,
  'Europe/Istanbul': 180,
  'Europe/Jersey': 60,
  'Europe/Kaliningrad': 120,
  'Europe/Kiev': 180,
  'Europe/Lisbon': 60,
  'Europe/Ljubljana': 120,
  'Europe/London': 60,
  'Europe/Luxembourg': 120,
  'Europe/Madrid': 120,
  'Europe/Malta': 120,
  'Europe/Mariehamn': 180,
  'Europe/Minsk': 180,
  'Europe/Monaco': 120,
  'Europe/Moscow': 180,
  'Europe/Nicosia': 180,
  'Europe/Oslo': 120,
  'Europe/Paris': 120,
  'Europe/Podgorica': 120,
  'Europe/Prague': 120,
  'Europe/Riga': 180,
  'Europe/Rome': 120,
  'Europe/Samara': 240,
  'Europe/San_Marino': 120,
  'Europe/Sarajevo': 120,
  'Europe/Simferopol': 180,
  'Europe/Skopje': 120,
  'Europe/Sofia': 180,
  'Europe/Stockholm': 120,
  'Europe/Tallinn': 180,
  'Europe/Tirane': 120,
  'Europe/Tiraspol': 180,
  'Europe/Uzhgorod': 180,
  'Europe/Vaduz': 120,
  'Europe/Vatican': 120,
  'Europe/Vienna': 120,
  'Europe/Vilnius': 180,
  'Europe/Volgograd': 180,
  'Europe/Warsaw': 120,
  'Europe/Zagreb': 120,
  'Europe/Zaporozhye': 180,
  'Europe/Zurich': 120,
  'Indian/Antananarivo': 180,
  'Indian/Chagos': 360,
  'Indian/Christmas': 420,
  'Indian/Cocos': 390,
  'Indian/Comoro': 180,
  'Indian/Kerguelen': 300,
  'Indian/Mahe': 240,
  'Indian/Maldives': 300,
  'Indian/Mauritius': 240,
  'Indian/Mayotte': 180,
  'Indian/Reunion': 240,
  'Mexico/BajaNorte': -420,
  'Mexico/BajaSur': -360,
  'Mexico/General': -300,
  'Pacific/Apia': 780,
  'Pacific/Auckland': 720,
  'Pacific/Chatham': 765,
  'Pacific/Chuuk': 600,
  'Pacific/Easter': -300,
  'Pacific/Efate': 660,
  'Pacific/Enderbury': 780,
  'Pacific/Fakaofo': 780,
  'Pacific/Fiji': 720,
  'Pacific/Funafuti': 720,
  'Pacific/Galapagos': -360,
  'Pacific/Gambier': -540,
  'Pacific/Guadalcanal': 660,
  'Pacific/Guam': 600,
  'Pacific/Honolulu': -600,
  'Pacific/Johnston': -600,
  'Pacific/Kiritimati': 840,
  'Pacific/Kosrae': 660,
  'Pacific/Kwajalein': 720,
  'Pacific/Majuro': 720,
  'Pacific/Marquesas': -570,
  'Pacific/Midway': -660,
  'Pacific/Nauru': 720,
  'Pacific/Niue': -660,
  'Pacific/Norfolk': 690,
  'Pacific/Noumea': 660,
  'Pacific/Pago_Pago': -660,
  'Pacific/Palau': 540,
  'Pacific/Pitcairn': -480,
  'Pacific/Pohnpei': 660,
  'Pacific/Ponape': 660,
  'Pacific/Port_Moresby': 600,
  'Pacific/Rarotonga': -600,
  'Pacific/Saipan': 600,
  'Pacific/Samoa': -660,
  'Pacific/Tahiti': -600,
  'Pacific/Tarawa': 720,
  'Pacific/Tongatapu': 780,
  'Pacific/Truk': 600,
  'Pacific/Wake': 720,
  'Pacific/Wallis': 720,
  'Pacific/Yap': 600
};

},{}],19:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Spacetime = _dereq_('./spacetime');
var pkg = _dereq_('../package.json');

var main = function main(input, tz) {
  if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && input.length) {
    input = input.join('-'); //ISO format YYYY-MM-DD
  }
  var d = new Date(input);
  return new Spacetime(d.getTime(), tz);
};

//some helper fns
main.now = function (tz) {
  return new Spacetime(new Date().getTime(), tz);
};
main.today = function (tz) {
  var space = new Spacetime(new Date().getTime(), tz);
  return space.morning();
};

//this is handy
main.version = pkg.version;

module.exports = main;

},{"../package.json":15,"./spacetime":32}],20:[function(_dereq_,module,exports){
'use strict';

var fmt = _dereq_('./lib/fmt');
var _world = _dereq_('./lib/world');

var addMethods = function addMethods(Space) {

  var methods = {

    niceTime: function niceTime() {
      return fmt.time(this.d);
    },
    niceDate: function niceDate() {
      return fmt.day(this.d);
    },
    format: function format() {
      return fmt.daytime(this.d);
    },
    log: function log() {
      console.log(fmt.daytime(this.d));
      return this;
    },
    world: function world() {
      return _world(this);
    }
  };

  //hook them into proto
  Object.keys(methods).forEach(function (k) {
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;

},{"./lib/fmt":24,"./lib/world":28}],21:[function(_dereq_,module,exports){
'use strict';

var colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  black: '\x1b[30m'
};
module.exports = Object.keys(colors).reduce(function (h, k) {
  h[k] = function (str) {
    return colors[k] + str + colors.reset;
  };
  return h;
}, {});

},{}],22:[function(_dereq_,module,exports){
'use strict';

//

var dayOfYear = function dayOfYear(d) {
  var sum = 0;
  var month = d.getMonth();
  var tmp = void 0;
  for (var i = 0; i < month; i++) {
    tmp = new Date();
    tmp.setMonth(i);
    tmp.setDate(1);
    tmp.setHours(-2);
    // console.log(i + '   ' + tmp.getDate());
    sum += tmp.getDate();
  }
  return sum + d.getDate();
};

// function leapYear(year){
//   return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
// }

module.exports = dayOfYear;

},{}],23:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  short: ['sun', 'mon', 'tues', 'wed', 'thurs', 'fri', 'sat'],
  long: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
};

},{}],24:[function(_dereq_,module,exports){
'use strict';

var color = _dereq_('./colors');
var months = _dereq_('./months').short;

//


// right padding s with c to a total of n chars
// function padRight(s, n) {
//   const c = '.';
//   if (!s || !c || s.length >= n) {
//     return s;
//   }
//   const max = (n - s.length) / c.length;
//   for (var i = 0; i < max; i++) {
//     s += '.';
//   }
//   return s;
// }

var day = function day(d) {
  return months[d.getMonth()] + ' ' + d.getDate();
};

var time = function time(d) {
  //hours
  var hour = d.getHours();
  var am = 'am ';
  var emoji = color.yellow('🌤️');
  if (hour > 12) {
    hour -= 12;
    am = 'pm ';
    emoji = color.cyan('🌜');
  } else if (hour === 0) {
    hour = 12;
  }
  hour = '' + hour;
  if (hour.length === 1) {
    hour = ' ' + hour;
  }
  //minutes
  var minutes = d.getMinutes();
  if (('' + minutes).length === 1) {
    minutes = '0' + minutes;
  }
  var str = hour + ':' + minutes + am + ' ' + emoji;
  return str;
};

var daytime = function daytime(d) {
  return '  ' + day(d) + '  ' + time(d);
};

module.exports = {
  day: day,
  time: time,
  daytime: daytime
};

},{"./colors":21,"./months":25}],25:[function(_dereq_,module,exports){
'use strict';

module.exports = {
  short: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'],
  long: ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
};

},{}],26:[function(_dereq_,module,exports){
"use strict";

module.exports = [null, [0, 1], //jan 1
[3, 1], //apr 1
[6, 1], //july 1
[9, 1]];

},{}],27:[function(_dereq_,module,exports){
'use strict';

// javascript setX methods like setDate() can't be used because of the local bias
//these methods wrap around them.
var dayOfYear = _dereq_('./dayOfYear');
var minute = 60 * 1000;
var hour = minute * 60;
var day = hour * 60;

module.exports = {

  minutes: function minutes(s, n) {
    var current = s.minute();
    var diff = current - n;
    //milliseconds to shift by
    var shift = diff * minute;
    return s.epoch - shift;
  },

  hours: function hours(s, n) {
    var current = s.hour();
    var diff = current - n;
    //milliseconds to shift by
    var shift = diff * hour;
    return s.epoch - shift;
  },

  date: function date(s, n) {
    var here = new Date(s.epoch);
    var there = s.d;
    var diff = dayOfYear(there) - dayOfYear(here);
    // console.log(diff);
    //we can just set it with .setDate
    there.setDate(n + diff); //BUG
    return there.getTime(); // + (diff * day);
  },

  dayOfYear: function dayOfYear(s, n) {
    return s.epoch;
  }

};

},{"./dayOfYear":22}],28:[function(_dereq_,module,exports){
'use strict';

var Table = _dereq_('cli-table');
var colors = _dereq_('./colors');

var places = [{
  title: 'San Francisco',
  emoji: '🌞',
  color: 'yellow',
  tz: 'Canada/Pacific'
}, {
  title: 'Eastern',
  emoji: '🌭',
  color: 'red',
  tz: 'Canada/Eastern'
}, {
  title: 'Britain',
  emoji: '🌧️',
  color: 'blue',
  tz: 'Etc/UCT'
}, {
  title: 'Brisbane',
  color: 'cyan',
  emoji: '🌈',
  tz: 'Australia/Brisbane'
}];

var makeTime = function makeTime(o) {
  return o.space.niceTime();
};
var makeDate = function makeDate(o) {
  return colors.black(o.space.niceDate());
};
var makeEmoji = function makeEmoji(o) {
  return colors[o.color](o.emoji);
};
var makeTitle = function makeTitle(o) {
  return colors[o.color](o.title);
};

var centerTable = function centerTable(str) {
  str = colors.green(str);
  for (var i = 0; i < 26; i++) {
    str = '- ' + str + ' -';
  }
  for (var _i = 0; _i < 10; _i++) {
    str = ' ' + str;
  }
  return str;
};

var wordMap = function wordMap(space) {
  var table = new Table({
    chars: {
      'top': '',
      'top-mid': '',
      'top-left': '',
      'top-right': '',
      'bottom': '',
      'bottom-mid': '',
      'bottom-left': '',
      'bottom-right': '',
      'left': '',
      'left-mid': '',
      'mid': '',
      'mid-mid': '',
      'right': '',
      'right-mid': '',
      'middle': ' '
    },
    colAligns: ['center', 'center', 'center', 'center'],
    // head: places.map(o => o.title),
    style: {
      'padding-left': 10,
      'padding-right': 10
    }
  });

  places.forEach(function (o) {
    o.space = space.clone().goto(o.tz); //.log();
  });

  table.push(places.map(makeEmoji));
  table.push(places.map(makeTitle));
  table.push(places.map(makeTime));
  table.push(places.map(makeDate));

  console.log(centerTable(space.epoch()));
  console.log(table.toString());
};
module.exports = wordMap;

},{"./colors":21,"cli-table":1}],29:[function(_dereq_,module,exports){
'use strict';

var _add = function _add(d, num, unit) {
  if (unit === 'hour' || unit === 'hours') {
    d.setHours(d.getHours() + num);
    return d;
  }
  if (unit === 'day' || unit === 'days') {
    d.setDate(d.getDate() + num);
    return d;
  }
  if (unit === 'week' || unit === 'weeks') {
    d.setDate(d.getDate() + num * 7);
    return d;
  }
  if (unit === 'month' || unit === 'months') {
    d.setMonth(d.getMonth() + num);
    return d;
  }
  if (unit === 'quarter' || unit === 'quarters') {
    d.setMonth(d.getMonth() + num * 3);
    return d;
  }
  if (unit === 'year' || unit === 'years') {
    d.setFullYear(d.getFullYear() + num);
    return d;
  }
  console.warn('no unit: \'' + unit + '\'');
  return d;
};

var addMethods = function addMethods(Space) {

  var methods = {
    add: function add(num, unit) {
      var d = _add(this.d, num, unit);
      this.epoch = d.getTime();
      return this;
    },
    subtract: function subtract(num, unit) {
      var d = _add(this.d, num * -1, unit);
      this.epoch = d.getTime();
      return this;
    }
  };

  //hook them into proto
  Object.keys(methods).forEach(function (k) {
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;

},{}],30:[function(_dereq_,module,exports){
'use strict';

var months = _dereq_('./lib/months');
var days = _dereq_('./lib/days');
var quarters = _dereq_('./lib/quarters');
var set = _dereq_('./lib/set');
var _dayOfYear = _dereq_('./lib/dayOfYear');

var addMethods = function addMethods(Space) {

  var methods = {

    minute: function minute(num) {
      if (num !== undefined) {
        this.epoch = set.minutes(this, num);
        return this;
      }
      return this.d.getMinutes();
    },

    hour: function hour(num) {
      var d = this.d;
      if (num !== undefined) {
        this.epoch = set.hours(this, num);
        return this;
      }
      return d.getHours();
    },

    date: function date(num) {
      if (num !== undefined) {
        this.epoch = set.date(this, num);
        return this;
      }
      return this.d.getDate();
    },

    dayOfYear: function dayOfYear(num) {
      if (num !== undefined) {
        this.epoch = set.dayOfYear(this, num);
        return this;
      }
      return _dayOfYear(this.d);
    },

    //since the start of the year
    week: function week(num) {
      if (num !== undefined) {
        this.month(0);
        this.date(1);
        this.day(1); //monday
        num -= 1; //1-based
        this.add(num, 'weeks');
        return this;
      }
      //find-out which week it is
      var tmp = this.clone();
      tmp.month(0);
      tmp.date(1);
      tmp.hour(0);
      tmp.minute(1);
      tmp.day(1); //monday
      var thisOne = this.epoch;
      //if the week technically hasn't started yet
      if (tmp.epoch > thisOne) {
        return 1;
      }
      for (var i = 0; i < 52; i++) {
        if (tmp.epoch > thisOne) {
          return i;
        }
        tmp.add(1, 'week');
      }
      return 52;
    },

    quarter: function quarter(num) {
      if (num !== undefined && quarters[num]) {
        var _month = quarters[num][0];
        this.month(_month);
        this.date(1);
        return this;
      }
      var month = this.d.getMonth();
      for (var i = 1; i < quarters.length; i++) {
        if (month < quarters[i][0]) {
          return i - 1;
        }
      }
      return 4;
    },

    year: function year(num) {
      if (num !== undefined) {
        var d = this.d;
        d.setFullYear(num);
        this.epoch = d.getTime();
        return this;
      }
      return this.d.getFullYear();
    },

    month: function month(input) {
      var d = this.d;
      if (input !== undefined) {
        if (typeof input === 'number') {
          d.setMonth(input);
          this.epoch = d.getTime();
          return this;
        }
        //input by month name
        input = input.toLowerCase();
        var index = months.short.indexOf(input);
        if (index === -1) {
          index = months.long.indexOf(input);
        }
        if (index !== -1) {
          d.setMonth(index);
          this.epoch = d.getTime();
          return this;
        }
      }
      return months.long[this.d.getMonth()];
    },

    day: function day(input) {
      if (input === undefined) {
        return days.long[this.d.getDay()];
      }
      var num = input;
      if (typeof input === 'string') {
        input = input.toLowerCase();
        num = days.short.indexOf(input);
        if (num === -1) {
          num = days.long.indexOf(input);
        }
      }
      //fail silent
      if (typeof num !== 'number' || num < 0 || num > 6) {
        return this;
      }
      //set the day, based on a number
      //always move it forward..
      var d = this.d;
      var current = d.getDay();
      if (num > current) {
        var diff = num - current;
        d.setDate(d.getDate() + diff);
      } else if (num < current) {
        var toAdd = num + (7 - current);
        d.setDate(d.getDate() + toAdd);
      }
      this.epoch = d.getTime();
      return this;
    }

  };

  //hook them into proto
  Object.keys(methods).forEach(function (k) {
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;

},{"./lib/dayOfYear":22,"./lib/days":23,"./lib/months":25,"./lib/quarters":26,"./lib/set":27}],31:[function(_dereq_,module,exports){
'use strict';

var print = {
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

var addMethods = function addMethods(Space) {

  var methods = {
    isSame: function isSame(b, unit) {
      var a = this;
      if (typeof b === 'string' || typeof b === 'number') {
        b = new Space(b);
      }
      if (unit === 'hour' || unit === 'hours') {
        return print.hour(a) === print.hour(b);
      }
      if (unit === 'day' || unit === 'days' || unit === 'date') {
        return print.day(a) === print.day(b);
      }
      if (unit === 'week' || unit === 'weeks') {
        return print.week(a) === print.week(b);
      }
      if (unit === 'month' || unit === 'months') {
        return print.month(a) === print.month(b);
      }
      if (unit === 'quarter' || unit === 'quarters') {
        return print.quarter(a) === print.quarter(b);
      }
      if (unit === 'year' || unit === 'years') {
        return print.year(a) === print.year(b);
      }
      return null;
    }
  };

  //hook them into proto
  Object.keys(methods).forEach(function (k) {
    Space.prototype[k] = methods[k];
  });
  return Space;
};

module.exports = addMethods;

},{}],32:[function(_dereq_,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var getOffset = _dereq_('./gears/getOffset');
var getBias = _dereq_('./gears/getBias');

//fake timezone-support, for fakers

var SpaceTime = function () {
  function SpaceTime(epoch, tz) {
    _classCallCheck(this, SpaceTime);

    //default to now
    this.epoch = epoch || new Date().getTime();
    //the shift for the given timezone
    this.offset = getOffset(tz);
    this.tz = tz;
    //this computer's built-in offset
    this.bias = getBias();
  }

  //a js date object


  _createClass(SpaceTime, [{
    key: 'clone',
    value: function clone() {
      return new SpaceTime(this.epoch, this.tz);
    }

    //travel to this timezone

  }, {
    key: 'goto',
    value: function goto(tz) {
      this.tz = tz;
      this.offset = getOffset(tz);
      return this;
    }
  }, {
    key: 'd',
    get: function get() {
      //movement in milliseconds
      var shift = this.offset * 60 * 1000;
      //remove this computer's offset
      shift = shift + this.bias * 60 * 1000;
      var epoch = this.epoch + shift;
      //delete this after..
      Date.prototype.log = function () {
        console.log(this.toLocaleDateString().replace(/\/[0-9]{4}/, '') + '  -  ' + this.toLocaleTimeString());
      };
      var d = new Date(epoch);
      return d;
    }
  }]);

  return SpaceTime;
}();
//append methods


SpaceTime = _dereq_('./methods/query')(SpaceTime);
SpaceTime = _dereq_('./methods/move')(SpaceTime);
SpaceTime = _dereq_('./methods/same')(SpaceTime);
SpaceTime = _dereq_('./methods/format')(SpaceTime);

module.exports = SpaceTime;

},{"./gears/getBias":16,"./gears/getOffset":17,"./methods/format":20,"./methods/move":29,"./methods/query":30,"./methods/same":31}]},{},[19])(19)
});