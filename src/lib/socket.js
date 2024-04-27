import io from "socket.io-client";

let socket = null
let link = null

if (process.env.NODE_ENV === "development"){
  link = 'http://localhost:3000'
}else{
  link = 'https://vrasum-tic-tac.vercel.app'
}

export const getSocket = () => {
  if (socket) return socket;

  socket = io();

  return socket;
};
