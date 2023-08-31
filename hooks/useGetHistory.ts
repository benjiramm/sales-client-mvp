import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetHistory = (date: string) =>
  useQuery({
    queryKey: ["history", date],
    queryFn: () => {
      return axios.get(`${process.env.API}/shifts/${date}`, {
        withCredentials: true,
      });
    },
  });

export default useGetHistory;
