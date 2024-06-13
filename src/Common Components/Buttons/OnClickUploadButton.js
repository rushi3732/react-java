import React from "react";
import UploadIcon from "@mui/icons-material/Upload";

export default function OnClickUploadButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-[36px] cursor-pointer px-3  bg-customBlue text-white rounded text-sm font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
        onClick={onClick}
      >
        <UploadIcon />
        Upload Document
      </button>
    </div>
  );
}
