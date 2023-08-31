import { TScoreboardLine } from "@/components/scoreboard/Scoreboard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetLeaderboardPrivate = (date: string) =>
  useQuery({
    queryKey: ["leaderboard", date],
    queryFn: () => {
      return axios.get<TScoreboardLine[]>(
        `${process.env.API}/leaderboard/${date}`,
        { withCredentials: true }
      );
    },
  });

export const useGetLeaderboard = () =>
  useQuery({
    queryKey: ["leaderboard", "public"],
    queryFn: () => {
      return axios.get<TScoreboardLine[]>(`${process.env.API}/leaderboard`);
    },
  });
