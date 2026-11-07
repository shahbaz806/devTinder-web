import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";

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

  // Find chat partner from Redux
  const reduxTargetUser = connections?.find(
    (connection) => String(connection._id) === String(targetUserId)
  );

  // Normalize message structure
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
          // Only show messages from the current conversation
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
  // useEffect(() => {
  //   if (!userId || !targetUserId) return;

  //   const socket = createSocketConnection();
  //   socketRef.current = socket;

  //   socket.emit("joinChat", {
  //     firstName: user?.firstName,
  //     userId,
  //     targetUserId,
  //   });

  //   // Receive only messages belonging to this conversation
  //   // const handleNewMessage = (message) => {
  //   //   const normalizedMessage = normalizeMessage(message);

  //   //   const senderId = normalizedMessage.senderId;

  //   //   const isCurrentConversation =
  //   //     senderId === String(userId) || senderId === String(targetUserId);

  //   //   if (!isCurrentConversation || !normalizedMessage.text) {
  //   //     return;
  //   //   }

  //   //   setMessages((prevMessages) => {
  //   //     // Prevent duplicate messages
  //   //     const alreadyExists = prevMessages.some(
  //   //       (msg) =>
  //   //         msg.senderId === normalizedMessage.senderId &&
  //   //         msg.text === normalizedMessage.text
  //   //     );

  //   //     if (alreadyExists) {
  //   //       return prevMessages;
  //   //     }

  //   //     return [...prevMessages, normalizedMessage];
  //   //   });
  //   // };
  //   const handleNewMessage = (message) => {
  //     const senderId = String(
  //       message.senderId?._id || message.senderId || ""
  //     );
    
  //     console.log("CURRENT USER:", userId);
  //     console.log("OPEN CHAT:", targetUserId);
  //     console.log("MESSAGE SENDER:", senderId);
    
  //     const currentUserId = String(userId);
  //     const chatPartnerId = String(targetUserId);
    
  //     if (senderId !== currentUserId && senderId !== chatPartnerId) {
  //       console.log("MESSAGE BLOCKED");
  //       return;
  //     }
    
  //     console.log("MESSAGE ALLOWED");
  //     setMessages((prev) => [...prev, normalizeMessage(message)]);
  //   };

  //   socket.on("new message recied", handleNewMessage);

  //   return () => {
  //     socket.off("new message recied", handleNewMessage);
  //     socket.disconnect();
  //     socketRef.current = null;
  //   };
  // }, [userId, targetUserId]);

  
useEffect(() => {
  if (!userId || !targetUserId) return;

  const socket = createSocketConnection();
  socketRef.current = socket;

  const joinRoom = () => {
    console.log("Joining chat:", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

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

  // Already connected socket
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
    <div className="min-h-[calc(100vh-150px)] bg-gradient-to-br from-[#F7F5FF] via-white to-[#F0EDFF] px-3 py-6 sm:px-6">
      <div className="max-w-3xl mx-auto h-[70vh] min-h-[420px] bg-white border border-[#E9E5F5] rounded-3xl shadow-xl shadow-[#7770E8]/10 flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E9E5F5] bg-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7770E8] to-[#A69BF5] flex items-center justify-center text-white text-xl font-bold shadow-md shadow-[#7770E8]/20">
              {getInitial(targetName)}
            </div>

            <div>
              <h2 className="font-bold text-[#252943] text-base sm:text-lg">
                {targetName}
              </h2>

              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <p className="text-xs text-[#85849D]">Developer Connection</p>
              </div>
            </div>
          </div>

          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-[#7770E8]">DevTinder Chat</p>
            <p className="text-xs text-[#85849D]">
              Connect. Code. Collaborate.
            </p>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-7 py-6 bg-[#F8F7FF]">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center gap-3">
              <span className="loading loading-spinner loading-lg text-[#7770E8]"></span>
              <p className="text-sm text-[#85849D]">
                Loading your conversation...
              </p>
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-red-500 text-sm mb-3">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="text-[#7770E8] font-semibold text-sm"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-3xl bg-[#EFECFF] flex items-center justify-center mb-4 text-3xl">
                💬
              </div>

              <h3 className="text-xl font-bold text-[#252943]">
                Start a Conversation
              </h3>

              <p className="text-sm text-[#85849D] mt-2 max-w-xs leading-relaxed">
                Every great collaboration starts with a simple hello. Send your
                first message and connect!
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((msg, index) => {
                const isOwnMessage = String(userId) === String(msg.senderId);

                return (
                  <div
                    key={`${msg.senderId}-${index}`}
                    className={`flex items-end gap-2 ${
                      isOwnMessage ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isOwnMessage && (
                      <div className="w-9 h-9 shrink-0 rounded-full bg-[#EAE6FF] text-[#7770E8] flex items-center justify-center text-sm font-bold">
                        {getInitial(msg.firstName)}
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] sm:max-w-[70%] flex flex-col ${
                        isOwnMessage ? "items-end" : "items-start"
                      }`}
                    >
                      <p className="text-[11px] text-[#9995B0] mb-1 px-2">
                        {isOwnMessage
                          ? "You"
                          : `${msg.firstName} ${msg.lastName}`.trim() || "User"}
                      </p>

                      <div
                        className={`px-4 py-3 rounded-2xl text-sm leading-relaxed break-words shadow-sm ${
                          isOwnMessage
                            ? "bg-gradient-to-r from-[#7770E8] to-[#9B8AF5] text-white rounded-br-sm shadow-[#7770E8]/15"
                            : "bg-white border border-[#E9E5F5] text-[#252943] rounded-bl-sm"
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
          className="px-4 py-4 sm:px-6 sm:py-5 border-t border-[#E9E5F5] bg-white"
        >
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your message..."
              className="flex-1 min-w-0 h-12 px-5 rounded-2xl bg-[#F8F7FF] border border-[#E9E5F5] text-[#252943] placeholder:text-[#AAA6BE] outline-none transition-all focus:border-[#9185ED] focus:ring-4 focus:ring-[#9185ED]/10"
            />

            <button
              type="submit"
              disabled={!newMessage.trim() || loading}
              className="h-12 px-5 sm:px-7 rounded-2xl bg-gradient-to-r from-[#7770E8] to-[#9B8AF5] hover:from-[#6961DC] hover:to-[#8877ED] text-white font-semibold shadow-lg shadow-[#7770E8]/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span className="hidden sm:inline">Send</span>
              <span className="sm:hidden">➤</span>
            </button>
          </div>

          <p className="text-[11px] text-[#AAA6BE] mt-3 text-center">
            Connect. Code. Collaborate.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Chat;
