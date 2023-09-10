import { IStoreMessage } from "@/middleware/types/socket.types";
import styles from "../../styles/chat.module.css";
import { useContext } from "react";
import { UserContext } from "@/context/userContext";

type Props = {
  withName: boolean;
  messageData: IStoreMessage;
};

const Message: React.FC<Props> = ({ withName, messageData }) => {
  const { author_name, author_id, content, timestamp } = messageData;
  const { user } = useContext(UserContext);

  const shortTimeString = new Date(timestamp).toLocaleTimeString("he-IL", {
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <>
      <div
        className={`${styles.message} ${
          user ? (user._id === author_id ? styles.self : styles.other) : null
        }`}
      >
        {withName && <div className={styles.message_author}>{author_name}</div>}
        <div className={styles.message_content}>
          <div className={styles.message_text}>{content}</div>
          <div className={styles.message_timestamp}>{shortTimeString}</div>
        </div>
      </div>
    </>
  );
};

export default Message;
