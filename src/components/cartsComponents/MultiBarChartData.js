export const   MultiBarChartData = (xaxis = [], series = []) => 
    (
        {
            series:series.length>0? series: [{
            name: 'noData',
            data: [99, 99, 99]
          }, {
            name: 'noData',
            data: [99, 99, 99]
          }, {
            name: 'noData',
            data: [99, 99, 99]
          }],
            chart: {
            type: 'bar',
            height: 350,
            toolbar: {
              tools: {
                  download: true
              }
          }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
               borderRadius: "5",
              // endingShape: 'rounded'
                          borderRadiusApplication: "around",

            },
          },
          colors: [
            "#7DCCB7",
            "#1F245E",
            "#3B5BE4"
        ],
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: xaxis? xaxis:['noData', 'noData', 'noData'],
          },
          yaxis: {
            min: 0,
            max: 100, 
            tickAmount: 10,
            // title: {
            //   text: '$ (thousands)'
            // }
          },
          fill: {
            opacity: 1
          },
         
          }
  
);
  