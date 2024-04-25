"use client";
import React, { useState } from "react";
import { PrimaryButton } from "./utils/Buttons";
import IconX from "./utils/IconX";
import IconO from "./utils/IconO";
import SelectPlayer from "./components/SelectPlayer";

export default function Home() {
  const [player, setPlayer] = useState("X");
  const handlerPlayerSelect = (player) => {
    setPlayer(player);
  };
  return (
    <div className="px-2 sm:px-0 min-w-[var(--mobile-width)]  sm:min-w-[var(--desktop-width)] space-y-10">
      <div className="flex items-center justify-center space-x-1">
        <IconX fillColor="iconGreen" />
        <IconO fillColor="iconYellow" />
      </div>
      <SelectPlayer handlerPlayerSelect={handlerPlayerSelect} player={player} />
      <div className="space-y-4 sm:space-y-5">
        <PrimaryButton
          player={player}
          btnText="NEW GAME (VS CPU)"
          color="btnYellow"
        />
        <PrimaryButton
          player={player}
          btnText="NEW GAME (VS PLAYER)"
          color="btnGreen"
        />
      </div>
    </div>
  );
}
