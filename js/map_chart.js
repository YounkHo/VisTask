drawMap("map-chart", "咖啡厅 ")
function drawMap(viewId, type) {
    // 百度地图API功能
    var myGeo = new BMap.Geocoder();
	var map = new BMap.Map(viewId,{minZoom:13,maxZoom:18});     // 创建Map实例
	map.centerAndZoom("绵阳", 14);  // 初始化地图,设置中心点坐标和地图级别
	//添加地图类型控件
	map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));
	map.setCurrentCity("绵阳");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    var points = [];  // 添加海量点数据
    d3.csv("../data/item.csv").then(function (res) {
        for(var i=0;i<res.length;i++){
            if(res[i].item_type == type){
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
            color: '#d340c3'
        }
		var pointCollection = new BMap.PointCollection(points, options);  // 初始化PointCollection
		pointCollection.addEventListener('click', function (e) {
		    console.log(e)
          alert('单击点的坐标为：' + e.point.lng + ',' + e.point.lat);  // 监听点击事件
        });
         map.addOverlay(pointCollection);  // 添加Overlay
    })
}