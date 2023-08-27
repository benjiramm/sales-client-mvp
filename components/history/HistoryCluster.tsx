import { HTCluster } from "@/types/history";
import styles from "./history.module.css";
import new_shift_styles from "../../styles/new_shift.module.css";
import { useContext, useState } from "react";
import { User, UserContext } from "@/context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HistoryStaff from "./HistoryStaff";
import { ClusterIDType, useDeleteCluster } from "@/mutations/useDeleteCluster";
import { ShiftType } from "@/types/shift_type";
import { ShiftIDType } from "@/mutations/useDeleteShift";
import DeleteModal from "../modal/DeleteModal";

const HistoryCluster = (props: {
  cluster: HTCluster;
  shift_id: ShiftIDType;
}) => {
  const { username, author, timestamp, staffs } = props.cluster;
  const { date, shift_type } = props.shift_id;
  const user = useContext(UserContext).user as User;
  const deleteCluster = useDeleteCluster();

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState({});

  const clusterString =
    "התווסף ב" +
    new Date(timestamp).toLocaleTimeString("he-IS", {
      day: "numeric",
      weekday: "long",
      month: "long",
    }) +
    " על ידי " +
    username;

  const handleDeleteCluster = () => {
    const cluster_id = {
      date,
      shift_type,
      timestamp,
    };

    setDeleteId(cluster_id);
    setDeleteModal(true);
  };
  return (
    <div className={styles.cluster_container}>
      <div className={styles.shift_header}>
        <div className={styles.cluster_title}>{clusterString}</div>
        {user && (user.is_admin || user._id === author) && (
          <div
            className={`${new_shift_styles.delete_button} ${styles.cluster_delete_button}`}
            onClick={() => handleDeleteCluster()}
          >
            <FontAwesomeIcon icon="trash-can" />
          </div>
        )}
      </div>
      <div className={styles.staffs_container}>
        {staffs.map((staff) => {
          return (
            <HistoryStaff
              staff={staff}
              author={author}
              cluster_id={{ date, shift_type, timestamp }}
            />
          );
        })}
      </div>
      {deleteModal && (
        <DeleteModal
          deleteFunction={() => deleteCluster.mutate(deleteId as ClusterIDType)}
          closeFunction={() => setDeleteModal(false)}
          target={`אוסף המכירות ש${clusterString}`}
        />
      )}
    </div>
  );
};

export default HistoryCluster;
