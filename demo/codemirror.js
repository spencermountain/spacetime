//html example
var html = '<script src="https://unpkg.com/spacetime"></script>\n';
html += '<script>\n';
html += '  // make a new Date in New York\n';
html += '  var d = spacetime(\'March 1 2012\', \'America/New_York\')\n';
html += '  // set the time\n';
html += '  d.time(\'4:20pm\')\n';
html += '  // go to another timezone\n';
html += '  d.goto(\'America/Los_Angeles\')\n';
html += '  // get the time there\n';
html += '  d.time()\n  //1:20pm\n';
html += '</script>';

var options = {
  // mode: 'html-mixed',
  theme: 'spencertheme',
  readOnly: true,
  value: html
};
var el = document.getElementById('html');
CodeMirror(el, options);

// - node example -
var node = 'var spacetime = require(\'spacetime\')\n';
node += 'var d = spacetime.now(\'Europe/Paris\')\n';
node += 'd.dayOfYear()\n';
node += '//142\n';
node += 'd.dayName()\n';
node += '//\'Wednesday\'';
options = {
  mode: 'javascript',
  theme: 'spencertheme',
  readOnly: true,
  value: node
};
el = document.getElementById('node');
CodeMirror(el, options);

//---docs---
var doc = 'd = new Date(fakeParis)\n';
doc += 'd.getHours()// ✔️ weee!';
CodeMirror(document.getElementById('doc'), {
  mode: 'javascript',
  theme: 'spencertheme',
  readOnly: true,
  value: doc
});
doc = 'd = new Date(fakeParis)\n';
doc += 'd.setHours(6)// ✖️ uh-oh';
CodeMirror(document.getElementById('docBad'), {
  mode: 'javascript',
  theme: 'spencertheme',
  readOnly: true,
  value: doc
});
