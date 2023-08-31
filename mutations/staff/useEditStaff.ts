import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type ChangeStaffType = {
  staff_id: string;
  payload: {
    staff_name: string;
  };
};

export const useEditStaff = () =>
  useMutation({
    mutationFn: (change_staff: ChangeStaffType) => {
      return axios.put(
        `${process.env.API}/staff/${change_staff.staff_id}`,
        change_staff.payload,
        {
          withCredentials: true,
        }
      );
    },
    onSuccess: () => {
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: ["history"] }),
        queryClient.invalidateQueries({ queryKey: ["leaderboard"] }),
        queryClient.invalidateQueries({ queryKey: ["staff"] }),
      ]);
    },
  });
