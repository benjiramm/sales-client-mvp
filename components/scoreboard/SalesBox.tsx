import { TScoreboardLineSale } from "./Scoreboard";
import SingleSaleBox from "./SingleSaleBox";
import styles from "./scoreboard.module.css";

const SalesBox = (props: { sales: TScoreboardLineSale[] }) => {
  return (
    <div className={`${styles.sales_box} ${styles.row_item}`}>
      {props.sales.map((sale) => {
        return <SingleSaleBox sale={sale} />;
      })}
    </div>
  );
};

export default SalesBox;
