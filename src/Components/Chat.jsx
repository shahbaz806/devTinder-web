import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constant";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const Chat = () => {
  const { targetUserId } = useParams();

  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connections);

  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);

  const [targetUserLoading, setTargetUserLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const reduxTargetUser = connections?.find(
    (connection) => String(connection._id) === String(targetUserId)
  );

  // Normalize message data
  const normalizeMessage = (msg) => {
    const sender = msg.senderId;

    return {
      senderId: String(sender?._id || sender || ""),
      firstName: msg.firstName || sender?.firstName || "",
      lastName: msg.lastName || sender?.lastName || "",
      text: msg.text || "",
    };
  };

  // Fetch target user details
  useEffect(() => {
    let isMounted = true;

    const fetchTargetUser = async () => {
      setTargetUserLoading(true);

      if (reduxTargetUser) {
        setTargetUser(reduxTargetUser);
        setTargetUserLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${BASE_URL}/user/connection`,
          { withCredentials: true }
        );

        const connectionList = response?.data?.data || [];

        const selectedUser = connectionList.find(
          (connection) =>
            String(connection._id) === String(targetUserId)
        );

        if (isMounted) {
          setTargetUser(selectedUser || null);
        }
      } catch (err) {
        console.error("Target user error:", err);

        if (isMounted) {
          setTargetUser(null);
        }
      } finally {
        if (isMounted) {
          setTargetUserLoading(false);
        }
      }
    };

    if (targetUserId) {
      fetchTargetUser();
    }

    return () => {
      isMounted = false;
    };
  }, [targetUserId, reduxTargetUser]);

  // Fetch previous messages
  useEffect(() => {
    let isMounted = true;

    const fetchChatMessages = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${BASE_URL}/chat/${targetUserId}`,
          { withCredentials: true }
        );

        const chatMessages =
          response?.data?.messages?.map(normalizeMessage) || [];

        if (isMounted) {
          const filteredMessages = chatMessages.filter(
            (msg) =>
              msg.senderId === String(userId) ||
              msg.senderId === String(targetUserId)
          );

          setMessages(filteredMessages);
        }
      } catch (err) {
        console.error("Chat history error:", err);

        if (isMounted) {
          setError("Unable to load messages. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (targetUserId && userId) {
      fetchChatMessages();
    }

    return () => {
      isMounted = false;
    };
  }, [targetUserId, userId]);

  // Socket connection
  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    const joinRoom = () => {
      socket.emit("joinChat", {
        firstName: user?.firstName,
        userId,
        targetUserId,
      });
    };

    const handleNewMessage = (message) => {
      const normalizedMessage = normalizeMessage(message);
      const senderId = normalizedMessage.senderId;

      const isValidMessage =
        senderId === String(userId) ||
        senderId === String(targetUserId);

      if (!isValidMessage || !normalizedMessage.text) return;

      setMessages((prevMessages) => [
        ...prevMessages,
        normalizedMessage,
      ]);
    };

    socket.on("connect", joinRoom);
    socket.on("new message recied", handleNewMessage);

    if (socket.connected) {
      joinRoom();
    }

    return () => {
      socket.off("connect", joinRoom);
      socket.off("new message recied", handleNewMessage);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Send message
  const sendMessage = (e) => {
    e.preventDefault();

    const text = newMessage.trim();

    if (!text || !socketRef.current || !userId || !targetUserId) {
      return;
    }

    socketRef.current.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text,
    });

    setNewMessage("");
  };

  const targetName = targetUser
    ? `${targetUser.firstName || ""} ${targetUser.lastName || ""}`.trim()
    : targetUserLoading
    ? "Loading..."
    : "User";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-base-100 px-3 py-6 transition-colors duration-300 sm:px-6">
      <div className="mx-auto flex h-[75vh] min-h-[480px] max-w-4xl flex-col overflow-hidden rounded-3xl border border-base-300 bg-base-200 shadow-xl shadow-indigo-500/5">

        <ChatHeader targetName={targetName} />

        <ChatMessages
          messages={messages}
          userId={userId}
          targetUserLoading={targetUserLoading}
          loading={loading}
          error={error}
          messagesEndRef={messagesEndRef}
        />

        <ChatInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
          loading={loading}
        />

      </div>
    </div>
  );
};

export default Chat;