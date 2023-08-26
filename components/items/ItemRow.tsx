import { Item } from "@/types/item";
import scoreboard_styles from "../scoreboard/scoreboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import styles from "./items.module.css";
import button_styles from "../../styles/buttons.module.css";
import { useContext, useState } from "react";
import { UserContext } from "@/context/userContext";
import { useDeleteItem } from "@/mutations/items/useDeleteItem";
import { useEditItem } from "@/mutations/items/useEditItem";
import DeleteModal from "../modal/DeleteModal";

const ItemRow = (props: { item: Item }) => {
  const { item } = props;
  const { user } = useContext(UserContext);
  const deleteItem = useDeleteItem();
  const editItem = useEditItem();

  const [editMode, setEditMode] = useState(false);
  const [morningValue, setMorningValue] = useState(item.value_morning);
  const [eveningValue, setEveningValue] = useState(item.value_evening);
  const [itemName, setItemName] = useState(item.item_name);

  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteItem = () => {
    setDeleteModal(true);
  };

  const handleEditItem = () => {
    const newItemValue = {
      item_name: itemName,
      value_morning: morningValue,
      value_evening: eveningValue,
    };
    const change_item = {
      item_id: item._id,
      payload: newItemValue,
    };

    editItem.mutate(change_item);
    setEditMode(false);
  };

  const exitEditMode = () => {
    setEditMode(false);
    setMorningValue(item.value_morning);
    setEveningValue(item.value_evening);
    setItemName(item.item_name);
  };
  return (
    <>
      <div className={scoreboard_styles.row}>
        {/** Title */}
        <div className={styles.row_title}>
          <FontAwesomeIcon
            icon={item.icon as IconProp}
            className={styles.item_icon}
          />{" "}
          {editMode ? (
            <input
              type="text"
              value={itemName}
              className={styles.input}
              onChange={(e) => setItemName(e.target.value)}
            ></input>
          ) : (
            item.item_name
          )}
        </div>
        {/** Values and options */}
        <div className={styles.values_box}>
          <div className={styles.single_time_value}>
            <div className={`${styles.time_icon} ${styles.morning}`}>
              <FontAwesomeIcon icon="sun" />
            </div>
            {editMode ? (
              <input
                type="text"
                value={morningValue}
                className={`${styles.input} ${styles.value_input}`}
                onChange={(e) => setMorningValue(parseInt(e.target.value))}
              ></input>
            ) : (
              <div className={styles.value_number}>{item.value_morning}</div>
            )}
          </div>
          <div className={styles.single_time_value}>
            <div className={`${styles.time_icon} ${styles.evening}`}>
              <FontAwesomeIcon icon="moon" />
            </div>
            {editMode ? (
              <input
                type="text"
                value={eveningValue}
                className={`${styles.input} ${styles.value_input}`}
                onChange={(e) => setEveningValue(parseInt(e.target.value))}
              ></input>
            ) : (
              <div className={styles.value_number}>{item.value_evening}</div>
            )}
          </div>
          {user && user.is_admin && (
            <div className={styles.options}>
              {editMode ? (
                <>
                  <div
                    className={button_styles.approve_button}
                    onClick={() => handleEditItem()}
                  >
                    <FontAwesomeIcon icon="check" />
                  </div>
                  <div
                    className={button_styles.delete_button}
                    onClick={() => exitEditMode()}
                  >
                    <FontAwesomeIcon icon="arrow-left" />
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={button_styles.edit_button}
                    onClick={() => setEditMode(true)}
                  >
                    <FontAwesomeIcon icon="pen" />
                  </div>
                  <div
                    className={button_styles.delete_button}
                    onClick={() => handleDeleteItem()}
                  >
                    <FontAwesomeIcon icon="trash-can" />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {deleteModal && (
          <DeleteModal
            closeFunction={() => setDeleteModal(false)}
            deleteFunction={() => deleteItem.mutate(item._id)}
            target={`הפריט מכירה ״${item.item_name}״`}
          />
        )}
      </div>
    </>
  );
};

export default ItemRow;
