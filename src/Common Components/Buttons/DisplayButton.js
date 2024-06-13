import React from 'react'

function DisplayButton({onClick}) {
  return (
    <div>
    <button
      type="submit"
      className="h-[36px] cursor-pointer px-3 text-sm font-medium  bg-customBlue text-white rounded "
      onClick={onClick}
    >
      Display
    </button>
  </div>
  )
}

export default DisplayButton