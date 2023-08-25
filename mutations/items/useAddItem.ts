import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type NewItemType = {
  item_name: string;
  value_morning: number;
  value_evening: number;
  icon: string;
};

export const useAddItem = () =>
  useMutation({
    mutationFn: (new_item: NewItemType) => {
      return axios.post(`http://localhost:3000/items`, new_item, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
