var svg = d3.select("body").append("svg")
  .attr("width", 500)
  .attr("height", 500);

var xScale = d3.scale.linear().range([0, 500]);
var yScale = d3.scale.linear().range([500, 0]);

function render(data) {

  xScale.domain(d3.extent(data, function (d){ return d.POPESTIMATE2009; }));
  yScale.domain(d3.extent(data, function (d){ return d.GDP2009; }));

  var circles = svg.selectAll("circle").data(data);
  circles.enter().append("circle").attr("r", 5);

  circles
    .attr("cx", function (d){ return xScale(d.POPESTIMATE2009); })
    .attr("cy", function (d){ return yScale(d.GDP2009); });

  console.log(circles);
  // circles.exit().remove();
}

function type(d){
  d.POPESTIMATE2009 = +d.POPESTIMATE2009;
  d.GDP2009 = +d.GDP2009;
  return d;
}

d3.csv("population.csv", type, render);
