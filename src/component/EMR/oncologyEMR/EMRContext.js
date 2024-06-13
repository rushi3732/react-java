import React, { createContext, useContext, useState } from "react";

export const EMRContext = createContext();

export const EMRProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [allergiesDataResult, setAllergiesDataResult] = useState([
    { Allergies: null, "Allergy Description": "" },
  ]);
  return (
    <EMRContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        allergiesDataResult,
        setAllergiesDataResult,
      }}
    >
      {children}
    </EMRContext.Provider>
  );
};

export const useEMRContext = () => useContext(EMRContext);
