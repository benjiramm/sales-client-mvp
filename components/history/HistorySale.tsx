import { HTSale } from "@/types/history";
import styles from "./history.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import scoreboard_styles from "../scoreboard/scoreboard.module.css";

const HistorySale = (props: { sale: HTSale }) => {
  const { sale } = props;
  return (
    <div className={scoreboard_styles.sale_item}>
      <FontAwesomeIcon icon={props.sale.icon as IconProp} /> {sale.amount}
    </div>
  );
};

export default HistorySale;
