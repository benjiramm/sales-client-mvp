import useGetHistory from "@/hooks/useGetHistory";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import new_shift_styles from "../../styles/new_shift.module.css";
import HistoryShift from "@/components/history/HistoryShift";
import { HTShift } from "@/types/history";

const ShiftHistory = () => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

  const dateString = getDateStringForHistory(date);

  const history = useGetHistory(
    dayjs(date).startOf("week").format("YYYY-MM-DD")
  );

  if (history.isError) {
    return <p>תקלה בקריאת הנתונים</p>;
  }

  if (history.isLoading) {
    return <h1>Loading...</h1>;
  }

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
        {history &&
          history.data.data.map((shift: HTShift) => (
            <HistoryShift shift={shift} key={shift.shift_type + shift.date} />
          ))}
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
