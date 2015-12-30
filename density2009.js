var outerWidth = 500;
var outerHeight = 500;
var innerWidth = outerWidth - 50;
var innerHeight = outerHeight - 50;
var rMin = 1;
var rMax = 5;
var xColumn = "GDP2009";
var yColumn = "LANDAREA";
var rColumn = "POPESTIMATE2009";

var svg = d3.select("body").append("svg")
  .attr("width", outerWidth)
  .attr("height", outerHeight);

var g = svg.append("g")
  .attr("transform", "translate(30, 30)");

var xScale = d3.scale.log().range([0, outerWidth]);
var yScale = d3.scale.log().range([outerHeight, 0]);
// var xScale = d3.scale.log().range([0, innerWidth]);
// var yScale = d3.scale.log().range([innerHeight, 0]);
var rScale = d3.scale.sqrt().range([rMin, rMax]);

function render(data) {

  xScale.domain(d3.extent(data, function (d){ return d[xColumn]; }));
  yScale.domain(d3.extent(data, function (d){ return d[yColumn]; }));
  rScale.domain([0, d3.max(data, function (d){ return d[rColumn]; })]);

  var circles = g.selectAll("circle").data(data);
  circles.enter().append("circle");

  circles
    .attr("cx", function (d){ return xScale(d[xColumn]); })
    .attr("cy", function (d){ return yScale(d[yColumn]); })
    .attr("r", function (d){ return rScale(d[rColumn]); })
    .on('mouseover', function(d){
      d3.select(this)
      .attr("fill", "orange")
      .attr("class", "hover")
      .html(d.POPESTIMATE2009);

    })
    .on('mouseout', function(d){
      d3.select(this).attr("fill", "black");
    });

  circles.exit().remove();
}

function type(d){
  d[xColumn] = +d[xColumn];
  d[yColumn] = +d[yColumn];
  return d;
}

d3.csv("population.csv", type, function (data) {
  console.log("Inital Data", data);

  var labelVar = "NAME";
  var populationByYear = d3.keys(data[0]).slice(2, 12);
  var gdpByYear = d3.keys(data[0]).slice(12, data.length);

  var seriesData = populationByYear.map( function (name) {
    var year = name.slice(11, name.length);
    return {
      year: year,
      values: data.map( function (d){
        return { label: d[labelVar],
                 area: +d.LANDAREA,
                 population: +d[name],
                 gdp: +d["GDP" + year],
               };
      })
    };
  });

  console.log("seriesData", seriesData);

  render(data);

  var people = rScale.domain()[1];
  var pixels = Math.PI * rMax * rMax;
  console.log((people / pixels) + " people per pixel.");
});
