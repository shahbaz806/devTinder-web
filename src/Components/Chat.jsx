
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { Send, MessageCircle, Code2 } from "lucide-react";

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

  const normalizeMessage = (msg) => {
    const sender = msg.senderId;

    return {
      senderId: String(sender?._id || sender || ""),
      firstName: msg.firstName || sender?.firstName || "",
      lastName: msg.lastName || sender?.lastName || "",
      text: msg.text || "",
    };
  };

  // Fetch chat partner details
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
        const response = await axios.get(`${BASE_URL}/user/connection`, {
          withCredentials: true,
        });

        const connectionList = response?.data?.data || [];

        const selectedUser = connectionList.find(
          (connection) => String(connection._id) === String(targetUserId)
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

        const response = await axios.get(`${BASE_URL}/chat/${targetUserId}`, {
          withCredentials: true,
        });

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

      if (!isValidMessage || !normalizedMessage.text) {
        return;
      }

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

  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "D";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-base-100 px-3 py-6 transition-colors duration-300 sm:px-6">
      <div className="mx-auto flex h-[75vh] min-h-[480px] max-w-4xl flex-col overflow-hidden rounded-3xl border border-base-300 bg-base-200 shadow-xl shadow-indigo-500/5">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-base-300 bg-base-200 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white shadow-md shadow-indigo-500/20">
              {getInitial(targetName)}
            </div>

            <div>
              <h2 className="text-base font-bold text-base-content sm:text-lg">
                {targetName}
              </h2>

              <div className="mt-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <p className="text-xs text-base-content/50">
                  Developer Connection
                </p>
              </div>
            </div>
          </div>

          <div className="hidden text-right sm:block">
            <div className="flex items-center justify-end gap-2 text-sm font-bold text-indigo-500">
              <Code2 size={17} />
              DevTinder Chat
            </div>

            <p className="text-xs text-base-content/50">
              Connect. Code. Collaborate.
            </p>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto bg-base-100 px-4 py-6 sm:px-7">

          {loading ? (
            <div className="flex h-full flex-col items-center justify-center gap-3">
              <span className="loading loading-spinner loading-lg text-indigo-500" />

              <p className="text-sm text-base-content/50">
                Loading your conversation...
              </p>
            </div>
          ) : error ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <p className="mb-3 text-sm text-error">{error}</p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="text-sm font-semibold text-indigo-500 hover:text-indigo-400"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-500/10 text-indigo-500">
                <MessageCircle size={36} />
              </div>

              <h3 className="text-xl font-bold text-base-content">
                Start a Conversation
              </h3>

              <p className="mt-2 max-w-xs text-sm leading-relaxed text-base-content/50">
                Every great collaboration starts with a simple hello. Send
                your first message and connect!
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((msg, index) => {
                const isOwnMessage =
                  String(userId) === String(msg.senderId);

                return (
                  <div
                    key={`${msg.senderId}-${index}`}
                    className={`flex items-end gap-2 ${
                      isOwnMessage ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isOwnMessage && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-sm font-bold text-indigo-500">
                        {getInitial(msg.firstName)}
                      </div>
                    )}

                    <div
                      className={`flex max-w-[80%] flex-col sm:max-w-[70%] ${
                        isOwnMessage ? "items-end" : "items-start"
                      }`}
                    >
                      <p className="mb-1 px-2 text-[11px] text-base-content/40">
                        {isOwnMessage
                          ? "You"
                          : `${msg.firstName} ${msg.lastName}`.trim() || "User"}
                      </p>

                      <div
                        className={`break-words rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                          isOwnMessage
                            ? "rounded-br-sm bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-500/10"
                            : "rounded-bl-sm border border-base-300 bg-base-200 text-base-content"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* MESSAGE INPUT */}
        <form
          onSubmit={sendMessage}
          className="border-t border-base-300 bg-base-200 px-4 py-4 sm:px-6 sm:py-5"
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your message..."
              className="h-12 min-w-0 flex-1 rounded-2xl border border-base-300 bg-base-100 px-5 text-sm text-base-content outline-none transition-all placeholder:text-base-content/35 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />

            <button
              type="submit"
              disabled={!newMessage.trim() || loading}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-40 sm:px-7"
            >
              <span className="hidden sm:inline">Send</span>
              <Send size={18} />
            </button>
          </div>

          <p className="mt-3 text-center text-[11px] text-base-content/40">
            Connect. Code. Collaborate.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Chat;
