// http://www.astropixels.com/ephemeris/soleq2001.html

// years 2000-2100
const exceptions = {
  spring: [
    2003,
    2007,
    2044,
    2048,
    2052,
    2056,
    2060,
    2064,
    2068,
    2072,
    2076,
    2077,
    2080,
    2081,
    2084,
    2085,
    2088,
    2089,
    2092,
    2093,
    2096,
    2097
  ],
  summer: [
    2021,
    2016,
    2020,
    2024,
    2028,
    2032,
    2036,
    2040,
    2041,
    2044,
    2045,
    2048,
    2049,
    2052,
    2053,
    2056,
    2057,
    2060,
    2061,
    2064,
    2065,
    2068,
    2069,
    2070,
    2072,
    2073,
    2074,
    2076,
    2077,
    2078,
    2080,
    2081,
    2082,
    2084,
    2085,
    2086,
    2088,
    2089,
    2090,
    2092,
    2093,
    2094,
    2096,
    2097,
    2098,
    2099
  ],
  fall: [
    2002,
    2003,
    2004,
    2006,
    2007,
    2010,
    2011,
    2014,
    2015,
    2018,
    2019,
    2022,
    2023,
    2026,
    2027,
    2031,
    2035,
    2039,
    2043,
    2047,
    2051,
    2055,
    2059,
    2092,
    2096
  ],
  winter: [
    2002,
    2003,
    2006,
    2007,
    2011,
    2015,
    2019,
    2023,
    2027,
    2031,
    2035,
    2039,
    2043,
    2080,
    2084,
    2088,
    2092,
    2096
  ]
}

const winter20th = [2080, 2084, 2088, 2092, 2096]

const calcSeasons = function(year) {
  // most common defaults
  let res = {
    spring: 'March 20 ' + year,
    summer: 'June 21 ' + year,
    fall: 'Sept 22 ' + year,
    winter: 'Dec 21 ' + year
  }
  if (exceptions.spring.indexOf(year) !== -1) {
    res.spring = 'March 19 ' + year
  }
  if (exceptions.summer.indexOf(year) !== -1) {
    res.summer = 'June 20 ' + year
  }
  if (exceptions.fall.indexOf(year) !== -1) {
    res.fall = 'Sept 21 ' + year
  }
  // winter can be 20th, 21st, or 22nd
  if (exceptions.winter.indexOf(year) !== -1) {
    res.winter = 'Dec 22 ' + year
  }
  if (winter20th.indexOf(year) !== -1) {
    res.winter = 'Dec 20 ' + year
  }
  return res
}
module.exports = calcSeasons
