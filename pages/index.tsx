import Head from "next/head";
import { Inter } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Scoreboard, {
  TScoreboardLine,
} from "@/components/scoreboard/Scoreboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const query = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => {
      return axios.get<TScoreboardLine[]>("http://localhost:3000/leaderboard");
    },
  });

  return (
    <>
      <Head>
        <title>תחרות מכירות</title>
        {/* head values here */}
      </Head>
      <main className="main-page">
        <h1 className="title">תחרות מכירות של השבוע</h1>
        {query.isSuccess && <Scoreboard scoreboard={query.data.data} />}
      </main>
    </>
  );
}
