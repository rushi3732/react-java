import React from "react";

function SaveScheduleButton({ onClick }) {
  return (
    <div>
      <button
        className="h-[36px] cursor-pointer px-3  bg-customGreen text-white rounded text-base font-medium"
        onClick={onClick}
      >
        Save
      </button>
    </div>
  );
}

export default SaveScheduleButton;
