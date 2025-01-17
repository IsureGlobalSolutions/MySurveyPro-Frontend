export const SingleBarChartData = ( data=[] ) => 
    
    (
        {
            "annotations": {},
            "chart": {
                "animations": {
                    "enabled": false
                },
                "foreColor": "#333",
                "fontFamily": "Roboto",
                "height": 376,
                "id": "9JSOZ",
                "stackOnlyBar": true,
                "toolbar": {
                    "show": true,
                },
                "type": "bar",
                "width": 520,
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
                    "columnWidth": "22%",
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
                "clusterGroupedSeries": true,
                "clusterGroupedSeriesOrientation": "vertical",
                "markers": {
                    "size": 7,
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
                    "data": data?.length>0? data:[
                        {
                            "x": "Item 1",
                            "y": 10
                        },
                        {
                            "x": "Item 2",
                            "y": "70"
                        },
                        {
                            "x": "Item 3",
                            "y": "50"
                        },
                        {
                            "x": "Item 4",
                            "y": "90"
                        }
                    ],
                    "group": "apexcharts-axis-0",
                    "zIndex": 0
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
                "offsetY": -1,
                "labels": {
                    "rotateAlways": true,
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
