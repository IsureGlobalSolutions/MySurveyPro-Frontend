// SurveyTable.js
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import Loader from "../plugins/Loader";
import { Pagination, TablePagination } from "@mui/material";
import './selecttable.css'

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
  TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent(columns) {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric ? "right" : "left"}
          style={{ width: column.width }}
          sx={{
            backgroundColor: "background.paper",
            fontWeight: "bold", // Make the column headers bold
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(columns, _index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric ? "right" : "left"}
          sx={{
            color: "#7a7a7a",
          }}
        >
          {row[column.dataKey]}
        </TableCell>
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

  const handleChange = (event, value) => {
    setCurrentPage(value);
    fetchData(dimensionId, columnProperty, rowsPerPage, value);
  };
  return (
    <>
      <div className="pb-3 px-3 pe-0">
        <Paper style={{ height: 350, width: "100%", borderRadius: "0px 0px 10px 10px" }}>
          {isLoading ? (
            <div className="loader-div d-flex justify-content-center align-items-center h-100">
              <Loader />
            </div>
          ) : (
            <TableVirtuoso
              data={data}
              components={VirtuosoTableComponents}
              fixedHeaderContent={() => fixedHeaderContent(columns)}
              itemContent={(index, row) => rowContent(columns, index, row)}
              style={{borderRadius: "0px 0px 10px 10px"}}
            />
          )}
        </Paper>
        {/* <Paper className="d-flex justify-content-center">
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={data?.length}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Pagination
            count={totalpages}
            page={currentPage}
            onChange={handleChange}
          />
        </Paper> */}
      </div>
    </>
  );
};

export default SurveyTable;
