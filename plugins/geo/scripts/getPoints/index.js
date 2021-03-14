const fetch = require('node-fetch')
let iana = require('./iana')
// const fs = require('fs');
let key = 'get-your-own'

let done = {}

iana = iana.map((arr) => {
  let cities = arr[3].split(',')
  let tz = arr[1]
  tz = tz.split('/')
  let city = cities[0] || tz[tz.length - 1]
  let str = `${city}, ${arr[2]}`
  return {
    str: str,
    tz: arr[1]
  }
})

const roundIt = function(num) {
  return Math.round(num * 100) / 100
}

function doit(i) {
  let str = iana[i].str
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(str)}&key=${key}`
  fetch(url).then(res => res.json()).then(res => {
    if (res.results && res.results[0]) {
      let point = res.results[0].geometry.location
      let place = res.results[0].formatted_address
      point = [roundIt(point.lat), roundIt(point.lng)]
      done[iana[i].tz] = {
        point: point,
        place: place
      }
      console.log(place)
    } else {
      console.log('\nmissing ' + str)
    }
    i += 1
    if (iana[i]) {
      doit(i)
    } else {
      // fs.writeFileSync('./src/data.json', JSON.stringify(done, null, 2));
      console.log('{')
      Object.keys(done).forEach((k) => {
        console.log(`  "${k}" : '${done[k].point[0]},${done[k].point[1]}', //${done[k].place}`)
      })
      console.log('}')
    }
  }).catch(console.log)
}

doit(0)
