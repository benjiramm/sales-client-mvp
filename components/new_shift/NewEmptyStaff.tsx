import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/new_shift.module.css";
import useGetStaff from "@/hooks/useGetStaff";
import { ChangeEvent } from "react";
import { Staff } from "@/types/staff";
import { useDispatch } from "react-redux";
import { addToSelected } from "@/slices/newShiftSlice";

const NewEmptyStaff = (props: { deleteFunction: Function }) => {
  const dispatch = useDispatch();

  const staff = useGetStaff()?.data;

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    // handle select
    dispatch(addToSelected(e.target.value));
    props.deleteFunction();
  };
  return (
    <>
      <div className={styles.staff_row}>
        <select
          onChange={(e) => handleSelect(e)}
          className={styles.staff_picker}
        >
          <option disabled selected>
            -- בחר צוות --
          </option>
          {staff.map((s: Staff) => (
            <option key={s._id} value={s._id}>
              {s.staff_name}
            </option>
          ))}
        </select>
        {/** TODO - Filter out staff that's already selected */}
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
