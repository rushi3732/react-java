import React from "react";

function GetIndentButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-[36px] cursor-pointer px-3 w-max  bg-customOrange  text-white rounded text-sm font-medium"
        onClick={onClick}
      >
        Get Indent
      </button>
    </div>
  );
}

export default GetIndentButton;