import React from "react";
import { Code2 } from "lucide-react";

const ChatHeader = ({ targetName }) => {
  const getInitial = (name) =>
    name?.charAt(0)?.toUpperCase() || "D";

  return (
    <div className="flex items-center justify-between border-b border-base-300 bg-base-200 px-5 py-4">

      <div className="flex items-center gap-3">

        {/* Profile Initial */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white shadow-md shadow-indigo-500/20">
          {getInitial(targetName)}
        </div>

        {/* User Details */}
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

      {/* Branding */}
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
  );
};

export default ChatHeader;