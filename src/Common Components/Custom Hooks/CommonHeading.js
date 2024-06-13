import React from "react";

export default function CommonHeading(header) {
  return (
    <div className="">
      <h1 className="text-center text-[18px] font-semibold whitespace-nowrap ">
        {header}
      </h1>
    </div>
  );
}
