import React from "react";

function AmbulanceButton({ onClick }) {
  return (
    <div>
      <button
        type="submit"
        className="h-10 px-3 text-base font-medium  bg-[#007EA9] text-white rounded  overflow-hidden transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out"
        onClick={onClick}
      >
        Ambulance Call List
      </button>
    </div>
  );
}

export default AmbulanceButton;