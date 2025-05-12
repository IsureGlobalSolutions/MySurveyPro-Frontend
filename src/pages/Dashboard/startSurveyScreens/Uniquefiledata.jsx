import React from 'react';
import './startsurvey.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// Styled components for the table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E0E3E9',
    color: theme.palette.common.black,
    fontWeight: 600,
    fontSize: '17px',
    fontFamily: 'Poppins, sans-serif',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '17px',
    fontWeight: 400,
    fontFamily: 'Poppins, sans-serif',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#F3F7FF',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  fontFamily: 'Poppins, sans-serif',
}));

const Uniquefiledata = ({ Veiwdata, Filename }) => {
  return (
    <>
      <div className="card m-4">
        {/* File Name Section */}
        <div
          className="d-flex flex-wrap align-items-center p-2 card-header"
          style={{ backgroundColor: "#3B5BE4", fontSize: "20px" }}
        >
          <div className="d-flex align-items-center">
            <strong>File Name :</strong>
          </div>
          <div className="ms-2 text-truncate" style={{ color: "white", flex: "1" }}>
            {Filename?.toUpperCase()}
          </div>
          <a
            href="#"
            className="card-fullscreen ms-3"
            data-bs-toggle="tooltip"
            title="Card Full-Screen"
          >
            <i className="icon-size-fullscreen" />
          </a>
        </div>

        {/* Table Section */}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Employee ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Department</StyledTableCell>
                <StyledTableCell>Designation</StyledTableCell>
                <StyledTableCell>Grade</StyledTableCell>
                <StyledTableCell>DOB</StyledTableCell>
                <StyledTableCell>Age</StyledTableCell>
                <StyledTableCell>Gender</StyledTableCell>
                <StyledTableCell>DOJ</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Previous Job Title</StyledTableCell>
                <StyledTableCell>Promotion Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Veiwdata.length > 0 ? (
                Veiwdata.map((data, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{data.employeeId}</StyledTableCell>
                    <StyledTableCell>{data.name}</StyledTableCell>
                    <StyledTableCell>{data.email}</StyledTableCell>
                    <StyledTableCell>{data.department}</StyledTableCell>
                    <StyledTableCell>{data?.designation?.title ? data?.designation?.title : "null"}</StyledTableCell>
                    <StyledTableCell>{data.grade || "null"}</StyledTableCell>
                    <StyledTableCell>{data.dob || "null"}</StyledTableCell>
                    <StyledTableCell>{data.age || "null"}</StyledTableCell>
                    <StyledTableCell>{data.gender || "null"}</StyledTableCell>
                    <StyledTableCell>{data.doj || "null"}</StyledTableCell>
                    <StyledTableCell>{data.location || "null"}</StyledTableCell>
                    <StyledTableCell>{data.status || "null"}</StyledTableCell>
                    <StyledTableCell>{data.previousJobTitle || "null"}</StyledTableCell>
                    <StyledTableCell>{data.promotionDate || "null"}</StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell colSpan={14} align="center">
                    No Data Available
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Uniquefiledata;