let zones = {
  'Etc/GMT': { offset: 0, hem: 'n' }
}

// generate these sorta-fake timezones for spacetime/one
for (let i = -14; i <= 14; i += 0.5) {
  let num = i
  if (num > 0) {
    num = '+' + num
  }
  // Etc/GMT-5
  let name = 'Etc/GMT' + num
  zones[name] = {
    offset: i * -1, //they're negative!
    hem: 'n' //(sorry)
  }
  let alias = 'UTC/GMT' + num //this one too, why not.
  zones[alias] = zones[name]
}
// these appear sometimes
zones['Etc/GMT+0'] = zones['Etc/GMT']
zones['Etc/GMT-0'] = zones['Etc/GMT']

export default zones