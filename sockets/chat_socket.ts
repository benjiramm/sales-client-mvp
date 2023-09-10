import { io } from "socket.io-client";

export const chat_socket = io(`${process.env.API}`, {
  transports: ["websocket"],
});
