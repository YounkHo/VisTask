function drawRadar(viewId, item_id) {
    d3.select("#" + viewId).selectAll('*').remove();
    var id = -1
    var chart = RadarChart.chart();
    var cfg = chart.config(); // retrieve default config
    var svg = d3.select('#radar').append('svg')
        .attr('class', 'radar')
        .attr('width', cfg.w)
        .attr('height', cfg.h + cfg.h / 4);
    var data = [];

    d3.csv("../data/item2.csv", function(error, dataset) {
        if (error) return;
        for (var i = 0; i < dataset.length; i++) {
            if (dataset[i].item_id == item_id) {
                id = i
                break
            }
        }
        for (var i = 0; i < dataset.length; i++) {
            data.push({
                Name: dataset[i]['name'],
                axes: [
                    { axis: "总分 ", value: dataset[i]['star'] },
                    { axis: "味道 ", value: dataset[i]['taste'] },
                    { axis: "环境 ", value: dataset[i]['environment'] },
                    { axis: "服务 ", value: dataset[i]['service'] },
                    { axis: "消费 ", value: dataset[i]['cost'] }
                ],
                item_type: dataset[i]['item_type'],
                review_count: dataset[i]['review_count']
            });
        }

        data = [data[id]];

        function ItemDataset() {
            return data.map(function(d) {
                return {
                    Name: d.Name,
                    axes: d.axes.map(function(axis) {
                        return { axis: axis.axis, value: axis.value };
                    }),
                    item_type: d.item_type,
                    review_count: d.review_count
                };
            });
        }

        svg.append('g')
            .classed('single', 1)
            .datum(ItemDataset())
            .call(chart);
    });
}