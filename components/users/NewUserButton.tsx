import { useState } from "react";
import button_styles from "../../styles/buttons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewUserForm from "./NewUserForm";

const NewUserButton = () => {
  const [addItem, setAddItem] = useState(false);
  return (
    <>
      {addItem ? (
        <NewUserForm deleteFunction={() => setAddItem(false)} />
      ) : (
        <div
          className={`${button_styles.form_button} ${button_styles.add}`}
          onClick={() => setAddItem(true)}
        >
          <FontAwesomeIcon icon="circle-plus" /> הוסף מנהל
        </div>
      )}
    </>
  );
};

export default NewUserButton;
