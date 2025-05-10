export const LineChartData = ( series = {}) => (
    
{
    "annotations": {},
    "chart": {
        "animations": {
            "enabled": false
        },
        "foreColor": "#333",
        "fontFamily": "Roboto",
        "height": 326,
        "id": "ewJZb",
        "stackOnlyBar": true,
        "toolbar": {
            "show": false,
            "tools": {
                "selection": true,
                "zoom": true,
                "zoomin": true,
                "zoomout": true,
                "pan": true,
                "reset": true
            }
        },
        "width": 503,
        "zoom": {
            "allowMouseWheelZoom": true
        }
    },
    "plotOptions": {
        "line": {
            "isSlopeChart": false,
            "colors": {
                "threshold": 0
            }
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
            },
            "seriesTitle": {
                "show": true,
                "offsetY": 1,
                "offsetX": 1,
                "borderColor": "#000",
                "borderWidth": 1,
                "borderRadius": 2,
                "style": {
                    "background": "rgba(0, 0, 0, 0.6)",
                    "color": "#fff",
                    "fontSize": "12px",
                    "fontWeight": 400,
                    "cssClass": "",
                    "padding": {
                        "left": 6,
                        "right": 6,
                        "top": 2,
                        "bottom": 2
                    }
                }
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
        "style": {
            "fontWeight": 700
        },
        "background": {
            "foreColor": "#0DB4F3",
            "borderRadius": 20,
            "padding": 3,
            "borderColor": "#0DB4F3",
            "dropShadow": {}
        }
    },
    "fill": {
        "type": "gradient"
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
        "clusterGroupedSeries": true,
        "clusterGroupedSeriesOrientation": "vertical",
        "markers": {
            "size": 7
        },
        "itemMargin": {
            "vertical": 0
        }
    },
    "markers": {
        "size": 2,
        "hover": {
            "size": 0,
            "sizeOffset": 6
        }
    },
    "series": [series?.data ? series:
        {
            "name": "Line",
            "data": [
                {
                    "x": "No data 1",
                    "y": 31
                },
                {
                    "x": "No data 2",
                    "y": 40
                },
                {
                    "x": "No data 3",
                    "y": 28
                }
            ],
            "group": "apexcharts-axis-0"
        }
    ],
    "states": {
        "hover": {
            "filter": {}
        },
        "active": {
            "filter": {}
        }
    },
    "stroke": {
        "width": 5,
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
    "theme": {
        "palette": "palette3"
    },

}   
)