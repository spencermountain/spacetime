import spacetime from 'spacetime'

// The main declarations also work without the ESNext.Temporal compiler library.
const native = spacetime(0, 'UTC').toTemporal()
if (native) {
  const epoch: number = native.epochMilliseconds
  const zone: string = native.timeZoneId
  void [epoch, zone]
}
