var colors = {
  reset: '\x1b[0m',
  red : '\x1b[31m',
  green : '\x1b[32m',
  yellow : '\x1b[33m',
  blue : '\x1b[34m',
  magenta : '\x1b[35m',
  cyan : '\x1b[36m',
  black: '\x1b[30m'
};
module.exports = Object.keys(colors).reduce((h, k) => {
  h[k] = (str) => {
    return colors[k] + str + colors.reset;
  };
  return h;
}, {});
