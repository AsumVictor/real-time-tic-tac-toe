"use client";
import SelectPlayer from "@/components/SelectPlayer";
import socket, { getSocket } from "@/lib/socket";
import { PrimaryButton, QuitButton } from "@/utils/Buttons";
import IconO from "@/utils/IconO";
import IconX from "@/utils/IconX";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [player, setPlayer] = useState("X");
  const [onlinePlayers, setOnlinePlayers] = useState([]);
  const [name, setName] = useState("");
  const [askName, setAskName] = useState(true);
  const [onRequest, setOnRequest] = useState(false);
  const router = useRouter()
  const [has_r_Request, setHas_r_Request] = useState({
    status: false,
    id: null,
    name: null,
  });
  const [requestName, setRequestName] = useState("");
  const socket = getSocket();
  const handlerPlayerSelect = (player) => {
    setPlayer(player);
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);

      socket.emit("new-user", (data) => {
        setOnlinePlayers(data);
      });
    });

    socket.on("new-online-user", (data) => {
      setOnlinePlayers((prev) => [data, ...prev]);
    });

    socket.on("request-play", (data) => {
      setHas_r_Request({
        status: true,
        id: data.sender_id,
        name: data.sender_name,
      });
      if (onRequest) {
        toast.success(`${data.sender_name} Wants to Play`);
      }
    });

    socket.on('confirm-game', ({ game_room, turn }) =>{
       socket.emit("join-game", game_room,()=>{
         router.push(`/board?r=${game_room}&t=${turn}`, { scroll: false })
       })
       console.log(game_room, turn)
    })

    // Clean up the event listener when the component unmounts
  }, []);

  const register_user = () => {
    setAskName(false);
    socket.emit("register_user", name);
  };

  const request = (id, r_name) => {
    console.log(id);
    setRequestName(r_name);
    socket.emit("request-play", {
      reciever_id: id,
      sender_name: name,
    });
    setOnRequest(true);
  };

  const confirm_game_play = () => {
    socket.emit("confirm-game", has_r_Request.id, ({ game_room, turn }) => {
      console.log(game_room, turn);
      router.push(`/board?r=${game_room}&t=${turn}`, { scroll: false })
    });
    // Loading_game
  };

  return (
    <div className="px-2 sm:px-0 min-w-[var(--mobile-width)]  sm:min-w-[var(--desktop-width)] space-y-10">
      <div className="flex items-center justify-center space-x-1">
        <IconX fillColor="iconGreen" />
        <IconO fillColor="iconYellow" />
      </div>
      <SelectPlayer handlerPlayerSelect={handlerPlayerSelect} player={player} />
      <div className="space-y-4 sm:space-y-5">
        <h2>Start a new game with:</h2>
        <h2>Users Online:</h2>
        <ul className="">
          {onlinePlayers.map((player) => (
            <li className=" flex flex-row gap-2">
              <span className=" text-white">{player.name}</span>
              <button
                className=" bg-white px-2"
                onClick={() => request(player.socket_id, player.name)}
              >
                Invite
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Asking for name */}
      <Transition appear show={askName} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setAskName(true)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
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
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full transform overflow-hidden bg-[var(--menu-background-color)] p-6 text-left align-middle shadow-xl transition-all space-y-3">
                  <Dialog.Title
                    as="h3"
                    className=" text-center text-sm font-bold leading-6 text-[var(--text-grey)]"
                  >
                    SET YOUR USER NAME
                  </Dialog.Title>

                  <Dialog.Description className=" justify-center items-center flex flex-col text-center text-sm font-bold leading-6 text-[var(--text-grey)]">
                    Other players may use your name to identify you
                    <input
                      className=" w-full 450px:w-[400px] outline-none text-black px-3"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Dialog.Description>

                  <div className="W-full space-x-2 flex justify-center items-center">
                    <QuitButton
                      closeModal={() => register_user()}
                      text="Confirm"
                      color="btnYellow"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Asking waiting for user after invite */}
      <Transition appear show={onRequest} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
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
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full transform overflow-hidden bg-[var(--menu-background-color)] p-6 text-left align-middle shadow-xl transition-all space-y-3">
                  <Dialog.Title
                    as="h3"
                    className=" text-center text-sm font-bold leading-6 text-[var(--text-grey)]"
                  >
                    Waiting for {requestName}
                  </Dialog.Title>

                  <Dialog.Description className=" justify-center items-center flex flex-col text-center text-sm font-bold leading-6 text-[var(--text-grey)]">
                    Timing...
                  </Dialog.Description>

                  <div className="W-full space-x-2 flex justify-center items-center">
                    <QuitButton
                      closeModal={() => null}
                      text="Cancel"
                      color="btnYellow"
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Recieving invite*/}
      {!onRequest && (
        <Transition appear show={has_r_Request.status} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => null}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
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
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full transform overflow-hidden bg-[var(--menu-background-color)] p-6 text-left align-middle shadow-xl transition-all space-y-3">
                    <Dialog.Title
                      as="h3"
                      className=" text-center text-sm font-bold leading-6 text-[var(--text-grey)]"
                    >
                      {has_r_Request.name} wants to play with you
                    </Dialog.Title>

                    <Dialog.Description className=" justify-center items-center flex flex-col text-center text-sm font-bold leading-6 text-[var(--text-grey)]">
                      Timing...
                    </Dialog.Description>

                    <div className="W-full space-x-2 flex justify-center items-center">
                      <QuitButton
                        closeModal={() => null}
                        text="Reject"
                        color="btnRed"
                      />
                      <QuitButton
                        closeModal={() => confirm_game_play()}
                        text="Accept"
                        color="btnYellow"
                      />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </div>
  );
}
