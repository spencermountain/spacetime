var width = 960;
var height = 660;
var map = d3.select('#map').append('svg');
map.attr('width', width).attr('height', height);

var dayWidth = 600;
var scale = d3.scale.linear();
scale.range([0, dayWidth]).domain([0, 1]);

var s = spacetime();

window.day = new Vue({
  el: '#today',
  data: {
    s: s,
    hi: 'world',
    timezone: s.timezone().name,
    scale: scale,
    time: s.format('time-12h'),
    tzData: [],
    months: [
      '#844448',
      '#95A572',
      '#B698BC',
      '#f5f1c5',
      '#C9AFAF',
      '#839A9E',
      '#C7DCE0',
      '#989ABC',
      '#DDEDD0',
      '#BA7171',
      '#818687',
      '#7abbc3',
    ],
    controls: [
      {
        title: 'minute'
      },
      {
        title: 'hour'
      },
      {
        title: 'day'
      },
      {
        title: 'week'
      },
      {
        title: 'year'
      },
    ]
  },
  methods: {

    changeTZ: function(tz) {
      s.goto(tz);
      this.timezone = tz;
    },

    drawDay: function() {},

    drawMap: function() {
      var timezones = this.tzData;
      var projection = d3.geo.mercator().scale(width / 2 / Math.PI).translate([width, height]).precision(.1);
      var path = d3.geo.path().projection(projection);
      path.projection(null);

      map.insert('g', '.graticule')
        .attr('class', 'timezones')
        .selectAll('path')
        .data(topojson.feature(timezones, timezones.objects.timezones).features)
        .enter().append('path')
        .attr('d', path)
        .on('click', (d) => {
          console.log(d.id);
          this.changeTZ(d.id);
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

      map.insert('path', '.graticule')
        .datum(topojson.mesh(timezones, timezones.objects.timezones, function(a, b) {
          return a !== b;
        }))
        .attr('class', 'boundary')
        .attr('d', path);
    }

  },
  created() {
    d3.json('./lib/timezones.json', (error, timezones) => {
      this.tzData = timezones;
      this.drawMap();
    });
  }
});
