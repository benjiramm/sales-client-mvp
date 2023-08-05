import { useState } from "react";
import styles from "../../styles/new_shift.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewEmptyStaff from "./NewEmptyStaff";

const AddStaffForShift = () => {
  const [newEmptyStaff, setNewEmptyStaff] = useState<boolean>(true);

  return (
    <div className={styles.staff_display}>
      <div className={styles.add_staff_title}>צוות</div>
      {/** staff from context */}
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
