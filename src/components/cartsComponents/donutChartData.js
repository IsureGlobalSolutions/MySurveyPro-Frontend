export const donutChartData = ( reportValues = {}) => 
    (
{
    "annotations": {},
    "chart": {
        "animations": {
            "enabled": false
        },
        "foreColor": "#333",
        "fontFamily": "Roboto",
        "height": 248,
        "id": "XqUpw",
        "stackOnlyBar": true,
        "toolbar": {
            "show": true,
        },
        "type": "donut",
        "width": 492,
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
    "fill": {
        "opacity": 1
    },
    "grid": {
        "padding": {
            "right": 25,
            "left": 20
        }
    },
    "labels": Array.isArray(reportValues?.labels)?
    reportValues?.labels?.length>0 ?
    reportValues.labels
    :
     [
        "No Data",
        "No Data",
        "No Data",
        
    ]
    :
    [
        "No Data",
        "No Data",
        "No Data",
        
    ],
    "legend": {
        "position": "right",
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
    "markers": {},
    "series": Array.isArray(reportValues?.series)?
    reportValues?.series?.length>0 ?
    reportValues.series
    :
     [
        33.9,
        33.9,
        33.9
    ]
    :
     [
        33.9,
        33.9,
        33.9
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
        "hideEmptySeries": false,
        "fillSeriesColor": true
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
  
}
    )