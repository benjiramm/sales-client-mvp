import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/new_shift.module.css";
import useGetStaff from "@/hooks/useGetStaff";
import { ChangeEvent, useEffect } from "react";
import { Staff } from "@/types/staff";
import { useDispatch, useSelector } from "react-redux";
import { addStaff, newStaffType } from "@/slices/newShiftSlice";
import useGetItems from "@/hooks/useGetItems";

const NewEmptyStaff = (props: { deleteFunction: Function }) => {
  const dispatch = useDispatch();
  const selectedStaff = useSelector(
    (store: any) => store.new_shift.staff
  ) as Array<newStaffType>;

  const staff = useGetStaff()?.data;
  const items = useGetItems()?.data;

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    // handle select
    dispatch(addStaff({ staff: e.target.value, items: items }));
    props.deleteFunction();
  };

  // filters out the selected staff from the dropdown menu
  console.log(selectedStaff);
  console.log(staff);

  let staffToSelect = [] as Array<Staff>;

  // TODO - clean up the filter code
  if (staff) {
    staff.map((s: Staff) => {
      // if staff isnt selected, add it to staffToSelect
      let selected = false;
      selectedStaff.forEach((sel: newStaffType) => {
        if (sel.staff_id === s._id) {
          selected = true;
        }
      });

      if (!selected) {
        staffToSelect.push(s);
      }
    });
  }

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
          {staff &&
            staffToSelect.map((s: Staff) => (
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
