/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import "./Chat.scss";
import { useUser } from "../context/UserContext";
// import { useGetChat } from "../hooks/useGetChat";
// import Loader from "./Loader";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import { useSocket } from "../context/SocketContext";
import { useNotificationStore } from "../utils/notificationStore";
import axios from "axios";
import { BASE_URL } from "../config";

function Chat({ chats }) {
  const [{ id } = {}] = chats ?? [{}];
  const [chat, setChat] = useState(null);

  const { user } = useUser();
  const { socket } = useSocket();

  const messageEndRef = useRef();

  const decrease = useNotificationStore((state) => state.decrease);

  const chatHandler = async (receiver) => {
    try {
      const res = await axios.get(`${BASE_URL}/chats/${id}`, {
        withCredentials: true,
      });
      if (!res.data.seenBy.includes(user?.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) {
      toast.error("Please send a message!");
      return;
    }

    try {
      const res = await axios.post(
        `${BASE_URL}/chats/message/${id}`,
        { text },
        {
          withCredentials: true,
        }
      );
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
      // window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        const response = await axios.put(`${BASE_URL}/chats/read/${chat.id}`, {
          withCredentials: true,
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((chat) => (
          <div
            className="message"
            onClick={() => {
              chatHandler(chat.receiver);
            }}
            key={chat.id}
            style={{
              backgroundColor: chat.seenBy.includes(user.id)
                ? "white"
                : "#fecd514e",
            }}
          >
            <img src={chat.receiver.avatar || "avatar.png"} alt="" />
            <span>{chat.receiver.username}</span>
            <p>{chat.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar || "avatar.png"} alt="" />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat?.messages?.map((message) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf:
                    message?.userId === user?.id ? "flex-end" : "flex-start",
                  textAlign: message?.userId === user?.id ? "right" : "left",
                }}
                key={message?.id}
              >
                <p>{message?.text}</p>
                <span>{format(message?.createdAt)}</span>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={submitHandler} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
