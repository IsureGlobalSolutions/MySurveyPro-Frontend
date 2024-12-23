import React, { useRef, useState } from 'react';
import './startsurvey.css'
import WebsiteButton from '../../../components/mySurveyProWebsiteBtn/WebsiteButtton';
import UploadFileIcon from '../../../assets/dashboredsvg/upload-file.svg?react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadEditFileOfEmployeesData } from '../../../Redux/slice/authSlice';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { saveAs } from 'file-saver';
import xlsxFile from '../../../assets/downloadable-files/RecipientsDetail.xlsx'
import csvFile from '../../../assets/downloadable-files/RecipientsDetail.csv'
import { selectClasses } from '@mui/material';
import Tooltip from '../../../components/Tooltip/Tooltip';
import { getAllSurveyFiles } from '../../../Redux/slice/surveySlice';

const downloadText = 'Upload the file containing the required data for all individuals to whom the survey will be launched'
const EditUploadFile = ({ getUploadFile  , Uniquefilename , handleCloseEditdata , surveyId}) => {
const fileInputRef = useRef(null);
  const dispatch = useDispatch()
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [toggleSelector, settoggleSelector] = useState(false)
  const { paymentStatus } = useSelector((state) => state.survey)
  const {isLaoding}=useSelector((state)=>state.user)
const navigate = useNavigate()


const handleClickChangePicture = () => {
  fileInputRef.current.click(); // Simulate click on hidden file input
};

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
      getUploadFile(acceptedFiles);
      // Call your backend API endpoint to upload files
    },
  });
  const uploadFileHandler = async () => {
    if (paymentStatus === 'paid') {
      if (uploadedFiles.length > 0) {
        const formdata = new FormData();
        formdata.append('file', uploadedFiles[0]);
        formdata.append('surveyId', surveyId);
        formdata.append('uniqueFileName', Uniquefilename);
  
        try {
           dispatch(uploadEditFileOfEmployeesData(formdata)).then(
         (response)=>{
          if (response?.payload?.isSuccess === true) {
            toast.success(response.payload.alertMessage);
            handleCloseEditdata(false);
            dispatch(getAllSurveyFiles(surveyId));
          } 
          else {
            toast.error(response?.payload?.alertMessage || 'An error occurred while uploading the file.');
          }
         }
          )
          
        } catch (error) {
          // If there's an exception, show the error message
          toast.error(error.response?.alertMessage || 'An unexpected error occurred.');
        }
      }
    } else {
      toast.error('Please Buy Q12 Survey first');
      navigate('/pricing');
    }
  };
  

  return (


    <>
      <div className="shadow rounded-4 bg-white w-100  d-flex justify-content-center py-5  mt-4">
        <div className="upload-file-main">
          <div className="upload-file-buttons  p-md-4 p-2">
          <Tooltip text={downloadText}>
                 <WebsiteButton type='button' onClick={handleClickChangePicture}
              >
              Upload Edit File
            </WebsiteButton>
        </Tooltip>
         
            <input type="file"
                    id='uploadFileInput'
                    ref={fileInputRef}
                    accept=".xlsx, .csv,"
                    onChange={(e) => setUploadedFiles([e.target.files[0]])}
                  />

         

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
                <p className='my-3 h4 fw-light'>Drop Your Edit File Here </p>
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
                  }}  disabled={isLaoding}>
                    {isLaoding? 'Uploading...': 'Submit'}
                  </WebsiteButton>
                </div>

              </div>

            </div>
          </div>
          {/* <div className="d-flex justify-content-center mt-5 next-button-main">
<WebsiteButton type='button' onClick={()=>{}}>Next</WebsiteButton>
   </div> */}

        </div>
      </div>

    </>
  )
}

export default EditUploadFile