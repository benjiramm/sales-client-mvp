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

const NewStaffSales = (props: { staff: newStaffType }) => {
  const dispatch = useDispatch();

  const items = useGetItems()?.data as Array<Item>;
  const staff = useGetStaff()?.data as Array<Staff>;

  const [collapsed, setCollapsed] = useState(false);

  const staffName = staff.map((s: Staff) => {
    if (s._id === props.staff.staff_id) {
      return s.staff_name;
    }
  });

  const handleDelete = () => {
    dispatch(removeStaff(props.staff.staff_id));
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
            items.map((i) => (
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
          onClick={() => handleDelete()}
        >
          <FontAwesomeIcon icon="trash-can" />
        </div>
      </div>
    </>
  );
};

export default NewStaffSales;
