import SalesBox from "./SalesBox";
import styles from "./scoreboard.module.css";
import { TScoreboardLine } from "./Scoreboard";

const ScoreboardLine = (props: { line: TScoreboardLine }) => {
  return (
    <div className={styles.row}>
      <div className={styles.row_item}>{props.line.staff_name}</div>
      <SalesBox sales={props.line.sales} />
      <div className={`${styles.row_points} ${styles.row_item}`}>
        {props.line.score}
      </div>
    </div>
  );
};

export default ScoreboardLine;
