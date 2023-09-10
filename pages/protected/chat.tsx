import {
  MutableRefObject,
  Ref,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "../../styles/chat.module.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ESocketClients } from "@/middleware/types/socket.types";
import { ESocketActions } from "@/slices/actions";
import { UserContext } from "@/context/userContext";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Message from "@/components/chat/Message";

const Chat = () => {
  const [text, setText] = useState("");
  const socketSlice = useAppSelector((store) => store.socketReducer);
  const dispatch = useAppDispatch();
  const mainSocket = socketSlice[ESocketClients.MAIN];
  const { messages, loadedInitialMessages, id } = mainSocket;
  const { user } = useContext(UserContext);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollDown = () => {
    messagesEndRef.current?.scrollIntoView(true);
  };
  useEffect(() => {
    scrollDown();
  }, [loadedInitialMessages]);

  const handleSubmitNewMessage = (e: any) => {
    e.preventDefault();

    scrollDown();
    if (!user) return;

    const message = {
      content: text,
      author_id: user._id,
      author_name: user.username,
      timestamp: new Date().toISOString(),
    };

    dispatch({
      type: ESocketActions.SEND_MESSAGE,
      payload: { clientName: ESocketClients.MAIN, message: message },
    });
    setText("");
  };

  const dayDisplayOptions: object = {
    weekday: "long",
    day: "numeric",
    month: "numeric",
  };

  const sameDay = (d1: string, d2: string) => {
    const date1 = new Date(d1);
    const date2 = new Date(d2);
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  return (
    <>
      <main className="main-page">
        <h1 className="title">צ׳אט מנהלים</h1>
        <div className={styles.messages_container}>
          {/* organize messages with dates */}
          {id &&
            messages.map((message, index) => {
              let withName = true;
              let showDate = true;
              // check if im the same day as the message before otherwise, im the first in that day
              if (
                index > 0 &&
                sameDay(messages[index - 1].timestamp, message.timestamp)
              ) {
                showDate = false;

                if (messages[index - 1].author_id === message.author_id) {
                  withName = false;
                }
              }
              // return element
              return (
                <div className={styles.message_module} key={message._id}>
                  {showDate && (
                    <p className={styles.date_label}>
                      {new Date(message.timestamp).toLocaleDateString(
                        "he-IL",
                        dayDisplayOptions
                      )}
                    </p>
                  )}
                  <Message withName={withName} messageData={message} />
                </div>
              );
            })}
          <div ref={messagesEndRef} className={styles.anchor} />
        </div>
        <div className={styles.form_home}>
          <form className={styles.message_form}>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={(e) => handleSubmitNewMessage(e)}>
              <FontAwesomeIcon icon="paper-plane" />
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Chat;
