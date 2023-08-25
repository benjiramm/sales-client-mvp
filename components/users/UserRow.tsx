import { Staff } from "@/types/staff";
import scoreboard_styles from "../scoreboard/scoreboard.module.css";
import button_styles from "../../styles/buttons.module.css";
import styles from "../items/items.module.css";
import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import { useDeleteStaff } from "@/mutations/staff/useDeleteStaff";
import { useEditStaff } from "@/mutations/staff/useEditStaff";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User } from "@/types/user";
import { useDeleteUser } from "@/mutations/users/useDeleteUser";
import { useEditUser } from "@/mutations/users/useEditUser";

const UserRow = (props: { displayed_user: User }) => {
  const { displayed_user } = props;
  const { user } = useContext(UserContext);

  // mutations
  const deleteUser = useDeleteUser();
  const editUser = useEditUser();

  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState(displayed_user.username);
  const [is_admin, setIs_admin] = useState(displayed_user.is_admin);

  // handler functions
  const handleDeleteUser = () => {
    deleteUser.mutate(displayed_user._id);
  };
  const handleEditUser = () => {
    const change_user = {
      user_id: displayed_user._id,
      payload: {
        username,
        is_admin,
      },
    };

    editUser.mutate(change_user);
    setEditMode(false);
  };

  const exitEditMode = () => {
    setEditMode(false);
    setUsername(displayed_user.username);
    setIs_admin(displayed_user.is_admin);
  };
  return (
    <>
      <div className={scoreboard_styles.row}>
        <div className={styles.row_title}>
          <FontAwesomeIcon icon="user-tie" />{" "}
          {editMode ? (
            <input
              type="text"
              value={username}
              className={styles.input}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          ) : (
            displayed_user.username
          )}
        </div>
        <div className={styles.values_box}>
          {editMode && (
            <>
              <div className={styles.admin_header}>הרשאות</div>
              <input
                type="checkbox"
                checked={is_admin}
                onChange={(e: any) => setIs_admin(e.target.checked)}
              />
            </>
          )}
          {((displayed_user.is_admin && !editMode) ||
            (is_admin && editMode)) && (
            <div className={styles.admin_header}>
              <FontAwesomeIcon icon="key" />
            </div>
          )}
        </div>

        {user && user.is_admin && (
          <div className={styles.options}>
            {editMode ? (
              <>
                <div
                  className={button_styles.approve_button}
                  onClick={() => handleEditUser()}
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
                  onClick={() => handleDeleteUser()}
                >
                  <FontAwesomeIcon icon="trash-can" />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UserRow;
