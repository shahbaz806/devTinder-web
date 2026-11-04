import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        senderId: senderId?._id,
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // as soon as page loaded the socket conection is made and join chat evnt is emitted
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("new message recied", ({ firstName, text }) => {
      console.log(firstName + ": " + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/6 mx-auto border border-blue-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-blue-600">Chat</h1>
      <div className="flex-1 overflow-scroll  p-5 ">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={`chat ${
                String(user?._id) === String(msg.senderId)
                  ? "chat-end"
                  : "chat-start"
              }`}
            >

              <div className="chat-header">
                {`${msg.firstName} ${msg.lastName}`}

              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-blue-600 flex gap-2 items-center">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-blue-600 text-white rounded"
        />
        <button onClick={sendMessage} className="btn btn-secondary">
          {" "}
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
