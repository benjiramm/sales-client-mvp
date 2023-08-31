import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return axios.get(`${process.env.API}/users`, {
        withCredentials: true,
      });
    },
  });
export default useGetUsers;
