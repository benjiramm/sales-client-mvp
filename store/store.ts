import newShiftReducer from "../slices/newShiftSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    new_shift: newShiftReducer,
  },
});
