
import React from "react";
import { RefreshCw, MessageCircle } from "lucide-react";

const ChatMessages = ({
  messages = [],
  userId,
  loading,
  error,
  messagesContainerRef,
}) => {
  return (
    <div
      ref={messagesContainerRef}
      className="flex h-full flex-col overflow-y-auto overscroll-contain bg-base-100 px-3 py-3 sm:px-5 sm:py-4"
    >
      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center gap-3 text-base-content/50">
            <span className="loading loading-spinner loading-sm text-primary" />
            <p className="text-sm">Loading messages...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-error/10 text-error">
            <RefreshCw size={20} />
          </div>

          <h3 className="text-sm font-semibold text-base-content">
            Unable to load messages
          </h3>

          <p className="mt-1 max-w-xs text-xs text-base-content/50">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-content transition hover:opacity-90"
          >
            <RefreshCw size={13} />
            Try Again
          </button>
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-base-200 text-base-content/50">
            <MessageCircle size={25} strokeWidth={1.5} />
          </div>

          <h3 className="text-base font-semibold text-base-content">
            No messages yet
          </h3>

          <p className="mt-2 max-w-xs text-xs leading-5 text-base-content/50">
            Start a conversation. Send a message and get to know your developer
            connection.
          </p>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-1.5">
          <div className="mb-3 flex justify-center">
            <span className="rounded-full bg-base-200 px-3 py-1 text-[10px] font-medium text-base-content/45">
              Conversation
            </span>
          </div>

          {messages.map((msg, index) => {
            const isOwnMessage = String(userId) === String(msg.senderId);

            return (
              <div
                key={`${msg.senderId}-${index}`}
                className={`flex w-full min-w-0 flex-col ${
                  isOwnMessage ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`w-fit max-w-[65%] break-words rounded-xl px-3 py-1.5 text-[13px] leading-[1.35] shadow-sm sm:max-w-[55%] ${
                    isOwnMessage
                      ? "rounded-br-sm bg-primary text-primary-content"
                      : "rounded-bl-sm border border-base-300 bg-base-200 text-base-content"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">
                    {msg.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
