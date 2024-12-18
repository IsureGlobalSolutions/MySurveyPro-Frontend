import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import WebsiteButton from "../../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import { useDispatch, useSelector } from "react-redux";
import { VeiwUniqueFileName,
  getAllSurveyFiles} from "../../../Redux/slice/surveySlice";
import SurveyCheckbox from "../../../components/checkbox/SurveyCheckbox";
import { RxDownload } from "react-icons/rx";
import { GrFormView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { Modal } from "react-bootstrap";
import { MdErrorOutline } from "react-icons/md";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { LiaEditSolid } from "react-icons/lia";
import "./startsurvey.css";
import Uniquefiledata from "./Uniquefiledata";
import Loader from "../../../components/plugins/Loader";
import EditUploadFile from "./EditUploadFile";
import toast from "react-hot-toast";
import { deleteFile } from "../../../Redux/slice/authSlice";
const Filedata = ({ setstepper, surveyId,sendSelectedFilesToParent }) => {
  const dispatch = useDispatch();
  const [surveyList, setsurveyList] = useState();
  const [selectedFiles, setselectedFiles] = useState([]);
  const { surveysList, isLoading } = useSelector((state) => state.survey);
  const [popupMessage, setPopupMessage] = useState("");
  const [show, setShow] = useState(false);
  const [deletedata, setdeletedata] = useState();
  const [veiwloading, setVeiwloading] = useState(false);
  const [Filename, setFilename] = useState(null);
  const [Veiwdata, setVeiwdata] = useState([]);
  const [Viewshow, setViewshow] = useState(false);
  const [departmentId, setdepartmentId] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [listOfDepartment, setlistOfDepartment] = useState(null);
  const [Editshow, setEditshow] = useState(false);
  const [Uniquefilename, setUniquefilename] = useState();
  const [filenameupdate, setfilenameupdate] = useState(null);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  useEffect(() => {
    if (surveyList?.length > 0) {
      setlistOfDepartment(surveyList);
    }
  }, [surveyList]);

  const currentData = listOfDepartment && Array.isArray(listOfDepartment)
      ? listOfDepartment.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : [];
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to the first page when rows per page changes
  };

  const handleCloseViewdata = () => {
    setViewshow(false);
  };
  const handleCloseEditdata = (data) => {
    setEditshow(data);
  };
  const handleCheckboxClick = (item) => {
  
    if (selectedFiles.includes(item)) {
      // If already selected, remove it
      setselectedFiles(selectedFiles.filter((selected) => selected !== item));
    } else {
      // If not selected, add it
      setselectedFiles([...selectedFiles, item])
      //send data to parent component
      sendSelectedFilesToParent([...selectedFiles, item]) 
    }
  };
  const ListOfSuveysHandler = async () => {
    if (surveyId) {
      dispatch(getAllSurveyFiles(surveyId)).then((res) => {
        setsurveyList(res?.payload);
      });
    }
  };
  useEffect(() => {
    ListOfSuveysHandler();
  }, [Editshow  ]);

 
  const handleClosedata = () => {
    setShow(false);
    //   setActiveTab("nav_week1");
  };
  const handleEditFile = (item, filename) => {
    const uniqueFileName = item.uniqueFileName;
    setUniquefilename(uniqueFileName);
    setEditshow(true);
    setFilename(filename);
  };
  useEffect(() => {
    if (filenameupdate) {
      try {
        dispatch(VeiwUniqueFileName(filenameupdate)).then((response) => {
          if (response?.payload) {
            setVeiwdata(response.payload);
          } else {
            toast.error("The file is empty or cannot be viewed.");
          }
        });
      } catch (error) {
        toast.error("An error occurred while fetching the file data.");
      } finally {
        setVeiwloading(false);
      }
    }
  }, [filenameupdate]);

  const handleViewFile = (item) => {
    setVeiwloading(true);
    setFilename(item.fileName);
    setViewshow(true);
    setfilenameupdate(item.uniqueFileName);
  };
  const handledelete = (item) => {
    setShow(true);
    setPopupMessage("Are you want to Delete this FILE ");
    setdeletedata(item.uniqueFileName);
  };
  const conformDelete = () => {
 
    const uniqueFileName=deletedata;
        dispatch(deleteFile( {uniqueFileName , surveyId}))
        .then(()=>{
           ListOfSuveysHandler();
        handleClosedata();
        }
      );
  };
    
  return (
    <>
      <Modal show={show} onHide={handleClosedata} centered>
        <Modal.Body style={{ position: "relative", margin: "10px" }}>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={handleClosedata}
          ></button>
          <div className="d-flex justify-content-center align-items-center flex-column gap-3">
            <div className="mt-2">
              <MdErrorOutline style={{ color: "#dc3545", fontSize: "40px" }} />
            </div>
            <div severity="success ps-4" style={{ fontSize: "20px" }}>
              {popupMessage}
            </div>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "30px",
              marginBottom: "10px",
            }}
          >
            <button
              type="button"
              className="btn btn-danger"
              onClick={conformDelete}
            >
              Delete
            </button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={Viewshow}
        onHide={handleCloseViewdata}
        size="xl"
        className=""
      >
        <button
          type="button"
          className="btn-close "
          aria-label="Close"
          style={{
            position: "absolute",
            top: "8px",
            right: "13px",
            zIndex: "1051",
          }}
          onClick={handleCloseViewdata}
        />

        <Modal.Body>
          {veiwloading ? (
            <div className="w-100 d-flex  justify-content-center">
              <Loader />
            </div>
          ) : (
            <Uniquefiledata Veiwdata={Veiwdata} Filename={Filename} />
          )}
        </Modal.Body>
      </Modal>

      <Modal
        show={Editshow}
        onHide={handleCloseEditdata}
        size="lg"
        className=""
      >
        <button
          type="button"
          className="btn-close "
          aria-label="Close"
          style={{
            position: "absolute",
            top: "8px",
            right: "13px",
            zIndex: "1051",
          }}
          onClick={() => handleCloseEditdata(false)}
        />

        <Modal.Body>
          <EditUploadFile
            Uniquefilename={Uniquefilename}
            handleCloseEditdata={handleCloseEditdata}
            surveyId={surveyId}
          />
        </Modal.Body>
      </Modal>
      <div className="shadow rounded-4 bg-white w-100  d-flex justify-content-center py-5 ">
        <div className="w-100 ">
          <div className="row m-0 p-0 justify-content-center">
            <div className="col-md-11">
              <div className="">
                <div className="title px-2">
                  <p className="fw-bold fs-3">Surveys File List</p>
                </div>
              </div>
              <div style={{}}>
                <div className="table-responsive">
                  <Paper sx={{ width: "100%" }}>
                    <table class="table table-borderless">
                      <thead>
                        <tr
                          className=" fw-semobold shadow-lg"
                          style={{ backgroundColor: "#00003A" }}
                        >
                          <th
                            className="p-4"
                            
                          >
                            File Name
                          </th>

                          <th
                            className="p-4"
                            
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
                        ) : surveyList?.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center">
                              <p className="fw-bold fs-5">No file</p>
                            </td>
                          </tr>
                        ) : (
                          <>
                            {currentData?.map((item, index) => {
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
                                        <div className=" mx-2">
                                          {" "}
                                          <SurveyCheckbox
                                            value={selectedFiles}
                                            index={index}
                                            checked={selectedFiles.includes(item?.uniqueFileName)}
                                            onChange={() =>
                                              handleCheckboxClick(item?.uniqueFileName)
                                            }
                                          />
                                        </div>
                                        <div
                                          className="px-4"
                                          // onClick={() => handleClick(item)}
                                        >
                                          {item.fileName}
                                        </div>
                                      </div>
                                    </td>
                                    <td className="pt-3">
                                      <button
                                        className="btn btn-sm btn-outline-danger col-xs-12 rounded-2"
                                        type="button"
                                        onClick={() => handledelete(item)}
                                      >
                                        <MdDeleteForever
                                          style={{ color: "#f97300" }}
                                          size={20}
                                        />
                                      </button>
                                      <button
                                        className="btn btn-sm btn-outline-warning col-xs-12 ms-1 rounded-1"
                                        title="View"
                                        onClick={() => handleViewFile(item)}
                                      >
                                        <GrFormView
                                          style={{ color: "#f97300" }}
                                          size={20}
                                        />
                                      </button>
                                      <button
                                        className="btn btn-sm btn-outline-warning col-xs-12 ms-1 rounded-1"
                                        title="View"
                                        onClick={() => handleEditFile(item)}
                                      >
                                        <LiaEditSolid
                                          style={{ color: "#f97300" }}
                                          size={20}
                                        />
                                      </button>
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
                      count={listOfDepartment?.length || 0}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </Paper>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-2">
                <WebsiteButton
                  type="button"
                  onClick={() => {
                    if (selectedFiles != null) {
                      setstepper(4);
                    }
                  }}
                >
                  Next
                </WebsiteButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filedata;
