import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteStaff = () =>
  useMutation({
    mutationFn: (staff_id: string) => {
      return axios.delete(`${process.env.API}/staff/${staff_id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["history"] }),
        queryClient.invalidateQueries({ queryKey: ["leaderboard"] }),
        queryClient.invalidateQueries({ queryKey: ["staff"] }),
      ]);
    },
  });
