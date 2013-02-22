
var strengths = [
    "Achiever", "Activator", "Adaptability", "Analytical", "Arranger",
    "Belief", "Command", "Communication", "Competition", "Connectedness",
    "Consistency", "Context", "Deliberative", "Developer", "Discipline",
    "Empathy", "Focus", "Futuristic", "Harmony", "Ideation",
    "Includer", "Individualization", "Input", "Intellection", "Learner",
    "Maximizer", "Positivity", "Relator", "Restorative", "Responsibility",
    "Self-Assurance", "Significance", "Strategic", "Woo"
];

function all_strength(person) {
    return [
	person.Strength1,
	person.Strength2,
	person.Strength3,
	person.Strength4,
	person.Strength5,
    ];
}

function count(strength, people){
    return _.reduce( people, function(memo, person) {
	return memo + (_.contains(all_strength(person), strength) ? 1 : 0 );
    }, 0); 
}

function csv_loaded(csv) {
    var div = d3.select(".chart").selectAll("div.slice")
        .data(strengths);

    var slice = div.enter()
        .append("div")
        .attr("class", "slice");
    
    slice.append("div")
        .attr("class", "label")
	.text(function(d) { 
	    var c = count(d, csv);
            return d + " " + c;
        });

    slice.append("div")
	.attr("class", "bar")
	.style("width", function(d) {
	    var c = count(d, csv);
	    return (c * 10) + "px";
	})
}

d3.csv("strength.csv", csv_loaded);
