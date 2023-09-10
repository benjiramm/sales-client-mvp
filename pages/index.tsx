import Head from "next/head";
import Scoreboard from "@/components/scoreboard/Scoreboard";
import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import dayjs from "dayjs";
import { getDateStringForHistory } from "./protected/history";
import new_shift_styles from "../styles/new_shift.module.css";
import {
  useGetLeaderboard,
  useGetLeaderboardPrivate,
} from "@/hooks/useGetLeaderboard";
import Spinner from "@/components/shared/Spinner";

export default function Home() {
  const { user } = useContext(UserContext);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));

  const dateString = getDateStringForHistory(date);

  const leaderboard = user
    ? useGetLeaderboardPrivate(dayjs(date).startOf("week").format("YYYY-MM-DD"))
    : useGetLeaderboard();

  if (leaderboard.isError) {
    return <h1>Server Error</h1>;
  }

  if (leaderboard.isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Head>
        <title>תחרות מכירות</title>
        {/* head values here */}
      </Head>
      <main className="main-page">
        <h1 className="title">תחרות מכירות של השבוע</h1>
        <div className="main-container">
          {user && (
            <>
              <h1 className={new_shift_styles.date_title}>{dateString}</h1>
              <input
                type="date"
                value={date}
                className={new_shift_styles.date_input}
                onChange={(e) =>
                  setDate(dayjs(e.target.value).format("YYYY-MM-DD"))
                }
              />
            </>
          )}
          {leaderboard.data.data.length > 0 ? (
            <Scoreboard scoreboard={leaderboard.data.data} />
          ) : (
            <p>אין מכירות לשבוע זה</p>
          )}
        </div>
      </main>
    </>
  );
}
