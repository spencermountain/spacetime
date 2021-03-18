#!/usr/bin/env node
'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { render } = require('ink')
const minimist = require('minimist')
const parseDate = require('./parseStr')
const App = importJsx('./src/App')
const Help = importJsx('./src/_help')

const defaults = {
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

if (opts.sunday) {
	res.start = res.start.weekStart('sunday')
}
if (opts.monday) {
	res.start = res.start.weekStart('monday')
}
if (opts.saturday) {
	res.start = res.start.weekStart('saturday')
}
if (opts.friday) {
	res.start = res.start.weekStart('friday')
}

let data = {
	start: res.start,
	end: res.end,
	opts: opts
}

if (opts.help) {
	render(React.createElement(Help))
	// process.exit()
	// return
} else {
	render(React.createElement(App, data))
}
