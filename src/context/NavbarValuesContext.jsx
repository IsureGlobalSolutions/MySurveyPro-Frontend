// MyContextProvider.js
import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const Navbarvalue = () => {
  return useContext(MyContext);
};

const NavbarValuesContext = ({ children }) => {
  // Initial state definitions
  const initialSelectedDashboardValues = {
    department: 'All',
    grade: 'All',
    gender: 'male',
    survey: { id: '', name: '' },
  };

  const [topNavValue, setTopNavValue] = useState(null);
  const [DashboardNavValues, setDashboardNavValues] = useState(1);
  const [startSurveyStepper, setstartSurveyStepper] = useState(1);
  const [startSurvey, setstartSurvey] = useState(false);
  const [selectedDashboardValues, setSelectedDashboardValues] = useState(initialSelectedDashboardValues);

  // Main website top navbar values
  const updateTopNavValues = (topNavValue) => {
    setTopNavValue(topNavValue);
  };

  // Dashboard sidebar values
  const updateDashbaordNavValues = (DashboardNavValues) => {
    setDashboardNavValues(DashboardNavValues);
  };

  // Dashboard start survey tab values
  const StapperHandler = (value) => {
    setstartSurveyStepper(value);
  };

  // Start survey check value
  const startSurveyHandler = (value) => {
    setstartSurvey(value);
  };

  // Dashboard selected department value
  const DashboardStateHandler = (state, value) => {
    if (selectedDashboardValues.hasOwnProperty(state)) {
      setSelectedDashboardValues((prevState) => ({
        ...prevState,
        [state]: value,
      }));
    } else {
      console.error(`Invalid state key: ${state}`);
    }
  };

  // Reset all context values to initial states
  const resetContext = () => {
    setTopNavValue(null);
    setDashboardNavValues(1);
    setstartSurveyStepper(1);
    setstartSurvey(false);
    setSelectedDashboardValues(initialSelectedDashboardValues);
  };

  return (
    <MyContext.Provider
      value={{
        topNavValue,
        updateTopNavValues,
        DashboardNavValues,
        updateDashbaordNavValues,
        startSurveyStepper,
        StapperHandler,
        selectedDashboardValues,
        DashboardStateHandler,
        startSurvey,
        startSurveyHandler,
        resetContext, // Expose the reset function
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default NavbarValuesContext;
