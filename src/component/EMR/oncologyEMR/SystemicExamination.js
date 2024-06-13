import React from "react";
import MenstrualHistory from "./systemic Examination/MenstrualHistory.";
import ObstetricHistory from "./systemic Examination/ObstetricHistory";
import OtherSystemicExamination from "./systemic Examination/OtherSystemicExamination";
import PerAbdomen from "./systemic Examination/PerAbdomen";
import RespiratorySystem from "./systemic Examination/RespiratorySystem";

const SystemicExamination = () => {
  return (
    <div>
      <MenstrualHistory />
      <ObstetricHistory />
      <RespiratorySystem />
      <PerAbdomen />
      <OtherSystemicExamination />
    </div>
  );
};

export default SystemicExamination;
