import React from "react";

function ClaimReportButton({ onClick }) {
  return (
    <div>
      <button
        type="button"
        className="h-[36px] cursor-pointer px-3 border  border-customBlue text-customBlue rounded text-sm font-semibold"
        onClick={onClick}
      >
        Claim Report
      </button>
    </div>
  );
}

export default ClaimReportButton;
