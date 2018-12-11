function lineChart() {
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 50, bottom: 30, left: 50},
        width = 450 - margin.left - margin.right,
        height = 200 - margin.top - margin.bottom;

// set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

// define the 1st line
    var valueline = d3.line()
        .x(function(d) { return x(d.month); })
        .y(function(d) { return y(d.year1); });

// define the 2nd line
    var valueline2 = d3.line()
        .x(function(d) { return x(d.month); })
        .y(function(d) { return y(d.year2); });

// define the 3rd line
    var valueline3 = d3.line()
        .x(function(d) { return x(d.month); })
        .y(function(d) { return y(d.year3); });
// define the 4th line
    var valueline4 = d3.line()
        .x(function(d) { return x(d.month); })
        .y(function(d) { return y(d.year4); });
// define the 5th line
    var valueline5 = d3.line()
        .x(function(d) { return x(d.month); })
        .y(function(d) { return y(d.year5); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    var svg = d3.select("#line_chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

// Get the data
    d3.csv("./data/line_chart.csv", function(data) {
        return data;
    }).then(function (data) {
        // Scale the range of the data
        x.domain([1, d3.max(data, function(d) {
            return d.month; })]);
        console.log(d3.max(data, function(d) {
            return d.month; }));
        y.domain([0, d3.max(data, function(d) {
            return d3.max([d.year1, d.year2,d.year3,d.year4,d.year5]);
        })]);

        // Add the valueline path.
        svg.append("path")
            .attr('id', 'path1')
            .data([data])
            .attr("class", "line")
            .attr("d", valueline)
            .attr('visibility', 'visible');

        // Add the valueline2 path.
        svg.append("path")
            .attr('id', 'path2')
            .data([data])
            .attr("class", "line")
            .style("stroke", "red")
            .attr("d", valueline2)
            .attr('visibility', 'visible');

        // Add the valueline2 path.
        svg.append("path")
            .attr('id', 'path3')
            .data([data])
            .attr("class", "line")
            .style("stroke", "green")
            .attr("d", valueline3)
            .attr('visibility', 'visible');

        // Add the valueline2 path.
        svg.append("path")
            .attr('id', 'path4')
            .data([data])
            .attr("class", "line")
            .style("stroke", "orange")
            .attr("d", valueline4)
            .attr('visibility', 'visible');

        // Add the valueline2 path.
        svg.append("path")
            .attr('id', 'path5')
            .data([data])
            .attr("class", "line")
            .style("stroke", "black")
            .attr("d", valueline5)
            .attr('visibility', 'visible');

        // Add the X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Add the Y Axis
        svg.append("g")
            .call(d3.axisLeft(y));

        svg.append("text")
            .attr("class", "axis-label")
            .attr("y", height + 30)
            .attr("x",0 + (width / 2))
            .style("text-anchor", "middle")
            .text("Month");

        svg.append("text")
            .attr("transform", "rotate(90)")
            .attr("class", "axis-label")
            .attr("y", 50)
            .attr("x",0 + (height / 2))
            .style("text-anchor", "middle")
            .text("Number of incidents");
    });

    var notations = d3.select('#line_chart').append('svg')
        .attr('height', 30)
        .attr('width', width)
        .append("g").selectAll("rect").append('g');

    notations.data([1]).enter().append('rect')
        .attr("fill", "steelblue")
        .attr("x", 50)
        .attr("y", 5)
        .attr("height", 10)
        .attr("width", 20)
        .style('fill-opacity', 1)
        .on('mouseover', function () {
            d3.select(this).style('fill-opacity', 1);
        })
        .on('mouseout', function () {
            d3.select(this).style('fill-opacity', 0.5);
        })
        .on('click', function () {
            var active = d3.select('#path1').attr('visibility') == 'visible' ? true : false;
            console.log(active);
            var hidden = active ? 'hidden' : 'visible';
            console.log(hidden);
            d3.select('#path1').attr('visibility', hidden);

        });
    notations.data([1]).enter().append('rect')
        .attr("fill", "red")
        .attr("x", 100)
        .attr("y", 5)
        .attr("height", 10)
        .attr("width", 20)
        .style('fill-opacity', 0.5)
        .on('mouseover', function () {
            d3.select(this).style('fill-opacity', 1);
        })
        .on('mouseout', function () {
            d3.select(this).style('fill-opacity', 0.5);
        })
        .on('click', function () {
            var active = d3.select('#path2').attr('visibility') == 'visible' ? true : false;
            var hidden = active ? 'hidden' : 'visible';
            d3.select('#path2').attr('visibility', hidden);

        });
    notations.data([1]).enter().append('rect')
        .attr("fill", "green")
        .attr("x", 150)
        .attr("y", 5)
        .attr("height", 10)
        .attr("width", 20)
        .style('fill-opacity', 0.5)
        .on('mouseover', function () {
            d3.select(this).style('fill-opacity', 1);
        })
        .on('mouseout', function () {
            d3.select(this).style('fill-opacity', 0.5);
        })
        .on('click', function () {
            var active = d3.select('#path3').attr('visibility') == 'visible' ? true : false;
            var hidden = active ? 'hidden' : 'visible';
            d3.select('#path3').attr('visibility', hidden);

        });
    notations.data([1]).enter().append('rect')
        .attr("fill", "orange")
        .attr("x", 200)
        .attr("y", 5)
        .attr("height", 10)
        .attr("width", 20)
        .style('fill-opacity', 0.5)
        .on('mouseover', function () {
            d3.select(this).style('fill-opacity', 1);
        })
        .on('mouseout', function () {
            d3.select(this).style('fill-opacity', 0.5);
        })
        .on('click', function () {
            var active = d3.select('#path4').attr('visibility') == 'visible' ? true : false;
            var hidden = active ? 'hidden' : 'visible';
            d3.select('#path4').attr('visibility', hidden);

        });
    notations.data([1]).enter().append('rect')
        .attr("fill", "black")
        .attr("x", 250)
        .attr("y", 5)
        .attr("height", 10)
        .attr("width", 20)
        .style('fill-opacity', 0.5)
        .on('mouseover', function () {
            d3.select(this).style('fill-opacity', 1);
        })
        .on('mouseout', function () {
            d3.select(this).style('fill-opacity', 0.5);
        })
        .on('click', function () {
            var active = d3.select('#path5').attr('visibility') == 'visible' ? true : false;
            var hidden = active ? 'hidden' : 'visible';
            d3.select('#path5').attr('visibility', hidden);

        });
// add text to these notations
    notations.data([50,100,150,200,250]).enter().append('text')
        .attr("x", function (d) { return d; })
        .attr("y", 30)
        .attr("height", 10)
        .attr("width", 20)
        .attr('font-size', 10)
        .text(function (d) {
            return 2012 + d / 50;
        });
}
