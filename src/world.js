export default {
  methods: {
    // this should be the only Date call, anywhere
    now: () => new Date().getTime(),
    // stub for proper input parsing
    parse: (input) => input
  },
  model: {},
  config: {},
  zones: {}
}