import React from "react";

function UpdateTypeButton({onClick}) {
  return (
    <div>
      <button
        type="button"
        className="h-[36px] cursor-pointer px-3  bg-customGreen text-white rounded text-sm font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
        onClick={onClick}
      >
        Update
      </button>
    </div>
  );
}

export default UpdateTypeButton;
