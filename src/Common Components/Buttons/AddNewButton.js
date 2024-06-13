import React from "react";

function AddNewButton({ onClick, label }) {
  return (
    <div>
      <button
        type="submit"
        className="h-[36px] cursor-pointer px-3 w-max bg-customBlue text-white rounded text-sm font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
        onClick={onClick}
      >
        Add New {label ? label : ""}
      </button>
    </div>
  );
}

export default AddNewButton;
