import scale from './scale.js'

const decodeRing = (encoded) => {
  const coordinates = []
  const point = [0, 0]
  let axis = 0
  let value = 0
  let factor = 1
  for (let i = 0; i < encoded.length; i += 1) {
    const code = encoded.charCodeAt(i) - 63
    value += (code % 32) * factor
    if (code >= 32) {
      factor *= 32
      continue
    }
    const delta = value % 2 ? -(value + 1) / 2 : value / 2
    point[axis] += delta
    if (axis === 1) {
      coordinates.push([point[0] / scale, point[1] / scale])
    }
    axis = 1 - axis
    value = 0
    factor = 1
  }
  return coordinates
}

const unpack = (feature) => {
  // Copy metadata too, so no mutable data escapes the shared dataset.
  const result = JSON.parse(JSON.stringify(feature))
  const { type, coordinates } = feature.geometry
  if (type === 'Polygon') {
    result.geometry.coordinates = coordinates.map(decodeRing)
  } else {
    result.geometry.coordinates = coordinates.map((polygon) => polygon.map(decodeRing))
  }
  return result
}

export default unpack
