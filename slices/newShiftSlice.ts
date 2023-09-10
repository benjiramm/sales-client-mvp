import { Item } from "@/types/item";
import { createSlice } from "@reduxjs/toolkit";

export type newStaffSale = {
  item: string;
  amount: number;
};

export type newStaffType = {
  staff: string;
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
        staff: action.payload.staff,
        sales: action.payload.items.map((i: Item) => {
          return {
            item: i._id,
            amount: 0,
          };
        }),
      };
      state.staff.push(newSelected);
    },
    removeStaff(state, action) {
      state.staff = state.staff.filter((s) => {
        if (s.staff !== action.payload) {
          return s;
        }
      });
    },
    editSaleOfStaff(state, action) {
      state.staff = state.staff.map((staff) => {
        if (staff.staff === action.payload.staff_id) {
          let saleExists = false;

          for (let i = 0; i < staff.sales.length; i++) {
            if (staff.sales[i].item === action.payload.item_id) {
              staff.sales[i].amount = action.payload.amount;
              saleExists = true;
            }
          }

          if (!saleExists) {
            const newSale = {
              item: action.payload.item_id,
              amount: action.payload.amount,
            };

            staff.sales.push(newSale);
          }
        }
        return staff;
      });
    },
    clearState(state) {
      state.staff = [];
    },
  },
});

export const { addStaff, removeStaff, editSaleOfStaff, clearState } =
  newShiftSlice.actions;

export default newShiftSlice.reducer;
