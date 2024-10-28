import React, { useEffect, useState, useRef } from 'react';
import Chart from 'react-apexcharts';
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';

import { toPng } from 'html-to-image'; 
import { useDispatch, useSelector } from 'react-redux';
import {  getOverAllDepartmentReport } from '../../../../Redux/slice/surveySlice';
import { Navbarvalue } from '../../../../context/NavbarValuesContext';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
const DepartmentCharts = () => {

    const {selectedDashboardValues}=Navbarvalue()

const [reportValues, setreportValues] = useState()
const { paymentStatus } = useSelector((state) => state.survey)
const chartRef = useRef(null); 

    const dispatch = useDispatch()

    const showSelectedValues=(value)=>{
         if(value !='All')
         {
            dispatch(getOverAllDepartmentReport({surveyId:selectedDashboardValues?.survey?.id}))
        .then((res) => {
           SetReportValueHandler(value,res?.payload)
            
        }) 
           



         }
         else{
             dispatch(getOverAllDepartmentReport({surveyId:selectedDashboardValues?.survey?.id,option:value}))
        .then((res) => {
           SetReportValueHandler(value,res?.payload)
            
        }) 
         }
   
       
     }

    useEffect(() => {
if(paymentStatus==='paid' && selectedDashboardValues?.survey?.id){


            showSelectedValues(selectedDashboardValues?.department? 
                selectedDashboardValues?.department
                :
                  'All'
              )
        

    
       

}
       
    
      }, [paymentStatus, selectedDashboardValues?.survey?.id])



      const SetReportValueHandler = (value,data)=>{
        
         Array.isArray(data)?
        data?.length>0 ?
        data.map((item,index)=>{
            
                if(value===item?.department){
                    let labels=Object.keys(item?.responsesReport) 
                    let series = Object.values(item?.responsesReport)
setreportValues({labels,series})
                }else if(value=== item?.report){
                    let labels=Object.keys(item?.responsesReport) 
                    let series = Object.values(item?.responsesReport)
setreportValues({labels,series})
                }
            
        })
        :
        null
        :
null
      }


  
      useEffect(()=>{
        if(selectedDashboardValues?.department){
        
          
    showSelectedValues(selectedDashboardValues?.department)
        }
    
      },[selectedDashboardValues?.department])


    // const handleSelect = (eventKey) => {

    //     setSelectedDepartment(eventKey);
    //     SetReportValueHandler(eventKey)
       
    
    //   };
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
        "labels":Array.isArray(reportValues?.labels)?
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
            
        ]
        ,
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
        "series":Array.isArray(reportValues?.series)?
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
        ]
        
        ,
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
  


    const downloadXLSXWithImage = async () => {
        try {
            const dataUrl = await toPng(chartRef.current);  // Capture the chart as an image
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('ChartSheet');

            // Add some dummy data
            worksheet.addRow(['Chart Data']);
            worksheet.addRow(['Category', 'Value']);
            reportValues?.labels.forEach((label, index) => {
                worksheet.addRow([label, reportValues?.series[index]]);
            });

            // Add the image to the worksheet
            const imageId = workbook.addImage({
                base64: dataUrl,
                extension: 'png',
            });

            worksheet.addImage(imageId, {
                tl: { col: 0.5, row: 5 },
                ext: { width: 500, height: 320 }
            });

            // Save the file
            const buffer = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buffer]), 'chart_data_with_image.xlsx');
        } catch (error) {
            console.error('Error generating Excel file with image:', error);
        }
    };
  return (
    <>
    <div className="age-card rounded-3 border p-3 shadow bg-white">
 <div className="d-flex justify-content-between">
        <div className="title d-flex align-items-center m-0">
            <div className=""><p className='m-0 pb-3'>Select Department </p></div>
            
        </div>
        <div className="d-flex align-items-center">
              <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip id="button-tooltip-2">Download report file</Tooltip>}
    >
            <small className='ps-2 py-2  fw-bold m-0 ' style={{color:'orange',cursor:'pointer'}} onClick={downloadXLSXWithImage}>Download</small>
    </OverlayTrigger>
 
    </div>
    </div>
    <hr  className='m-1'/>
    <div className="" ref={chartRef} >
         <Chart 
            options={chartValues}
            series={chartValues.series}
            type="donut"
            height='320'

            // width="500"
          /> 
    </div>
     
    </div>
    
    </>
  )
 
}

export default DepartmentCharts