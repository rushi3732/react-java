import React from "react";

function RemoveKitButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-[36px] cursor-pointer px-3 w-max border border-customRed text-customRed rounded text-base font-sm"
        onClick={onClick}
      >
        Remove Kit
      </button>
    </div>
  );
}

export default RemoveKitButton;