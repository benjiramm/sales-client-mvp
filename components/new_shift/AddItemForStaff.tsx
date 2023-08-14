import {
  editSaleOfStaff,
  newStaffSale,
  newStaffType,
} from "@/slices/newShiftSlice";
import { Item } from "@/types/item";
import styles from "../../styles/new_sale.module.css";
import parent_styles from "../../styles/new_shift.module.css";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";

const AddItemForStaff = (props: {
  staff: newStaffType;
  item: Item;
  collapsed: boolean;
}) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);

  const payloadAdress = {
    staff_id: props.staff.staff_id,
    item_id: props.item._id,
  };

  useEffect(() => {
    dispatch(editSaleOfStaff({ ...payloadAdress, amount }));
  }, [amount]);

  const handleEditSale = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(e.target.value));
  };

  const handleAddSale = () => {
    setAmount(amount + 1);
  };

  const handleSubstractSale = () => {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  };

  return (
    <>
      {props.collapsed ? (
        <p>{amount}</p>
      ) : (
        <div className={styles.main_container}>
          <div className={styles.title}>
            <FontAwesomeIcon icon={props.item.icon as any}></FontAwesomeIcon>
            {" " + props.item.item_name}
          </div>
          <div className={styles.counter}>
            <div
              className={`${styles.counter_button} ${styles.substract}`}
              onClick={() => handleSubstractSale()}
            >
              <FontAwesomeIcon icon="minus" />
            </div>
            <input
              type="numeric"
              className={styles.input}
              value={amount}
              onChange={(e) => handleEditSale(e)}
            />
            <div
              className={`${styles.counter_button} ${styles.add}`}
              onClick={() => handleAddSale()}
            >
              <FontAwesomeIcon icon="plus" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddItemForStaff;
