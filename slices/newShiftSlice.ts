import { createSlice } from "@reduxjs/toolkit";
import { type } from "os";

export type newStaffSale = {
  item_id: number;
  amount: number;
};

export type newStaffType = {
  staff_id: string;
  sales: Array<newStaffSale>;
};

const initialState = {
  staff: [] as Array<newStaffType>,
};

export const newShiftSlice = createSlice({
  name: "new_shift",
  initialState: initialState,
  reducers: {
    addToSelected(state, action) {
      const newSelected = {
        staff_id: action.payload,
        sales: [],
      };
      state.staff.push(newSelected);
    },
  },
});

export const { addToSelected } = newShiftSlice.actions;

export default newShiftSlice.reducer;
