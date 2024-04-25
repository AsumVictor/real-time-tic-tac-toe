"use client";
import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import BoardHeader from "../components/BoardHeader";
import BoardTile from "../components/BoardTile";
import useTicTacToe from "./useTicTacToe";
import IconO from "../utils/IconO";
import IconX from "../utils/IconX";
import { QuitButton } from "../utils/Buttons";

const Board = () => {
  const { squares, handleClick, reset, isXNext, winnerTile, setWinnerTile } =
    useTicTacToe();

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
    setWinnerTile(null);
    reset();
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (winnerTile) {
      openModal();
    }
  });

  const winnerClass = {
    X: "text-[var(--primary-green)]",
    O: "text-[var(--primary-yellow)]",
  };

  return (
    <>
      <div className="px-2 sm:px-0 space-y-10">
        <BoardHeader reset={reset} isXNext={isXNext} />
        <div className="grid grid-cols-3 gap-x-2 gap-y-4 content-around">
          <BoardTile
            value={squares[0]}
            onTileClick={() => handleClick(0)}
            isXNext={isXNext}
          />
          <BoardTile
            value={squares[1]}
            onTileClick={() => handleClick(1)}
            isXNext={isXNext}
          />
          <BoardTile
            value={squares[2]}
            onTileClick={() => handleClick(2)}
            isXNext={isXNext}
          />
          <BoardTile
            value={squares[3]}
            onTileClick={() => handleClick(3)}
            isXNext={isXNext}
          />
          <BoardTile
            value={squares[4]}
            onTileClick={() => handleClick(4)}
            isXNext={isXNext}
          />
          <BoardTile
            value={squares[5]}
            onTileClick={() => handleClick(5)}
            isXNext={isXNext}
          />
          <BoardTile
            value={squares[6]}
            onTileClick={() => handleClick(6)}
            isXNext={isXNext}
          />
          <BoardTile
            value={squares[7]}
            onTileClick={() => handleClick(7)}
            isXNext={isXNext}
          />
          <BoardTile
            value={squares[8]}
            onTileClick={() => handleClick(8)}
            isXNext={isXNext}
          />
        </div>
        <div className="grid grid-cols-3 gap-x-2">
          <div className=" flex flex-col justify-center items-center w-24 h-16 bg-[var(--primary-green)] rounded-lg">
            <p className=" text-xs">X(P1)</p>
            <p className=" text-xl font-bold">14</p>
          </div>
          <div className=" flex flex-col justify-center items-center w-24 h-16 bg-[var(--icon-grey)] rounded-lg">
            <p className=" text-xs">TIES</p>
            <p className=" text-xl font-bold">14</p>
          </div>
          <div className=" flex flex-col justify-center items-center w-24 h-16 bg-[var(--primary-yellow)] rounded-lg">
            <p className=" text-xs">O(P2)</p>
            <p className=" text-xl font-bold">14</p>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center w-screen">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full transform overflow-hidden bg-[var(--menu-background-color)] p-6 text-left align-middle shadow-xl transition-all space-y-3">
                  <Dialog.Title
                    as="h3"
                    className=" text-center text-sm font-bold leading-6 text-[var(--text-grey)]">
                    PLAYER 1 WINS!
                  </Dialog.Title>
                  <div className="space-x-2 flex justify-center items-center">
                    {winnerTile === "X" ? (
                      <IconX fillColor="iconGreen" width="30" height="30" />
                    ) : (
                      <IconO fillColor="iconYellow" width="30" height="30" />
                    )}

                    <p
                      className={` text-2xl font-bold ${winnerClass[winnerTile]}`}>
                      TAKES THE ROUND
                    </p>
                  </div>

                  <div className="W-full space-x-2 flex justify-center items-center">
                    <QuitButton closeModal={closeModal} />
                    <QuitButton
                      closeModal={closeModal}
                      text="NEXT ROUND"
                      color="btnYellow"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Board;
