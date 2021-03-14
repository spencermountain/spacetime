#!/usr/bin/env node
'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { render } = require('ink')
const minimist = require('minimist')
const parseDate = require('./parseStr')

const App = importJsx('./src/App')

const defaults = {
	// timezone: null
	months: 1
}

const alias = {
	h: 'help',
	d: 'date',
	month: 'date',
	m: 'months',
	q: 'quarter',
	y: 'year'
}

let opts = minimist(process.argv.slice(2), { alias: alias })
let str = opts._.join(' ')
opts = Object.assign({}, defaults, opts)
delete opts._

let res = parseDate(str)

if (opts.quarter) {
	opts.months = 3
	res.start = res.start.startOf('quarter')
}
if (opts.year) {
	opts.months = 12
	res.start = res.start.startOf('year')
}

let data = {
	start: res.start,
	end: res.end,
	opts: opts
}
render(React.createElement(App, data))
