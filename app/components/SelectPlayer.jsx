import React, { useState } from "react";
import IconX from "../utils/IconX";
import IconO from "../utils/IconO";

const SelectPlayer = ({ handlerPlayerSelect, player }) => {
  const hoverColorClasses = {
    unselected: "hover:bg-[var(--menu-hover-color)]",
  };

  return (
    <div className="relative">
      <div className=" py-7 space-y-6 rounded-lg  bg-[var(--menu-background-color)] w-full flex flex-col items-center z-10">
        <p className=" text-[#A8BFC9] font-bold">PICK PLAYER 1'S MARK</p>
        <div className="flex justify-around p-2 rounded-lg bg-[#1A2A33] w-11/12 min-h-3 space-x-2">
          <button
            onClick={() => handlerPlayerSelect("X")}
            className={`${
              player !== "X" ? hoverColorClasses["unselected"] : "bg-[#979797]"
            } rounded-lg w-1/2 flex justify-center py-3 transition-all duration-150 ease-in  `}>
            <IconX fillColor={player === "X" ? "iconBg" : "iconGrey"} />
          </button>
          <button
            onClick={() => handlerPlayerSelect("O")}
            className={`${
              player === "X" ? hoverColorClasses["unselected"] : "bg-[#979797]"
            } rounded-lg w-1/2 flex justify-center py-3 transition-all duration-150 ease-in  `}>
            <IconO fillColor={player !== "X" ? "iconBg" : "iconGrey"} />
          </button>
        </div>
        <p className="text-[#A8BFC9]">REMEMBER : X GOES FIRST</p>
      </div>
      <div className="rounded-lg bg-[var(--menu-background-shadow-color)] absolute top-2 h-full w-full -z-10"></div>
    </div>
  );
};

export default SelectPlayer;
