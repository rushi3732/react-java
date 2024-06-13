import React from "react";
import CommonButton from "../Common Components/commonbutton/CommonButton";
import PrintSetting from "./PrintSetting";

const ViewPrint = () => {
  const [urlforPrint, setUrlforPrint] = React.useState();
  const [openPrintModal, setOpenPrintModal] = React.useState(false);

  const renderPrint = () => {
    setTimeout(() => {
      setOpenPrintModal(false);
    }, 0);

    return (
      <div className="hidden">
        <PrintSetting />
      </div>
    );
  };

  const handleSaveClick = () => {
    setOpenPrintModal(true);
    renderPrint(); 
  };

  return (
    <div>
      <CommonButton
        label="Save"
        type="button"
        className="saveButton bg-[#073763] text-white"
        onClick={handleSaveClick}
      />
      {openPrintModal && renderPrint()} 
    </div>
  );
};

export default ViewPrint;
