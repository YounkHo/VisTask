function drawCloud(view,itemId){
	d3.select("#" + view).selectAll('*').remove();
	d3.csv("../data/useritem.csv", function(error, dataset){
	if(error)return;
	item_ids = []
		for (var i = 0; i <dataset.length; i++) {
			item_ids.push(dataset[i].item_id)
		}
		var viewid= item_ids.indexOf(itemId)
		console.log(viewid)

		try {
			review = dataset[viewid]["cloud"]
		}catch (e) {
			review = "没有数据"
		}
//	console.log(review);
	review = review.split("，");
//	console.log(review);
	
	var fill = d3.scale.category20();
//	console.log(dataset[0]['cloud']);
	
    d3.layout.cloud().size([600, 160]) //size([x,y])  词云显示的大小
//		    .words(["好吃", "优惠", "新开的",
//		    		"环境不错", "良心价", "以后还去", 
//		    		]
		    .words(review
		    .map(function(d) {
		        return {"text": d, "size": 10 + Math.random() * 50};
		    }))
	
		    .rotate(function() { return ~~(Math.random() * 2) * 90; })
		    .font("Impact")
		    .fontSize(function(d) { return d.size; })
		    .on("end", draw)//结束时运行draw函数
		    .start();
	    
	function draw(words) {
    d3.select("#"+view)
    	.append("svg")
    	.attr('class','cloud')
        .attr("width", 600)
        .attr("height", 160)
        .attr("style","border:2px solid #0ff;border-radius:30px;")
        .attr("float","right")
        .append("g")
        .attr("transform", "translate(300,75)")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("border","1px solid blue")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })//fill 在前面15行定义为颜色集
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
}
});
}


