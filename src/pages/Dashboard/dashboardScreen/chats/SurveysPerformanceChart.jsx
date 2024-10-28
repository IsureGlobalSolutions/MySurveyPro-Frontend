import Chart from 'react-apexcharts';

const SurveysPerformanceChart = () => {
    const chartValues ={
        "annotations": {},
        "chart": {
            "animations": {
                "enabled": false,
                "easing": "swing"
            },
            "background": "",
            "foreColor": "#333",
            "fontFamily": "Lato",
            "height": 294,
            "id": "HtD7K",
            "stackOnlyBar": true,
            "toolbar": {
                "show": false
            },
            "type": "bar",
            "width": 558,
            "fontUrl": null
        },
        "plotOptions": {
            "line": {
                "isSlopeChart": false
            },
            "bar": {
                "columnWidth": "40%",
                "distributed": true,
                "borderRadiusApplication": "end",
                "borderRadiusWhenStacked": "last",
                "hideZeroBarsWhenGrouped": false,
                "isDumbbell": false,
                "isFunnel": false,
                "isFunnel3d": true,
                "dataLabels": {
                    "total": {
                        "enabled": false,
                        "offsetX": 0,
                        "offsetY": 0,
                        "style": {
                            "color": "#373d3f",
                            "fontSize": "12px",
                            "fontWeight": 600
                        }
                    }
                }
            },
            "bubble": {
                "zScaling": true
            },
            "treemap": {
                "borderRadius": 4,
                "dataLabels": {
                    "format": "scale"
                }
            },
            "radialBar": {
                "hollow": {
                    "background": "#fff"
                },
                "dataLabels": {
                    "name": {},
                    "value": {},
                    "total": {}
                },
                "barLabels": {
                    "enabled": false,
                    "margin": 5,
                    "useSeriesColors": true,
                    "fontWeight": 600,
                    "fontSize": "16px"
                }
            },
            "pie": {
                "donut": {
                    "labels": {
                        "name": {},
                        "value": {},
                        "total": {}
                    }
                }
            }
        },
        "dataLabels": {
            "offsetY": -20,
            "style": {
                "fontWeight": 700
            },
            "background": {
                "enabled": false
            }
        },
        "grid": {
            "padding": {
                "right": 25,
                "left": 15
            }
        },
        "legend": {
            "position": "right",
            "fontSize": 11,
            "fontWeight": 100,
            "offsetX": -35,
            "offsetY": -14,
            "markers": {
                "size": 6,
                "shape": "square"
            },
            "itemMargin": {
                "vertical": 0
            }
        },
        "markers": {},
        "series": [
            {
                "name": "Column",
                "data": [
                    {
                        "x": "Q12",
                        "y": "38"
                    },
                    {
                        "x": "Form 360",
                        "y": "77"
                    },
                    {
                        "x": "survey 3",
                        "y": "67"
                    },
                    {
                        "x": "survey 4",
                        "y": "85"
                    },
                    {
                        "x": "survey 5",
                        "y": "50"
                    }
                ],
                "group": "apexcharts-axis-0",
                "zIndex": 0
            }
        ],
        "stroke": {
            "show": false,
            "fill": {
                "type": "solid",
                "opacity": 0.85,
                "gradient": {
                    "shade": "dark",
                    "type": "horizontal",
                    "shadeIntensity": 0.5,
                    "inverseColors": true,
                    "opacityFrom": 1,
                    "opacityTo": 1,
                    "stops": [
                        0,
                        50,
                        100
                    ],
                    "colorStops": []
                }
            }
        },
        "tooltip": {
            "shared": false,
            "hideEmptySeries": false,
            "intersect": true
        },
        "xaxis": {
            "labels": {
                "trim": true,
                "style": {}
            },
            "group": {
                "groups": [],
                "style": {
                    "colors": [],
                    "fontSize": "12px",
                    "fontWeight": 400,
                    "cssClass": ""
                }
            },
            "tickPlacement": "between",
            "title": {
                "style": {
                    "fontWeight": 700
                }
            },
            "tooltip": {
                "enabled": false
            }
        },
        "yaxis": {
            "tickAmount": 5,
            "labels": {
                "style": {}
            },
            "title": {
                "style": {
                    "fontWeight": 700
                }
            }
        }
    }

  return (
    <>
    <div className="age-card rounded-3 border p-3 shadow bg-white">
    <div className="d-flex justify-content-between py-2">
        <div className="title d-flex align-items-center ">
            <div className=""><p className='m-0 '>Surveys Performance</p></div>
            
        </div>
        <div className="dropdown">
   
        </div>
    
    </div>
    <hr  className='m-1 my-2'/>

  <Chart
        options={chartValues}
        series={chartValues.series}
        type="bar"
        height="280"
        
      /> 
</div>

    </>
  )
}

export default SurveysPerformanceChart



