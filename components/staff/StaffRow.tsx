import { Staff } from "@/types/staff";
import scoreboard_styles from "../scoreboard/scoreboard.module.css";
import button_styles from "../../styles/buttons.module.css";
import styles from "../items/items.module.css";
import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import { useDeleteStaff } from "@/mutations/staff/useDeleteStaff";
import { useEditStaff } from "@/mutations/staff/useEditStaff";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteModal from "../modal/DeleteModal";

const StaffRow = (props: { staff: Staff }) => {
  const { staff } = props;
  const { user } = useContext(UserContext);
  const deleteStaff = useDeleteStaff();
  const editStaff = useEditStaff();

  const [editMode, setEditMode] = useState(false);
  const [staffName, setStaffName] = useState(staff.staff_name);

  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteStaff = () => {
    setDeleteModal(true);
  };
  const handleEditStaff = () => {
    const change_staff = {
      staff_id: staff._id,
      payload: { staff_name: staffName },
    };

    editStaff.mutate(change_staff);
    setEditMode(false);
  };

  const exitEditMode = () => {
    setEditMode(false);
    setStaffName(staff.staff_name);
  };
  return (
    <>
      <div className={scoreboard_styles.row}>
        <div className={styles.row_title}>
          <FontAwesomeIcon icon="circle-user" />{" "}
          {editMode ? (
            <input
              type="text"
              value={staffName}
              className={styles.input}
              onChange={(e) => setStaffName(e.target.value)}
            ></input>
          ) : (
            staff.staff_name
          )}
        </div>

        {user && user.is_admin && (
          <div className={styles.options}>
            {editMode ? (
              <>
                <div
                  className={button_styles.approve_button}
                  onClick={() => handleEditStaff()}
                >
                  <FontAwesomeIcon icon="check" />
                </div>
                <div
                  className={button_styles.delete_button}
                  onClick={() => exitEditMode()}
                >
                  <FontAwesomeIcon icon="arrow-left" />
                </div>
              </>
            ) : (
              <>
                <div
                  className={button_styles.edit_button}
                  onClick={() => setEditMode(true)}
                >
                  <FontAwesomeIcon icon="pen" />
                </div>
                <div
                  className={button_styles.delete_button}
                  onClick={() => handleDeleteStaff()}
                >
                  <FontAwesomeIcon icon="trash-can" />
                </div>
              </>
            )}
          </div>
        )}
        {deleteModal && (
          <DeleteModal
            closeFunction={() => setDeleteModal(false)}
            deleteFunction={() => deleteStaff.mutate(staff._id)}
            target={`העובד/ת ״${staff.staff_name}״`}
          />
        )}
      </div>
    </>
  );
};

export default StaffRow;
