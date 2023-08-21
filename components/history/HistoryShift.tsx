import { HTShift } from "@/types/history";
import styles from "./history.module.css";
import new_shift_styles from "../../styles/new_shift.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ShiftType } from "@/types/shift_type";
import cluster from "cluster";
import HistoryCluster from "./HistoryCluster";
import { useContext } from "react";
import { User, UserContext, UserContextType } from "@/context/userContext";
import { useDeleteShift } from "@/mutations/useDeleteShift";
import dayjs from "dayjs";

const HistoryShift = (props: { shift: HTShift }) => {
  const { shift } = props;
  const user = useContext(UserContext).user as User;
  const deleteShift = useDeleteShift();

  let dateTitle = new Date(shift.date).toLocaleDateString("he-IS", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  dateTitle +=
    " - " + (shift.shift_type === ShiftType.morning ? "בוקר" : "ערב");

  const handleDeleteShift = () => {
    const shift_id = {
      date: shift.date,
      shift_type: shift.shift_type,
    };

    //TODO - pop up to confirm

    deleteShift.mutate(shift_id);
  };

  return (
    <div className={styles.shift_container}>
      <div className={styles.shift_header}>
        <div className={styles.shift_title}>
          <FontAwesomeIcon
            icon={shift.shift_type === ShiftType.morning ? "sun" : "moon"}
            className={`${styles.shift_type_icon} ${
              shift.shift_type === ShiftType.morning
                ? styles.morning
                : styles.evening
            }`}
          />
          <h1>{dateTitle}</h1>
        </div>
        {user && user.is_admin && (
          <div
            className={new_shift_styles.delete_button}
            onClick={() => handleDeleteShift()}
          >
            <FontAwesomeIcon icon="trash-can" />
          </div>
        )}
      </div>
      <div>
        {shift.clusters.map((cluster) => (
          <HistoryCluster
            cluster={cluster}
            key={cluster.timestamp}
            shift_id={{ date: shift.date, shift_type: shift.shift_type }}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryShift;
