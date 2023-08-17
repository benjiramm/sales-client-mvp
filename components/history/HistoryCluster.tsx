import { HTCluster } from "@/types/history";
import styles from "./history.module.css";
import new_shift_styles from "../../styles/new_shift.module.css";
import { useContext } from "react";
import { User, UserContext } from "@/context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HistoryCluster = (props: { cluster: HTCluster }) => {
  const { author, timestamp, staffs } = props.cluster;
  const user = useContext(UserContext).user as User;

  const clusterString =
    "התווסף ב" +
    new Date(timestamp).toLocaleTimeString("he-IS", {
      day: "numeric",
      weekday: "long",
      month: "long",
    });
  return (
    <div className={styles.cluster_container}>
      <div className={styles.shift_header}>
        <div className={styles.cluster_title}>{clusterString}</div>
        {user && (user.is_admin || user._id === author) && (
          <div
            className={`${new_shift_styles.delete_button} ${styles.cluster_delete_button}`}
          >
            <FontAwesomeIcon icon="trash-can" />
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryCluster;
