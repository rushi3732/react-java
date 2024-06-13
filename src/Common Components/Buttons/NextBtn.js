import React from "react";

function NextButton({ type, onClick }) {
  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className="h-[36px] cursor-pointer px-3 text-base font-medium border border-customBlue text-customBlue rounded"
      >
        Next
      </button>
    </div>
  );
}

export default NextButton;
