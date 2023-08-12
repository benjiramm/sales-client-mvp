import { useState } from "react";
import styles from "../../styles/new_shift.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewEmptyStaff from "./NewEmptyStaff";
import { useSelector } from "react-redux";
import { newStaffType } from "@/slices/newShiftSlice";
import NewStaffSales from "./NewStaffSales";

const AddStaffForShift = () => {
  const [newEmptyStaff, setNewEmptyStaff] = useState<boolean>(true);

  const staff: Array<newStaffType> = useSelector(
    (state: any) => state.new_shift.staff
  );

  console.log(staff);
  return (
    <div className={styles.staff_display}>
      <div className={styles.add_staff_title}>צוות</div>
      {/** staff from context */}
      {staff.map((s) => (
        <NewStaffSales /> // s is for staff, has the data inside
      ))}
      {/** empty new staff - depending on state */}
      {newEmptyStaff ? (
        <NewEmptyStaff deleteFunction={() => setNewEmptyStaff(false)} />
      ) : (
        <div
          className={styles.new_staff_button}
          onClick={() => setNewEmptyStaff(true)}
        >
          <FontAwesomeIcon icon="person-circle-plus" /> הוסף צוות
        </div>
      )}
      {/** new staff button */}
    </div>
  );
};

export default AddStaffForShift;
