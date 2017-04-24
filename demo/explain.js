new Vue({
  el: '#explain',
  data: {
    epoch: Date.now(),
    offset: new Date().getTimezoneOffset(),
    doc: {},
    docs: {
      main: {},
      getters: {},
      utils: {},
    },
  },
  methods: {},
  created: function() {
    d3.json('./lib/docs.json', (error, docs) => {
      console.log(docs);
      this.docs = docs;
    });
  }
});
