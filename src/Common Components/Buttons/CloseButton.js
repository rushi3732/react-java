import React from "react";

function CloseButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-[36px] cursor-pointer px-3 border border-customRed text-customRed rounded text-base font-medium"
        onClick={onClick}
      >
        Close
      </button>
    </div>
  );
}

export default CloseButton;