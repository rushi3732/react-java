import React from "react";

function PreviousIssuedListButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="h-[36px] cursor-pointer px-3 w-max  bg-customBlue text-white rounded text-sm font-medium"
      >
        Previous Issued List
      </button>
    </div>
  );
}

export default PreviousIssuedListButton;
