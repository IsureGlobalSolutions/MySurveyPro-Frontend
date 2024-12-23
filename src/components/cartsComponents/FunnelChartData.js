// chartValues.js
export const FunnelChartData = ( series = {}) => 
    (
        {
            "annotations": {},
            "chart": {
                "animations": {
                    "enabled": false,
                    "animateGradually": {
                        "enabled": false
                    }
                },
                "foreColor": "#333",
                "fontFamily": "Roboto",
                "height": 350,
                "id": "gMc5V",
                "stackOnlyBar": true,
                "toolbar": {
                    "show": true
                },
                "type": "bar",
                "width": 507,
                "zoom": {
                    "enabled": false,
                    "allowMouseWheelZoom": true
                }
            },
            "plotOptions": {
                "line": {
                    "isSlopeChart": false
                },
                "bar": {
                    "horizontal": true,
                    "barHeight": "80%",
                    "borderRadiusApplication": "around",
                    "borderRadiusWhenStacked": "last",
                    "hideZeroBarsWhenGrouped": false,
                    "isDumbbell": false,
                    "isFunnel": true,
                    "isFunnel3d": true,
                    "dataLabels": {
                        "position": "center",
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
                "style": {
                    "fontWeight": 700,
                    "colors": [
                        "#fff"
                    ]
                },
                "enabled": true,
                "formatter": function (val, opt) {
                    return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
                  },
                "background": {
                    "enabled": false,
                    "dropShadow": {}
                },
                "dropShadow": {
                    "enabled": true
                }
            },
            "grid": {
                "show": false,
                "padding": {
                    "right": 0,
                    "left": 0
                }
            },
            "legend": {
                "show": false,
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
            "series": [series?.data ? series:
                {
                    "name": "Funnel",
                    "data": [
                        {
                            "x": "NoData 1",
                            "y": "40"
                        },
                        {
                            "x": "NoData 2",
                            "y": "35"
                        },
                        {
                            "x": "NoData 3",
                            "y": "59"
                        }
                    ],
                    "group": "apexcharts-axis-0"
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
            // "xaxis": {
            //     "labels": {
            //         "show": false,
            //         "trim": true,
            //         "style": {}
            //     },
            //     "group": {
            //         "groups": [],
            //         "style": {
            //             "colors": [],
            //             "fontSize": "12px",
            //             "fontWeight": 400,
            //             "cssClass": ""
            //         }
            //     },
            //     "axisBorder": {
            //         "show": false
            //     },
            //     "axisTicks": {
            //         "show": false
            //     },
            //     "title": {
            //         "style": {
            //             "fontWeight": 700
            //         }
            //     },
            //     "tooltip": {
            //         "enabled": false
            //     }
            // },
            // "yaxis": {
            //     "tickAmount": 11,
            //     "max": 100,
            //     "min": 0,
            //     "floating": true,
            //     "labels": {
            //         "showDuplicates": false,
            //         "offsetX": 74,
            //         "style": {
            //             "fontSize": 12
            //         }
            //     },
            //     "title": {
            //         "text": "",
            //         "style": {
            //             "fontWeight": 700
            //         }
            //     }
            // },
       
        }
);
  