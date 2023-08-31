import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteUser = () =>
  useMutation({
    mutationFn: (user_id: string) => {
      return axios.delete(`${process.env.API}/users/${user_id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
