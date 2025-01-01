import React from 'react';
import './startsurvey.css'
const Uniquefiledata = ({ Veiwdata, Filename }) => {
  return (
    <>
      <div className="card m-4">
      {/* File Name Section */}
      <div
        className="d-flex flex-wrap align-items-center p-2 card-header"
        style={{ backgroundColor: "#f97300", fontSize: "20px" }}
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
      <div className="table-responsive">
        <table className="data-table table table-bordered text-nowrap" style={{ fontSize: "17px" }}>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Grade</th>
              <th>DOB</th>
              <th>Age</th>
              <th>Gender</th>
              <th>DOJ</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Veiwdata.length > 0 ? (
              Veiwdata.map((data, index) => (
                <tr
                  key={index}
                  className={`data-row ${index === 0 ? "bg-lighttest" : ""}`}
                  style={{ fontSize: "17px" }}
                >
                  <td>{data.employeeId}</td>
                  <td>{data.name}</td>
                  <td>{data.department}</td>
                  <td>{data.designation || "null"}</td>
                  <td>{data.grade || "null"}</td>
                  <td>{data.dob || "null"}</td>
                  <td>{data.age || "null"}</td>
                  <td>{data.gender || "null"}</td>
                  <td>{data.doj || "null"}</td>
                  <td>{data.status || "null"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Uniquefiledata;
