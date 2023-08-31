import { ShiftType } from "@/types/shift_type";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import styles from "../../styles/new_shift.module.css";
import dayjs, { Dayjs } from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddStaffForShift from "@/components/new_shift/AddStaffForShift";
import useGetItems from "@/hooks/useGetItems";
import useGetStaff from "@/hooks/useGetStaff";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "@/slices/newShiftSlice";
import { useRouter } from "next/router";
import Spinner from "@/components/shared/Spinner";

const NewShift = () => {
  const [shiftDate, setShiftDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [shiftType, setShiftType] = useState<ShiftType | null>(null);

  const shiftStaffState = useSelector((store: any) => store.new_shift.staff);
  const dispatch = useDispatch();

  const router = useRouter();

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

  const mutation = useMutation({
    mutationFn: (newShift: any) => {
      return axios.post(`${process.env.API}/shifts`, newShift, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      dispatch(clearState());
      router.push("/protected/history");
    },
  });

  const handleSubmit = () => {
    const newShift = {
      shift_type: shiftType,
      date: new Date(shiftDate),
      staff: shiftStaffState,
    };

    mutation.mutate(newShift);
  };

  if (!staff || !items) {
    return <Spinner />;
  }

  return (
    <>
      <main className="main-page">
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

          {shiftType && shiftStaffState.length > 0 && (
            <div
              className={`${styles.form_button} ${styles.save}`}
              onClick={() => handleSubmit()}
            >
              {" "}
              <FontAwesomeIcon icon="floppy-disk" /> שמור שינויים
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default NewShift;
