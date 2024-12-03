import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSurveyList } from '../../../Redux/slice/surveySlice';
import SurveyCheckbox from '../../../components/checkbox/SurveyCheckbox';

const SurveySelection = ({setstepper , sendIdToParent}) => {

  const dispatch = useDispatch()
  const [surveyList, setsurveyList] = useState()
   const [planId, setplanId] = useState(null);
const {surveysList,isLoading}=useSelector((state)=>state.survey)
   
     
  const handleCheckboxClick = (item , data) => {
    console.log("🚀 ~ handleCheckboxClick ~ item:", data);
    sendIdToParent(data?.id)
    if (planId === item) {
      setplanId(null);
    } else {
      setplanId(item);
    }
  };
      

      const ListOfSuveysHandler = async()=>{
        dispatch(getAllSurveyList())
        .then((res)=>{
          setsurveyList(res?.payload)
        })
      }
      useEffect(()=>{
        ListOfSuveysHandler()
      },[])

      // useEffect(()=>{
      //   setsurveyList(surveysList)
      // },[surveysList])

     
      
  return (
<>
<div className="shadow rounded-4 bg-white w-100  d-flex justify-content-center py-5 ">
    <div className="w-100 ">
     
<div className="row m-0 p-0 justify-content-center">
<div className="col-md-11">
     <div className="">
    <div className="title px-2">
        <p className='fw-bold fs-3'>List of Surveys</p>
        

    </div>
</div>
     <div style={{  }}>  
       <div className="table-responsive">
                <table class="table table-borderless">
                  <thead>
                    <tr
                      className=" fw-semobold shadow-lg"
                      style={{ backgroundColor: "#00003A", }}
                    >
                      <th
                        className="p-4"
                        style={{
                          color: "",
                        }}
                      >
                        Survey Name
                      </th>
                      <th
                        className="p-4"
                        style={{
                          color: "",
                        }}
                      >
                        Description
                      </th>
                      <th
                        className="p-4"
                        style={{
                          color: "",
                        }}
                      >
                        Created At
                      </th>
                   
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <div className="d-flex justify-content-center p-5">
                        <div class=" text-primary" role="status">
                          <span class="sr-only">Loading...</span>{" "}
                        </div>
                      </div>
                    ) : surveyList?.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center">
                          <p className="fw-bold fs-5">No file</p>
                        </td>
                      </tr>
                    ) : (
                      <>
                        {surveyList?.map((item, index) => {
                          const date = item?.createdDate.split("T")[0];
                          return (
                            <>
                              <tr
                                key={index}
                                style={{borderBottom:'1px solid #D9D5EC'}}
                                className="shadow-sm rounded-4 fw-semibold"
                              >
                                <td className="p-4">
                                  <div className="d-flex">
                                    <div className=' mx-2'>
                                      {" "}
                                      <SurveyCheckbox
                                        value={planId}
                                        index={index}
                                        checked={planId === index}
                                        onChange={() =>
                                          handleCheckboxClick(index,item)
                                        }
                                      
                                      />
                                    
                                    </div>
                                    <div
                                      className="px-4"
                                      // onClick={() => handleClick(item)}
                                    >
                                      {item.name}
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4">{item.description}</td>
                                <td className="p-4">{date}</td>
                              
                              </tr>
                            </>
                          );
                        })}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
   
       
     
    </div>  
    <div className="d-flex justify-content-end mt-2">
        <WebsiteButton type='button' onClick={()=>{
          if(planId!=null){
              setstepper(2)
          }
          
        }}>Next</WebsiteButton>
    </div>
</div>
</div>

   
    </div>

</div>


</>
    
 )
}

export default SurveySelection












