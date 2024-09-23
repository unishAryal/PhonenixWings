"use client";

import styles from "./chat.module.css";
import { useState } from "react";

const baseUrl = "http://localhost:3001";

const ChatFeature = () => {
  const [messages, setMessages] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);

  const chatMessageHandler = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("message", messages);
    if (file) {
      formData.append("file", file);
    }

    const sendContentToServer = await fetch(baseUrl + "/send-message", {
      method: "POST",
      body: formData,
    });

    if (sendContentToServer.ok) {
      // Handle success
      setMessages(""); 
    } else {
      // Handle error
      console.error("Failed to send message");
    }
  };

  return (
    <div className={styles.Box}>
      <form onSubmit={chatMessageHandler}>
        <div className={styles.innerBox}>
          <div className={styles.chatFilterBox} id={styles.chatFilterBox}>
            {" "}
            filterbox{" "}
          </div>
          <div className={styles.chatBox} id={styles.chatBox}>
            <div className={styles.messageBox}> Messages to be appeared</div>
            <div className={styles.inputBox}>
            <input
                id="file-upload"
                type="file"
                onChange={(e) => {
                  if (e.target && e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              <input
                type="text"
                id={styles.userMessage}
                value={messages}
                placeholder="Type your message"
                onChange={(e) => setMessages(e.target.value)}
              />

              <div className={styles.sendButton}>
                <button type="submit">S</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};



export default ChatFeature;
