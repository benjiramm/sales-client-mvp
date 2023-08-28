import { HTStaff } from "@/types/history";
import styles from "./history.module.css";
import { useContext, useState } from "react";
import { User, UserContext } from "@/context/userContext";
import new_shift_styles from "../../styles/new_shift.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import scoreboard_styles from "../scoreboard/scoreboard.module.css";
import HistorySale from "./HistorySale";
import { ClusterIDType } from "@/mutations/useDeleteCluster";
import {
  StaffRowIDType,
  useDeleteStaffRow,
} from "@/mutations/useDeleteStaffRow";
import DeleteModal from "../modal/DeleteModal";

const HistoryStaff = (props: {
  staff: HTStaff;
  author: string;
  cluster_id: ClusterIDType;
}) => {
  const { staff, author, cluster_id } = props;
  const user = useContext(UserContext).user as User;
  const deleteStaffRow = useDeleteStaffRow();

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState({});

  const handleDeleteStaffRow = () => {
    const staff_row_id = {
      ...props.cluster_id,
      staff: staff.staff,
    };

    setDeleteId(staff_row_id);
    setDeleteModal(true);
  };

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
          <div
            className={`${new_shift_styles.delete_button} ${styles.delete_button}`}
            onClick={() => handleDeleteStaffRow()}
          >
            <FontAwesomeIcon icon="trash-can" />
          </div>
        )}
      </div>
      {deleteModal && (
        <DeleteModal
          deleteFunction={() =>
            deleteStaffRow.mutate(deleteId as StaffRowIDType)
          }
          closeFunction={() => setDeleteModal(false)}
          target={`המכירות של ${staff.staff_name} שהתווספו ב${new Date(
            cluster_id.timestamp
          ).toLocaleTimeString("he-IS", {
            day: "numeric",
            weekday: "long",
            month: "long",
          })}`}
        />
      )}
    </>
  );
};

export default HistoryStaff;
