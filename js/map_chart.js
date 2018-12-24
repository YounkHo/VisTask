draw_calendar_chart(document.getElementById("tempral-parent").offsetWidth,7*document.getElementById("tempral-parent").offsetWidth/60+50,document.getElementById("tempral-parent").offsetWidth/60,"18022345", 2015,"temporal-chart")
drawRadar("radar", "18022345")
drawMap("map-chart", global_type)
drawCloud("cloud","18022345")

var select = document.getElementById("year")
var option = document.createElement("option")
option.innerHTML = 2015
select.append(option)
var myDrag;
function drawMap(viewId, type) {
    // 百度地图API功能
    var myGeo = new BMap.Geocoder();
	map = new BMap.Map(viewId,{minZoom:10,maxZoom:18});     // 创建Map实例
	map.centerAndZoom("绵阳", 14);  // 初始化地图,设置中心点坐标和地图级别
	//添加地图类型控件
    myDrag = new BMapLib.RectangleZoom(map, {
		followText: "拖拽鼠标进行操作"
	});
	map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));
	map.setCurrentCity("绵阳");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    var points = [];  // 添加海量点数据
    d3.csv("../data/item2.csv", function (err, res) {
        getBestTen(10, 10, 10, 10, "咖啡厅 ", res, map)
        var typedata = getTypes(res)
        resData = res
        if (err)
            return
        datas = []
        var typecolor = d3.scale.quantize()
            .domain([0, typedata.length])
            .range(["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]);
        for(var i=0;i<res.length;i++){
            if(res[i].item_type == type){
                datas.push(res[i])
                myGeo.getPoint(res[i].location, function(point){
                if (point) {
                        points.push(point)
                    }
                 },
                "绵阳市");
            }

        }
        var options = {
            size: BMAP_POINT_SIZE_HUGE,
            shape: BMAP_POINT_SHAPE_WATERDROP,
            color: typecolor(typedata.indexOf(getItemById(document.getElementById("item_id").value,res).item_type))
        }
		var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
		pointCollection.addEventListener('click', function (res, point) {

		    if (point){

		        item = getInfoByPosition(point.point.lat, point.point.lng, datas)
                document.getElementById("item_id").value = item.item_id
                document.getElementById("title").style.color = typecolor(typedata.indexOf(item.item_type))
                document.getElementById("title").innerHTML = item.name
                draw_calendar_chart(document.getElementById("tempral-parent").offsetWidth,7*document.getElementById("tempral-parent").offsetWidth/60+50,document.getElementById("tempral-parent").offsetWidth/60,item.item_id, parseInt($("#year").children('option:selected').val()),"temporal-chart")
                drawCloud("cloud",item.item_id)
                drawRadar("radar", item.item_id)
                d3.csv("../data/hty/useritem.csv", function(err, csv) {
                    if (err)
                        return

                    var datas= []
                  d3.nest()
                      // 以d.Date来对数据进行分组
                      .key(function(d) { return d.item_id; })
                      // rollup函数用来获取每个组的values，因为一组为一天，只有一行数据，因此这里定义每个组的values 用d[0],即d[0].Close - d[0].Open) / d[0].Open来计算产生数值values
                      .rollup(function(d) {
                          if(d[0].item_id == item.item_id){
                              datas = d
                          }
                      })
                    // 个人理解，这里的.object()函数类似于call()函数，用来将定义的分组机制应用到csv数据上,返回分组后的对象，官网对nest().object()的解释：Applies the nest operator to the specified array, returning a nested object.有没有醍醐灌顶的感觉，哈哈
                    .entries(csv);
                    d3.select("#year").selectAll('*').remove();
                     var year = getYear(datas)
                    for (var i = 0; i < year.length; i++) {
                        var select = document.getElementById("year")
                        var option = document.createElement("option")
                        option.innerHTML = year[i]
                        select.append(option)
                    }

            })
        }
    })
         map.addOverlay(pointCollection);  // 添加Overlay
    })
}