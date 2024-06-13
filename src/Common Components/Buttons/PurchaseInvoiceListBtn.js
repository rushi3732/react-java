import React from "react";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
function PurchaseInvoiceListBtn({ onClick }) {
  return (
    <div>
      <button
        className="h-[36px] cursor-pointer px-3 text-sm font-medium  bg-customBlue text-white rounded  overflow-hidden transform hover:scale-x-105 hover:scale-y-105 transition duration-300 ease-out whitespace-nowrap"
        type="button"
        onClick={onClick}
      >

        Purchase Invoice List
      </button>
    </div>
  );
}

export default PurchaseInvoiceListBtn;
