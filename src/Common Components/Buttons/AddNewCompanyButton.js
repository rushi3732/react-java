import React from "react";

function AddNewCompanyButton({ onClick }) {
  return (
    <div>
      <button
        className="h-[36px] cursor-pointer px-3 w-max text-base font-medium  bg-customBlue text-white rounded  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
        onClick={onClick}
      >
        Add New Company
      </button>
    </div>
  );
}

export default AddNewCompanyButton;
