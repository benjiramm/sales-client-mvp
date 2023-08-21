import { queryClient } from "@/pages/_app";
import { ShiftType } from "@/types/shift_type";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";

export type StaffRowIDType = {
  date: string;
  shift_type: ShiftType;
  timestamp: string;
  staff: string;
};

export const useDeleteStaffRow = () =>
  useMutation({
    mutationFn: (staff_row_id: StaffRowIDType) => {
      return axios.delete(
        `http://localhost:3000/shifts/${staff_row_id.date}/${staff_row_id.shift_type}/${staff_row_id.timestamp}/${staff_row_id.staff}`,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: (variable) => {
      const date = dayjs(variable.data.date)
        .startOf("week")
        .format("YYYY-MM-DD");
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["history", date] }),
        queryClient.invalidateQueries({ queryKey: ["leaderboard", date] }),
      ]);
    },
  });
