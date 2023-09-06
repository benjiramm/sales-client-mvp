import { useEffect, useState } from "react";
import styles from "../../styles/chat.module.css";
import { io } from "socket.io-client";
import { chat_socket } from "@/sockets/chat_socket";

const Chat = () => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Array<any>>([]);
  const [isConnected, setIsConnected] = useState(chat_socket.connected);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    const onMessage = ({ data }: any) => {
      console.log("data - ", data);
      setMessages((oldMessages) => [...oldMessages, <p>{data}</p>]);
    };

    chat_socket.on("connect", onConnect);
    chat_socket.on("disconnect", onDisconnect);
    chat_socket.on("message", onMessage);

    return () => {
      chat_socket.off("connect", onConnect);
      chat_socket.off("disconnect", onDisconnect);
      chat_socket.off("message", onMessage);
    };
  }, []);

  const handleSubmitNewMessage = (e: any) => {
    e.preventDefault();
    chat_socket.emit("message", { data: text });
    setText("");
  };

  return (
    <>
      <h1>Chat</h1>
      <div className={styles.messages_container}>{messages}</div>
      <form className={styles.message_form}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={(e) => handleSubmitNewMessage(e)}>Send</button>
      </form>
    </>
  );
};

export default Chat;
