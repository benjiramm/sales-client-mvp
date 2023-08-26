import React from "react";
import styles from "./modal.module.css";
import button_styles from "../../styles/buttons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleteModal = (props: {
  closeFunction: Function;
  deleteFunction: Function;
  target: string;
}) => {
  const { target, deleteFunction, closeFunction } = props;
  return (
    <div className={styles.modal_relative}>
      <div className={styles.modal_background}>
        <div className={styles.modal_container}>
          <div className={styles.title}>
            <div className={styles.title_name}>זהירות!</div>
            <div onClick={() => closeFunction()}>
              <FontAwesomeIcon
                className={button_styles.delete_button}
                icon="xmark"
              />
            </div>
          </div>
          <div className={styles.body}>
            את/ה עומד/ת למחוק את <div className={styles.strong}>{target}</div>
          </div>
          <div className={styles.footer}>
            <div
              className={`${button_styles.form_button} ${button_styles.back}`}
              onClick={() => closeFunction()}
            >
              <FontAwesomeIcon icon="arrow-right" /> חזור
            </div>
            <div
              className={`${button_styles.form_button} ${button_styles.delete}`}
              onClick={() => deleteFunction()}
            >
              <FontAwesomeIcon icon="trash-can" /> כן, מחק
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
