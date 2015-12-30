var svg = d3.select("body").append("svg")
  .attr("width", 500)
  .attr("height", 500);

function render(data) {
  var circles = svg.selectAll("circle").data(data);

  circles.enter().append("circle")
  .attr("r", 10);

  circles
    .attr("cx", function (d){ return d.POPESTIMATE2009; })
    .attr("cy", function (d){ return d.GDP2009; });

  console.log(circles);
  // circles.exit().remove();
}

d3.csv("population.csv", function (states) {
  render(states);
});
