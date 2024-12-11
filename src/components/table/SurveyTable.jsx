// SurveyTable.js
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Loader from '../plugins/Loader'
const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
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
          align={column.numeric ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{
            backgroundColor: 'background.paper',
            fontWeight: 'bold', // Make the column headers bold
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
          align={column.numeric ? 'right' : 'left'}
          sx={{
            color:'#7a7a7a',
           
          }}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

const SurveyTable = ({ columns, data,isLoading }) => {
  return (
<>
<div className="pb-3 px-3">

 <Paper style={{ height: 350, width: '100%', margin:'0px 0px 20px 0px', borderRadius:'0px'}}>
  {
    isLoading?  
    <div className="loader-div d-flex justify-content-center align-items-center h-100">
     <Loader/>
      </div> 
   
    :
  <TableVirtuoso
      
        data={'data'}
        components={VirtuosoTableComponents}
        fixedHeaderContent={() => fixedHeaderContent(columns)}
        itemContent={(index, row) => rowContent(columns, index, row)}
      />   
  }
        
   
     
    </Paper>  
</div>
     
</>
    
  );
};

export default SurveyTable;
