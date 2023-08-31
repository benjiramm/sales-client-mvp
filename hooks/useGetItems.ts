import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetItems = () =>
  useQuery({
    queryKey: ["items"],
    queryFn: () => {
      return axios.get(`${process.env.API}/items`);
    },
  });

export default useGetItems;
