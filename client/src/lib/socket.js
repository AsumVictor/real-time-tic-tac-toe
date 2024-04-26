import io from "socket.io-client";

let socket = null
let link = null
if(process.env.NODE_ENV == "development") {
    link = 'http://localhost:7000'
}else{
    link = 'https://vrasum-tic-game-api.vercal.app'
}
export const getSocket = () => {
  if (socket) return socket;

  socket = io(link);

  return socket;
};
