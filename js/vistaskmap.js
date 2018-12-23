showmap("map-chart", 1000, 600, "咖啡厅 ");

var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltips")
        .attr("opacity", 0.0);
function showmap(container_id, width, height, type) {
	// body...
	var projection = d3.geoMercator()
						.center([107, 35])
						.scale(20000)
						.translate([width/2+1000, height-1500]);
	var path = d3.geoPath().projection(projection);
	var svg = d3.select("body")
				.select("#" + container_id)
				.append("svg")
				.attr("width", width)
				.attr("height", height);

	d3.json("../data/510700.json").then(function (res) {
		// body...
		var map = svg.append("g").attr("transform", "translate(0,0)");
		map.selectAll("path")
			.data(res.features)
			.enter()
			.append("path")
			.attr("stroke", "rgb(111, 111, 111)")
			.attr("stroke-width", 1)
			.attr("fill","#5D6165")
			.attr("id", function (data) {
				// body...
				return data.properties.id;
			})
			.attr("d", path)
			.on("mouseover", function () {
				// body...
				d3.select(this).transition().ease(d3.easeLinear).attr("fill","#52585F");
			})
			.on("mouseout", function() {
				// body...
				d3.select(this).transition().duration(600).ease(d3.easeLinear).attr("fill", "#5D6165");
			});
		var text = svg.append("g").attr("transform", "translate(0, 0)");
		text.selectAll("text")
			.data(res.features)
			.enter()
			.append("text")
			.attr("transform", function(d) {
				// body...
				console.log(getCenterText(d.geometry.coordinates,0),getCenterText(d.geometry.coordinates, 1))
				return "translate("+projection([getCenterText(d.geometry.coordinates,0),getCenterText(d.geometry.coordinates, 1)])+")";
			})
			.attr("text-anchor", "middle")
			.attr("font-size", "8pt")
			.attr("fill", "rgb(130, 130, 130)")
			.text(function (d) {
				// body...
				return d.properties.name;
			});
		var point = svg.append("g").attr("transform", "translate(0, 0)");
		d3.csv("../data/item2.csv").then(function (res) {
				// body...
			resBase = getDataByType(res, type);
			point.selectAll("circle")
					.data(resBase)
					.enter()
					.append("circle")
					.attr("r", 3)
					.attr("transform", function(d){
						return "translate("+projection([d.lng, d.lat])+")";
					})
					.attr("id", function(d) {
						return d.item_id+"map-unclicked";
					})
					.attr("fill", function(d, i) {
						return color(d.star);
					})
					.on("click", function (d ,i) {
						// body...
						StationId = d.item_id;
						getMonthChart("small-view1", 330, 240, StationId, time, res, type);
						tooltip.style("opacity", 0.0);
						point.selectAll("circle").attr("r", "3")
							.attr("fill", "grey")
							.attr("id",function() {
								return d.item_id+"map-unclicked";
							});
						d3.select(this)
								.attr("id", function(d) {
									return d.item_id+"map-clicked";
								})
								.attr("r", "8")
								.attr("fill", function() {
									return color(d.star);
								});
						
					})
					.on("mouseover", function (d, i) {
						// body...
						d3.select(this).attr("r","8");
						tooltip.html("名称： "+ d.name+"<br/>"
									+"描述： "+ d.description +"<br/>")
								.style("left", (d3.event.pageX)+"px")
								.style("top", (d3.event.pageY+20)+"px")
								.style("opacity", 1.0);
					})
					.on("mousemove", function(d) {
						tooltip.style("left", (d3.event.pageX))
								.style("top", (d3.event.pageY+20));
					})
					.on("mouseout", function(d, i) {
						if (this.id.split("-")[1] == "unclicked") {
							d3.select(this).transition()
	                                    .ease(d3.easeLinear)
	                                    .attr("r", "3");
						}

							tooltip.style("opacity", 0.0);
					});
			getMonthChart("small-view1", 330, 240, StationId, time, resBase, type);
		});
	});
}
