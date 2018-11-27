import json from 'rollup-plugin-json';

export default {
  input: 'src/index.mjs',
  output: [{
    file: 'builds/bundle.es.js',
    format: 'es',
    name: 'App',
    sourcemap: false
  }],
  plugins: [
    json({})
  ]
};
