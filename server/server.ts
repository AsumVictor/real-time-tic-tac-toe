const io = require("socket.io")(7000, {
  cors: {
    origin: ["http://localhost:3000", "https://vrasum-tic-game.vercal.app"],
  },
});
const { v4 } = require("uuid");
const turns = ["X", "O"];
type user = {
  name: string;
  socket_id: string;
};

let onlineUser: user[] = [];
io.on("connection", (socket: any) => {
  console.log(`${socket.id} connected to server`);

  socket.on("register_user", (name: string) => {
    onlineUser.push({
      name: name,
      socket_id: socket.id,
    });
    socket.broadcast.emit("new-online-user", {
      name: name,
      socket_id: socket.id,
    });
  });

  socket.on("new-user", (callback: any) => {
    callback(onlineUser);
  });

  socket.on("request-play", (data: any) => {
    socket.to(data.reciever_id).emit("request-play", {
      sender_id: socket.id,
      sender_name: data.sender_name,
    });
  });

  socket.on("confirm-game", (id: any, callback: any) => {
    let game_room = v4();
    let player1_turn = turns[Math.round(Math.random() * turns.length)];
    let player2_turn = player1_turn == "X" ? "O" : "X";
    socket.to(id).emit("confirm-game", {game_room, turn: player2_turn});
    socket.join(game_room)
    callback({game_room, turn: player1_turn})
  });

  socket.on('join-game', (game_room: any, callback: any) => {
    socket.join(game_room)
    callback()
  })
});

io.on("disconnection", (socket: any) => {
  console.log("User disconnected");
});
