import React from 'react'

function OPDTreatmentRecordButton({onClick}) {
  return (
    <div>
      <button
        type="button"
        className="h-[36px] cursor-pointer px-3  bg-customBlue  text-white rounded text-sm font-medium"
        onClick={onClick}
      >
      OPD Treatment Record
      </button>
    </div>
  )
}

export default OPDTreatmentRecordButton