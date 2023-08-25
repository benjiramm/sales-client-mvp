import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return axios.get("http://localhost:3000/users", {
        withCredentials: true,
      });
    },
  });
export default useGetUsers;
