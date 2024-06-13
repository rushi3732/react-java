import React from "react";

function IVFlowButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="h-[36px] cursor-pointer px-3 w-full bg-customBlue text-white rounded text-base font-medium"
      >
       IV FLOW
      </button>
    </div>
  );
}

export default IVFlowButton;
