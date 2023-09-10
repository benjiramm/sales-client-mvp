import { ESocketActions } from "@/slices/actions";
import { connected, getAllMessages, getMessage } from "@/slices/socketSlice";
import { Dispatch } from "redux";
import { Socket, io } from "socket.io-client";
import { IStoreMessage } from "./types/socket.types";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";
import dayjs from "dayjs";

interface SocketMiddlewareParams {
  dispatch: Dispatch;
}
const socketInstances: Record<string, Socket> = {};

export default function socketMiddleware(): (
  params: SocketMiddlewareParams
) => (next: Dispatch) => Dispatch {
  return (params: SocketMiddlewareParams) => (next: Dispatch) => (action) => {
    const { dispatch } = params;
    const { type, payload } = action;

    switch (type) {
      case ESocketActions.CONNECT: {
        const { url, clientName } = payload as {
          url: string;
          clientName: string;
        };
        if (!socketInstances[clientName]) {
          socketInstances[clientName] = io(url, {
            transports: ["websocket"],
            withCredentials: true,
          });
        }

        const socket = socketInstances[clientName];

        socket.on("connect", () => {
          console.log("started a new connection", new Date().toISOString());
          dispatch(connected({ clientName: clientName, id: socket.id }));
          socket.emit(ESocketActions.GET_ALL_MESSAGES);
        });

        socket.on("disconnect", () => {
          // disconnect client
          socket.off(ESocketActions.RECEIVE_MESSAGE);
          socket.off(ESocketActions.RECEIVE_ALL_MESSAGES);
          console.log("disconnect client", clientName);
        });

        socket.on(ESocketActions.RECEIVE_ALL_MESSAGES, (data) => {
          dispatch(getAllMessages({ clientName: clientName, messages: data }));
        });

        socket.on(ESocketActions.RECEIVE_MESSAGE, (message) => {
          dispatch(getMessage({ clientName: clientName, message: message }));
        });

        break;
      }

      case ESocketActions.SEND_MESSAGE: {
        const { clientName, message } = payload as {
          clientName: string;
          message: {
            content: string;
            authorId: string;
            authorName: string;
            timestamp: string;
          };
        };
        const socket = socketInstances[clientName];

        if (!socket) break;

        console.log("about to send message from ", clientName, " -> ", message);

        socket.emit(ESocketActions.SEND_MESSAGE, message);

        break;
      }

      case ESocketActions.DISCONNECT: {
        const { clientName } = payload as {
          clientName: string;
        };
        const socket = socketInstances[clientName];

        if (!socket) break;

        socket.disconnect();

        break;
      }
      default: {
        break;
      }
    }
    return next(action);
  };
}
