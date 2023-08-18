import { HTStaff } from "@/types/history";
import styles from "./history.module.css";
import { useContext } from "react";
import { User, UserContext } from "@/context/userContext";
import new_shift_styles from "../../styles/new_shift.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import scoreboard_styles from "../scoreboard/scoreboard.module.css";
import HistorySale from "./HistorySale";

const HistoryStaff = (props: { staff: HTStaff; author: string }) => {
  const { staff, author } = props;
  const user = useContext(UserContext).user as User;

  return (
    <>
      <div className={styles.staff_row}>
        <div className={`${styles.row} ${styles.staff_score_row}`}>
          <div className={scoreboard_styles.row_item}>{staff.staff_name}</div>
          <div className={scoreboard_styles.sales_box}>
            {staff.sales.map((sale) => (
              <HistorySale sale={sale} />
            ))}
          </div>
          <div
            className={`${scoreboard_styles.row_item} ${scoreboard_styles.row_points}`}
          >
            {staff.shift_points}
          </div>
        </div>
        {user && (user.is_admin || user._id === author) && (
          <div className={new_shift_styles.delete_button}>
            <FontAwesomeIcon icon="trash-can" />
          </div>
        )}
      </div>
    </>
  );
};

export default HistoryStaff;
