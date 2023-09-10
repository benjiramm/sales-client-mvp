import {
  ESocketClients,
  ISocketGetAllPayload,
  ISocketGetMessagePayload,
  ISocketPayload,
  ISocketState,
} from "@/middleware/types/socket.types";
import { IMessageDay } from "@/types/chat";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: ISocketState = {
  [ESocketClients.MAIN]: {
    id: null,
    loadedInitialMessages: false,
    messages: [],
  },
};

// Create a slice for the socket state
const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connected(state, { payload }: PayloadAction<ISocketPayload>) {
      state[payload.clientName].id = payload.id;
    },
    getAllMessages(state, { payload }: PayloadAction<ISocketGetAllPayload>) {
      state[payload.clientName].messages = payload.messages;
      state[payload.clientName].loadedInitialMessages = true;
    },
    getMessage(state, { payload }: PayloadAction<ISocketGetMessagePayload>) {
      state[payload.clientName].messages.push(payload.message);
    },
  },
});

export const { connected, getMessage, getAllMessages } = socketSlice.actions;

export default socketSlice.reducer;
