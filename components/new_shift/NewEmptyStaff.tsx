import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/new_shift.module.css";

const NewEmptyStaff = (props: { deleteFunction: Function }) => {
  return (
    <>
      <div className={styles.staff_row}>
        <input type="text" />
        <div
          className={`${styles.staff_row_item} ${styles.delete_button}`}
          onClick={() => props.deleteFunction()}
        >
          <FontAwesomeIcon icon="trash-can" />
        </div>
      </div>
    </>
  );
};

export default NewEmptyStaff;
