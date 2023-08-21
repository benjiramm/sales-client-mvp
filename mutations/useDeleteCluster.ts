import { queryClient } from "@/pages/_app";
import { ShiftType } from "@/types/shift_type";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";

export type ClusterIDType = {
  date: string;
  shift_type: ShiftType;
  timestamp: string;
};

export const useDeleteCluster = () =>
  useMutation({
    mutationFn: (cluster_id: ClusterIDType) => {
      return axios.delete(
        `http://localhost:3000/shifts/${cluster_id.date}/${cluster_id.shift_type}/${cluster_id.timestamp}`,
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
