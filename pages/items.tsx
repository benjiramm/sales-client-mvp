import ItemRow from "@/components/items/ItemRow";
import NewItemButton from "@/components/items/NewItemButton";
import Spinner from "@/components/shared/Spinner";
import { UserContext } from "@/context/userContext";
import useGetItems from "@/hooks/useGetItems";
import { Item } from "@/types/item";
import { use, useContext } from "react";

const Items = () => {
  const { data, isError, isLoading } = useGetItems();
  const { user } = useContext(UserContext);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>Server Error</h1>;
  }
  return (
    <>
      <main className="main-page">
        <h1 className="title">פריטי מכירה</h1>
        <div className="main-container">
          {data.data.map((item: Item) => (
            <ItemRow item={item} key={item._id} />
          ))}
        </div>
        {user && user.is_admin && <NewItemButton />}
      </main>
    </>
  );
};

export default Items;
