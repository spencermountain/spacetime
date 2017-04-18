var width = 960;
var height = 660;
var projection = d3.geo.mercator()
  .scale(width / 2 / Math.PI)
  .translate([width, height])
  .precision(.1);

var path = d3.geo.path()
  .projection(projection);

var svg = d3.select('#map').append('svg')
  .attr('width', width)
  .attr('height', height);

window.day = new Vue({
  el: '#today',
  data: {
    width: width,
    height: height,
    hour: 3,
    timezone: spacetime().timezone().name,
    progress: 50,
    tzData: []
  },
  methods: {
    changeTZ: function(tz) {
      this.timezone = tz;
    },

    drawMap: function() {
      var timezones = this.tzData;
      path.projection(null);

      svg.insert('g', '.graticule')
        .attr('class', 'timezones')
        .selectAll('path')
        .data(topojson.feature(timezones, timezones.objects.timezones).features)
        .enter().append('path')
        .attr('d', path)
        .on('click', (d) => {
          this.timezone = d.id;
          this.drawMap();
        })
        .attr('fill', (d) => {
          if (d.id === this.timezone) {
            return 'cornflowerblue';
          }
          return null;
        })
        .append('title')
        .text(function(d) {
          return d.id;
        });

      svg.insert('path', '.graticule')
        .datum(topojson.mesh(timezones, timezones.objects.timezones, function(a, b) {
          return a !== b;
        }))
        .attr('class', 'boundary')
        .attr('d', path);

      d3.select(self.frameElement).style('height', height + 'px');
    }

  },
  created() {
    console.log('hi');
    d3.json('./lib/timezones.json', (error, timezones) => {
      this.tzData = timezones;
      this.drawMap();
    });
  }
});
