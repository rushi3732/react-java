import React from "react";
import CoMorbidCondition from "./historylifestyle/CoMorbidCondition";
import FamilyHistory from "./historylifestyle/FamilyHistory";
import LifestyleHabits from "./historylifestyle/LifestyleHabits";
import SignficantPastHistory from "./historylifestyle/SignficantPastHistory";

const Historylifestyle = () => {
  return (
    <div className=" ">
      <FamilyHistory />
      <CoMorbidCondition />
      <SignficantPastHistory />
      <LifestyleHabits />
    </div>
  );
};

export default Historylifestyle;
