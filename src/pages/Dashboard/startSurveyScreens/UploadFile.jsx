import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './startsurvey.css'
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import UploadFileIcon from '../../../assets/dashboredsvg/upload-file.svg?react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFileOfEmployeesData } from '../../../Redux/slice/authSlice';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import xlsxFile from '../../../assets/downloadable-files/RecipientsDetail.xlsx'
import csvFile from '../../../assets/downloadable-files/RecipientsDetail.csv'
import { selectClasses } from '@mui/material';
import Tooltip from '../../../components/Tooltip/Tooltip';
import { getAllSurveyFiles } from '../../../Redux/slice/surveySlice';
import Loader from '../../../components/plugins/Loader';

const csvText='Download template file to fill in required data. After filling out, upload it';
const downloadText = 'Upload the file containing the required data for all individuals to whom the survey will be launched'
const UploadFile = ({ setstepper , getUploadFile , surveyId , setaddnewfile }) => {
console.log("🚀 ~ UploadFile ~ surveyId:", surveyId)
const fileInputRef = useRef(null);
  const dispatch = useDispatch()
  const [isLoading, setisLoading] = useState(false)
  const [isLoadingStart, setisLoadingStart] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [toggleSelector, settoggleSelector] = useState(false)
  const { paymentStatus } = useSelector((state) => state.survey)
  const {listOfAllFilesData}=useSelector((state)=>state.user)
const navigate = useNavigate()


const handleClickChangePicture = () => {
  fileInputRef.current.click(); // Simulate click on hidden file input
};
useEffect(()=>{
  if (surveyId) {
    setisLoadingStart(true)
      dispatch(getAllSurveyFiles(surveyId))
  .then((res)=>{
    if(res?.payload?.length>0){
      setstepper(3)
      setisLoadingStart(false)
      console.log('stepper launch');
      setaddnewfile(false);
    }
  })
  .finally(()=>{
    setisLoadingStart(false)
  })
  }

},[surveyId])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
      getUploadFile(acceptedFiles);
      // Call your backend API endpoint to upload files
    },
  });
  const uploadFileHandler = async () => {
    console.log('status',paymentStatus);
    
   
         if (uploadedFiles.length > 0) {
          setisLoading(true)
      const formdata = new FormData()
      formdata.append('file', uploadedFiles[0])
      formdata.append('surveyId',surveyId)
     dispatch(uploadFileOfEmployeesData(formdata))
        .then((res) => {
          if(res?.payload?.isSuccess===true){
            toast.success(res?.payload?.alertMessage)
            setisLoading(false)
             setstepper(3)
          }else if(res?.payload==="Survey subscription not found."){
            toast.error(res.payload)
            setisLoading(false)
            
            navigate('/pricing')
          }
          else{
            
            setisLoading(false)
          }
         
        })
    }
    
  

 

  }

  return (


    <>
    {isLoadingStart?
    <div className="d-flex justify-content-center align-items-center">
<Loader/>
    </div>
  :
<div className="shadow rounded-4 bg-white w-100  d-flex justify-content-center py-5 ">
        <div className="upload-file-main">
          <div className="upload-file-buttons  p-md-4 p-2">
          <Tooltip text={downloadText}>
                 <WebsiteButton type='button' onClick={handleClickChangePicture}
              >
              Upload CSV
            </WebsiteButton>
        </Tooltip>
         
            <input type="file"
                    id='uploadFileInput'
                    ref={fileInputRef}
                    accept=".xlsx, .csv,"
                    onChange={(e) => setUploadedFiles([e.target.files[0]])}
                  />
       
<div className="" style={{position:'relative'}}>
    <Tooltip text={csvText}>
         <WebsiteButton type='button' onClick={() => { 
              settoggleSelector(!toggleSelector)
            }} buttonDesign='outliner'>
              Download CSV
            </WebsiteButton> 
    </Tooltip>
          
     

            <div className={`format-selector-dropdown shadow-sm ${toggleSelector? 'active-selector':""}`}>
              <p onClick={()=>{
                 settoggleSelector(false)
                saveAs(csvFile,'employeeDataFormate.csv')
              }}>CSV Formate</p>
              <p
onClick={()=>{
  settoggleSelector(false)
  saveAs(xlsxFile,'employeeDataFormate.xlsx')

}}
>XLSX Formate</p>
            </div>
</div>
         

          </div>
          <div className="files-description p-md-4 p-2">
                    <p>
              Explore, pick, and customize from our extensive
              collection of customizable templates designed
              to meet all your form and survey needs.
            </p>
  
         
          </div>


          <div className="card-upload-file rounded-4 shadow border my-4 py-3">
            <div className="d-flex justify-content-center align-items-center">
              <div className="text-center">
                <p className='my-3 h4 fw-light'>Drop Your CSV file here </p>
                <div {...getRootProps()}>
                  <input accept=".xlsx, .csv," {...getInputProps()} />
                  {uploadedFiles?.length > 0 ?
                    uploadedFiles?.map((file) => (
                      <li className='file-show-name' key={file.name}>{file.name}</li>
                    ))
                    :
                    <UploadFileIcon className='upload-icon' />
                  }

                  <ul className='' style={{ listStyleType: 'none' }}>

                  </ul>
                </div>

                <div className="">
                  <p >or click to <label htmlFor="uploadFileInput" className="choose-file">chooose file</label></p>
                  <input type="file"
                    id='uploadFileInput'
                    accept=".xlsx, .csv,"
                    onChange={(e) => setUploadedFiles([e.target.files[0]])}
                  />
                </div>


                <div className="my-3 d-flex justify-content-center">
                  <WebsiteButton type='button' onClick={() => {
                    uploadFileHandler()
                  }}  disabled={isLoading}>
                    {isLoading? 'Uploading...': 'Submit'}
                  </WebsiteButton>
                </div>

              </div>

            </div>
          </div>
          

        </div>
      </div>
  }
      

    </>
  )
}

export default UploadFile





