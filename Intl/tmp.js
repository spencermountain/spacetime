let s = new Intl.DateTimeFormat("en-US", {
  hour12: false,
  timeZone: 'Europe/Paris',
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  era: "short",
})
console.log(s.formatToParts())
