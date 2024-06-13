import React from "react";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

function ModalCloseButton({ onClick }) {
  return (
    <div className="grid grid-cols-1 w-full">
      <CancelPresentationIcon
        className="h-[36px]  text-customRed  rounded cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
}

export default ModalCloseButton;
