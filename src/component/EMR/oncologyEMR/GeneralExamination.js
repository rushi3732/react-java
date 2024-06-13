import React from "react";
import CardiovascularSystem from "./GeneralExamination/CardiovascularSystem";
import CentralNervesSystem from "./GeneralExamination/CentralNervesSystem";
import GeneralExamination from "./GeneralExamination/GeneralExamination";
import KarnofskyScore from "./GeneralExamination/KarnofskyScore";
import PerformanceStatus from "./GeneralExamination/PerformanceStatus";

const GeneralExaminationTab = () => {
  const GeneralExList = [
    {
      id: 1,
      label: "Pallor",
      name: "pallor",
    },
    {
      id: 2,
      label: "Icterus",
      name: "icterus",
    },
    ,
    {
      id: 3,
      label: "Cyanosis",
      name: "Cyanosis",
    },

    {
      id: 4,
      label: "Clubbing",
      name: "Clubbing",
    },
    {
      id: 5,
      label: "Oedema",
      name: "Oedema",
    },
    {
      id: 6,
      label: "Obesity",
      name: "Obesity",
    },
    {
      id: 7,
      label: "purpura",
      name: "purpura",
    },
  ];
  return (
    <div>
      <GeneralExamination />
      <KarnofskyScore />
      <PerformanceStatus />
      <CentralNervesSystem />
      <CardiovascularSystem />{" "}
    </div>
  );
};

export default GeneralExaminationTab;
