import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../shared/spinner.module.css";

const Spinner = () => {
  return (
    <>
      <div className={styles.spinner}>
        <FontAwesomeIcon icon="circle-notch" />
      </div>
    </>
  );
};

export default Spinner;
