import React from "react";
import { UserRound, Check, X } from "lucide-react";

const RequestCard = ({ req, onReview, processingId, processingStatus }) => {
  const user = req.fromUserId || {};

  const { firstName, lastName, photoUrl, age, gender, about } = user;

  const isProcessing = processingId === req._id;

  return (
    <div className="group flex flex-col gap-5 rounded-3xl border border-base-300 bg-base-200/80 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl sm:flex-row sm:items-center sm:p-6">
      {/* Profile */}
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <div className="relative shrink-0">
          <img
            src={photoUrl || "https://placehold.co/120x120?text=User"}
            alt={`${firstName || "User"} profile`}
            className="h-20 w-20 rounded-2xl border-4 border-indigo-500/10 object-cover shadow-md sm:h-24 sm:w-24"
          />

          <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-base-200 bg-indigo-600 text-white">
            <UserRound size={14} />
          </span>
        </div>

        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-base-content sm:text-2xl">
            {firstName} {lastName}
          </h2>

          {(age || gender) && (
            <p className="mt-1 text-sm font-medium text-indigo-500">
              {[age, gender].filter(Boolean).join(" • ")}
            </p>
          )}

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-base-content/60">
            {about || "No bio available yet."}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 gap-3 sm:flex-col md:flex-row">
        {/* Reject Button */}
        <button
          disabled={isProcessing}
          onClick={() => onReview("rejected", req._id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-5 py-3 text-sm font-bold text-rose-500 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
        >
          {isProcessing && processingStatus === "rejected" ? (
            <>
              <span className="loading loading-spinner loading-xs" />
              Please wait...
            </>
          ) : (
            <>
              <X size={18} />
              Reject
            </>
          )}
        </button>

        {/* Accept Button */}
        <button
          disabled={isProcessing}
          onClick={() => onReview("accepted", req._id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
        >
          {isProcessing && processingStatus === "accepted" ? (
            <>
              <span className="loading loading-spinner loading-xs" />
              Please wait...
            </>
          ) : (
            <>
              <Check size={18} />
              Accept
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
