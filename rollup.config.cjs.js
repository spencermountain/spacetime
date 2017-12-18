import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'spacetime.raw.js',
    format: 'cjs'
  },
  plugins: [
    nodeResolve({
    jsnext: true,
    main: true
    }),
    commonjs({
      exclude: ['node_modules']
    }),
    json(),
  ],
}
