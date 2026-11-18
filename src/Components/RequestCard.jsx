
import React from "react";
import {
  UserRound,
  Check,
  X,
  Sparkles,
  Clock3,
  LoaderCircle,
} from "lucide-react";

const RequestCard = ({
  req,
  onReview,
  processingId,
  processingStatus,
}) => {
  const user = req.fromUserId || {};

  const {
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
  } = user;

  const isProcessing = processingId === req._id;
  const fullName = `${firstName || ""} ${lastName || ""}`.trim();

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-base-300 bg-base-200 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 sm:p-6">

      {/* Subtle decoration */}
      <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10" />

      {/* Request Label */}
      <div className="relative mb-5 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
          <Sparkles size={13} className="text-primary" />
          <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-primary">
            Connection request
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-base-content/40">
          <Clock3 size={13} />
          <span className="text-[10px] font-medium">Pending</span>
        </div>
      </div>

      {/* Profile */}
      <div className="relative flex min-w-0 flex-col gap-5 sm:flex-row sm:items-center">

        {/* Avatar */}
        <div className="relative mx-auto shrink-0 sm:mx-0">
          <div className="h-24 w-24 overflow-hidden rounded-[26px] border border-primary/20 bg-base-300 shadow-sm sm:h-28 sm:w-28">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={fullName || "Developer"}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/10 text-4xl font-bold text-primary">
                {firstName?.charAt(0)?.toUpperCase() || "D"}
              </div>
            )}
          </div>

          <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl border-2 border-base-200 bg-primary text-primary-content shadow-sm">
            <UserRound size={15} />
          </div>
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h2 className="text-xl font-bold tracking-tight text-base-content transition-colors group-hover:text-primary sm:text-2xl">
            {fullName || "Developer"}
          </h2>

          {(age || gender) && (
            <p className="mt-1.5 text-xs font-medium capitalize text-primary/80">
              {[age && `${age} years`, gender].filter(Boolean).join(" · ")}
            </p>
          )}

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-base-content/60">
            {about || "This developer hasn't added a bio yet."}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-5 border-t border-base-300" />

      {/* Actions */}
      <div className="relative grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={isProcessing}
          onClick={() => onReview("rejected", req._id)}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-base-300 bg-base-100 px-4 text-sm font-semibold text-base-content/75 transition-all duration-200 hover:border-error/30 hover:bg-error/5 hover:text-error disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isProcessing && processingStatus === "rejected" ? (
            <LoaderCircle size={17} className="animate-spin" />
          ) : (
            <X size={17} />
          )}

          {isProcessing && processingStatus === "rejected"
            ? "Please wait"
            : "Decline"}
        </button>

        <button
          type="button"
          disabled={isProcessing}
          onClick={() => onReview("accepted", req._id)}
          className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-content shadow-md shadow-primary/15 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
        >
          {isProcessing && processingStatus === "accepted" ? (
            <LoaderCircle size={17} className="animate-spin" />
          ) : (
            <Check size={17} />
          )}

          {isProcessing && processingStatus === "accepted"
            ? "Please wait"
            : "Accept"}
        </button>
      </div>
    </article>
  );
};

export default RequestCard;
