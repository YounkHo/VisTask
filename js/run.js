$('#type').change(function() {
    var type = $(this).children('option:selected').val();
    global_type = type+" "
    drawMap("map-chart", global_type)
    getBestTen(cost, taste, environment, service, global_type, resData, map)
});

$('#year').click(function() {
    var years = $(this).children('option:selected').val();
    var value = document.getElementById("item_id").value
    draw_calendar_chart(600,90,10, value, parseInt(years), "temporal-chart")
});

$('#choose').click(function() {
    myDrag.open();
});

$('#cancelchoose').click(function() {
    myDrag.close();
});