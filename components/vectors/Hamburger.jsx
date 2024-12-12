import React from "react";

const Hamburger = ({ color = "#FFF" }) => (
  <svg
    maxheight="100%"
    maxwidth="100%"
    width="24"
    height="28"
    viewBox="0 0 24 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 8.16602H21"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path d="M3 14H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M3 19.834H21"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default Hamburger;
