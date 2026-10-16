const number = (value) => {
  if (typeof value === 'string' && value.trim() !== '') {
    return Number(value)
  }
  return typeof value === 'number' ? value : NaN
}

const coordinates = (geo, longitude) => {
  let values
  if (typeof geo === 'number') {
    values = [geo, longitude]
  } else if (Array.isArray(geo)) {
    values = geo
  } else if (typeof geo === 'string') {
    values = geo.split(/[,/]/)
  } else if (geo && typeof geo === 'object') {
    values = [geo.lat ?? geo.latitude, geo.lng ?? geo.lon ?? geo.long ?? geo.longitude]
  }
  if (!values || values.length !== 2) {
    return null
  }
  const [lat, lng] = values.map(number)
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) {
    return null
  }
  return [lat, lng]
}

export default coordinates
