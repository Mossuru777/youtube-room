import express from "express";
import http from "http";
import socketIO from "socket.io";
import { RoomEvent } from "../../common/RoomEvent";

const app = express();
const server = new http.Server(app);
const io = socketIO.listen(server);

/* express */


/* socket.io */
const keycodeRegExp = /^\d{4}$/;
io.sockets.on("connection", (socket) => {
  socket.on(RoomEvent.JoinRoom, (keycode: string) => {
    if (!keycodeRegExp.test(keycode)) {
      socket.emit(RoomEvent.Error, "invalid keycode.");
      return;
    }
    socket.join(keycode, (err) => {
      if (err === null) {
        socket.emit(RoomEvent.Error, err);
      } else {
        socket.emit(RoomEvent.JoinedRoom, keycode);
      }
    });
  });

  socket.on("disconnect", () => {
    socket.leaveAll();
  });
});

/* listen start */
server.listen(process.env.PORT || 8080);
