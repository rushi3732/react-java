import React from "react";

function PreviousReceivedListButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="h-[36px] cursor-pointer px-3 w-max  bg-customBlue text-white rounded text-sm font-medium"
      >
        Previous Received List
      </button>
    </div>
  );
}

export default PreviousReceivedListButton;
