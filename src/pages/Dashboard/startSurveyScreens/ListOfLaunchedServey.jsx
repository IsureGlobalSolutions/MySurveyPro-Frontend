import { Paper, TablePagination } from '@mui/material';
import React, { lazy, useEffect, useState } from 'react'
import Loader from '../../../components/plugins/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { LaunchedSurveysStatusApi } from '../../../Redux/slice/surveySlice';
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import NewSurvey from '../startSurveyScreens/index';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Navbarvalue } from '../../../context/NavbarValuesContext';
const options = [
  'Analyze results',
  'Survey Url'

 
];
const ITEM_HEIGHT = 48;
const ListOfLaunchedServey = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = React.useState(null);
      const { StapperHandler ,DashboardStateHandler, startSurvey,startSurveyHandler} = Navbarvalue();
      let stateOfStartSurvey = location.state
      console.log("🚀 ~ ListOfLaunchedServey ~ stateOfStartSurvey:", stateOfStartSurvey)
      
// useEffect(()=>{
// startSurveyHandler(stateOfStartSurvey)
// },[stateOfStartSurvey])
    
const {surveyPaymentStatuses}=useSelector((state)=>state.survey)
  useEffect(()=>{
    setisLoading(true)
    dispatch(LaunchedSurveysStatusApi())
    .then((res)=>{
if(res?.payload){
  setisLoading(false)
}
    })
  },[])


  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to the first page when rows per page changes
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };



  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option,data) => {
    if(option==='Analyze results'){
    StapperHandler(6) //state is use the numbring for start survey stepper
    startSurveyHandler(true) //state is use to start the steper of survey
    DashboardStateHandler('survey', { id: data?.surveyId, name: data?.surveyName }); //state is use to select the survey
    
    }
    else if(option ==='Survey Url'){
      StapperHandler(5)
      startSurveyHandler(true)
    }
    setAnchorEl(null);


  };
  return (
    <>
{surveyPaymentStatuses?.length>0 && !startSurvey?
<>
 <div className="top-section  my-5 mx-2 d-flex justify-content-between">
      <h2 className='ps-3'>Welcome</h2>
      <WebsiteButton className='me-3' style={{padding:'3px 10px', fontSize:'14px'}} onClick={()=>{startSurveyHandler(true)}}>Create New Survey</WebsiteButton>
    </div>
    <div className="table-responsive">
                  <Paper sx={{ width: "100%" }}>
                    <table className="table table-borderless">
                      <thead>
                        <tr
                          className=" fw-semobold shadow-lg"
                          style={{ backgroundColor: "#00003A" }}
                        >
                          <th
                            className="py-4"
                            
                          >
                            Survey Status
                          </th>

                          <th
                            className="py-4"
                            
                          >
                            Survey title
                          </th>
                          <th
                            className="py-4"
                            
                          >
                            Selected files
                          </th>
                          <th
                            className="py-4"
                            
                          >
                            Responses
                          </th>
                          <th
                            className="py-4"
                            
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {isLoading ? (
                          <div className="d-flex justify-content-center p-5">
                            <div className="w-100 d-flex  justify-content-center">
                              <Loader />
                            </div>
                          </div>
                        ) : surveyPaymentStatuses?.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center">
                              <p className="fw-bold fs-5">No file</p>
                            </td>
                          </tr>
                        ) : (
                          <>
                            {surveyPaymentStatuses?.map((item, index) => {
                              return (
                                <>
                                  <tr
                                    key={index}
                                    style={{
                                      borderBottom: "1px solid #D9D5EC",
                                    }}
                                    className="shadow-sm rounded-4 fw-semibold"
                                  >

                                    <td className="p-4">
                                     <div className="d-flex">
                                      <p className='p-1 ' style={{backgroundColor:'green'}}>{item.surveyLaunchStatus===true? "Active":"InActive"}</p>
                                     </div>
                                    </td>
                                    <td className="pt-3">
                                  {item?.surveyName}
                                    </td>

                                    <td>
                                      
                                      {item.fileNames?.map((data,index) => {
                                        console.log(data,'filename data');
                                        
                                        return(
                                          <> 
                                           <p>{data}</p>
                                           
                                          </>
                                        )
                                      
                                      })}
                                    </td>
                                    <td>
                                      responses
                                    </td>
                                    <td>
                                    <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={()=>handleClose(option,item)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </>
                        )}
                      </tbody>
                    </table>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={surveyPaymentStatuses?.length || 0}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
</>
:
<>
<NewSurvey/>
</>
}
   
    
    </>
  )
}

export default ListOfLaunchedServey