import React from "react";
import { Users, Clock, Sparkles } from "lucide-react";

import RequestCard from "./RequestCard";

const BackgroundDecor = () => (
  <>
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.12] dark:opacity-[0.18]"
      style={{
        backgroundImage: "radial-gradient(#818cf8 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />

    <div className="pointer-events-none absolute -top-28 -left-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

    <div className="pointer-events-none absolute top-72 -right-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
  </>
);

const RequestContent = ({
  request,
  loading,
  error,
  onRetry,
  onReview,
  processingId,
  processingStatus,
}) => {
  // Loading State
  if (loading) {
    return (
      <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-base-100 px-4">
        <BackgroundDecor />

        <div className="relative text-center">
          <span className="loading loading-spinner loading-lg text-indigo-500" />

          <p className="mt-4 font-medium text-base-content/60">
            Loading requests...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-base-100 px-4">
        <BackgroundDecor />

        <div className="relative rounded-3xl border border-base-300 bg-base-200 p-8 text-center shadow-xl">
          <p className="mb-5 text-base-content/70">{error}</p>

          <button
            onClick={onRetry}
            disabled={loading}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty State
  if (!request || request.length === 0) {
    return (
      <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-base-100 px-4">
        <BackgroundDecor />

        <div className="relative w-full max-w-md rounded-[32px] border border-base-300 bg-base-200/90 p-10 text-center shadow-xl backdrop-blur-xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-500/10 text-indigo-500">
            <Users size={38} />
          </div>

          <h2 className="text-2xl font-bold text-base-content">
            No Pending Requests
          </h2>

          <p className="mt-3 text-sm leading-6 text-base-content/60">
            You are all caught up! When someone sends you a connection request,
            it will appear here.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-indigo-500">
            <Sparkles size={17} />
            Keep discovering developers
          </div>
        </div>
      </div>
    );
  }

  // Main Request Page
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-base-100 px-4 py-10 sm:px-8">
      <BackgroundDecor />

      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200 px-4 py-2 text-sm font-semibold text-indigo-500 shadow-sm">
            <Clock size={16} />
            Your Invitations
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-base-content sm:text-4xl">
            Connection Requests
          </h1>

          <p className="mt-3 text-sm text-base-content/60 sm:text-base">
            People who want to connect and grow with you.
          </p>

          <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
        </div>

        {/* Request Count */}
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-base-300 bg-base-200/80 px-5 py-4 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
              <Users size={21} />
            </div>

            <div>
              <p className="font-bold text-base-content">Pending Requests</p>

              <p className="text-xs text-base-content/60">
                Review your invitations
              </p>
            </div>
          </div>

          <span className="rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-bold text-indigo-500">
            {request.length}
          </span>
        </div>

        {/* Request Cards */}
        <div className="grid gap-5">
          {request.map((req) => (
            <RequestCard
              key={req._id}
              req={req}
              onReview={onReview}
              processingId={processingId}
              processingStatus={processingStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestContent;
