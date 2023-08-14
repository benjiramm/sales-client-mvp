import { Item } from "@/types/item";
import { createSlice } from "@reduxjs/toolkit";
import { type } from "os";

export type newStaffSale = {
  item_id: string;
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
    addStaff(state, action) {
      const newSelected = {
        staff_id: action.payload.staff,
        sales: action.payload.items.map((i: Item) => {
          return {
            item_id: i._id,
            amount: 0,
          };
        }),
      };
      state.staff.push(newSelected);
    },
    removeStaff(state, action) {
      state.staff = state.staff.filter((s) => {
        if (s.staff_id !== action.payload) {
          return s;
        }
      });
    },
    editSaleOfStaff(state, action) {
      state.staff = state.staff.map((staff) => {
        if (staff.staff_id === action.payload.staff_id) {
          const newSale = {
            item_id: action.payload.item_id,
            amount: action.payload.amount,
          };

          staff.sales.push(newSale);
        }
        return staff;
      });
    },
  },
});

export const { addStaff, removeStaff, editSaleOfStaff } = newShiftSlice.actions;

export default newShiftSlice.reducer;
