import React, { useEffect, useRef, useState } from "react";
import "./startsurvey.css";
import WebsiteButton from "../../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import UploadFileIcon from "../../../assets/dashboredsvg/upload-file.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFileOfEmployeesData } from "../../../Redux/slice/authSlice";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { saveAs } from "file-saver";
import xlsxFile from "../../../assets/downloadable-files/RecipientsDetail.xlsx";
import csvFile from "../../../assets/downloadable-files/RecipientsDetail.csv";
import { Checkbox, FormControlLabel, Radio, selectClasses } from "@mui/material";
import Tooltip from "../../../components/Tooltip/Tooltip";
import { getAllSurveyFiles } from "../../../Redux/slice/surveySlice";
import Loader from "../../../components/plugins/Loader";
import { Navbarvalue } from "../../../context/NavbarValuesContext";
import { GoDownload } from "react-icons/go";
import { MdOutlineFileUpload } from "react-icons/md";
const csvText =
  "Download template file to fill in required data. After filling out, upload it";
const downloadText =
  "Upload the file containing the required data for all individuals to whom the survey will be launched";
const UploadFile = ({ setstepper, getUploadFile, surveyId }) => {
  const { startSurvey } = Navbarvalue();

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(false);
  const [isLoadingStart, setisLoadingStart] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [toggleSelector, settoggleSelector] = useState(false);
  const { paymentStatus } = useSelector((state) => state.survey);
  const [optCheck, setoptCheck] = useState(false)
  const { listOfAllFilesData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleClickChangePicture = () => {
    fileInputRef.current.click(); // Simulate click on hidden file input
  };
  useEffect(() => {
    if (surveyId) {
      setisLoadingStart(true);
      dispatch(getAllSurveyFiles(surveyId))
        .then((res) => {
          if (res?.payload?.length > 0) {
            setstepper(3);
            setisLoadingStart(false);
            console.log("stepper launch");
          }
        })
        .finally(() => {
          setisLoadingStart(false);
        });
    }
  }, [surveyId]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
      getUploadFile(acceptedFiles);
      // Call your backend API endpoint to upload files
    },
  });
  const uploadFileHandler = async () => {
    if (uploadedFiles.length > 0) {
      setisLoading(true);
      const formdata = new FormData();
      formdata.append("file", uploadedFiles[0]);
      formdata.append("sendOTP",optCheck)
      if (surveyId === 1 || surveyId === 2 || surveyId === 3) {
        formdata.append("surveyId", surveyId);
      } else {
        const customSurveyId = surveyId;
        formdata.append("customsurveyid", customSurveyId);
      }

      dispatch(uploadFileOfEmployeesData(formdata)).then((res) => {
        if (res?.payload?.isSuccess === true) {
          toast.success(res?.payload?.alertMessage);
          setisLoading(false);
          setstepper(3);
        } else if (res?.payload?.isSuccess === false) {
          if (res?.payload?.alertMessage === "Survey subscription not found.") {
            toast.error(res.payload.alertMessage);
            navigate("/pricing");
            setisLoading(false);
            return;
          } else {
            toast.error(res?.payload?.alertMessage);
            setisLoading(false);
            return;
          }
        }
      });
    }
  };

  return (
    <>
      {isLoadingStart ? (
        <div className="d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className=" download-card-main shadow rounded-4 bg-white w-100 p-5 my-2">
            <p className="m-0 download-csv-title">Download CSV File</p>
            <p className="download-csv-description">
              If you do not have a file you can use the sample below:
            </p>
            <div className="   ">
              <input
                type="file"
                id="uploadFileInput"
                ref={fileInputRef}
                accept=".xlsx, .csv,"
                onChange={(e) => setUploadedFiles([e.target.files[0]])}
              />

              <div className="" style={{ position: "relative" }}>
                <Tooltip text={csvText}>
                  <WebsiteButton
                    type="button"
                    onClick={() => {
                      settoggleSelector(!toggleSelector);
                    }}
                  >
                    Download Sample File
                    <GoDownload size={22} style={{ paddingLeft: "3px" }} />
                  </WebsiteButton>
                </Tooltip>

                <div
                  className={`format-selector-dropdown shadow-sm ${
                    toggleSelector ? "active-selector" : ""
                  }`}
                >
                  <p
                    onClick={() => {
                      settoggleSelector(false);
                      saveAs(csvFile, "employeeDataFormate.csv");
                    }}
                  >
                    CSV Formate
                  </p>
                  <p
                    onClick={() => {
                      settoggleSelector(false);
                      saveAs(xlsxFile, "employeeDataFormate.xlsx");
                    }}
                  >
                    XLSX Formate
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="shadow rounded-4 bg-white w-100   p-5 ">
            <div className="upload-file-main">
              <p className="upload-csv-title m-0">Upload CSV File</p>
              <div className="files-description p-md-2 p-2">
                <p>
                  Explore, pick, and customize from our extensive collection of
                  customizable templates designed to meet all your form and
                  survey needs.
                </p>
              </div>

              <div className="card-upload-file  my-4 py-3">
                <div className="d-flex justify-content-center align-items-center">
                  <div className="text-center">
                    <div {...getRootProps()}>
                      <input accept=".xlsx, .csv," {...getInputProps()} />
                      {uploadedFiles?.length > 0 ? (
                        uploadedFiles?.map((file) => (
                          <li className="file-show-name" key={file.name}>
                            {file.name}
                          </li>
                        ))
                      ) : (
                        <UploadFileIcon className="upload-icon" />
                      )}

                      <ul className="" style={{ listStyleType: "none" }}></ul>
                    </div>
                    <p className="my-1 h4 fw-light m-0">
                      Drop Your CSV file here{" "}
                    </p>
                    <div className="">
                      <p className="choose-file m-0">Max file size: 25 MB</p>
                      <button
                        type="button"
                        className="choose-file-btn"
                        onClick={handleClickChangePicture}
                      >
                        <MdOutlineFileUpload size={20} /> Browse
                      </button>

                      <input
                        type="file"
                        id="uploadFileInput"
                        accept=".xlsx, .csv,"
                        onChange={(e) => setUploadedFiles([e.target.files[0]])}
                      />
                    </div>

                  
                  </div>
                </div>
              </div>
              <div className="my-1">
          
                                                 <FormControlLabel 
  sx={{backgroundColor: "transparent"}}  
  required 
  control={
    <Checkbox 

      checked={optCheck === true} 
      onChange={(e) => setoptCheck(e.target.checked ? true : false)}
      
    />
  } 
  label="Want to send the otp when survey start" 
/>
              </div>

                <div className="my-3 row justify-content-center">
                  <div className="col-md-6 d-flex justify-content-center">
                      <WebsiteButton
                        type="button"
                        buttonDesign="outliner"
                        className="w-100"
                        onClick={() => {
                         setUploadedFiles([])
                         setstepper(1);
                        }}
                        disabled={isLoading}
                      >
                       Cancel
                      </WebsiteButton>
                      <WebsiteButton
                        type="button"
                        className="w-100 ms-2"
                        onClick={() => {
                          uploadFileHandler();
                        }}
                        disabled={isLoading}
                      >
                        {isLoading ? "Uploading..." : "Submit"}
                      </WebsiteButton>
                  </div>
                    
                    </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UploadFile;
