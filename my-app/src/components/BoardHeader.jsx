import React from "react";
import IconO from "../utils/IconO";
import IconX from "../utils/IconX";
import { RestartButton } from "../utils/Buttons";

const BoardHeader = ({ reset, isXNext }) => {
  return (
    <div className={`flex justify-between`}>
      <div className="flex items-center justify-center space-x-1">
        <IconX fillColor="iconGreen" />
        <IconO fillColor="iconYellow" />
      </div>
      <div className="relative">
        <div className="flex justify-center items-center bg-[var(--menu-background-color)] p-2 rounded-lg z-10 h-9 space-x-1">
          {isXNext ? (
            <IconX fillColor="iconGrey" width="16" height="16" />
          ) : (
            <IconO fillColor="iconGrey" width="16" height="16" />
          )}
          <p className=" text-[var(--icon-grey)] font-bold text-sm">TURN</p>
        </div>
        <div className="absolute top-1 bg-[var(--menu-background-shadow-color)] -z-10 h-9 w-full rounded-lg"></div>
      </div>
      <RestartButton reset={reset} />
    </div>
  );
};

export default BoardHeader;
