export const RadialBarChart = ( reportValues=[] ,color) => 
    
    ( 
        {
           
            "annotations": {},
            "chart": {
                "animations": {
                    "enabled": false,
                    "dynamicAnimation": {
                        "speed": 800
                    }
                },
                "foreColor": "#333",
                "fontFamily": "Roboto",
                "height": 338,
                "id": "opwmS",
                "stackOnlyBar": true,
                "toolbar": {
                    "show": true,
                },
                "type": "radialBar",
                "width": 572,
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
                        "background": "#fff",
                          size: '60%',
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
            "colors": [color?color:"#045f03" ],
            "dataLabels": {
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
                    "left": 30
                }
            },
            "labels": [
                "Total Report"
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
            "series": [reportValues],
            "states": {
                "hover": {
                    "filter": {}
                },
                "active": {
                    "filter": {}
                }
            },
        stroke: {
                lineCap: 'round'
              },
            "tooltip": {
                "enabled": false,
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
            }
        }
    )