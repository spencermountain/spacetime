const htm = require('htm')
const vhtml = require('vhtml');
let h = htm.bind(vhtml);
const inputs = require('somehow-input');
const drawGraph = require('./_drawGraph')
const spacetimeTicks = require('../src')

const printTicks = function() {
  let start = document.querySelector('#start').querySelector('input').value
  let end = document.querySelector('#end').querySelector('input').value
  let n = document.querySelector('#ticks').querySelector('select').value
  let ticks = spacetimeTicks(start, end, n)
  drawGraph(ticks, '#graph-two')
  ticks = ticks.map((o) => {
    return h`<tr >
      <td class="">${o.label}</td>
      <td class="light f09 m09">${o.value}</td>
    </tr>`
  })
  document.querySelector('#results-two').innerHTML = h`<table class="f2 mud w7">${ticks}</table>`
}

let start = inputs.input({
  label: 'start',
  value: 'June 5th 1998',
  width: 130,
  cb: () => printTicks()
})
let end = inputs.input({
  label: 'end',
  value: 'Oct 4 2002',
  width: 130,
  cb: () => printTicks()
})
let select = inputs.select({
  label: 'max-ticks',
  value: '6',
  width: 50,
  options: ['4', '5', '6', '7', '8', '9', '10', '11'],
  cb: () => printTicks()
})
document.querySelector('#start').innerHTML = start.build()
document.querySelector('#ticks').innerHTML = select.build()
document.querySelector('#end').innerHTML = end.build()

printTicks()
