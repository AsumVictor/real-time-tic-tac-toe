import io from "socket.io-client";

let socket = null

export const getSocket = () => {
  if (socket) return socket;

  socket = io();

  return socket;
};
