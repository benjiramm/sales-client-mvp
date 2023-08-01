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
    <div className="main-container">
      {props.scoreboard.map((line) => {
        return (
          <>
            <ScoreboardLine key={line._id} line={line} />
          </>
        );
      })}
    </div>
  );
};

export default Scoreboard;
