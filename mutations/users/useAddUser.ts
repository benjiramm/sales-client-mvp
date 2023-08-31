import { User } from "@/context/userContext";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type UserToAddType = {
  username: string;
  password: string;
};

export const useAddUser = () =>
  useMutation({
    mutationFn: (new_user: UserToAddType) => {
      return axios.post(`${process.env.API}/users`, new_user, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
