import scale from '../src/geojson/scale.js'

const encodeRing = (ring) => {
  const previous = [0, 0]
  const rounded = []
  let encoded = ''
  ring.forEach((point) => {
    if (point.length !== 2) {
      throw new Error('Expected two-dimensional coordinates')
    }
    point.forEach((value, axis) => {
      const integer = Math.round(value * scale)
      if (typeof value !== 'number' || !Number.isSafeInteger(integer)) {
        throw new Error('Invalid coordinate')
      }
      const delta = integer - previous[axis]
      previous[axis] = integer
      let unsigned = delta < 0 ? -delta * 2 - 1 : delta * 2
      // Five payload bits per character; the sixth marks continuation.
      for (; unsigned >= 32; unsigned = Math.floor(unsigned / 32)) {
        encoded += String.fromCharCode(unsigned % 32 + 95)
      }
      encoded += String.fromCharCode(unsigned + 63)
    })
    rounded.push([...previous])
  })
  // Omit rings that become lines or points on the rounded grid.
  const [x, y] = rounded[0] || [0, 0]
  let area = 0
  for (let i = 1; i < rounded.length; i += 1) {
    area += (rounded[i - 1][0] - x) * (rounded[i][1] - y)
    area -= (rounded[i][0] - x) * (rounded[i - 1][1] - y)
  }
  if (area === 0) {
    return null
  }
  return encoded
}

const encodePolygon = (rings) => {
  const encoded = rings.map(encodeRing)
  if (!encoded[0]) {
    return null
  }
  return encoded.filter(Boolean)
}

const pack = (feature) => {
  const result = JSON.parse(JSON.stringify(feature))
  const { type, coordinates } = feature.geometry
  if (type === 'Polygon') {
    result.geometry.coordinates = encodePolygon(coordinates)
  } else if (type === 'MultiPolygon') {
    result.geometry.coordinates = coordinates.map(encodePolygon).filter(Boolean)
  } else {
    throw new Error(`Unsupported geometry: ${type}`)
  }
  if (!result.geometry.coordinates?.length) {
    throw new Error('Geometry collapsed at four decimal places')
  }
  return result
}

export default pack
