import Spinner from "@/components/shared/Spinner";
import NewStaffButton from "@/components/staff/NewStaffButton";
import StaffRow from "@/components/staff/StaffRow";
import { UserContext } from "@/context/userContext";
import useGetStaff from "@/hooks/useGetStaff";
import { Staff } from "@/types/staff";
import { useContext } from "react";

const Staff = () => {
  const { user } = useContext(UserContext);
  const { data, isError, isLoading } = useGetStaff();

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>Server Error</h1>;
  }
  return (
    <>
      <main className="main-page">
        <h1 className="title">עובדים</h1>
        <div className="main-container">
          {data.data.map((staff: Staff) => (
            <StaffRow staff={staff} key={staff._id} />
          ))}
        </div>
        {user && user.is_admin && <NewStaffButton />}
      </main>
    </>
  );
};

export default Staff;
