import React from "react";

const IconO = ({ fillColor = "transparent", width = "32", height = "32" }) => {
  const iconFillColor = {
    iconYellow: "var(--primary-yellow)",
    iconGrey: "var(--icon-grey)",
    iconBg: "var(--background-color)",
  };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 64 64`}>
      <path
        fill={iconFillColor[fillColor]}
        d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
      />
    </svg>
  );
};

export const IconOOutline = ({
  fillColor = "var(--primary-yellow)",
  width = "32",
  height = "32",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 66 66`}>
      <path
        fill="none"
        stroke={fillColor}
        strokeWidth={2}
        d="M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
      />
    </svg>
  );
};

export default IconO;
