// allergies&mplaints.js
import React, { useContext } from "react";
import { EMRContext } from "./EMRContext"; // Import the context
import Allergies from "./allergies&mplaints/Allergies";
import DiagnosisOfIndexCancer from "./allergies&mplaints/DiagnosisOfIndexCancer";
import HistoryFrom from "./allergies&mplaints/HistoryFrom";
import PresentingComplaints from "./allergies&mplaints/PresentingComplaints";
import StageAtDiagnosis from "./allergies&mplaints/StageAtDiagnosis";
import VulnerablePatient from "./allergies&mplaints/VulnerablePatient";
import WongBekerFacesPainRatingScale from "./allergies&mplaints/WongBekerFacesPainRatingScale";

const AllergiesComplaints = () => {
  return (
    <div>
      <Allergies />
      <VulnerablePatient />
      <HistoryFrom />
      <PresentingComplaints />
      <div className="grid grid-cols-2 gap-2">
        <WongBekerFacesPainRatingScale />
        <StageAtDiagnosis />
      </div>
      <DiagnosisOfIndexCancer />
    </div>
  );
};

export default AllergiesComplaints;
