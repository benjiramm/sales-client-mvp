import { queryClient } from "@/pages/_app";
import { ShiftType } from "@/types/shift_type";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";

export type ShiftIDType = {
  date: string;
  shift_type: ShiftType;
};

export const useDeleteShift = () =>
  useMutation({
    mutationFn: (shift_id: ShiftIDType) => {
      return axios.delete(
        `${process.env.API}/shifts/${shift_id.date}/${shift_id.shift_type}`,
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
