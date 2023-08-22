import { useState } from "react";
import { IconPicker } from "react-fa-icon-picker";
import styles from "./items.module.css";
import button_styles from "../../styles/buttons.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAddItem } from "@/mutations/useAddItem";

const NewItemForm = (props: { deleteFunction: Function }) => {
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [valueMorning, setvalueMorning] = useState(0);
  const [valueEvening, setValueEvening] = useState(0);

  const addItem = useAddItem();

  // translates PascalCased font awesom icon into simple kebab-cased font awesome icon
  const formattedIconName = (str: string) => {
    return str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      ?.map((x) => x.toLowerCase())
      .join("-")
      .slice(3);
  };

  const handleAddItem = () => {
    const icon_string = formattedIconName(icon);
    const payload = {
      item_name: name,
      value_evening: valueEvening,
      value_morning: valueMorning,
      icon: icon_string ? icon_string : "",
    };

    addItem.mutate(payload);

    props.deleteFunction();
  };
  return (
    <div className={styles.form_background}>
      <div className={styles.form_header}>
        <div className={styles.new_item_title}>פריט חדש</div>
        <div
          className={button_styles.delete_button}
          onClick={() => props.deleteFunction()}
        >
          <FontAwesomeIcon icon="trash-can" />
        </div>
      </div>
      <div className={styles.form_entries}>
        <div className={styles.form_entry}>
          <div>שם הפריט:</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.form_entry}>
          <div>שווי נקודות משמרת בוקר:</div>
          <input
            type="numeric"
            value={valueMorning}
            onChange={(e) =>
              e.target.value === ""
                ? setvalueMorning(0)
                : setvalueMorning(parseInt(e.target.value))
            }
            className={styles.input}
          />
        </div>
        <div className={styles.form_entry}>
          <div>שווי נקודות משמרת ערב:</div>
          <input
            type="numeric"
            value={valueEvening}
            onChange={(e) =>
              e.target.value === ""
                ? setValueEvening(0)
                : setValueEvening(parseInt(e.target.value))
            }
            className={styles.input}
          />
        </div>
        <div className={styles.form_entry}>
          <div>תמונה:</div>
          <IconPicker
            value={icon}
            onChange={(v: any) => {
              setIcon(v);
            }}
          />
        </div>
        {name !== "" && valueEvening !== 0 && valueMorning !== 0 && (
          <div
            className={`${button_styles.form_button} ${button_styles.save}`}
            onClick={() => handleAddItem()}
          >
            <FontAwesomeIcon icon="floppy-disk" /> הוסף פריט
          </div>
        )}
      </div>
    </div>
  );
};

export default NewItemForm;
