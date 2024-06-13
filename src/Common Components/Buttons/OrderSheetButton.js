import React from "react";

function OrderSheetButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="h-[36px] cursor-pointer px-3 w-full bg-customBlue text-white rounded text-base font-medium"
      >
        Order Sheet
      </button>
    </div>
  );
}

export default OrderSheetButton;
