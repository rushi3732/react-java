import React from "react";
import UploadIcon from "@mui/icons-material/Upload";

export default function BrowseDocButton() {
  return (
    <div>
      <button
        type="submit"
        onClick={onClick}
        className="h-[36px] cursor-pointer px-3  bg-customBlue text-white rounded text-sm font-medium overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
      >
        <UploadIcon />
        Browse Document
      </button>
    </div>
  );
}
