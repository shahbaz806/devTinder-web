// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
// import { useSelector } from "react-redux";
// import { BASE_URL } from "../utils/constant";
// import axios from "axios";

// const Chat = () => {
//   const { targetUserId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const user = useSelector((store) => store.user);
//   const userId = user?._id;

//   const fetchChatMessages = async () => {
//     const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
//       withCredentials: true,
//     });

//     console.log(chat.data.messages);

//     const chatMessages = chat?.data?.messages.map((msg) => {
//       const { senderId, text } = msg;
//       return {
//         senderId: senderId?._id,
//         firstName: senderId?.firstName,
//         lastName: senderId?.lastName,
//         text,
//       };
//     });
//     setMessages(chatMessages);
//   };

//   useEffect(() => {
//     fetchChatMessages();
//   }, []);

//   useEffect(() => {
//     if (!userId) {
//       return;
//     }
//     const socket = createSocketConnection();
//     // as soon as page loaded the socket conection is made and join chat evnt is emitted
//     socket.emit("joinChat", {
//       firstName: user.firstName,
//       userId,
//       targetUserId,
//     });

//     socket.on("new message recied", ({ firstName, text }) => {
//       console.log(firstName + ": " + text);
//       setMessages((messages) => [...messages, { firstName, text }]);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId, targetUserId]);

//   const sendMessage = () => {
//     const socket = createSocketConnection();
//     socket.emit("sendMessage", {
//       firstName: user.firstName,
//       userId,
//       targetUserId,
//       text: newMessage,
//     });
//     setNewMessage("");
//   };

//   return (
//     <div className="w-3/6 mx-auto border border-blue-600 m-5 h-[70vh] flex flex-col">
//       <h1 className="p-5 border-b border-blue-600">Chat</h1>
//       <div className="flex-1 overflow-scroll  p-5 ">
//         {messages.map((msg, index) => {
//           return (
//             <div
//               key={index}
//               className={`chat ${
//                 String(user?._id) === String(msg.senderId)
//                   ? "chat-end"
//                   : "chat-start"
//               }`}
//             >

//               <div className="chat-header">
//                 {`${msg.firstName} ${msg.lastName}`}

//               </div>
//               <div className="chat-bubble">{msg.text}</div>
//               <div className="chat-footer opacity-50">seen</div>
//             </div>
//           );
//         })}
//       </div>
//       <div className="p-5 border-t border-blue-600 flex gap-2 items-center">
//         <input
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="flex-1 border border-blue-600 text-white rounded"
//         />
//         <button onClick={sendMessage} className="btn btn-secondary">
//           {" "}
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;



// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
// import { useSelector } from "react-redux";
// import { BASE_URL } from "../utils/constant";
// import axios from "axios";

// const Chat = () => {
//   const { targetUserId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const user = useSelector((store) => store.user);
//   const userId = user?._id;

//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   // Fetch chat history
//   useEffect(() => {
//     const fetchChatMessages = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const chat = await axios.get(
//           BASE_URL + "/chat/" + targetUserId,
//           { withCredentials: true }
//         );

//         const chatMessages = chat?.data?.messages?.map((msg) => {
//           const { senderId, text } = msg;

//           return {
//             senderId: senderId?._id,
//             firstName: senderId?.firstName,
//             lastName: senderId?.lastName,
//             text,
//           };
//         }) || [];

//         setMessages(chatMessages);
//       } catch (err) {
//         console.error("Chat fetch error:", err);
//         setError("Unable to load messages. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (targetUserId) {
//       fetchChatMessages();
//     }
//   }, [targetUserId]);

//   // Socket connection
//   useEffect(() => {
//     if (!userId) return;

//     const socket = createSocketConnection();
//     socketRef.current = socket;

//     socket.emit("joinChat", {
//       firstName: user.firstName,
//       userId,
//       targetUserId,
//     });

//     const handleNewMessage = (message) => {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           senderId: message.senderId,
//           firstName: message.firstName,
//           lastName: message.lastName,
//           text: message.text,
//         },
//       ]);
//     };

//     socket.on("new message recied", handleNewMessage);

//     return () => {
//       socket.off("new message recied", handleNewMessage);
//       socket.disconnect();
//       socketRef.current = null;
//     };
//   }, [userId, targetUserId]);

//   // Auto scroll to latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages]);

//   // Send message
//   const sendMessage = (e) => {
//     e.preventDefault();

//     const text = newMessage.trim();

//     if (!text || !socketRef.current || !userId) return;

//     socketRef.current.emit("sendMessage", {
//       firstName: user.firstName,
//       userId,
//       targetUserId,
//       text,
//     });

//     setNewMessage("");
//   };

//   const targetUser = messages.find(
//     (msg) => String(msg.senderId) !== String(userId)
//   );

//   const targetName = targetUser
//     ? `${targetUser.firstName || ""} ${targetUser.lastName || ""}`.trim()
//     : "Developer";

//   return (
//     <div className="min-h-[calc(100vh-150px)] bg-gradient-to-br from-slate-50 via-white to-blue-50 px-3 py-6 sm:px-6">

//       <div className="max-w-4xl mx-auto h-[75vh] min-h-[480px] bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-900/5 flex flex-col overflow-hidden">

//         {/* Chat Header */}
//         <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white">

//           <div className="flex items-center gap-3">

//             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-blue-500/20">
//               {targetName.charAt(0).toUpperCase()}
//             </div>

//             <div>
//               <h2 className="font-bold text-slate-800 text-base sm:text-lg">
//                 {targetName}
//               </h2>

//               <div className="flex items-center gap-2 mt-1">
//                 <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
//                 <p className="text-xs text-slate-500">
//                   Developer Connection
//                 </p>
//               </div>
//             </div>

//           </div>

//           <div className="hidden sm:block text-right">
//             <p className="text-xs font-semibold text-blue-600">
//               DevTinder Chat
//             </p>
//             <p className="text-xs text-slate-400">
//               Connect. Code. Collaborate.
//             </p>
//           </div>

//         </div>

//         {/* Messages Area */}
//         <div className="flex-1 overflow-y-auto px-4 sm:px-7 py-6 bg-gradient-to-b from-slate-50/70 to-white">

//           {loading ? (
//             <div className="h-full flex flex-col items-center justify-center gap-3">
//               <span className="loading loading-spinner loading-lg text-blue-600"></span>
//               <p className="text-sm text-slate-500">
//                 Loading your conversation...
//               </p>
//             </div>
//           ) : error ? (
//             <div className="h-full flex items-center justify-center">
//               <div className="text-center">
//                 <p className="text-red-500 text-sm mb-3">{error}</p>
//                 <button
//                   onClick={() => window.location.reload()}
//                   className="text-blue-600 font-semibold text-sm"
//                 >
//                   Try Again
//                 </button>
//               </div>
//             </div>
//           ) : messages.length === 0 ? (
//             <div className="h-full flex flex-col items-center justify-center text-center">

//               <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
//                 <span className="text-3xl">💬</span>
//               </div>

//               <h3 className="text-lg font-bold text-slate-800">
//                 Start a Conversation
//               </h3>

//               <p className="text-sm text-slate-500 mt-2 max-w-xs">
//                 Every great collaboration starts with a simple hello.
//               </p>

//             </div>
//           ) : (
//             <div className="space-y-5">

//               {messages.map((msg, index) => {
//                 const isOwnMessage =
//                   String(userId) === String(msg.senderId);

//                 return (
//                   <div
//                     key={index}
//                     className={`flex items-end gap-2 ${
//                       isOwnMessage ? "justify-end" : "justify-start"
//                     }`}
//                   >

//                     {!isOwnMessage && (
//                       <div className="w-8 h-8 shrink-0 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
//                         {(msg.firstName || "D").charAt(0).toUpperCase()}
//                       </div>
//                     )}

//                     <div className={`max-w-[80%] sm:max-w-[70%] ${
//                       isOwnMessage ? "items-end" : "items-start"
//                     } flex flex-col`}>

//                       <p className="text-[11px] text-slate-400 mb-1 px-2">
//                         {isOwnMessage
//                           ? "You"
//                           : `${msg.firstName || ""} ${msg.lastName || ""}`}
//                       </p>

//                       <div
//                         className={`px-4 py-3 rounded-2xl text-sm leading-relaxed break-words ${
//                           isOwnMessage
//                             ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-sm shadow-md shadow-blue-500/10"
//                             : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm"
//                         }`}
//                       >
//                         {msg.text}
//                       </div>

//                     </div>

//                   </div>
//                 );
//               })}

//               <div ref={messagesEndRef} />

//             </div>
//           )}

//         </div>

//         {/* Message Input */}
//         <form
//           onSubmit={sendMessage}
//           className="p-4 sm:px-6 sm:py-5 border-t border-slate-100 bg-white"
//         >

//           <div className="flex items-center gap-3">

//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Write your message..."
//               className="flex-1 h-12 px-5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
//             />

//             <button
//               type="submit"
//               disabled={!newMessage.trim()}
//               className="h-12 px-5 sm:px-7 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
//             >
//               <span className="hidden sm:inline">Send</span>
//               <span className="sm:hidden">➤</span>
//             </button>

//           </div>

//           <p className="text-[11px] text-slate-400 mt-3 text-center">
//             Connect. Code. Collaborate.
//           </p>

//         </form>

//       </div>
//     </div>
//   );
// };

// export default Chat;


import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Fetch previous messages
  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        setLoading(true);
        setError("");

        const chat = await axios.get(
          BASE_URL + "/chat/" + targetUserId,
          { withCredentials: true }
        );

        const chatMessages =
          chat?.data?.messages?.map((msg) => {
            const sender = msg.senderId;

            return {
              senderId: sender?._id || sender,
              firstName: sender?.firstName,
              lastName: sender?.lastName,
              text: msg.text,
            };
          }) || [];

        setMessages(chatMessages);
      } catch (err) {
        console.error("Chat fetch error:", err);
        setError("Unable to load messages. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (targetUserId) {
      fetchChatMessages();
    }
  }, [targetUserId]);

  // Socket connection
  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          senderId: message.senderId,
          firstName: message.firstName,
          lastName: message.lastName,
          text: message.text,
        },
      ]);
    };

    socket.on("new message recied", handleNewMessage);

    return () => {
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

    if (!text || !socketRef.current || !userId) return;

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text,
    });

    setNewMessage("");
  };

  const targetUser = messages.find(
    (msg) => String(msg.senderId) !== String(userId)
  );

  const targetName = targetUser
    ? `${targetUser.firstName || ""} ${targetUser.lastName || ""}`.trim()
    : "Developer";

  const getInitial = (name) =>
    name?.charAt(0)?.toUpperCase() || "D";

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

                <p className="text-xs text-[#85849D]">
                  Developer Connection
                </p>
              </div>
            </div>

          </div>

          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-[#7770E8]">
              DevTinder Chat
            </p>

            <p className="text-xs text-[#85849D]">
              Connect. Code. Collaborate.
            </p>
          </div>

        </div>

        {/* CHAT MESSAGES */}
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
                <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3 text-2xl">
                  !
                </div>

                <p className="text-red-500 text-sm mb-3">
                  {error}
                </p>

                <button
                  onClick={() => window.location.reload()}
                  className="text-[#7770E8] font-semibold text-sm hover:text-[#5F56D6]"
                >
                  Try Again
                </button>
              </div>

            </div>
          ) : messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">

              <div className="w-20 h-20 rounded-3xl bg-[#EFECFF] flex items-center justify-center mb-4">
                <svg
                  className="w-9 h-9 text-[#7770E8]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    d="M8 10h8M8 14h5m-8 5 3-3h9a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v12Z"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-[#252943]">
                Start a Conversation
              </h3>

              <p className="text-sm text-[#85849D] mt-2 max-w-xs leading-relaxed">
                Every great collaboration starts with a simple hello.
                Send your first message and connect!
              </p>

            </div>
          ) : (
            <div className="space-y-5">

              {messages.map((msg, index) => {
                const isOwnMessage =
                  String(userId) === String(msg.senderId);

                return (
                  <div
                    key={index}
                    className={`flex items-end gap-2 ${
                      isOwnMessage
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    {!isOwnMessage && (
                      <div className="w-9 h-9 shrink-0 rounded-full bg-[#EAE6FF] text-[#7770E8] flex items-center justify-center text-sm font-bold">
                        {getInitial(msg.firstName)}
                      </div>
                    )}

                    <div
                      className={`max-w-[80%] sm:max-w-[70%] flex flex-col ${
                        isOwnMessage
                          ? "items-end"
                          : "items-start"
                      }`}
                    >

                      <p className="text-[11px] text-[#9995B0] mb-1 px-2">
                        {isOwnMessage
                          ? "You"
                          : `${msg.firstName || ""} ${msg.lastName || ""}`}
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
              className="h-12 px-5 sm:px-7 rounded-2xl bg-gradient-to-r from-[#7770E8] to-[#9B8AF5] hover:from-[#6961DC] hover:to-[#8877ED] text-white font-semibold shadow-lg shadow-[#7770E8]/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              <span className="hidden sm:inline">
                Send
              </span>

              <svg
                className="w-5 h-5 sm:hidden"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14m-7-7 7 7-7 7"
                />
              </svg>
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
