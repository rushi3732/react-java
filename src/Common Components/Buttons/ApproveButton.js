import React from 'react'

export default function ApproveButton({ onClick }) {
  return (
    <div>
        <button
        type="button"
        className="h-[36px] cursor-pointer px-3  border border-customBlue  text-customBlue rounded text-sm font-medium"
        onClick={onClick}
      >
        Approve
      </button>
    </div>
  )
}
