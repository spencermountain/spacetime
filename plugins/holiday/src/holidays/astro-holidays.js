// these are properly calculated in ./lib/seasons
let dates = {
  'spring equinox': 'spring',
  'summer solistice': 'summer',
  'fall equinox': 'fall',
  'winter solstice': 'winter'
}

// aliases
dates['march equinox'] = dates['spring equinox']
dates['vernal equinox'] = dates['spring equinox']
dates['ostara'] = dates['spring equinox']

dates['june solstice'] = dates['summer solistice']
dates['litha'] = dates['summer solistice']

dates['autumn equinox'] = dates['fall equinox']
dates['autumnal equinox'] = dates['fall equinox']
dates['september equinox'] = dates['fall equinox']
dates['sept equinox'] = dates['fall equinox']
dates['mabon'] = dates['fall equinox']

dates['december solstice'] = dates['winter solistice']
dates['dec solstice'] = dates['winter solistice']
dates['yule'] = dates['winter solistice']

module.exports = dates
