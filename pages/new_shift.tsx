import { ShiftType } from "@/types/shift_type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import styles from "../styles/new_shift.module.css";
import dayjs, { Dayjs } from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewShift = () => {
  const [shiftDate, setShiftDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [shiftType, setShiftType] = useState<ShiftType | null>(null);

  // create date string
  const dateString =
    new Date(shiftDate).toLocaleDateString("he-IS", {
      weekday: "long",
    }) +
    " " +
    (shiftType !== null
      ? shiftType == ShiftType.evening
        ? "ערב"
        : "בוקר"
      : "") +
    new Date(shiftDate).toLocaleDateString("he-IS", {
      day: "numeric",
      month: "long",
    });

  //fetching the items
  const itemsQuery = useQuery({
    queryKey: ["items"],
    queryFn: () => {
      return axios.get("http://localhost:3000/items");
    },
  });
  // fetching the staff
  const staffQuery = useQuery({
    queryKey: ["staff"],
    queryFn: () => {
      return axios.get("http://localhost:3000/staff");
    },
  });

  return (
    <>
      <div className="main-page">
        <h1 className="title">הכנסת מכירות</h1>
        <div className="main-container">
          <h1 className={styles.date_title}>{dateString}</h1>
          <input
            type="date"
            value={shiftDate}
            className={styles.date_input}
            onChange={(e) =>
              setShiftDate(dayjs(e.target.value).format("YYYY-MM-DD"))
            }
          />
          <div className={styles.time_picker}>
            <div className={styles.time_section}>
              <div className={styles.time_icon}>
                <FontAwesomeIcon icon="sun" />
              </div>

              <div>בוקר</div>
            </div>
            <div className={styles.time_section}>
              <div className={styles.time_icon}>
                <FontAwesomeIcon icon="moon" />
              </div>
              <div>ערב</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewShift;
