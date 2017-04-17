
var width = 960,
  height = 660;

var projection = d3.geo.mercator()
  .scale(width / 2 / Math.PI)
  .translate([width, height])
  .precision(.1);

var path = d3.geo.path()
  .projection(projection);

var svg = d3.select('#map').append('svg')
  .attr('width', width)
  .attr('height', height);

d3.json('timezones.json', function(error, timezones) {
  if (error) {
    throw error;
  }

  path.projection(null);

  svg.insert('g', '.graticule')
    .attr('class', 'timezones')
    .selectAll('path')
    .data(topojson.feature(timezones, timezones.objects.timezones).features)
    .enter().append('path')
    .attr('d', path)
    .on('click', function(d) {
      alert(d.id);
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
});

d3.select(self.frameElement).style('height', height + 'px');
