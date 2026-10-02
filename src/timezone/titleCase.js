//iana codes are case-sensitive, technically
const titleCase = str => {
  str = str[0].toUpperCase() + str.substr(1)
  str = str.replace(/[/_-]([a-z])/gi, s => {
    return s.toUpperCase()
  })
  str = str.replace(/_(of|es)_/i, (s) => s.toLowerCase())
  str = str.replace(/\/gmt/i, '/GMT')
  str = str.replace(/\/utc/i, '/UTC')
  str = str.replace(/\/Dumontdurville$/i, '/DumontDUrville')
  str = str.replace(/\/Mcmurdo$/i, '/McMurdo')
  str = str.replace(/\/Port-au-prince$/i, '/Port-au-Prince')
  if (str === 'Utc') {
    str = 'UTC'
  }
  return str
}
export default titleCase
