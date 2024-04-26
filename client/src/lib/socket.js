import io from "socket.io-client";

let socket = null

export const getSocket = () => {
  // If socket is already initialized, return it
  if (socket) return socket;

  // Initialize the socket and return it
  socket = io("http://localhost:7000");

  return socket;
};
