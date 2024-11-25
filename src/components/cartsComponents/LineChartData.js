export const LineChartData = ( series = {}) => ({
    "annotations": {},
    "chart": {
        "animations": {
            "enabled": false
        },
        "background": "",
        "foreColor": "#333",
        "fontFamily": "Roboto",
        "height": 250,
        "id": "zzywa",
        "stackOnlyBar": true,
        "toolbar": {
            "show": false
        },
        "width": 480,
        "zoom": {
            "allowMouseWheelZoom": true
        }
    },
    "plotOptions": {
        "line": {
            "isSlopeChart": false
        },
        "bar": {
            "borderRadius": 10,
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
            "size": 7
        },
        "itemMargin": {
            "vertical": 0
        }
    },
    "markers": {
        "hover": {
            "size": 0,
            "sizeOffset": 6
        }
    },
    "series": [series ? series:
        {
            "name": "Line",
            "data": [
                {
                    "x": "Item 1",
                    "y": 31
                },
                {
                    "x": "Item 2",
                    "y": 40
                },
                {
                    "x": "Item 3",
                    "y": 28
                },
                {
                    "x": "Item 4",
                    "y": 51
                },
                {
                    "x": "Item 5",
                    "y": 42
                }
            ],
            "group": "apexcharts-axis-0"
        }
    ],
    "stroke": {
        "curve": "straight",
        "width": 4,
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
        "hideEmptySeries": false
    },
    "xaxis": {
        "type": "numeric",
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
        "tickAmount": "dataPoints",
        "title": {
            "style": {
                "fontWeight": 700
            }
        }
    },
    "yaxis": {
        "tickAmount": 10,
        "max": 100,
        "min": 0,
        "labels": {
            "showDuplicates": false,
            "style": {}
        },
        "title": {
            "style": {
                "fontWeight": 700
            }
        }
    },
   
})