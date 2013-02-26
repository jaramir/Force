
var strengths = [
    "Achiever", "Activator", "Adaptability", "Analytical", "Arranger",
    "Belief", "Command", "Communication", "Competition", "Connectedness",
    "Consistency", "Context", "Deliberative", "Developer", "Discipline",
    "Empathy", "Focus", "Futuristic", "Harmony", "Ideation",
    "Includer", "Individualization", "Input", "Intellection", "Learner",
    "Maximizer", "Positivity", "Relator", "Restorative", "Responsibility",
    "Self-Assurance", "Significance", "Strategic", "Woo"
];

function flatten(data) {
    var childs = _.flatten(_.map(data.children, flatten));
    childs.push({
	name: data.name,
	strengths: data.strengths
    });
    return childs;
}

function update_strengths_chart(data) {
    var people = flatten(data);

    var count_per_strength = _.map(strengths, function(strength) {
	var count = _.reduce(people, function(memo, person) {
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

function update_tree(data) {
    var svg = d3.select("svg.tree");
    var area = svg.append("g")
	.attr("transform", "translate(0, 40)");

    var tree = d3.layout.tree()
	.size([800,500]);

    var nodes = tree.nodes(data);
    var links = tree.links(nodes);

    var link = area.selectAll("path")
	.data(links)
	.enter()
	.append("path")
	.attr("d", d3.svg.diagonal())

    var node = area.selectAll("g")
	.data(nodes);

    var new_node = node.enter()
	.append("g")
	.attr("transform", function(d) {
	    return "translate(" + d.x + "," + d.y + ")";
	});

    new_node.append("circle")
	.attr("r", 4);

    new_node.append("text")
	.attr("dx", 5)
	.text(function(d) {
	    return d.name;
	})
	.attr("transform", "rotate(-45)" );
}

function draw(data) {
    update_tree(data);
    update_strengths_chart(data);
}

d3.json("strength.json", draw);
