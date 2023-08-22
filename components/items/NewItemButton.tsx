import { useState } from "react";
import button_styles from "../../styles/buttons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NewItemForm from "./NewItemForm";

const NewItemButton = () => {
  const [addItem, setAddItem] = useState(false);
  return (
    <>
      {addItem ? (
        <NewItemForm deleteFunction={() => setAddItem(false)} />
      ) : (
        <div
          className={`${button_styles.form_button} ${button_styles.add}`}
          onClick={() => setAddItem(true)}
        >
          <FontAwesomeIcon icon="circle-plus" /> הוסף פריט
        </div>
      )}
    </>
  );
};

export default NewItemButton;
