import { Paper, TablePagination } from '@mui/material';
import React, { lazy, useEffect, useLayoutEffect, useState } from 'react';
import Loader from '../../../components/plugins/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalNumberOfRespondent, LaunchedSurveysStatusApi, updatePaymentStatus } from '../../../Redux/slice/surveySlice';
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import NewSurvey from '../startSurveyScreens/index';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Navbarvalue } from '../../../context/NavbarValuesContext';
import { jwtDecode } from 'jwt-decode';
import { GetUserDetail } from '../../../Redux/slice/authSlice';
import { store } from '../../../Redux/store';

import Analyze from '../../../assets/svgs/Analyze Icon.svg'
import Surveyurl from '../../../assets/svgs/Url Icon2.svg'
import Tooltip from '../../../components/Tooltip/Tooltip';

const ITEM_HEIGHT = 48;

const ListOfLaunchedServey = () => {

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [responsesData, setresponsesData] = useState({});
const [launchSurveyData, setlaunchSurveyData] = useState([])
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { StapperHandler, DashboardStateHandler, startSurvey, startSurveyHandler } = Navbarvalue();

  const { surveyPaymentStatuses } = useSelector((state) => state.survey);

  const { userData } = useSelector((state) => state.user)

  const tokenValues = jwtDecode(userData?.accessToken)


  useEffect(() => {
    if (tokenValues?.sid) {


      dispatch(GetUserDetail(tokenValues?.sid))
    }
   

  }, [tokenValues?.sid])

  useEffect(() => {
    // if(surveyPaymentStatuses?.length === 0){
 setisLoading(true);
    dispatch(LaunchedSurveysStatusApi())
      .then((res) => {
        if (res?.payload) {
          
       
        
          if (res?.payload?.length > 0) {
            const paymentStatusUpdates = {}; 
            const launch = []; 
  
            res.payload.forEach((element) => {
              
              
              paymentStatusUpdates[element?.surveyId] = {
                paymentStatus: element?.surveyPaymentStatus,
              };
  
              if (element?.surveyLaunchStatus) {
                launch.push(element);
  
                // Fetch total number of respondents
                dispatch(getTotalNumberOfRespondent(element?.surveyId))
                  .then((res) => {
                    setresponsesData((prevState) => ({
                      ...prevState,
                      [element?.surveyId]: {
                        response: res?.payload,
                      },
                    }));
                  });
              }
            });
  
            // Dispatch the collected payment status updates to the store
            store.dispatch(updatePaymentStatus(paymentStatusUpdates));
  
            
            setlaunchSurveyData(launch); 
              setisLoading(false);
          }else{
              store.dispatch(updatePaymentStatus([]));
              setisLoading(false);
          }
        }
      });
    // }
   
  }, []);

  useEffect(() => {


  if (surveyPaymentStatuses?.length > 0) { 
     setisLoading(true);
    const paymentStatusUpdates = {}; 
    const launch = []; 

    surveyPaymentStatuses.forEach((element) => {
      // Add payment status object to the paymentStatusUpdates object
      paymentStatusUpdates[element?.surveyId] = {
        paymentStatus: element?.surveyPaymentStatus,
      };

      if (element?.surveyLaunchStatus) {
        launch.push(element);

        // Fetch total number of respondents
        dispatch(getTotalNumberOfRespondent(element?.surveyId))
          .then((res) => {
            setresponsesData((prevState) => ({
              ...prevState,
              [element?.surveyId]: {
                response: res?.payload,
              },
            }));
          });
      }
    });

   
    store.dispatch(updatePaymentStatus(paymentStatusUpdates));

    
    setlaunchSurveyData(launch);
    setisLoading(false);
  }else{
      store.dispatch(updatePaymentStatus([]));
      setisLoading(false);
  }


  }, [surveyPaymentStatuses?.length]);
  

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

  const handleClose = (option, data) => {
     DashboardStateHandler('survey', { id: data?.surveyId, name: data?.surveyName }); 
    if (option === 'Analyze results') {
      StapperHandler(6); 
      startSurveyHandler(true); 
     
    } else if (option === 'Survey Url') {
      StapperHandler(5);
      startSurveyHandler(true);
    }
    setAnchorEl(null);
  };

  return (
    <>
      {isLoading?
      <div className="d-flex justify-content-between">
         <Loader /> 
      </div> 
     
      :
      
      (launchSurveyData?.length > 0 && !startSurvey) ? 
      
      (
        <>
          <div className="top-section my-5 mx-2 d-flex justify-content-between">
            <h2 className='ps-3'>Welcome</h2>
            <WebsiteButton className='me-3' style={{ padding: '3px 10px', fontSize: '14px' }} onClick={() => { startSurveyHandler(true); }}>
              Create New Survey
            </WebsiteButton>
          </div>
          <div className="table-responsive">
            <Paper sx={{ width: "100%" }}>
              <table className="table table-borderless">
                <thead>
                  <tr className="fw-semobold shadow-lg" style={{ backgroundColor: "#00003A" }}>
                    <th className="py-4">Survey Status</th>
                    <th className="py-4">Survey title</th>
                    <th className="py-4">Selected files</th>
                    <th className="py-4">Responses</th>
                    <th className="py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <div className="d-flex justify-content-center p-5">
                      <div className="w-100 d-flex justify-content-center">
                        <Loader />
                      </div>
                    </div>
                  ) : launchSurveyData?.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">
                        <p className="fw-bold fs-5">No file</p>
                      </td>
                    </tr>
                  ) : (
                    <>
                     {launchSurveyData?.map((item, index) => {
  const responseData = responsesData[item?.surveyId]?.response || {};
  return (
    <tr
      key={index}
      style={{ borderBottom: "1px solid #D9D5EC" }}
      className="shadow-sm rounded-4 fw-semibold"
    >
      <td className="pt-3">
        <div className="d-flex">
          <p className="p-1" style={{ backgroundColor: 'green' }}>
            {item.surveyLaunchStatus === true ? "Active" : "InActive"}
          </p>
        </div>
      </td>
      <td className="pt-3">{item?.surveyName}</td>
      <td className="pt-3">
        {item.fileNames?.map((data, index) => (
          <p key={index}>{data}</p>
        ))}
      </td>
      <td className="pt-3">
        {responseData?.totalRespondents || 0}/{responseData?.totalReceiver || 0} respondent
      </td>
     
        <td>
      <Tooltip text={'Analyse results'} style={{width:'140px'}} >
         <img src={Analyze}  alt="analyze result" width="30" height="30" 
    className='vsgraph' size={28} style={{cursor:"pointer" , border:"2px solid #dee2e6" , padding:"2px" , color:"#F97300" , borderRadius:"5px"}}
    onClick={()=> handleClose('Analyze results',item)}
    />
        </Tooltip>    
        <Tooltip text={'Survey Url'} style={{width:'140px'}} >
           <img src={Surveyurl}  alt="survey url" width="30" height="30"
    className='ms-2'  size={28} style={{cursor:"pointer" , border:"2px solid #dee2e6" , padding:"2px" , color:"#F97300" , borderRadius:"5px"}}
    onClick={()=> handleClose('Survey Url',item)}
    />
        </Tooltip>
   

 
  <Menu
    id="long-menu"
    MenuListProps={{ 'aria-labelledby': 'long-button' }}
    anchorEl={anchorEl}
    open={Boolean(anchorEl)}
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

  </Menu>
</td>

    
    </tr>
  );
})}

                    </>
                  )}
                </tbody>
              </table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={launchSurveyData?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        </>
      ) 
      : 
      (
        <NewSurvey />
      )}
    </>
  );
};

export default ListOfLaunchedServey;
