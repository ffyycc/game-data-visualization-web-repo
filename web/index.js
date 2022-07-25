const label_dims = { height: 120, width: 900};
const label_margin = {top:30,right:40,bottom:100, left:100};
const votes_magrin = { left:15 };
// create svg element
var label_svg = d3.select(".labels")
                    .append("svg")
                    .attr('viewBox',`0 0 ${label_dims.width} ${label_dims.height}`)
                    .attr('preserveAspectRatio',"xMidYMid meet");
var votes_svg = d3.select(".slidecontainer")
                    .append("svg")
                    .attr("width", '120%')
                    .attr("height",30)
                    .attr('color','grey')


// Create data
var ex_data = [1, 2, 3, 4, 5]
var slide_width = d3.select('.slidecontainer').style('width').slice(0, -2);
var votes_x = d3.scalePoint().domain(["100+","200+","500+","1000+"]).rangeRound([5,slide_width-5]);

min_color = '#52BE80'
max_color ='#041AFC'

min_radius = 8;
max_radius = 20;

var myColor = d3.scaleLinear().domain([1,5])
  .range([min_color, max_color])

var mySize = d3.scaleLinear().domain([1,5])
  .range([min_radius, max_radius])

label_svg.selectAll(".firstrow").data(ex_data).enter().append("circle").attr("cx", function(d,i){return label_margin.left + i*60}).attr("cy", 50).attr("r", 19).attr("fill", function(d){return myColor(d) }).style('opacity', 0.75);

const second_bar_margin = 600;

label_svg.selectAll(".firstrow").data(ex_data).enter().append("circle").attr("cx", function(d,i){return second_bar_margin+ i*60}).attr("cy", 50).attr("r", function(d){ return mySize(d) }).attr("fill", '#2B6CBE').style('opacity', 0.75);

const difficulty_text = label_svg.append('text')
            .attr("class", "difficulty text")
            .attr("text-anchor", "end")
            .attr("x", label_margin.left+180)
            .attr("y", 15)
            .attr("font-family","Monospace")
            .text("Difficulty Level")
            .style("fill", "grey");

const easy_text = label_svg.append('text')
            .attr("class", "difficulty text")
            .attr("text-anchor", "end")
            .attr("x", label_margin.left+15)
            .attr("y", 90)
            .attr("font-family","Monospace")
            .text("easy")
            .style("fill", "grey");

const hard_text = label_svg.append('text')
            .attr("class", "difficulty text")
            .attr("text-anchor", "end")
            .attr("x", label_margin.left+260)
            .attr("y", 90)
            .attr("font-family","Monospace")
            .text("hard")
            .style("fill", "grey");

const score_text = label_svg.append('text')
            .attr("class", "difficulty text")
            .attr("text-anchor", "end")
            .attr("x", second_bar_margin+180)
            .attr("y", 15)
            .attr("font-family","Monospace")
            .text("Game Length")
            .style("fill", "grey");

const low_score_text = label_svg.append('text')
            .attr("class", "difficulty text")
            .attr("text-anchor", "end")
            .attr("x", second_bar_margin+25)
            .attr("y", 90)
            .attr("font-family","Monospace")
            .text("1 hour")
            .style("fill", "grey");

const high_score_text = label_svg.append('text')
            .attr("class", "difficulty text")
            .attr("text-anchor", "end")
            .attr("x", second_bar_margin+280)
            .attr("y", 90)
            .attr("font-family","Monospace")
            .text("80+hours")
            .style("fill", "grey");
            
const votes_label = votes_svg.append("g").attr('transform', `translate(${votes_magrin.left},${0})` )
votes_label.call(d3.axisBottom(votes_x));
votes_label.selectAll(".tick text").attr("font-size","13").attr("font-family","Monospace").style("fill", "grey");
