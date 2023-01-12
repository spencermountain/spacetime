import test from 'tape'
import spacetime from './lib/index.js'

test('test daysInMonth() on all months', (t) => {
  let d = spacetime('January 12, 2016')
  t.equal(d.daysInMonth(), 31, 'daysInMonth - Jan. 2016')

  d = spacetime('February 12, 2016')
  t.equal(d.daysInMonth(), 29, 'daysInMonth - Feb. 2016 (29 Days, leap year)')

  d = spacetime('March 12, 2016')
  t.equal(d.daysInMonth(), 31, 'daysInMonth - Mar. 2016')

  d = spacetime('April 12, 2016')
  t.equal(d.daysInMonth(), 30, 'daysInMonth - Apr. 2016')

  d = spacetime('May 12, 2016')
  t.equal(d.daysInMonth(), 31, 'daysInMonth - May 2016')

  d = spacetime('June 12, 2016')
  t.equal(d.daysInMonth(), 30, 'daysInMonth - Jun. 2016')

  d = spacetime('July 12, 2016')
  t.equal(d.daysInMonth(), 31, 'daysInMonth - Jul. 2016')

  d = spacetime('August 12, 2016')
  t.equal(d.daysInMonth(), 31, 'daysInMonth - Aug. 2016')

  d = spacetime('September 12, 2016')
  t.equal(d.daysInMonth(), 30, 'daysInMonth - Sep. 2016')

  d = spacetime('October 12, 2016')
  t.equal(d.daysInMonth(), 31, 'daysInMonth - Oct. 2016')

  d = spacetime('November 12, 2016')
  t.equal(d.daysInMonth(), 30, 'daysInMonth - Oct. 2016')

  d = spacetime('December 12, 2016')
  t.equal(d.daysInMonth(), 31, 'daysInMonth - Oct. 2016')

  d = spacetime('February 12, 2023')
  t.equal(d.daysInMonth(), 28, 'daysInMonth - Feb. 2023 (28 Days, no leap year)')

  t.end()
})
