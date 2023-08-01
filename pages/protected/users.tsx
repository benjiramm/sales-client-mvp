import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Users = () => {
  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return axios.get("http://localhost:3000/users", {
        withCredentials: true,
      });
    },
  });

  if (usersQuery.isLoading) return <p>Loading...</p>;
  if (usersQuery.isError)
    return <p>Couldn't get users, something went wrong</p>;

  return (
    <>
      {usersQuery.data?.data.map((row: any) => {
        return (
          <li>
            {row.username}, is_admin= {JSON.stringify(row.is_admin)}
          </li>
        );
      })}
    </>
  );
};

export default Users;
