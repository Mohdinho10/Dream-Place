import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExits = onlineUser.find((user) => user?.userId === userId);
  if (!userExits) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user?.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user?.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket?.id);
  });

  socket.on("sendMessage", ({ chatId, receiverId, data }) => {
    const receiver = getUser(receiverId);
    io.to(receiver?.socketId).emit("getMessage", { chatId, data });
  });

  socket.on("readMessage", ({ chatId, userId }) => {
    const user = getUser(userId);
    io.to(user?.socketId).emit("messageRead", chatId);
  });

  socket.on("disconnect", () => {
    removeUser(socket?.id);
  });
});

io.listen("4000");
