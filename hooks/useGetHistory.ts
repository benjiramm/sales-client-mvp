import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetHistory = (date: string) => {
  return useQuery({
    queryKey: ["history", date],
    queryFn: () => {
      return axios.get(`http://localhost:3000/shifts/${date}`, {
        withCredentials: true,
      });
    },
  });
};
export default useGetHistory;
