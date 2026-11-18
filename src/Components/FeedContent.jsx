import React from "react";
import {
  Sparkles,
  Users,
  RefreshCw,
  Compass,
  Code2,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import UserCard from "./UserCard";

const BackgroundDecor = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(var(--color-base-content)_0.7px,transparent_0.7px)] [background-size:26px_26px]" />
    <div className="absolute -left-40 top-32 h-96 w-96 rounded-full border border-primary/10" />
    <div className="absolute -right-40 bottom-10 h-[28rem] w-[28rem] rounded-full border border-primary/10" />
    <div className="absolute right-[12%] top-20 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />
    <div className="absolute bottom-0 left-[15%] h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
  </div>
);

const LoadingState = () => (
  <div className="relative z-10 flex min-h-[65vh] flex-col items-center justify-center px-5 text-center">
    <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
      <Compass size={27} className="animate-pulse text-primary" />
      <span className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-primary" />
    </div>
    <h2 className="text-xl font-semibold text-base-content">
      Finding your community
    </h2>
    <p className="mt-2 max-w-sm text-sm leading-6 text-base-content/55">
      Discovering developers who share your interests and skills.
    </p>
  </div>
);

const ErrorState = ({ error, onRefresh, loading }) => (
  <div className="relative z-10 flex min-h-[65vh] items-center justify-center px-5 py-10">
    <div className="w-full max-w-md rounded-3xl border border-base-300 bg-base-200/80 p-8 text-center shadow-sm">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-error/10 text-error">
        <AlertCircle size={27} />
      </div>
      <p className="mb-2 text-xs font-bold uppercase tracking-[2px] text-primary">
        Connection issue
      </p>
      <h2 className="text-2xl font-bold text-base-content">
        Something went wrong
      </h2>
      <p className="mt-3 text-sm leading-6 text-base-content/60">{error}</p>
      <button
        type="button"
        onClick={onRefresh}
        disabled={loading}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-content transition hover:brightness-110 disabled:opacity-60"
      >
        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        {loading ? "Retrying..." : "Try again"}
      </button>
    </div>
  </div>
);

const EmptyState = ({ onRefresh, loading }) => (
  <div className="relative z-10 flex min-h-[65vh] items-center justify-center px-5 py-10">
    <div className="w-full max-w-lg rounded-3xl border border-base-300 bg-base-200/70 px-7 py-12 text-center shadow-sm sm:px-12">
      <div className="relative mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-[26px] border border-primary/20 bg-primary/10">
        <Code2 size={34} className="text-primary" />
        <Sparkles size={17} className="absolute -right-2 -top-2 text-accent" />
      </div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[2px] text-primary">
        Your discovery journey
      </p>
      <h2 className="text-2xl font-bold text-base-content sm:text-3xl">
        You're all caught up.
      </h2>
      <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-base-content/60">
        There are no new developers to discover right now. Come back later and
        find your next great connection.
      </p>
      <button
        type="button"
        onClick={onRefresh}
        disabled={loading}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-content transition hover:brightness-110 disabled:opacity-60"
      >
        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        {loading ? "Refreshing..." : "Refresh discovery"}
      </button>
    </div>
  </div>
);

const FeedContent = ({ feed, loading, error, onRefresh }) => {
  const background = `
    relative isolate min-h-[calc(100svh-80px)] w-full
    overflow-hidden bg-base-100 text-base-content
    transition-colors duration-300
  `;

  if (feed == null && loading) {
    return (
      <main className={background}>
        <BackgroundDecor />
        <LoadingState />
      </main>
    );
  }

  if (error && feed == null) {
    return (
      <main className={background}>
        <BackgroundDecor />
        <ErrorState error={error} onRefresh={onRefresh} loading={loading} />
      </main>
    );
  }

  if (feed && feed.length === 0) {
    return (
      <main className={background}>
        <BackgroundDecor />
        <EmptyState onRefresh={onRefresh} loading={loading} />
      </main>
    );
  }

  return (
    <main className={`${background} px-4 pb-12 pt-6 sm:px-6 sm:pt-8 lg:px-10`}>
      <BackgroundDecor />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* HERO SECTION - LEFT ALIGNED */}
        <header className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full text-left">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[1.8px] text-primary">
                Developer community
              </span>
            </div>

            <h1 className="text-left text-3xl font-bold tracking-tight text-base-content sm:text-4xl lg:text-[42px]">
              Discover your{" "}
              <span className="font-serif font-normal italic text-primary">
                next connection.
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-left text-sm leading-7 text-base-content/60 sm:text-base">
              Meet developers, explore their work, and build meaningful
              connections with people who share your passion for technology.
            </p>
          </div>

          {/* AVAILABLE COUNT + REFRESH */}
          <div className="flex shrink-0 items-center gap-2.5">
            <div className="flex items-center gap-2.5 rounded-xl border border-base-300 bg-base-200/70 px-3 py-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users size={17} />
              </div>
              <div>
                <p className="text-base font-bold leading-none text-base-content">
                  {feed?.length ?? 0}
                </p>
                <p className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-base-content/50">
                  Available
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              aria-label="Refresh feed"
              className="flex h-[54px] w-[54px] items-center justify-center rounded-xl border border-base-300 bg-base-200/70 text-base-content transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary disabled:opacity-50"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </header>

        {/* RECOMMENDED SECTION */}
        <section className="border-t border-base-300/80 pt-6 sm:pt-7">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="text-left">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-primary" />
                <h2 className="text-sm font-bold text-base-content">
                  Recommended for you
                </h2>
              </div>
              <p className="mt-1 text-[11px] text-base-content/50">
                One connection can lead to something great.
              </p>
            </div>

            <span className="hidden items-center gap-1.5 text-[11px] font-medium text-base-content/50 sm:flex">
              Explore profiles
              <ArrowRight size={13} />
            </span>
          </div>

          {error && (
            <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-error/20 bg-error/5 px-4 py-3">
              <p className="text-xs text-base-content/70">{error}</p>
              <button
                type="button"
                onClick={onRefresh}
                disabled={loading}
                className="shrink-0 text-xs font-semibold text-primary hover:underline"
              >
                Retry
              </button>
            </div>
          )}

          {/* CARD - CENTERED IN FULL AVAILABLE WIDTH */}
          <div className="grid w-full grid-cols-1 justify-items-center">
            {feed?.length > 0 && (
              <div className="w-full max-w-[430px] justify-self-center">
                <UserCard user={feed[0]} />
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default FeedContent;
