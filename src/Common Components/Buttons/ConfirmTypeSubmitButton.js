import React from "react";

function ConfirmButton({onClick}) {
  return (
    <div>
      <button
        type="submit"
        className="h-[36px] cursor-pointer px-3 text-sm font-medium  bg-customGreen text-white rounded "
        onClick={onClick}
      >
        Confirm
      </button>
    </div>
  );
}

export default ConfirmButton;
