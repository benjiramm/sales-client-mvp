import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type ChangeUserType = {
  user_id: string;
  payload: {
    username: string;
    is_admin: boolean;
  };
};

export const useEditUser = () =>
  useMutation({
    mutationFn: (change_user: ChangeUserType) => {
      return axios.put(
        `http://localhost:3000/users/${change_user.user_id}`,
        change_user.payload,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
