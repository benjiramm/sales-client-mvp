import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetStaff = () =>
  useQuery({
    queryKey: ["staff"],
    queryFn: () => {
      return axios.get("http://localhost:3000/staff");
    },
  }).data;
export default useGetStaff;
