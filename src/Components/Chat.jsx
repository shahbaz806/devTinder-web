import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  MessageCircle,
  Search,
  ArrowLeft,
  Code2,
  MessagesSquare,
} from "lucide-react";

import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constant";
import { addConnection } from "../utils/connectionSlice";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

const Chat = () => {
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connections);

  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [connectionsLoading, setConnectionsLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const socketRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const reduxTargetUser = connections?.find(
    (connection) => String(connection._id) === String(targetUserId)
  );

  // Fetch connections
  useEffect(() => {
    if (connections?.length > 0) return;

    let isMounted = true;

    const fetchConnections = async () => {
      try {
        setConnectionsLoading(true);

        const response = await axios.get(`${BASE_URL}/user/connection`, {
          withCredentials: true,
        });

        if (isMounted) {
          dispatch(addConnection(response?.data?.data || []));
        }
      } catch (err) {
        console.error("Connections error:", err);
      } finally {
        if (isMounted) setConnectionsLoading(false);
      }
    };

    fetchConnections();

    return () => {
      isMounted = false;
    };
  }, [dispatch, connections?.length]);

  // Find selected user
  useEffect(() => {
    if (!targetUserId) {
      setTargetUser(null);
      return;
    }

    if (reduxTargetUser) {
      setTargetUser(reduxTargetUser);
      return;
    }

    if (connectionsLoading) return;

    let isMounted = true;

    const fetchTargetUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/connection`, {
          withCredentials: true,
        });

        const list = response?.data?.data || [];

        const selectedUser = list.find(
          (connection) => String(connection._id) === String(targetUserId)
        );

        if (isMounted) setTargetUser(selectedUser || null);
      } catch (err) {
        console.error("Target user error:", err);
        if (isMounted) setTargetUser(null);
      }
    };

    fetchTargetUser();

    return () => {
      isMounted = false;
    };
  }, [targetUserId, reduxTargetUser, connectionsLoading]);

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

  // Fetch previous messages
  useEffect(() => {
    if (!targetUserId || !userId) {
      setMessages([]);
      setLoading(false);
      setError("");
      return;
    }

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
          setMessages(
            chatMessages.filter(
              (msg) =>
                msg.senderId === String(userId) ||
                msg.senderId === String(targetUserId)
            )
          );
        }
      } catch (err) {
        console.error("Chat history error:", err);

        if (isMounted) {
          setError("Unable to load messages. Please try again.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchChatMessages();

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

      const isValidMessage =
        normalizedMessage.senderId === String(userId) ||
        normalizedMessage.senderId === String(targetUserId);

      if (!isValidMessage || !normalizedMessage.text) return;

      setMessages((previous) => [...previous, normalizedMessage]);
    };

    socket.on("connect", joinRoom);
    socket.on("new message recied", handleNewMessage);

    if (socket.connected) joinRoom();

    return () => {
      socket.off("connect", joinRoom);
      socket.off("new message recied", handleNewMessage);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId]);

  // Scroll only the chat messages container
  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
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
    : "Developer";

  const filteredConnections = (connections || []).filter((person) => {
    const name = `${person.firstName || ""} ${person.lastName || ""}`;
    return name.toLowerCase().includes(search.toLowerCase());
  });

  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "D";

  const openChat = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <main className="min-h-[calc(100dvh-64px)] bg-base-100 px-2 py-2 sm:px-4 sm:py-4">
      <section className="mx-auto flex h-[calc(100dvh-80px)] min-h-[460px] max-w-7xl overflow-hidden rounded-xl border border-base-300 bg-base-100 shadow-lg shadow-base-content/[0.04]">
        {/* LEFT SIDEBAR */}
        <aside
          className={`${
            targetUserId ? "hidden md:flex" : "flex"
          } w-full shrink-0 flex-col border-r border-base-300 bg-base-100 md:w-[340px] lg:w-[380px] xl:w-[400px]`}
        >
          <div className="border-b border-base-300 px-3 py-3">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-primary">
                  <Code2 size={15} />
                  <span className="text-[11px] font-bold tracking-wide">
                    DevTinder
                  </span>
                </div>

                <h1 className="mt-1.5 font-serif text-xl font-semibold text-base-content">
                  Messages<span className="text-primary">.</span>
                </h1>
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MessageCircle size={16} />
              </div>
            </div>

            <div className="flex h-9 items-center gap-2 rounded-lg border border-base-300 bg-base-200 px-2.5">
              <Search size={14} className="shrink-0 text-base-content/40" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations..."
                className="w-full bg-transparent text-[11px] text-base-content outline-none placeholder:text-base-content/40"
              />
            </div>
          </div>

          <div className="flex items-center justify-between px-3 py-2.5">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-base-content/45">
              Your connections
            </p>

            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
              {connections?.length || 0}
            </span>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-1.5 pb-2">
            {connectionsLoading ? (
              <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-sm text-primary" />
              </div>
            ) : filteredConnections.length === 0 ? (
              <div className="px-3 py-10 text-center">
                <MessagesSquare
                  size={26}
                  className="mx-auto mb-2 text-base-content/25"
                />

                <p className="text-xs font-semibold text-base-content">
                  No conversations found
                </p>

                <p className="mt-1 text-[10px] text-base-content/45">
                  Your connections will appear here.
                </p>
              </div>
            ) : (
              filteredConnections.map((person) => {
                const name = `${person.firstName || ""} ${
                  person.lastName || ""
                }`.trim();

                const isActive = String(person._id) === String(targetUserId);

                return (
                  <button
                    key={person._id}
                    type="button"
                    onClick={() => openChat(person._id)}
                    className={`mb-1 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left transition-colors ${
                      isActive ? "bg-primary/10" : "hover:bg-base-200"
                    }`}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-base-300 bg-base-200 font-serif text-base font-semibold text-primary">
                      {person.photoUrl ? (
                        <img
                          src={person.photoUrl}
                          alt={name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        getInitial(person.firstName)
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-xs font-semibold ${
                          isActive ? "text-primary" : "text-base-content"
                        }`}
                      >
                        {name || "Developer"}
                      </p>

                      <p className="mt-0.5 truncate text-[10px] text-base-content/45">
                        Start a conversation
                      </p>
                    </div>

                    <MessageCircle
                      size={14}
                      className={
                        isActive
                          ? "shrink-0 text-primary"
                          : "shrink-0 text-base-content/25"
                      }
                    />
                  </button>
                );
              })
            )}
          </div>

          <div className="border-t border-base-300 px-3 py-2">
            <p className="text-center text-[9px] text-base-content/40">
              Connect. Code. Collaborate.
            </p>
          </div>
        </aside>

        {/* RIGHT CHAT PANEL */}
        <section
          className={`${
            targetUserId ? "flex" : "hidden md:flex"
          } min-w-0 flex-1 flex-col bg-base-100`}
        >
          {targetUserId ? (
            <>
              <div className="flex items-center gap-2 border-b border-base-300 px-3 py-2 md:hidden">
                <button
                  type="button"
                  onClick={() => navigate("/chat")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-base-content transition hover:bg-base-200"
                  aria-label="Back to conversations"
                >
                  <ArrowLeft size={18} />
                </button>

                <span className="text-xs font-semibold text-base-content/60">
                  All conversations
                </span>
              </div>

              <ChatHeader targetName={targetName} />

              <div className="min-h-0 flex-1 overflow-hidden bg-base-100">
                <ChatMessages
                  messages={messages}
                  userId={userId}
                  loading={loading}
                  error={error}
                  messagesContainerRef={messagesContainerRef}
                />
              </div>

              <div className="shrink-0 border-t border-base-300 bg-base-200">
                <ChatInput
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  sendMessage={sendMessage}
                  loading={loading}
                />
              </div>
            </>
          ) : (
            <div className="hidden flex-1 flex-col items-center justify-center px-6 text-center md:flex">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
                <MessagesSquare size={30} strokeWidth={1.5} />
              </div>

              <h2 className="font-serif text-2xl font-semibold text-base-content">
                Your conversations<span className="text-primary">.</span>
              </h2>

              <p className="mt-2 max-w-sm text-xs leading-5 text-base-content/50">
                Select a connection from the left to start chatting and sharing
                ideas.
              </p>

              <div className="mt-5 flex items-center gap-2 rounded-full border border-base-300 bg-base-200 px-3 py-2 text-[10px] text-base-content/50">
                <MessageCircle size={13} className="text-primary" />
                Choose a conversation to get started
              </div>
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default Chat;
