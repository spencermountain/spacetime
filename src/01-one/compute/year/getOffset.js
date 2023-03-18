// what is the offset on January 1st?
const getOffset = function (tz, world) {
  const { HOUR } = world.model.ms
  // apply timezone offset to it
  let zoneFile = world.zones
  if (tz && zoneFile.hasOwnProperty(tz) && zoneFile[tz]) {
    let zone = zoneFile[tz]
    let offset = zone.offset || 0
    // are we in DST on Jan 1st?
    // all 16 southern hemisphere zones w/ DST
    if (zone.hem === 's' && zone.dst) {
      offset += zone.change || 1
    }
    return offset * HOUR
  }
  return 0
}
export default getOffset