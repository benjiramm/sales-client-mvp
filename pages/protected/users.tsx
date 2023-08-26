import Spinner from "@/components/shared/Spinner";
import NewUserButton from "@/components/users/NewUserButton";
import UserRow from "@/components/users/UserRow";
import { UserContext } from "@/context/userContext";
import useGetUsers from "@/hooks/useGetUsers";
import { User } from "@/types/user";
import { useContext } from "react";

const Users = () => {
  const { user } = useContext(UserContext);
  const { data, isError, isLoading } = useGetUsers();

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>Server Error</h1>;
  }
  return (
    <>
      <main className="main-page">
        <h1 className="title">מנהלים</h1>
        <div className="main-container">
          {data.data.map((u: User) => (
            <UserRow displayed_user={u} key={u._id} />
          ))}
        </div>
        {user && user.is_admin && <NewUserButton />}
      </main>
      ;
    </>
  );
};

export default Users;
