import React from "react";

function SendMailButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-[36px] cursor-pointer px-3 border  bg-customBlue text-white rounded text-sm font-medium"
        onClick={onClick}
      >
        Send Mail
      </button>
    </div>
  );
}

export default SendMailButton;
