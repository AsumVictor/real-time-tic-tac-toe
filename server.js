const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";

const port = process.env.PORT || 3000;
const { v4 } = require("uuid");
const turns = ["X", "O"];
let onlineUser = [];
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    console.log(`${socket.id} connected to server`);

    socket.on("register_user", (name) => {
      onlineUser.push({
        name: name,
        socket_id: socket.id,
      });
      socket.broadcast.emit("new-online-user", {
        name: name,
        socket_id: socket.id,
      });
    });

    socket.on("new-user", (callback) => {
      callback(onlineUser);
    });

    socket.on("request-play", (data) => {
      socket.to(data.reciever_id).emit("request-play", {
        sender_id: socket.id,
        sender_name: data.sender_name,
      });
    });

    socket.on("confirm-game", (id, callback) => {
      let game_room = v4();
      let player1_turn = turns[Math.round(Math.random() * turns.length)];
      let player2_turn = player1_turn == "X" ? "O" : "X";
      socket.to(id).emit("confirm-game", { game_room, turn: player2_turn });
      socket.join(game_room);
      callback({ game_room, turn: player1_turn });
    });

    socket.on("join-game", (game_room, callback) => {
      socket.join(game_room);
      callback();
    });

    socket.on("hover-true", (room, number) => {
      socket.to(room).emit("hover-true", number);
    });

    socket.on("hover-false", (room, number) => {
      socket.to(room).emit("hover-false", number);
    });

    socket.on('update_board', (newSquares, isXNext, room)=>{
      socket.to(room).emit("update_board", newSquares, isXNext);
    })
    
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
