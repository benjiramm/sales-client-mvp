import newShiftReducer from "../slices/newShiftSlice";
import chatReducer from "../slices/socketSlice";
import { configureStore } from "@reduxjs/toolkit";
import socketMiddleware from "@/middleware/socket_middleware";
import socketReducer from "../slices/socketSlice";

const socket = socketMiddleware();

export const store = configureStore({
  reducer: {
    new_shift: newShiftReducer,
    socketReducer: socketReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat([socket]);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
