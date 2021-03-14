const spacetime = require('spacetime')
const htm = require('htm')
const vhtml = require('vhtml');
let h = htm.bind(vhtml);
const inputs = require('somehow-input');
const drawGraph = require('./_drawGraph')
const spacetimeTicks = require('../src')

const printTicks = function() {
  let start = document.querySelector('#origin').querySelector('input').value
  let duration = document.querySelector('#duration').querySelector('input').value
  let n = document.querySelector('#ticks-two').querySelector('select').value
  let end = spacetime(start).epoch + Number(duration)
  let ticks = spacetimeTicks(start, end, n)
  drawGraph(ticks, '#graph')
  ticks = ticks.map((o) => {
    return h`<tr >
    <td class="">${o.label}</td>
    <td class="light f09 m09">${o.value}</td>
  </tr>`
  })
  document.querySelector('#results').innerHTML = h`<table class="f2 mud w7">${ticks}</table>`
}

let start = inputs.input({
  label: 'start',
  value: 'June 5th 1998',
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
let end = inputs.duration({
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
  cb: () => printTicks()
})
document.querySelector('#origin').innerHTML = start.build()
document.querySelector('#ticks-two').innerHTML = select.build()
document.querySelector('#duration').innerHTML = end.build()

printTicks()
