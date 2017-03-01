'use strict';
const Table = function() {}; //require('cli-table');
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
    tz: 'Etc/UCT'
  },
  {
    title: 'Brisbane',
    color: 'cyan',
    emoji: '🌈',
    tz: 'Australia/Brisbane'
  },
];

const makeTime = (o) => {
  return o.space.niceTime();
};
const makeDate = (o) => {
  return colors.black(o.space.niceDate());
};
const makeEmoji = (o) => {
  return colors[o.color](o.emoji);
};
const makeTitle = (o) => {
  return colors[o.color](o.title);
};

const centerTable = (str) => {
  str = colors.green(str);
  for(let i = 0; i < 26; i++) {
    str = '- ' + str + ' -';
  }
  for(let i = 0; i < 10; i++) {
    str = ' ' + str;
  }
  return str;
};

const wordMap = (s) => {
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

  places.forEach((o) => {
    o.space = s.clone().goto(o.tz); //.log();
  });

  table.push(places.map(makeEmoji));
  table.push(places.map(makeTitle));
  table.push(places.map(makeTime));
  table.push(places.map(makeDate));

  console.log(centerTable(s.epoch));
  console.log(table.toString());
};
module.exports = wordMap;
