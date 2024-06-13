import React from "react";

function AddBtn({ type, onClick }) {
  return (
    <div>
      <button
        type={type}
        className="h-[34px] cursor-pointer px-3 text-base font-medium border border-customBlue text-customBlue rounded  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
        onClick={onClick}
      >
        Add
      </button>
    </div>
  );
}

export default AddBtn;
