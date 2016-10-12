$(function() {
$('#chart_container').highcharts({
 chart: {
            type: 'column'
        },
          title: {
            text: 'Performance'
        },
        xAxis: {
            categories: [
                'Mon',
                'tue',
                'Wed',
                'Thu',
                'Fri',

            ],
        },
            yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Performance'
            }
        },
        plotOptions: {
            series: {
                states: {
                    hover: {
                        enabled: false
                    }
                }
            }
        },

    series: [{
            name: 'Task',
            data: [19, 30, 40, 55, 84]
        }]

   
    });
});