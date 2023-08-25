import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteItem = () =>
  useMutation({
    mutationFn: (item_id: string) => {
      return axios.delete(`http://localhost:3000/items/${item_id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["history"] }),
        queryClient.invalidateQueries({ queryKey: ["leaderboard"] }),
        queryClient.invalidateQueries({ queryKey: ["items"] }),
      ]);
    },
  });
