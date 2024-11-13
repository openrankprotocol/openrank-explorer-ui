import React from 'react';

const Loader = ({ size = 50, color = 'rgb(234 179 8)' }) => (
  <div className="flex items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width={size}
      height={size}
      fill={color}
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke={color}
        strokeWidth="5"
        fill="none"
        strokeLinecap="round"
      >
        <animate
          attributeName="stroke-dasharray"
          values="1,200;89,200;89,200"
          keyTimes="0;0.5;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          values="0;-35;-124"
          keyTimes="0;0.5;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 25 25;360 25 25"
          keyTimes="0;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
);

export default Loader;
