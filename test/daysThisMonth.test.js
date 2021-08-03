const test = require('tape')
const spacetime = require('./lib')

test('test daysThisMonth() on all months', (t) => {
  let d = spacetime('January 12, 2016')
  t.equal(d.daysThisMonth(), 31, 'daysThisMonth - Jan. 2016')
  
  d = spacetime('February 12, 2016')
  t.equal(d.daysThisMonth(), 29, 'daysThisMonth - Feb. 2016 (29 Days, leap year)')
    
  d = spacetime('March 12, 2016')
  t.equal(d.daysThisMonth(), 31, 'daysThisMonth - Mar. 2016')
    
  d = spacetime('April 12, 2016')
  t.equal(d.daysThisMonth(), 30, 'daysThisMonth - Apr. 2016')
    
  d = spacetime('May 12, 2016')
  t.equal(d.daysThisMonth(), 31, 'daysThisMonth - May 2016')
    
  d = spacetime('June 12, 2016')
  t.equal(d.daysThisMonth(), 30, 'daysThisMonth - Jun. 2016')
    
  d = spacetime('July 12, 2016')
  t.equal(d.daysThisMonth(), 31, 'daysThisMonth - Jul. 2016')
    
  d = spacetime('August 12, 2016')
  t.equal(d.daysThisMonth(), 31, 'daysThisMonth - Aug. 2016')
    
  d = spacetime('September 12, 2016')
  t.equal(d.daysThisMonth(), 30, 'daysThisMonth - Sep. 2016')
    
  d = spacetime('October 12, 2016')
  t.equal(d.daysThisMonth(), 31, 'daysThisMonth - Oct. 2016')
    
  d = spacetime('November 12, 2016')
  t.equal(d.daysThisMonth(), 30, 'daysThisMonth - Oct. 2016')
    
  d = spacetime('December 12, 2016')
  t.equal(d.daysThisMonth(), 31, 'daysThisMonth - Oct. 2016')
  
  d = spacetime('February 12, 2023')
  t.equal(d.daysThisMonth(), 28, 'daysThisMonth - Feb. 2023 (28 Days, no leap year)')

  t.end()
})