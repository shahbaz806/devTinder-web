
import React from "react";
import { ArrowLeft, ShieldCheck, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatHeader = ({ targetName }) => {
  const navigate = useNavigate();

  const getInitial = (name) =>
    name?.charAt(0)?.toUpperCase() || "D";

  return (
    <header className="z-10 flex shrink-0 items-center justify-between gap-3 border-b border-base-300 bg-base-100 px-3 py-3 sm:px-5">

      {/* Back + User Details */}
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base-content/70 transition-colors hover:bg-base-200 hover:text-base-content sm:hidden"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-base-300 bg-primary/10 font-semibold text-primary">
          <span>{getInitial(targetName)}</span>
        </div>

        {/* Name */}
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-base-content sm:text-base">
            {targetName || "Developer"}
          </h2>

          <div className="mt-0.5 flex items-center gap-1.5">
            <ShieldCheck size={12} className="shrink-0 text-primary" />

            <span className="text-[11px] text-base-content/50">
              Developer Connection
            </span>
          </div>
        </div>
      </div>

      {/* More Options */}
      <button
        type="button"
        aria-label="More options"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base-content/60 transition-colors hover:bg-base-200 hover:text-base-content"
      >
        <MoreVertical size={20} />
      </button>

    </header>
  );
};

export default ChatHeader;
