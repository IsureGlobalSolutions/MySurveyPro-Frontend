// chartValues.js
export const StackChartData = ( series = []) => ({
    "annotations": {},
    "chart": {
        "animations": {
            "enabled": false
        },
        "background": "",
        "foreColor": "#333",
        "fontFamily": "Roboto",
        "height": 261,
        "id": "Znd2P",
        "stacked": true,
        "stackOnlyBar": true,
        "toolbar": {
            "show": true
        },
        "type": "bar",
        "width": 481,
        "zoom": {
            "allowMouseWheelZoom": true
        }
    },
    "plotOptions": {
        "line": {
            "isSlopeChart": false
        },
        "bar": {
            "columnWidth": "18%",
            "borderRadiusApplication": "end",
             "borderRadius": "3",
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
                "offsetX": 0,
                "offsetY": 0,
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
    "colors": [
        "#FDA779",
        "#F97300",
        "#6FCFFD"
    ],
    "dataLabels": {
        "enabled": false,
        "style": {
            "fontWeight": 700
        },
        "background": {
            "dropShadow": {}
        }
    },
    "grid": {
        "padding": {
            "right": 25,
            "left": 15
        }
    },
    "legend": {
        "fontSize": 14,
        "offsetY": 0,
        "markers": {
            "size": 7,
            "shape": "square"
        },
        "itemMargin": {
            "vertical": 0
        }
    },
    "markers": {},
    "series":series.length>0? series: [
        {
            "name": "Actively Engaged",
            "data": [
                {
                    "x": "noData 1",
                    "y": 10
                },
                {
                    "x": "noData 2",
                    "y": 20
                },
                {
                    "x": "noData 3",
                    "y": 30
                }
            ],
            "group": "apexcharts-axis-0",
            "zIndex": 0
        },
        {
            "name": "Actively Disengaged",
            "data": [
                {
                    "x": "noData 1",
                    "y": 15
                },
                {
                    "x": "noData 2",
                    "y": 10
                },
                {
                    "x": "noData 3",
                    "y": 25
                }
            ],
            "group": "apexcharts-axis-0",
            "zIndex": 1
        },
        {
            "name": "Not Engaged",
            "group": "apexcharts-axis-0",
            "data": [
                {
                    "x": "noData 1",
                    "y": "12"
                },
                {
                    "x": "noData 2",
                    "y": "23"
                },
                {
                    "x": "noData 3",
                    "y": "40"
                }
            ],
            "zIndex": 2
        }
    ],
    "stroke": {
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
        "offsetY": -4,
        "labels": {
            "rotateAlways": true,
            "trim": true,
            "style": {},
            "offsetX": -2,
            "offsetY": 9
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
        min: 0,
        max: 100, 
        tickAmount: 10,
        "labels": {
            "showDuplicates": false,
            "offsetX": 6,
            "style": {}
        },
        "axisTicks": {
            "show": true,
            "color": "#C51616"
        },
        "title": {
            "style": {
                "fontWeight": 700
            }
        }
    },
  
});
  