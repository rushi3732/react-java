import React from "react";

const CommonButton = (props) => {
  const { label, onClick, type, disabled, className } = props;

  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className={` font-bold py-2 px-4 text-white rounded ${
        disabled ? "bg-blue-500  font-bold   opacity-50 cursor-not-allowed" : ""
      } ${(disabled ? "" : "bg-teal-500 text-white", className)}`}
    >
      {label}
    </button>
  );
};

export default CommonButton;
