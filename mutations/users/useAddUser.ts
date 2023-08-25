import { User } from "@/context/userContext";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type UserToAddType = {
  username: string;
  is_admin: boolean;
};

export const useAddUser = () =>
  useMutation({
    mutationFn: (new_user: User) => {
      return axios.post(`http://localhost:3000/users`, new_user, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
