import useGetHistory from "@/hooks/useGetHistory";
import dayjs from "dayjs";
import { useState } from "react";
import new_shift_styles from "../../styles/new_shift.module.css";

const ShiftHistory = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

  const dateString = getDateStringForHistory(date);

  const history = useGetHistory(date);
  return (
    <div className="main-page">
      <h1 className="title">היסטוריית מכירות</h1>
      <div className="main-container">
        <h1 className={new_shift_styles.date_title}>{dateString}</h1>
        <input
          type="date"
          value={date}
          className={new_shift_styles.date_input}
          onChange={(e) => setDate(dayjs(e.target.value).format("YYYY-MM-DD"))}
        />
        <p>{JSON.stringify(history.data?.data)}</p>
      </div>
    </div>
  );
};

const getDateStringForHistory = (date: string) => {
  return dayjs().startOf("week").isSame(dayjs(date).startOf("week"), "day")
    ? "השבוע הנוכחי"
    : `השבוע של ${new Date(
        dayjs(date).startOf("week").format()
      ).toLocaleDateString("en-GB", {
        // en-GB specified because it has format of DD/MM
        day: "numeric",
        month: "numeric",
      })} - ${new Date(dayjs(date).endOf("week").format()).toLocaleDateString(
        "en-GB",
        { day: "numeric", month: "numeric" }
      )}`;
};

export default ShiftHistory;
