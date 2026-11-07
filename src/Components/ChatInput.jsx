import React from "react";
import { Send } from "lucide-react";

const ChatInput = ({ newMessage, setNewMessage, sendMessage, loading }) => {
  return (
    <form
      onSubmit={sendMessage}
      className="border-t border-base-300 bg-base-200 px-4 py-4 sm:px-6 sm:py-5"
    >
      <div className="flex items-center gap-3">
        {/* Message Input */}
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write your message..."
          className="h-12 min-w-0 flex-1 rounded-2xl border border-base-300 bg-base-100 px-5 text-sm text-base-content outline-none transition-all placeholder:text-base-content/35 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        />

        {/* Send Button */}
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
  );
};

export default ChatInput;
