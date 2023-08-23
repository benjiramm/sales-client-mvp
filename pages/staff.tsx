import Spinner from "@/components/shared/Spinner";
import useGetStaff from "@/hooks/useGetStaff";

const Staff = () => {
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
        <div className="main-container"></div>
      </main>
      ;
    </>
  );
};

export default Staff;
