function title() {
    return "<p class='.font-italic .text-center font-weight-bold display-5'>店铺基本信息表</p>";
}

function content() {
    types = getTypes(resData)
    var starcolor = d3.scale.quantize()
        .domain([0, 5.0])
        .range(["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e"]);
    var typecolor = d3.scale.quantize()
        .domain([0, types.length])
        .range(["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]);
    var color = d3.scale.quantize()
        .domain([0, 10.0])
        .range(["#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2"]);

    item = getItemById(document.getElementById("item_id").value, resData)
    data = $(
        "<div class='.font-weight-bold' style='text-align:center;'>您当前的选择是：</div>" +
        "当前店铺： " + item.name + "</br>" +
        "店铺类型： " + "<span style='color:" + typecolor(types.indexOf(item.item_type)) + "'>" + item.item_type + "</span></br>" +
        "店铺星级： " + "<span style='color:" + starcolor(item.star) + "'>" + item.star + "</span></br>" +
        "口味评分： " + "<span style='color:" + color(item.taste) + "'>" + item.taste + "</span></br>" +
        "环境评分： " + "<span style='color:" + color(item.environment) + "'>" + item.environment + "</span></br>" +
        "服务评分： " + "<span style='color:" + color(item.service) + "'>" + item.service + "</span></br>" +
        "评论数量： " + item.review_count + "</br>" +
        "店铺地址： " + item.location + "</br>"
    );

    return data
}

$("#floatbtn").popover({
    html: true,
    title: title(),
    delay: { show: 100, hide: 200 },
    content: function() {
        return content();
    }
});

$("#floatbtn").click(function() {
    $('#myModal').modal();
});