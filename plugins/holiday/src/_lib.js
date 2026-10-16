import fixed from './holidays/fixed-holidays.js'
import calendar from './holidays/calendar-holidays.js'
import easter from './holidays/easter-holidays.js'
import astro from './holidays/astro-holidays.js'
import lunar from './holidays/lunar-holidays.js'
import aliases from './holidays/aliases.js'

const normalize = (name) => String(name ?? '').trim().toLowerCase().replace(/['’]/g, '').replace(/\s+/g, ' ').replace(/^the /, '')
const catalog = {}
Object.keys({ ...fixed, ...calendar, ...easter, ...astro, ...lunar }).forEach((key) => {
  const normalized = normalize(key)
  const name = aliases[normalized] ?? normalized
  if (!Object.hasOwn(catalog, name)) {
    catalog[name] = { name, aliases: [] }
  }
})
Object.entries(aliases).forEach(([alias, name]) => {
  if (Object.hasOwn(catalog, name)) {
    catalog[name].aliases.push(alias)
  }
})

const resolveName = (input) => {
  const name = normalize(input)
  const candidates = [name, name.replace(/ day$/, '')]
  for (let i = 0; i < candidates.length; i += 1) {
    const candidate = aliases[candidates[i]] ?? candidates[i]
    if (Object.hasOwn(catalog, candidate)) {
      return candidate
    }
  }
  return null
}

export { catalog, resolveName }
