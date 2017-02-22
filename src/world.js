'use strict';
const Table = require('cli-table');
const colors = require('./colors');

const places = [
  {
    title: 'San Francisco',
    emoji: '🌞',
    color: 'yellow',
    tz: 'Canada/Pacific'
  },
  {
    title: 'Eastern',
    emoji: '🌭',
    color: 'red',
    tz: 'Canada/Eastern'
  },
  {
    title: 'Britain',
    emoji: '🌧️',
    color: 'blue',
    tz: 'UTC-0'
  },
  {
    title: 'Brisbane',
    color: 'cyan',
    emoji: '🌈',
    tz: 'Australia/Brisbane'
  },
];

const makeTime = (o) => {
  return parseInt(Math.random() * 10, 10) + 'pm';
};
const makeOffset = (o) => {
  return o.tz;
};
const makeEmoji = (o) => {
  return colors[o.color](o.emoji);
};
const makeTitle = (o) => {
  return colors[o.color](o.title);
};


const wordMap = (d) => {
  let table = new Table({
    chars: {
      'top': '',
      'top-mid': '',
      'top-left': '',
      'top-right': '',
      'bottom': '',
      'bottom-mid': '',
      'bottom-left': '',
      'bottom-right': '',
      'left': '',
      'left-mid': '',
      'mid': '',
      'mid-mid': '',
      'right': '',
      'right-mid': '',
      'middle': ' '
    },
    colAligns: ['center', 'center', 'center', 'center'],
    // head: places.map(o => o.title),
    style: {
      'padding-left': 10,
      'padding-right': 10
    }
  });

  table.push(places.map(makeEmoji));
  table.push(places.map(makeTitle));
  table.push(places.map(makeTime));
  table.push(places.map(makeOffset));

  console.log(table.toString());
};
module.exports = wordMap;
