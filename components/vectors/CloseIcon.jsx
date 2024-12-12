import React from "react";

const CloseIcon = ({ onClick, color = "#FFF" }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
  >
    <path
      d="M7.88428 20.1168L14.0011 14L20.1179 20.1168M20.1179 7.88318L13.9999 14L7.88428 7.88318"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CloseIcon;
