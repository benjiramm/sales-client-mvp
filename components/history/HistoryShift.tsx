import { HTShift } from "@/types/history";
import styles from "./history.module.css";
import new_shift_styles from "../../styles/new_shift.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShiftType } from "@/types/shift_type";
import cluster from "cluster";
import HistoryCluster from "./HistoryCluster";
import { useContext } from "react";
import { User, UserContext, UserContextType } from "@/context/userContext";

const HistoryShift = (props: { shift: HTShift }) => {
  const { shift } = props;
  const user = useContext(UserContext).user as User;

  let dateTitle = new Date(shift._id.date).toLocaleDateString("he-IS", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  dateTitle +=
    " - " + (shift._id.shift_type === ShiftType.morning ? "בוקר" : "ערב");
  return (
    <div className={styles.shift_container}>
      <div className={styles.shift_header}>
        <div className={styles.shift_title}>
          <FontAwesomeIcon
            icon={shift._id.shift_type === ShiftType.morning ? "sun" : "moon"}
            className={`${styles.shift_type_icon} ${
              shift._id.shift_type === ShiftType.morning
                ? styles.morning
                : styles.evening
            }`}
          />
          <h1>{dateTitle}</h1>
        </div>
        {user && user.is_admin && (
          <div className={new_shift_styles.delete_button}>
            <FontAwesomeIcon icon="trash-can" />
          </div>
        )}
      </div>
      <div>
        {shift.clusters.map((cluster) => (
          <HistoryCluster cluster={cluster} key={cluster.timestamp} />
        ))}
      </div>
    </div>
  );
};

export default HistoryShift;
