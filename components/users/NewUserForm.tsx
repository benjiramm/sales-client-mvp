import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../items/items.module.css";
import button_styles from "../../styles/buttons.module.css";
import { useState } from "react";
import { useAddUser } from "@/mutations/users/useAddUser";

const NewUserForm = (props: { deleteFunction: Function }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const addUser = useAddUser();

  const handleAddStaff = () => {
    const new_staff = {
      username,
      password,
    };
    addUser.mutate(new_staff);

    props.deleteFunction();
  };
  return (
    <>
      <div className={styles.form_background}>
        <div className={styles.form_header}>
          <div className={styles.new_item_title}>מנהל חדש</div>
          <div
            className={button_styles.delete_button}
            onClick={() => props.deleteFunction()}
          >
            <FontAwesomeIcon icon="xmark" />
          </div>
        </div>
        <div className={styles.form_entries}>
          <div className={styles.form_entry}>
            <div>שם משתמש:</div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </div>
          {/* password */}
          <div className={styles.form_entry}>
            <div>סיסמה:</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.form_entry}>
            <div>ווידוא סיסמא:</div>
            <input
              type="password"
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
        {username !== "" && password === verifyPassword && (
          <div
            className={`${button_styles.form_button} ${button_styles.save}`}
            onClick={() => handleAddStaff()}
          >
            <FontAwesomeIcon icon="floppy-disk" /> הוסף מנהל
          </div>
        )}
      </div>
    </>
  );
};

export default NewUserForm;
