import React from "react";

function AddTypeButton({onClick}) {
  return (
    <div>
      <button
        type="button"
        className="h-[36px] cursor-pointer px-3 text-base font-medium  bg-customBlue text-white rounded  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
        onClick={onClick}
      >
        Add
      </button>
    </div>
  );
}

export default AddTypeButton;
