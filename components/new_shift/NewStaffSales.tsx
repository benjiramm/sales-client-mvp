import { newStaffType, removeStaff } from "@/slices/newShiftSlice";
import styles from "../../styles/new_shift.module.css";
import { useDispatch } from "react-redux";
import useGetItems from "@/hooks/useGetItems";
import useGetStaff from "@/hooks/useGetStaff";
import { Staff } from "@/types/staff";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Item } from "@/types/item";
import AddItemForStaff from "./AddItemForStaff";
import { useState } from "react";
import scoreboardStyles from "../../components/scoreboard/scoreboard.module.css";
import DeleteModal from "../modal/DeleteModal";
import Spinner from "../shared/Spinner";

const NewStaffSales = (props: { staff: newStaffType }) => {
  const dispatch = useDispatch();

  const items = useGetItems();
  const staff = useGetStaff();

  const [collapsed, setCollapsed] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  if (items.isLoading || staff.isLoading) {
    return <Spinner />;
  }
  if (items.isError || staff.isError) {
    return <h1>Server Error</h1>;
  }

  const staffName = staff.data.data.map((s: Staff) => {
    if (s._id === props.staff.staff) {
      return s.staff_name;
    }
  });

  const handleDelete = () => {
    dispatch(removeStaff(props.staff.staff));
  };

  return (
    <>
      <div className={styles.staff_row}>
        <div
          className={styles.staff_row_title}
          data-selected={collapsed ? "up" : "down"}
        >
          {staffName}
          <div
            className={styles.collapser}
            onClick={() => setCollapsed(!collapsed)}
          >
            <FontAwesomeIcon icon="chevron-up" />
          </div>
        </div>
        {/* sales */}
        <div
          className={
            !collapsed
              ? styles.add_sales_grid
              : `${scoreboardStyles.sales_box} ${styles.collapsed_row_item}`
          }
        >
          {items &&
            items.data.data.map((i: Item) => (
              <AddItemForStaff
                item={i}
                staff={props.staff}
                key={i._id}
                collapsed={collapsed}
              />
            ))}
        </div>
        {/* delete button */}
        <div
          className={`${styles.delete_button} ${
            collapsed && styles.collapsed_row_item
          }`}
          onClick={() => setDeleteModal(true)}
        >
          <FontAwesomeIcon icon="trash-can" />
        </div>
      </div>
      {deleteModal && (
        <DeleteModal
          target={`המכירות של ${staffName}`}
          closeFunction={() => setDeleteModal(false)}
          deleteFunction={() => handleDelete()}
        />
      )}
    </>
  );
};

export default NewStaffSales;
