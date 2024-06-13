import React from "react";

function NewQuotationButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-[36px] cursor-pointer px-3 w-max  bg-customBlue  text-white rounded text-sm font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
        onClick={onClick}
      >
        New Quotation
      </button>
    </div>
  );
}

export default NewQuotationButton;