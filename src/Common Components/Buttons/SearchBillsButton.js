import React from "react";

function SearchBillsButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="h-[36px] cursor-pointer px-3 w-full bg-customBlue text-white rounded text-base font-medium"
      >
        Previous Bills
      </button>
    </div>
  );
}

export default SearchBillsButton;
