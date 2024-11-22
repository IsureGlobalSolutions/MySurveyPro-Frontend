// MyContextProvider.js
import React, { useContext, useState } from 'react';


import { createContext } from 'react';

const MyContext = createContext();

export const Navbarvalue = () => {
    return useContext(MyContext);
  };

const NavbarValuesContext = ({ children }) => {
  const [topNavValue, setTopNavValue] = useState(null);
  const [DashboardNavValues, setDashboardNavValues] = useState(1)
  const [startSurveyStepper, setstartSurveyStepper] = useState(1)
  const [selectedDashboardValues, setSelectedDashboardValues] = useState({
    department:'All',
    grade:'A',
    gender:'male',
    survey:{id:'',name:''}
  })

//main website topnavbar values 
  const updateTopNavValues = (topNavValue) => {
    setTopNavValue(topNavValue);
  };
//dashbaord sidebar values 
  const updateDashbaordNavValues = (DashboardNavValues) => {
    setDashboardNavValues(DashboardNavValues);
  };

//dashboard start survey tab values
  const StapperHandler = (value) => {
    setstartSurveyStepper(value);
  };


  //dashboard selected department value
  const DashboardStateHandler = (state,value) => {
      // Check if the state is a valid key in selectedDashboardValues
      if (selectedDashboardValues.hasOwnProperty(state)) {
        // Update the specific key with the new value
        setSelectedDashboardValues((prevState) => ({
          ...prevState,
          [state]: value
        }));
      } else {
        console.error(`Invalid state key: ${state}`);
      }
  };


  return (
    <MyContext.Provider value={{ 
      topNavValue,
     updateTopNavValues,
     DashboardNavValues,
     updateDashbaordNavValues ,
     startSurveyStepper,
     StapperHandler,
     selectedDashboardValues,
     DashboardStateHandler,
   

     }}>
      {children}
    </MyContext.Provider>
  );
};

export default NavbarValuesContext;
