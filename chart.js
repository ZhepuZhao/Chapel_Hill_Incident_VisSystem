class MapVis {
    constructor(){
        this.year = '2017';
        this.hour_of_occurence = 'all'; // set night as default
        this.victim = 'all'; // set victim doesn't exist as default
        this.victim_race = 'all';
        this.victim_sex = 'all';
        this.category = 'all';
    }

    setYear(new_year){
        this.year = new_year;
        this.render();
        lineChart();

    }
    setTime(new_time){
        this.hour_of_occurence = new_time;
        this.render();
    }

    setVictim(victim_exists){
        this.victim = victim_exists;
        if (victim_exists == 1) {
            document.getElementById('victim_race').removeAttribute('disabled');
            document.getElementById('victim_sex').removeAttribute('disabled');
        } else {
            document.getElementById('victim_race').setAttribute('disabled', 'disabled');
            document.getElementById('victim_sex').setAttribute('disabled', 'disabled');
        }
        this.render();
    }
    setVictimSex(new_sex){
        this.victim_sex = new_sex;
        this.render();
    }
    setVictimRace(new_race){
        this.victim_race = new_race;
        this.render();
    }

    setIncidentType(new_type){
        this.category = new_type;
        this.render();
    }


    render(){
        d3.selectAll("svg").remove();
        var this_vis = this;
        markers.clearLayers();
        load_data.then(function (data) {
            // plot points on the map
            data.forEach(function (value) {

                function addIncidents() {
                    var latlng = L.latLng(value.latitude, value.longitude);
                    var marker = L.circleMarker(latlng, geojsonMarkerOptions)
                        .bindTooltip(
                        "<table class=\"table\">\n" +
                            "  <thead class=\"thead-dark\">\n" +
                            "    <tr>\n" +
                            "      <th scope=\"col\">Key</th>\n" +
                            "      <th scope=\"col\">Value</th>\n" +
                            "    </tr>\n" +
                            "  </thead>\n" +
                            "  <tbody>\n" +
                            "    <tr>\n" +
                            "      <th scope=\"row\">" + "<b>Incident ID</b>: " + "</th>" +
                            "      <th scope=\"row\">" + value.incidentid + "</th>" +
                            "    </tr>\n" +
                            "   <tr>\n" +
                            "      <th scope=\"row\">" + "<b>Incident Type</b>: " + "</th>" +
                            "      <th scope=\"row\">" + value.type + "</th>" +
                            "    </tr>\n" +
                            "   <tr>\n" +
                            "      <th scope=\"row\">" + "<b>Victim Race</b>: " + "</th>" +
                            "      <th scope=\"row\">" + value.victim_race + "</th>" +
                            "    </tr>\n" +
                            "   <tr>\n" +
                            "      <th scope=\"row\">" + "<b>Victim Sex</b>: " + "</th>" +
                            "      <th scope=\"row\">" + value.victim_sex + "</th>" +
                            "    </tr>\n" +
                            "   <tr>\n" +
                            "      <th scope=\"row\">" + "<b>Date of Occurence</b>: " + "</th>" +
                            "      <th scope=\"row\">" + value.date_of_occurence + "</th>" +
                            "    </tr>\n" +
                            "   <tr>\n" +
                            "      <th scope=\"row\">" + "<b>Hour of Occurence</b>: " + "</th>" +
                            "      <th scope=\"row\">" + value.hour_of_occurence + "</th>" +
                            "    </tr>\n" +
                            "   <tr>\n" +
                            "      <th scope=\"row\">" + "<b>Weapon</b>: " + "</th>" +
                            "      <th scope=\"row\">" + value.weapon_description + "</th>" +
                            "    </tr>\n" +
                            "   <tr>\n" +
                            "      <th scope=\"row\">" + "<b>Premise Area</b>: " + "</th>" +
                            "      <th scope=\"row\">" + value.premise_description + "</th>" +
                            "    </tr>\n" +
                            "   <tr>\n" +
                            "      <th scope=\"row\">" + "<b>Offense</b>: " + "</th>" +
                            "      <th scope=\"row\">" + value.offense + "</th>" +
                            "    </tr>\n" +
                            "  </tbody>\n" +
                        "</table>"
                );

                    markers.addLayer(marker);
                }

                // set the year
                var year = value.date_of_occurence.substring(0,4);

                // set occurence_time
                var index = value.hour_of_occurence.indexOf(':');
                var occurence_time = value.hour_of_occurence.substring(0,index);
                if ((occurence_time >= 19 && occurence_time <= 23) ||
                    (occurence_time >= 0 && occurence_time <= 3)){ // occurence_time: 7pm - 23pm or 0am -3am
                    occurence_time = 1;
                } else {
                    occurence_time = 0;
                }

                // set victim
                var victim = 1; // victim exists
                if (value.victim_age == "" && value.victim_sex == "" && value.victim_race == "") {
                    victim = 0;
                }

                // set victim sex
                var sex = value.victim_sex;

                // set victim race
                var race = value.victim_race

                // set category
                var category = value.type;

                if (this_vis.victim == 1) { // show only there are victims
                    if (year == this_vis.year && (occurence_time == this_vis.hour_of_occurence || this_vis.hour_of_occurence == 'all')&&
                        victim == this_vis.victim && (race == this_vis.victim_race || this_vis.victim_race == 'all') &&
                        (sex == this_vis.victim_sex || this_vis.victim_sex == 'all') &&
                        (category == this_vis.category || this_vis.category == 'all')) {
                        addIncidents();
                    }
                } else if (this_vis.victim == 0){
                    if (year == this_vis.year && (occurence_time == this_vis.hour_of_occurence || this_vis.hour_of_occurence == 'all')&&
                        victim == this_vis.victim && (sex == this_vis.victim_sex || this_vis.victim_sex == 'all') &&
                        (category == this_vis.category || this_vis.category == 'all')) {
                        addIncidents();
                    }
                } else {
                    if (year == this_vis.year && (occurence_time == this_vis.hour_of_occurence || this_vis.hour_of_occurence == 'all')&&
                        (sex == this_vis.victim_sex || this_vis.victim_sex == 'all') &&
                        (category == this_vis.category || this_vis.category == 'all')) {
                        addIncidents();
                    }
                }

            }); // end for 'foreach'

            map.addLayer(markers);
            // draw the vertical bar chart of time trends on the right panel
            // step1: extract the array of month from the 'data'
            var month_map = data.filter(function (value) {
                if(value.month.substring(0,4) == this_vis.year){
                    return value;
                }
            }).map(function (value) {
                return {
                    month: value.month.substring(value.month.indexOf('-') + 1), // extract only the month
                    count: 0,
                };
            });

            var months = d3.map();

            month_map.forEach(function (value) {
                if (months.has(value.month)) {
                    months.set(value.month, months.get(value.month) + 1);
                } else {
                    months.set(value.month, 1);
                }
            });

            // step2: draw the diagram
            // set margin
            var margin = ({top: 10, right: 50, bottom: 50, left: 50});
            var height = 200;
            // var width = document.getElementById('incident_trend').getBoundingClientRect().width;
            var width = 450;
            var x = d3.scaleBand()
                .domain(months.entries().sort(function (a, b) { return d3.ascending(a.key, b.key) }).map(function (value) { return value.key; }))
                .range([margin.left, width - margin.right]).padding(0.1);

            // set y scale
            var y = d3.scaleLinear()
                .domain([0, d3.max(months.entries().map(function (value) { return value.value; }), function (value) {
                    return value;
                })])
                .range([height - margin.bottom, margin.top]);


            // add a svg first
            var svg = d3.select('#incident_trend').append('svg');

            var groups = svg.attr('height', height)
                .attr('width', width)
                .append("g")
                .selectAll("rect").data(months.entries()).enter().append('g');
            groups.append("rect")
                .attr("fill", "steelblue")
                .attr("x", function (d) {
                    return x(d.key);
                })
                .attr("y", function (d) {
                    return y(d.value);
                })
                .attr("height", function (d) {
                    return y(0) - y(d.value);
                })
                .attr("width", x.bandwidth())
                .style('fill-opacity', 0.5)

                .on('mouseover', function () {
                    d3.select(this).style('fill-opacity', 1);
                })
                .on('mouseout', function () {
                    d3.select(this).style('fill-opacity', 0.5);
                });
            groups.append('text')
                .text(function (d) {
                    return d.value;
                })
                .attr("x", function (d) {
                    return x(d.key) + 5;
                })
                .attr("y", function (d) {
                    return y(d.value);
                })
                .attr('font-size', '10');

            // x-axis
            var xAxis = function (g) {
                g.attr("transform", "translate(0," +(height - margin.bottom)+")")
                    .call(d3.axisBottom(x));
            }
            svg.append("g")
                .call(xAxis);



            // y-axis
            var yAxis = function (g) {
                g.attr("transform", "translate("+margin.left+",0)")
                    .call(d3.axisLeft(y));
            }

            svg.append("text")
                .attr("class", "axis-label")
                .attr("y", height - 5)
                .attr("x",0 + (width / 2))
                .style("text-anchor", "middle")
                .text("Month");

            svg.append("text")
                .attr("transform", "rotate(90)")
                .attr("class", "axis-label")
                .attr("y", -5)
                .attr("x",0 + (height / 2))
                .style("text-anchor", "middle")
                .text("Number of incidents");
            svg.append("g")
                .call(yAxis);

            /*
            draw the incident summary bar chart
             */
            // set data
            var type_map = data.filter(function (value) {
                if(value.month.substring(0,4) == this_vis.year){
                    return value;
                }
            }).map(function (value) {
                var index = 0;
                if (!value.type.includes(' ')) {
                    index = value.type.length;
                } else {
                    index = value.type.indexOf(' ')
                }
                return {

                    incident_type: value.type.substring(0, index),
                    count: 0,
                };
            });
            var types = d3.map();

            type_map.forEach(function (value) {
                if (types.has(value.incident_type)) {
                    types.set(value.incident_type, types.get(value.incident_type) + 1);
                } else {
                    types.set(value.incident_type, 1);
                }
            });

            // set scale
            var y_summary = d3.scaleBand()
                .domain(types.entries().sort(function (a, b) { return d3.ascending(a.key, b.key) }).map(function (value) { return value.key; }))
                .range([margin.top, height - margin.bottom]).padding(0.1);

            var x_summary = d3.scaleLinear()
                .domain([0, d3.max(types.entries().map(function (value) { return value.value; }), function (value) {
                    return value;
                })])
                .range([margin.right, width - margin.left]);

            // draw charts
            var svg = d3.select('#incident_type').append('svg');
            var groups2 = svg.attr('height', height)
                .attr('width', width)
                .append("g")
                .selectAll("rect").data(types.entries()).enter().append('g');
            groups2.append("rect")
                .attr("fill", "green")
                .attr("x", 50)
                .attr("y", function (d) {
                    return y_summary(d.key);
                })
                .attr("height", y_summary.bandwidth())
                .attr("width", function (d) {
                    return x_summary(d.value) - x_summary(0);
                })
                .style('fill-opacity', 0.5)
                .on('mouseover', function () {
                    d3.select(this).style('fill-opacity', 1);
                })
                .on('mouseout', function () {
                    d3.select(this).style('fill-opacity', 0.5);
                });

            // add number to each bar
            groups2.append('text')
                .text(function (d) {
                    return d.value;
                })
                .attr("y", function (d) {
                    return y_summary(d.key) + 15;
                })
                .attr("x", function (d) {
                    return x_summary(d.value) + 10;
                })
                .attr('font-size', '10');

            var xAxis_type = function (g) {
                g.attr("transform", "translate(0," +(height - margin.bottom)+")")
                    .call(d3.axisBottom(x_summary));
            }
            var yAxis_type = function (g) {
                g.attr("transform", "translate("+margin.left+",0)")
                    .call(d3.axisRight(y_summary));
            }
            svg.append("g")
                .call(xAxis_type);
            svg.append("g")
                .call(yAxis_type);


            svg.append("text")
                .attr("class", "axis-label")
                .attr("y", height - 5)
                .attr("x",0 + (width / 2))
                .style("text-anchor", "middle")
                .text("Total number of incidents");
            svg.append("text")
                .attr("transform", "rotate(90)")
                .attr("class", "axis-label")
                .attr("y", -5)
                .attr("x",0 + (height / 2))
                .style("text-anchor", "middle")
                .text("Incident type");

        });
    }
}