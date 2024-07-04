const express = require("express");
const app = express();
const PORT = 4000;
const http = require("http").createServer(app);
const cors = require("cors");

app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});
const points = new Map();
//Add this before the app.get() block
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`, socket.handshake.auth);
  points.set(socket.id, {
    username: socket.handshake.auth.username,
    color: socket.handshake.auth.color,
    x: socket.handshake.auth.x,
    y: socket.handshake.auth.y,
    radius: socket.handshake.auth.radius,
  });
  socket.on("draw", (msg) => {
    //console.log("🚀: draw -> msg", msg);
    console.log("🚀: draw->planet", points.get(socket.id));
    points.get(socket.id).x = msg.x;
    points.get(socket.id).y = msg.y;
    //console.log(`🚀:`, points);

    socketIO.emit("draw", JSON.stringify(Array.from(points)));
  });
  socket.on("disconnect", () => {
    points.delete(socket.id);
    console.log("points size:  ", points.size);
    socketIO.emit("draw", JSON.stringify(Array.from(points)));
    console.log("🔥: A user disconnected");
  });
});
app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
