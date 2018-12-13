draw_calendar_chart(600,90,10,"21015857", 2015,"temporal-chart")

function draw_calendar_chart(width, height, cellSize, item_id, year, containerId) {
    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltips")
        .attr("opacity", 0.0);
    // 定义颜色函数，使用量化比例尺映射，即定义域为连续的，从-0.05到0.05，而值域是离散的颜色值
    var color = d3.scaleQuantize()
        .domain([0, 100])
        .range(["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a"]);

    // 定义10个svg组，分别用来展示从1990年到2010年的数据
    var svg = d3.select("#"+containerId)
      .selectAll("svg")
      .data(d3.range(year, year+1))
      .enter().append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

    // 定义每个年份对应的group旁边的标签
    svg.append("text")
         //定义标签文字(年份)的位置以及文字的旋转角度、文字内容
        .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "middle")
        .text(function(d) { return d; });

    // 定义每个年份中代表天的小方格
    var rect = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#ccc")
      .selectAll("rect")
      //计算一组小方格的数量，调用d3的timeDays方法，获取两个时间之间的天数，例如，计算从1999年的第一天到2000年的第一天,则参数为new Date(1999,0,1)到 new Date(2000,0,1)，timeDays返回天序列
      .data(function(d) { return d3.timeDays(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
      .enter().append("rect")
        .attr("width", cellSize)
        .attr("height", cellSize)
        // 返回一年有多少个周，确定一组小方格的横向位置
        .attr("x", function(d) { return d3.timeWeek.count(d3.timeYear(d), d) * cellSize; })
        // 返回天，确定一组小方格的纵向位置
        .attr("y", function(d) { return d.getDay() * cellSize; })
        // 定义当前小方格上对应的日期的格式
        .datum(d3.timeFormat("%Y-%m-%d"));

    // 勾勒月份的分割线
    svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#000")
      .selectAll("path")
      .data(function(d) { return d3.timeMonths(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
      .enter().append("path")
        .attr("d", pathMonth);

    d3.csv("../data/useritem.csv").then(function(csv) {
        var datas= []
      // 这里的d3.nest可以参考http://blog.csdn.net/gdp12315_gu/article/details/51721988
      d3.nest()
          // 以d.Date来对数据进行分组
          .key(function(d) { return d.item_id; })
          // rollup函数用来获取每个组的values，因为一组为一天，只有一行数据，因此这里定义每个组的values 用d[0],即d[0].Close - d[0].Open) / d[0].Open来计算产生数值values
          .rollup(function(d) {
              if(d[0].item_id == item_id){
                  datas = d
              }
          })
        // 个人理解，这里的.object()函数类似于call()函数，用来将定义的分组机制应用到csv数据上,返回分组后的对象，官网对nest().object()的解释：Applies the nest operator to the specified array, returning a nested object.有没有醍醐灌顶的感觉，哈哈
        .object(csv);
        time=[]
        for(var i=0;i<datas.length;i++){
            time.push(datas[i].times)
        }
      // 过滤操作，挑出日期在data中的小方格（因为周六、周日没有在data中，周六周日小方格填充色为默认白色）
      rect.filter(function(d) {
              return isInArray(time, d);
          })
          // 定义小方格的填充色，通过每个小方格中的values值来映射颜色函数
          .attr("fill", function(d) {
              console.log(getRatingByDate(datas, d))
              return color(getRatingByDate(datas, d));
          })
          .on("mouseover",function(d) {
              item = getInfoByTime(datas, d)
              console.log(item)
              tooltip.html("<div class='comment-container'>"+
        "<div class='comment-img pull-left'><img src='"+item.user_pic+"' class='header' onerror=\""+"this.src='../img/default.png'"+"\"/></div>"+
            "<div class='comment-view pull-left'>"+
                "<span class='name'>匿名用户</span>"+
                "<span class='name'>&nbsp;&nbsp;|&nbsp;&nbsp;</span>"+
                "<img src='../img/level.png' style='width: 20px; height: 20px;display: inline;padding: 0, margin: 0' />"+
                "<font color='yellow'>"+item.user_rank+"</font>"+
                "<div class='desc'>"+item.review+"</div>"+
                "<div class='date' style='padding-top: 3px'>"+item.times+"</div>"+
            "</div>"+
        "</div>")
								.style("left", (d3.event.pageX)+"px")
								.style("top", (d3.event.pageY-100)+"px")
								.style("opacity", 1.0);
          })
          .on("mousemove", function(d) {
						tooltip.style("left", (d3.event.pageX))
								.style("top", (d3.event.pageY-100));
					})
          .on("mouseout", function(d, i) {
							tooltip.style("opacity", 0.0);
					});
    });
    // 定义月份分割线路径
function pathMonth(t0) {
  var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
      d0 = t0.getDay(), w0 = d3.timeWeek.count(d3.timeYear(t0), t0),
      d1 = t1.getDay(), w1 = d3.timeWeek.count(d3.timeYear(t1), t1);
  return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
      + "H" + w0 * cellSize + "V" + 7 * cellSize
      + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
      + "H" + (w1 + 1) * cellSize + "V" + 0
      + "H" + (w0 + 1) * cellSize + "Z";
}
}
