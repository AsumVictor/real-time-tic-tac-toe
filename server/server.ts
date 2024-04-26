const io = require("socket.io")(7000, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
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
});

io.on("disconnection", (socket: any) => {
  console.log("User disconnected");
});
