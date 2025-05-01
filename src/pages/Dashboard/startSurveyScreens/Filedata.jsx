import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import WebsiteButton from "../../../components/mySurveyProWebsiteBtn/WebsiteButtton";
import { useDispatch, useSelector } from "react-redux";
import {
  VeiwUniqueFileName,
  getAllSurveyFiles,
} from "../../../Redux/slice/surveySlice";
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
import UploadFile from "./UploadFile";
import Addnewfile from "./Addnewfile";
import DeleteIcon from "../../../assets/dashboredsvg/deleteIcon.svg?react";
import ViewIcon from "../../../assets/dashboredsvg/viewIcon.svg?react";
import EditIcon from "../../../assets/dashboredsvg/editIcon.svg?react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CustomeButton from "../../../components/mySurveyProWebsiteBtn/CustomeButton";

// Styled components for the table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E0E3E9",
    color: theme.palette.common.black,
    fontWeight: 600,
    fontSize: "17px",
    fontFamily: "Poppins, sans-serif",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "17px",
    fontWeight: 400,
    fontFamily: "Poppins, sans-serif",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F3F7FF",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  fontFamily: "Poppins, sans-serif",
}));

const Filedata = ({ setstepper, surveyId, sendSelectedFilesToParent }) => {
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
  const [addnewfile, setaddnewfile] = useState(false);
  const [Uniquefilename, setUniquefilename] = useState();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    if (surveyList?.length > 0) {
      setlistOfDepartment(surveyList);
    }
  }, [surveyList]);

  const currentData =
    listOfDepartment && Array.isArray(listOfDepartment)
      ? listOfDepartment.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )
      : [];

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = +event.target.value;
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

  const handleCloseViewdata = () => {
    setViewshow(false);
  };

  const handleCloseEditdata = (data) => {
    setEditshow(data);
  };

  const handleCloseaddfile = (data) => {
    setaddnewfile(data);
  };

  const handleCheckboxClick = (item) => {
    if (selectedFiles.includes(item)) {
      setselectedFiles(selectedFiles.filter((selected) => selected !== item));
    } else {
      setselectedFiles([...selectedFiles, item]);
      sendSelectedFilesToParent([...selectedFiles, item]);
    }
  };

  const ListOfSuveysHandler = async () => {
    if (surveyId) {
      dispatch(getAllSurveyFiles(surveyId)).then((res) => {
        setsurveyList(res?.payload);
      });
    }
  };

  const getFile = async () => {
    dispatch(getAllSurveyFiles(surveyId)).then((res) => {
      setsurveyList(res?.payload);
    });
  };

  useEffect(() => {
    ListOfSuveysHandler();
  }, [Editshow]);

  const handleClosedata = (datatrue) => {
    setShow(false);
  };

  const handleEditFile = (item, filename) => {
    const uniqueFileName = item.uniqueFileName;
    setUniquefilename(uniqueFileName);
    setEditshow(true);
    setFilename(filename);
  };

  const handleAddFile = (data) => {
    setaddnewfile(data);
  };

  const handleViewFile = (item) => {
    setVeiwloading(true);
    setFilename(item.fileName);
    setViewshow(true);
    dispatch(VeiwUniqueFileName(item.uniqueFileName)).then((response) => {
      if (response?.payload) {
        setVeiwdata(response.payload);
        setVeiwloading(false);
      }
    });
  };

  const handledelete = (item) => {
    setShow(true);
    setPopupMessage("Are you want to Delete this FILE ");
    setdeletedata(item.uniqueFileName);
  };

  const conformDelete = () => {
    const uniqueFileName = deletedata;
    dispatch(deleteFile({ uniqueFileName, surveyId })).then(() => {
      ListOfSuveysHandler();
      handleClosedata();
    });
  };

  const closeModal = () => {
    setaddnewfile(data);
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
  
      <Modal
        show={addnewfile}
        onHide={handleCloseaddfile}
        size="lg"
        className="m-4 "
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
          onClick={() => handleCloseaddfile(false)}
        />

        <Modal.Body>
          <Addnewfile
               surveyId={surveyId}
               closeModal ={handleCloseaddfile}
               getFile={getFile}
          />
        </Modal.Body>
      </Modal>

      <div className="shadow rounded-4 bg-white w-100 d-flex justify-content-center py-5">
        <div className="w-100">
          <div className="row m-0 p-0 justify-content-center">
            <div className="col-md-11">
              <div className="">
                <div className="title d-flex justify-content-between  mb-3">
                  <p
                    className="survey-list-title m-0" >
                 
                    Survey File List
                  </p>
                  <CustomeButton  onClick={handleAddFile}>
                    Add new file
                  </CustomeButton>
               
                </div>
              </div>
              <div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>File Name</StyledTableCell>
                        <StyledTableCell>Actions</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading ? (
                        <StyledTableRow>
                          <StyledTableCell colSpan={2} align="center">
                            <Loader />
                          </StyledTableCell>
                        </StyledTableRow>
                      ) : surveyList?.length === 0 ? (
                        <StyledTableRow>
                          <StyledTableCell
                            colSpan={2}
                            align="center"
                            className="fw-bold fs-5"
                          >
                            No file
                          </StyledTableCell>
                        </StyledTableRow>
                      ) : (
                        currentData?.map((item, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell>
                              <div className="d-flex align-items-center">
                                <div className="mx-2">
                                  <SurveyCheckbox
                                    value={selectedFiles}
                                    index={index}
                                    checked={selectedFiles.includes(
                                      item?.uniqueFileName
                                    )}
                                    onChange={() =>
                                      handleCheckboxClick(item?.uniqueFileName)
                                    }
                                  />
                                </div>
                                <div className="px-4">{item.fileName}</div>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>
                              <div className="custom-sruvey-icon-main">
                                <div className="custom-sruvey-icon custom-iconborder">
                                  <DeleteIcon
                                    onClick={() => handledelete(item)}
                                    style={{ cursor: "pointer" }}
                                  />
                                </div>
                                <div className="custom-sruvey-icon custom-iconborder">
                                  <ViewIcon
                                    onClick={() => handleViewFile(item)}
                                    style={{ cursor: "pointer" }}
                                  />
                                </div>
                                <div className="custom-sruvey-icon ">
                                  <EditIcon
                                    onClick={() => handleEditFile(item)}
                                    style={{ cursor: "pointer" }}
                                  />
                                </div>
                              </div>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={listOfDepartment?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              </div>
              <div className="d-flex justify-content-end mt-2">
                <WebsiteButton
                  type="button"
                  onClick={() => {
                    if (selectedFiles.length > 0) {
                      setstepper(4);
                    }
                  }}
                  disabled={selectedFiles.length === 0}
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
