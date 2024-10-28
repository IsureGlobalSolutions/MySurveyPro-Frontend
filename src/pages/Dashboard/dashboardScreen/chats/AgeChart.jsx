import React from 'react'
import Chart from 'react-apexcharts';
import Dropdown from 'react-bootstrap/Dropdown';

const AgeChart = () => {

    const chartValues = {
        "annotations": {},
        "chart": {
            "animations": {
                "enabled": false
            },
            "background": "",
            "foreColor": "#333",
            "fontFamily": "Lato",
            "height": 315,
            "id": "0JyaF",
            "stackOnlyBar": true,
            "toolbar": {
                "show": false
            },
            "type": "donut",
            "width": 480,
            "fontUrl": null
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
                    "margin": 5,
                    "useSeriesColors": true,
                    "fontWeight": 600,
                    "fontSize": "16px"
                }
            },
            "pie": {
                "donut": {
                    "size": "60%",
                    "labels": {
                        "name": {},
                        "value": {
                            "fontSize": 14
                        },
                        "total": {}
                    }
                }
            }
        },
        "dataLabels": {
            "offsetX": -8,
            "offsetY": -2,
            "style": {
                "fontSize": 11,
                "fontWeight": 700
            }
        },
        "fill": {
            "type": "gradient",
            "opacity": 1
        },
        "grid": {
            "padding": {
                "right": 0,
                "bottom": 12,
                "left": 10
            }
        },
        "labels": [
            "Actively Engaged",
            "Actively Disengaged",
            "Not Engaged"
        ],
        "legend": {
            "position": "right",
            "fontSize": 10,
            "offsetX": -11,
            "offsetY": -15,
            "markers": {
                "size": 6
            },
            "itemMargin": {
                "horizontal": 4
            }
        },
        "markers": {},
        "series": [
            24,
            32,
            32
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
            "hideEmptySeries": false,
            "fillSeriesColor": true,
            "theme": "dark"
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
 <div className="d-flex justify-content-between">
        <div className="title d-flex align-items-center m-0">
            <div className=""><p className='m-0'>Select Age </p></div>
            
        </div>
        <div className="dropdown">
        <Dropdown>
      <Dropdown.Toggle className='border rounded-4' variant="outline-secondary" id="dropdown-basic">
        Age
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
        </div>
    
    </div>
    <hr  className='m-1 my-2'/>
      <Chart
            options={chartValues}
            series={chartValues.series}
            type="donut"
            // width="500"
          /> 
    </div>
    
    </>
  )
}

export default AgeChart