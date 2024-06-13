import React from "react";

function AddToListButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-[36px] cursor-pointer px-3 w-max bg-customBlue  text-white rounded text-sm font-sm"
        onClick={onClick}
      >
        Add To List
      </button>
    </div>
  );
}

export default AddToListButton;