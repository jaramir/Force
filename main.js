
var strengths = [
    "Achiever", "Activator", "Adaptability", "Analytical", "Arranger",
    "Belief", "Command", "Communication", "Competition", "Connectedness",
    "Consistency", "Context", "Deliberative", "Developer", "Discipline",
    "Empathy", "Focus", "Futuristic", "Harmony", "Ideation",
    "Includer", "Individualization", "Input", "Intellection", "Learner",
    "Maximizer", "Positivity", "Relator", "Restorative", "Responsibility",
    "Self-Assurance", "Significance", "Strategic", "Woo"
];

function update_strengths_chart(data) {
    var count_per_strength = _.map(strengths, function(strength) {
	var count = _.reduce(data, function(memo, person) {
	    return memo + (_.contains(person.strengths, strength) ? 1 : 0 );
	}, 0);
	return {
	    "name": strength,
	    "count": count
	};
    });

    var x = d3.scale.linear()
        .domain([0, d3.max(count_per_strength, function(d){ return d.count })])
	.range([0, 150]);

    var slice = d3.select(".chart")
	.selectAll("div.slice")
        .data(count_per_strength);

    // enter
    var new_slice = slice.enter()
        .append("div")
        .attr("class", "slice");

    new_slice.append("div")
        .attr("class", "label");

    new_slice.append("div")
	.attr("class", "bar");

    // update
    slice.select(".label")
	.text(function(d) {
            return d.name + " " + d.count;
        });

    slice.select(".bar")
	.transition()
	.style("width", function(d) {
	    return x(d.count) + "px";
	});

    // exit
    slice.exit()
	.remove()
}

function draw(data) {
    update_strengths_chart(data);
}

d3.json("strength.json", draw);
