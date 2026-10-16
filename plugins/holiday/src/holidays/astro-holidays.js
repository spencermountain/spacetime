// these are properly calculated in ./lib/seasons
const dates = {
  'spring equinox': 'spring',
  'summer solstice': 'summer',
  'fall equinox': 'fall',
  'winter solstice': 'winter'
}

// aliases
dates['march equinox'] = dates['spring equinox']
dates['vernal equinox'] = dates['spring equinox']
dates['ostara'] = dates['spring equinox']

dates['summer solistice'] = dates['summer solstice']
dates['june solstice'] = dates['summer solstice']
dates['litha'] = dates['summer solstice']

dates['autumn equinox'] = dates['fall equinox']
dates['autumnal equinox'] = dates['fall equinox']
dates['september equinox'] = dates['fall equinox']
dates['sept equinox'] = dates['fall equinox']
dates['mabon'] = dates['fall equinox']

dates['december solstice'] = dates['winter solstice']
dates['dec solstice'] = dates['winter solstice']
dates['yule'] = dates['winter solstice']

export default dates
