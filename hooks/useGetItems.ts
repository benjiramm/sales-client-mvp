import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetItems = () =>
  useQuery({
    queryKey: ["items"],
    queryFn: () => {
      return axios.get("http://localhost:3000/items");
    },
  }).data;

export default useGetItems;
