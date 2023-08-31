import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetStaff = () =>
  useQuery({
    queryKey: ["staff"],
    queryFn: () => {
      return axios.get(`${process.env.API}/staff`);
    },
  });
export default useGetStaff;
