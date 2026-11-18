
import React from "react";
import { Send } from "lucide-react";

const ChatInput = ({
  newMessage,
  setNewMessage,
  sendMessage,
  loading,
}) => {
  const isDisabled = !newMessage.trim() || loading;

  return (
    <form
      onSubmit={sendMessage}
      className="bg-base-100 px-3 py-3 sm:px-5 sm:py-4"
    >
      <div className="mx-auto flex w-full max-w-3xl items-center gap-2.5">

        {/* Message Input */}
        <div className="flex min-h-11 min-w-0 flex-1 items-center rounded-full border border-base-300 bg-base-200 px-4 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 sm:min-h-12 sm:px-5">

          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={loading}
            autoComplete="off"
            maxLength={2000}
            aria-label="Type a message"
            className="h-full min-w-0 flex-1 bg-transparent py-2 text-sm text-base-content outline-none placeholder:text-base-content/40 disabled:cursor-not-allowed"
          />
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={isDisabled}
          aria-label="Send message"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:h-12 sm:w-12"
        >
          <Send size={18} />
        </button>
      </div>

      {/* Character Counter */}
      {newMessage.length > 1700 && (
        <p className="mx-auto mt-2 max-w-3xl text-right text-[10px] text-base-content/45">
          {newMessage.length}/2000
        </p>
      )}
    </form>
  );
};

export default ChatInput;
