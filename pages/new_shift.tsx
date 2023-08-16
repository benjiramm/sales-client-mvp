import { ShiftType } from "@/types/shift_type";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import styles from "../styles/new_shift.module.css";
import dayjs, { Dayjs } from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddStaffForShift from "@/components/new_shift/AddStaffForShift";
import useGetItems from "@/hooks/useGetItems";
import useGetStaff from "@/hooks/useGetStaff";

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
    " " +
    new Date(shiftDate).toLocaleDateString("he-IS", {
      day: "numeric",
      month: "long",
    });

  //fetching the items
  const items = useGetItems()?.data;
  //fetching the staff
  const staff = useGetStaff()?.data;

  if (!(staff || items)) {
    return (
      <>
        <h1>loading</h1>
      </>
    ); //TODO - insert spinner to load
  }

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
          {/** time section */}
          <div
            className={styles.time_picker}
            data-selected={
              shiftType != null
                ? shiftType == ShiftType.morning
                  ? "morning"
                  : "evening"
                : ""
            }
          >
            <div className={styles.time_section}>
              <div
                className={`${styles.time_icon} ${styles.morning}`}
                onClick={() => setShiftType(ShiftType.morning)}
              >
                <FontAwesomeIcon icon="sun" />
              </div>

              <div>בוקר</div>
            </div>
            <div className={styles.time_section}>
              <div
                className={`${styles.time_icon} ${styles.evening}`}
                onClick={() => setShiftType(ShiftType.evening)}
              >
                <FontAwesomeIcon icon="moon" />
              </div>
              <div>ערב</div>
            </div>
          </div>

          {/** add staff to new shift */}
          <AddStaffForShift />

          <div className={`${styles.form_button} ${styles.save}`}>
            {" "}
            <FontAwesomeIcon icon="floppy-disk" /> שמור שינויים
          </div>
        </div>
      </div>
    </>
  );
};

export default NewShift;
