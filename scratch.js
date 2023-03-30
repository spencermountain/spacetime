// const spacetime = require('./builds/spacetime.cjs')
import spacetime from './src/index.js'

// spacetime.extend(require('./plugins/holiday'))

const assignmentDate = spacetime("2022-11-21T00:00:00.000Z").i18n({}).format("{day-short}, {month-short}, {date}, {year}");