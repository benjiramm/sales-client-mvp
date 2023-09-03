import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../items/items.module.css";
import button_styles from "../../styles/buttons.module.css";
import { useState } from "react";
import { useAddStaff } from "@/mutations/staff/useAddStaff";

const NewStaffForm = (props: { deleteFunction: Function }) => {
  const [staffName, setStaffName] = useState("");
  const addStaff = useAddStaff();

  const handleAddStaff = () => {
    addStaff.mutate({ staff_name: staffName });

    props.deleteFunction();
  };
  return (
    <>
      <div className={styles.form_background}>
        <div className={styles.form_header}>
          <div className={styles.new_item_title}>עובד חדש</div>
          <div
            className={button_styles.delete_button}
            onClick={() => props.deleteFunction()}
          >
            <FontAwesomeIcon icon="xmark" />
          </div>
        </div>
        <div className={styles.form_entries}>
          <div className={styles.form_entry}>
            <div>שם הפריט:</div>
            <input
              type="text"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
        {staffName !== "" && (
          <div
            className={`${button_styles.form_button} ${button_styles.save}`}
            onClick={() => handleAddStaff()}
          >
            <FontAwesomeIcon icon="floppy-disk" /> הוסף עובד
          </div>
        )}
      </div>
    </>
  );
};

export default NewStaffForm;
