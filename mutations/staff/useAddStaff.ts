import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type StaffToAddType = {
  staff_name: string;
};

export const useAddStaff = () =>
  useMutation({
    mutationFn: (new_staff: StaffToAddType) => {
      return axios.post(`http://localhost:3000/staff`, new_staff, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
  });
