import React from 'react';
import '../TEISurvey/TEISurvey.css';
import img1 from '../../../../assets/Q12survey/Q12surveystepperimg.png';
import WebsiteButton from '../../../../components/mySurveyProWebsiteBtn/WebsiteButtton';

const EADepartmentSelection = ({ 
  departments, 
  employees, 
  onDepartmentSelect, 
  onEmployeeSelect, 
  onSubmit,
  selectedDepartment,
  selectedEmployee 
}) => {
  return (
    <div className='Q12-section m-5 d-flex justify-content-center align-items-center p-5'>
      <div className='container'>
        <div className='stepper row '>
          <div className='col-md-8 p-5 mt-3'>
            <div className='text'>
              <h1>Please select department and employee</h1>
           
            </div>
            
            <div className="g-4 mt-4">
                <div className="row">
                    <div className="col"> 
                        <h3>Departments</h3>
              <div className="department-list mb-4">
                {departments.map((dept) => (
                  <div 
                    key={dept} 
                    className={`department-item ${selectedDepartment === dept ? 'selected' : ''}`}
                    onClick={() => onDepartmentSelect(dept)}
                  >
                    {dept}
                  </div>
                ))}
              </div>
              </div>
                    <div className="col">
  {selectedDepartment && (
                <>
                  <h3>Employees in {selectedDepartment}</h3>
                  <div className="employee-list mb-4">
                    {employees
                      .filter(emp => emp.department === selectedDepartment)
                      .map(emp => (
                        <div 
                          key={emp.id} 
                          className={`employee-item ${selectedEmployee?.id === emp.id ? 'selected' : ''}`}
                          onClick={() => onEmployeeSelect(emp)}
                        >
                          <div className="employee-name">{emp.name}</div>
                          <div className="employee-department">{emp.department}</div>
                        </div>
                      ))}
                  </div>
                </>
              )}

                    </div>
                </div>
             

            

              <div className="col-md-12 t-4">
                <WebsiteButton 
                  className='w-100' 
                  onClick={onSubmit} 
                  disabled={!selectedEmployee}
                >
                  Submit
                </WebsiteButton>
              </div>
            </div>
          </div>
          <div className='col-md-4 mt-4 d-flex justify-content-end'>
            <img src={img1} alt='image' className='img-fluid' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EADepartmentSelection;