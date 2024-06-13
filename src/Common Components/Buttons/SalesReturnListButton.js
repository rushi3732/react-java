import React from "react";

function SalesReturnListButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-[36px] cursor-pointer px-3 w-full bg-customBlue text-white rounded "
        onClick={onClick}
      >
        Previous Return List
      </button>
    </div>
  );
}

export default SalesReturnListButton;