$('#type').change(function() {
    var type = $(this).children('option:selected').val();
    global_type = type+" "
    drawMap("map-chart", global_type)
});

$('#year').click(function() {
    var years = $(this).children('option:selected').val();
    var value = document.getElementById("item_id").value
    console.log(years, value)
    draw_calendar_chart(600,90,10, value, parseInt(years), "temporal-chart")
});