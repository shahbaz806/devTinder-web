
import React from "react";
import {
  Users,
  Clock3,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Inbox,
  AlertCircle,
} from "lucide-react";

import RequestCard from "./RequestCard";

const BackgroundDecor = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.13] [background-image:radial-gradient(var(--color-base-content)_0.7px,transparent_0.7px)] [background-size:28px_28px]" />

    <div className="absolute -left-40 top-20 h-96 w-96 rounded-full border border-primary/10" />

    <div className="absolute -right-40 bottom-10 h-[28rem] w-[28rem] rounded-full border border-primary/10" />

    <div className="absolute right-[10%] top-20 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />

    <div className="absolute bottom-0 left-[15%] h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
  </div>
);

const LoadingState = () => (
  <div className="relative z-10 flex min-h-[65vh] flex-col items-center justify-center px-5 text-center">
    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
      <Inbox size={28} className="animate-pulse text-primary" />
    </div>

    <h2 className="text-xl font-semibold text-base-content">
      Checking your invitations
    </h2>

    <p className="mt-2 text-sm text-base-content/55">
      Finding people who want to connect with you.
    </p>
  </div>
);

const ErrorState = ({ error, onRetry, loading }) => (
  <div className="relative z-10 flex min-h-[65vh] items-center justify-center px-5 py-10">
    <div className="w-full max-w-md rounded-3xl border border-base-300 bg-base-200 p-8 text-center shadow-sm sm:p-10">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-error/10 text-error">
        <AlertCircle size={27} />
      </div>

      <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-primary">
        Request center
      </p>

      <h2 className="text-xl font-bold text-base-content">
        Unable to load requests
      </h2>

      <p className="mt-3 text-sm leading-6 text-base-content/60">
        {error}
      </p>

      <button
        onClick={onRetry}
        disabled={loading}
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-content transition hover:brightness-110 disabled:opacity-50"
      >
        <RefreshCw
          size={16}
          className={loading ? "animate-spin" : ""}
        />
        {loading ? "Retrying..." : "Try again"}
      </button>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="relative z-10 flex min-h-[65vh] items-center justify-center px-5 py-10">
    <div className="w-full max-w-lg rounded-3xl border border-base-300 bg-base-200/80 px-7 py-12 text-center shadow-sm sm:px-12">
      <div className="relative mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-[26px] border border-primary/20 bg-primary/10">
        <Users size={34} className="text-primary" />
        <Sparkles
          size={16}
          className="absolute -right-2 -top-2 text-accent"
        />
      </div>

      <p className="mb-3 text-xs font-bold uppercase tracking-[2px] text-primary">
        All caught up
      </p>

      <h1 className="text-2xl font-bold tracking-tight text-base-content sm:text-3xl">
        No pending requests.
      </h1>

      <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-base-content/60">
        Your inbox is clear. When another developer wants to connect with
        you, their invitation will appear here.
      </p>

      <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-base-300 bg-base-100 px-5 py-3 text-sm font-medium text-base-content/65">
        <Sparkles size={16} className="text-primary" />
        Keep building your network
      </div>
    </div>
  </div>
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
  const backgroundStyle = `
    relative isolate min-h-[calc(100svh-80px)] w-full
    overflow-hidden bg-base-100 text-base-content
    transition-colors duration-300
  `;

  if (loading) {
    return (
      <main className={backgroundStyle}>
        <BackgroundDecor />
        <LoadingState />
      </main>
    );
  }

  if (error) {
    return (
      <main className={backgroundStyle}>
        <BackgroundDecor />
        <ErrorState
          error={error}
          onRetry={onRetry}
          loading={loading}
        />
      </main>
    );
  }

  if (!request || request.length === 0) {
    return (
      <main className={backgroundStyle}>
        <BackgroundDecor />
        <EmptyState />
      </main>
    );
  }

  return (
    <main className={`${backgroundStyle} px-4 pb-14 pt-9 sm:px-6 sm:pt-12 lg:px-10`}>
      <BackgroundDecor />

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* Header */}
        <header className="mb-9 flex flex-col gap-6 border-b border-base-300 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
              <Sparkles size={13} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[2px] text-primary">
                Developer community
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl lg:text-5xl">
              New connections,
              <span className="font-serif font-normal italic text-primary">
                {" "}new possibilities.
              </span>
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-7 text-base-content/60 sm:text-base">
              Discover who's interested in connecting with you. Review
              invitations and grow your developer network.
            </p>
          </div>

          {/* Pending Counter */}
          <div className="flex w-fit items-center gap-3 rounded-2xl border border-base-300 bg-base-200/80 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users size={19} />
            </div>

            <div>
              <p className="text-xl font-bold leading-none text-base-content">
                {request.length}
              </p>

              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-base-content/50">
                Pending requests
              </p>
            </div>
          </div>
        </header>

        {/* Section Heading */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Clock3 size={16} className="text-primary" />

              <h2 className="text-sm font-bold text-base-content">
                Invitations waiting for you
              </h2>
            </div>

            <p className="mt-1 text-xs text-base-content/50">
              Review each request and choose how you want to respond.
            </p>
          </div>

          <span className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
            {request.length} {request.length === 1 ? "Invitation" : "Invitations"}
          </span>
        </div>

        {/* Request Cards */}
        <section className="grid grid-cols-1 gap-5">
          {request.map((req) => (
            <RequestCard
              key={req._id}
              req={req}
              onReview={onReview}
              processingId={processingId}
              processingStatus={processingStatus}
            />
          ))}
        </section>

        {/* Footer Note */}
        <div className="mt-10 flex items-center justify-center gap-2 text-center text-xs text-base-content/40">
          <Sparkles size={14} />
          Every meaningful connection starts somewhere.
        </div>
      </div>
    </main>
  );
};

export default RequestContent;
