import React from "react";

const CircleProgressBar = ({ percentage, circleWidth, colColor }) => {
  const radius = 20;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;
  return (
    <>
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="4px"
          r={radius}
          stroke="#ddd"
          className="circle-back fill-none "
        />

        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="4px"
          r={radius}
          stroke={colColor}
          className="circle-progress fill-none"
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2} )`}
        />
        <text
          x="50%"
          y="50%"
          dy="0.35em"
          textAnchor="middle"
          className="text-sm font-bold"
        >
          {percentage}%
        </text>
      </svg>
    </>
  );
};

export default CircleProgressBar;
