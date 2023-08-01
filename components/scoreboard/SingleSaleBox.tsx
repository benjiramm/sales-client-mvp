import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TScoreboardLineSale } from "./Scoreboard";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "./scoreboard.module.css";

const SingleSaleBox = (props: { sale: TScoreboardLineSale }) => {
  return (
    <>
      <div className={styles.sale_item}>
        <FontAwesomeIcon icon={props.sale.icon as IconProp} />{" "}
        {props.sale.total_amount}
      </div>
    </>
  );
};

export default SingleSaleBox;
