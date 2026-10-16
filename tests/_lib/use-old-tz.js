const overrides = {
  'canada/eastern': '03/12:03->11/05:01',
  'australia/canberra': '04/02:02->10/01:03',
  'pacific/fiji': '01/15:02->11/05:03',
  'europe/brussels': '03/29:02->10/25:03',
  'america/chicago': '03/08:02->11/01:02',
  'canada/pacific': '03/08:02->11/01:02'
}
const configured = new WeakSet()

// Historical fixtures replace shared data only for the current test.
const useOldTz = (s, t) => {
  if (!configured.has(t)) {
    const original = s.timezones
    const timezones = { ...original }
    Object.keys(overrides).forEach(zone => {
      timezones[zone] = { ...original[zone], dst: overrides[zone] }
    })
    t.teardown(() => { s.timezones = original })
    s.timezones = timezones
    configured.add(t)
  }
  return s
}

export default useOldTz
