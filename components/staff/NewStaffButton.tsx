import { useState } from "react";
import button_styles from "../../styles/buttons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewStaffForm from "./NewStaffForm";

const NewStaffButton = () => {
  const [addItem, setAddItem] = useState(false);
  return (
    <>
      {addItem ? (
        <NewStaffForm deleteFunction={() => setAddItem(false)} />
      ) : (
        <div
          className={`${button_styles.form_button} ${button_styles.add}`}
          onClick={() => setAddItem(true)}
        >
          <FontAwesomeIcon icon="circle-plus" /> הוסף עובד
        </div>
      )}
    </>
  );
};

export default NewStaffButton;
