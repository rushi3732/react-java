import React from "react";

function IssueWithoutIndentButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-[36px] cursor-pointer px-3 w-max bg-customBlue  text-white rounded text-sm font-medium"
        onClick={onClick}
      >
      Issue Without Indent
      </button>
    </div>
  );
}

export default IssueWithoutIndentButton;