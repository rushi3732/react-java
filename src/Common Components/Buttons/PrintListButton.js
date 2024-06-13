import React from "react";

function PrintListButton({onClick}) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="h-10 px-3 w-full  bg-customOrange text-white rounded text-base font-medium"
      >
        Print List
      </button>
    </div>
  );
}

export default PrintListButton;