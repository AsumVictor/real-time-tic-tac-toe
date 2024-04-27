import React, { useEffect, useState } from "react";
import IconX, { IconXOutline } from "../utils/IconX";
import IconO, { IconOOutline } from "../utils/IconO";
import { getSocket } from "@/lib/socket";


const BoardTile = ({ value, onTileClick, isXNext, isTurn, number, game_room }) => {
  const [isHovered, setIsHovered] = useState(false);
  const socket = getSocket()
  const tile_number = number
  const g_room = game_room

  const handleMouseEnter = () => {
    if (!isTurn) return;
    socket.emit('hover-true', g_room, number)
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isTurn) return;
    socket.emit('hover-false', g_room, number)
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

    useEffect(() => {
      socket.on("connect", () => {
        console.log("Socket connected:", socket.id);
      });

      socket.on("hover-true", (n) => {
         if(n != tile_number) return
         setIsHovered(true);
      })

      socket.on("hover-false", (n) => {
        if(n != tile_number) return
        setIsHovered(false);
     })
  
      // Clean up the event listener when the component unmounts
      return () => socket.off("connect");
    }, []);

  return (
    <div className={`relative flex justify-center `}>
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onTileClick}
        className={` bg-[var(--menu-background-color)] w-24 h-24 rounded-lg flex justify-center items-center ${
          isTurn ? null : " cursor-not-allowed"
        }`}
      >
        {value === null && isHovered && hoverOutline}
        {value !== null && valueIcone}
      </button>
      <div
        className={` bg-[var(--menu-background-shadow-color)] absolute h-24 w-24 top-2 -z-10 rounded-lg`}
      ></div>
    </div>
  );
};

export default BoardTile;
