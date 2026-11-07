import React from "react";
import { MessageCircle } from "lucide-react";

const ChatMessages = ({ messages, userId, loading, error, messagesEndRef }) => {
  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "D";

  return (
    <div className="flex-1 overflow-y-auto bg-base-100 px-4 py-6 sm:px-7">
      {/* Loading State */}
      {loading ? (
        <div className="flex h-full flex-col items-center justify-center gap-3">
          <span className="loading loading-spinner loading-lg text-indigo-500" />

          <p className="text-sm text-base-content/50">
            Loading your conversation...
          </p>
        </div>
      ) : error ? (
        /* Error State */
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
        /* Empty State */
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-500/10 text-indigo-500">
            <MessageCircle size={36} />
          </div>

          <h3 className="text-xl font-bold text-base-content">
            Start a Conversation
          </h3>

          <p className="mt-2 max-w-xs text-sm leading-relaxed text-base-content/50">
            Every great collaboration starts with a simple hello. Send your
            first message and connect!
          </p>
        </div>
      ) : (
        /* Messages List */
        <div className="space-y-5">
          {messages.map((msg, index) => {
            const isOwnMessage = String(userId) === String(msg.senderId);

            const senderName = `${msg.firstName || ""} ${
              msg.lastName || ""
            }`.trim();

            return (
              <div
                key={`${msg.senderId}-${index}`}
                className={`flex items-end gap-2 ${
                  isOwnMessage ? "justify-end" : "justify-start"
                }`}
              >
                {/* Other User Avatar */}
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
                  {/* Sender Name */}
                  <p className="mb-1 px-2 text-[11px] text-base-content/40">
                    {isOwnMessage ? "You" : senderName || "User"}
                  </p>

                  {/* Message Bubble */}
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

          {/* Auto Scroll Reference */}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
