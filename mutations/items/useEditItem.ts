import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type ChangeItemType = {
  item_id: string;
  payload: {
    item_name: string;
    value_morning: number;
    value_evening: number;
  };
};

export const useEditItem = () =>
  useMutation({
    mutationFn: (change_item: ChangeItemType) => {
      return axios.put(
        `${process.env.API}/items/${change_item.item_id}`,
        change_item.payload,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["history"] }),
        queryClient.invalidateQueries({ queryKey: ["leaderboard"] }),
        queryClient.invalidateQueries({ queryKey: ["items"] }),
      ]);
    },
  });
