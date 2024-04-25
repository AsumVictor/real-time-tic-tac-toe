import React, { useState } from "react";
import IconX, { IconXOutline } from "../utils/IconX";
import IconO, { IconOOutline } from "../utils/IconO";

const BoardTile = ({ value, onTileClick, isXNext }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const hoverOutline = isXNext ? (
    <IconXOutline width="62" height="62" />
  ) : (
    <IconOOutline width="60" height="60" />
  );

  const valueIcone =
    value === "X" ? (
      <IconX fillColor="iconGreen" width="64" height="64" />
    ) : (
      <IconO fillColor="iconYellow" width="64" height="64" />
    );

  return (
    <div className="relative flex justify-center">
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onTileClick}
        className={` bg-[var(--menu-background-color)] w-24 h-24 rounded-lg flex justify-center items-center`}>
        {value === null && isHovered && hoverOutline}
        {value !== null && valueIcone}
      </button>
      <div
        className={` bg-[var(--menu-background-shadow-color)] absolute h-24 w-24 top-2 -z-10 rounded-lg`}></div>
    </div>
  );
};

export default BoardTile;
