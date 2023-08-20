import ScoreboardLine from "./ScoreboardLine";
import styles from "./scoreboard.module.css";

export type TScoreboardLine = {
  staff_name: string;
  _id: string;
  score: number;
  sales: TScoreboardLineSale[];
};

export type TScoreboardLineSale = {
  item_name: string;
  icon: string; // font awesome reference
  total_amount: number;
  item: string; // id
};

const Scoreboard = (props: { scoreboard: TScoreboardLine[] }) => {
  return (
    <>
      {props.scoreboard.map((line) => {
        return (
          <>
            <ScoreboardLine key={line._id} line={line} />
          </>
        );
      })}
    </>
  );
};

export default Scoreboard;
