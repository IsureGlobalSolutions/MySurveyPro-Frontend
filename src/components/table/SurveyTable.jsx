import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import Loader from "../plugins/Loader";
import { Pagination, TablePagination } from "@mui/material";
import './selecttable.css';
import BootstrapPagination from "../pagination/Pagination";

// Styled components for the table
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#EAEAEA',
    color: theme.palette.common.black,
    fontWeight: 500,
    fontSize: '16px',
    fontFamily: 'Poppins, sans-serif',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '14px',
    fontWeight: 400,
    fontFamily: 'Poppins, sans-serif',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#F8F8F8',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  fontFamily: 'Poppins, sans-serif',
}));

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow: StyledTableRow, // Use the styled TableRow
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent(columns) {
  return (
    <TableRow>
      {columns.map((column) => (
        <StyledTableCell // Use StyledTableCell for header
          key={column.dataKey}
          variant="head"
          align={column.numeric ? "right" : "left"}
          style={{ width: column.width }}
        >
          {column.label}
        </StyledTableCell>
      ))}
    </TableRow>
  );
}

function rowContent(columns, _index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <StyledTableCell // Use StyledTableCell for cells
          key={column.dataKey}
          align={column.numeric ? "right" : "left"}
        >
          {row[column.dataKey]}
        </StyledTableCell>
      ))}
    </React.Fragment>
  );
}

const SurveyTable = ({
  columns,
  data,
  isLoading,
  dimensionId,
  columnProperty,
  fetchData,
  totalpages,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalpages / rowsPerPage) || 1;

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = event.target.value;
    setRowsPerPage(newRowsPerPage);
    if (newRowsPerPage == "10") {
      setCurrentPage(1);
      fetchData(dimensionId, columnProperty, newRowsPerPage, 1);
    } else {
      fetchData(dimensionId, columnProperty, newRowsPerPage, currentPage);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchData(dimensionId, columnProperty, rowsPerPage, newPage);
  };

  return (
    <>
      <div className="pb-3 pe-0">
        <Paper style={{ height: 350, width: "100%", }}>
          {isLoading ? (
            <div className="loader-div d-flex justify-content-center align-items-center h-100">
              <Loader />
            </div>
          ) : (
            <>
         
              <TableVirtuoso
                data={data}
                components={VirtuosoTableComponents}
                fixedHeaderContent={() => fixedHeaderContent(columns)}
                itemContent={(index, row) => rowContent(columns, index, row)}
              
              />
              {/* Add Bootstrap Pagination */}
              <div className="d-flex justify-content-end mt-3 pe-3 pb-2">
                {/* <BootstrapPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                /> */}
              </div>
            </>
          )}
        </Paper>
      </div>
    </>
  );
};

export default SurveyTable;