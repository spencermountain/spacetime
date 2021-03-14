#!/usr/bin/env node
'use strict'
const React = require('react')
const importJsx = require('import-jsx')
const { render } = require('ink')
const minimist = require('minimist')
// const meow = require('meow')

const App = importJsx('./src/App')

const defaults = {
	// timezone: null
	months: 1
}

const aliases = {
	h: 'help',
	d: 'date',
	month: 'date',
	m: 'months'
}

let opts = minimist(process.argv.slice(2), aliases)
let str = opts._.join(' ')
opts = Object.assign({}, opts, defaults)
delete opts._

render(React.createElement(App, { str, opts }))
