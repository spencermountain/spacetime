//html example
var html = '<script src="https://unpkg.com/spacetime"></script>\n';
html += '<script>\n';
html += '  // make a new Date in New York\n';
html += '  var d = spacetime(\'March 1 2012\', \'America/New_York\')\n';
html += '  d.time(\'4:20pm\')\n';
html += '  d.goto(\'America/Los_Angeles\')\n';
html += '  d.time()\n  //\'1:20pm\'\n';
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
var node = '// npm install spacetime\n';
node += 'var spacetime = require(\'spacetime\')\n\n';
node += 'var d = spacetime.now(\'Europe/Paris\')\n';
node += 'd.isAsleep()\n';
node += '//true\n\n';
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
doc = 'var localTime = fakeParis - parisOffset + myOffset \n';
doc += 'local = new Date(localTime)\n';
doc += 'local.setHours(6)// 🎉\n';
doc += 'var parisAgain = local.getTIme() - myOffset + parisOffset\n// ¯\\_(ツ)_/¯';
CodeMirror(document.getElementById('docThree'), {
  mode: 'javascript',
  theme: 'spencertheme',
  readOnly: true,
  value: doc
});
