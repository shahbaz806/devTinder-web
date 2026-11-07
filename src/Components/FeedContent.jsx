import React from "react";
import UserCard from "./UserCard";

const BackgroundDecor = () => (
  <>
    <div
      className="absolute inset-0 -z-10 pointer-events-none opacity-30
      bg-[radial-gradient(circle,rgba(129,140,248,0.45)_1.5px,transparent_2px)]
      bg-[size:30px_30px]
      [mask-image:linear-gradient(to_right,black,transparent_25%,transparent_75%,black)]"
    />

    <div className="absolute -left-28 top-1/4 -z-10 w-80 h-80 rounded-full border border-indigo-400/20 pointer-events-none" />

    <div className="absolute -right-28 bottom-10 -z-10 w-80 h-80 rounded-full border border-indigo-400/20 pointer-events-none" />

    <div className="absolute top-20 right-1/4 -z-10 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

    <div className="absolute bottom-10 left-1/3 -z-10 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
  </>
);

const FeedContent = ({ feed, loading, error, onRefresh }) => {
  const background = `
    relative isolate overflow-hidden
    bg-base-100
    bg-[radial-gradient(circle_at_15%_20%,rgba(129,140,248,0.12),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(167,139,250,0.12),transparent_30%)]
    transition-colors duration-300
  `;

  // Loading State
  if (feed == null && loading) {
    return (
      <div
        className={`${background} min-h-[75vh] flex items-center justify-center`}
      >
        <BackgroundDecor />

        <div className="relative z-10 text-center">
          <div className="w-11 h-11 border-4 border-indigo-400/20 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />

          <h2 className="text-lg font-semibold text-base-content">
            Finding Developers...
          </h2>

          <p className="text-sm text-base-content/60 mt-1">
            Discovering new connections for you.
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error && feed == null) {
    return (
      <div
        className={`${background} min-h-[75vh] flex items-center justify-center px-4`}
      >
        <BackgroundDecor />

        <div className="relative z-10 max-w-md w-full text-center bg-base-200/90 backdrop-blur-md border border-base-300 rounded-3xl p-8 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-5 text-3xl text-red-500">
            !
          </div>

          <h2 className="text-xl font-bold text-base-content mb-2">
            Something went wrong
          </h2>

          <p className="text-base-content/60 text-sm mb-6">{error}</p>

          <button
            onClick={onRefresh}
            disabled={loading}
            className="px-7 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Try Again"}
          </button>
        </div>
      </div>
    );
  }

  // Empty Feed State
  if (feed && feed.length === 0) {
    return (
      <div
        className={`${background} flex-1 min-h-[calc(100svh-160px)] flex items-center justify-center px-4 py-10`}
      >
        <BackgroundDecor />

        <div className="relative z-10 max-w-md w-full text-center bg-base-200/90 backdrop-blur-md border border-base-300 rounded-3xl p-8 md:p-10 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-indigo-500">{"</>"}</span>
          </div>

          <h1 className="text-2xl font-bold text-base-content mb-3">
            You're all caught up!
          </h1>

          <p className="text-base-content/60 text-sm leading-6 mb-7">
            There are no new developers to discover right now. Check back later
            to find new connections.
          </p>

          <button
            onClick={onRefresh}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "↻ Refresh Feed"}
          </button>
        </div>
      </div>
    );
  }

  // Main Feed
  return (
    <div
      className={`
        ${background}
        relative isolate
        w-full min-w-0
        flex-1
        min-h-[calc(100svh-140px)]
        overflow-x-hidden
        px-4 sm:px-6 md:px-10
        py-7 sm:py-9 md:py-10
      `}
    >
      <BackgroundDecor />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Heading */}
        <div className="w-full mb-6 sm:mb-8 text-center sm:text-left">
          <p className="text-indigo-500 text-[10px] sm:text-xs font-bold uppercase tracking-[2px] sm:tracking-[3px] mb-2 sm:mb-3">
            Developer Community
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-base-content tracking-tight">
            Discover Developers
          </h1>

          <p className="text-base-content/60 mt-2 text-sm sm:text-base max-w-md mx-auto sm:mx-0 leading-6">
            Find your next connection in the developer community.
          </p>
        </div>

        {/* Profile Card */}
        <div className="w-full min-w-0 flex justify-center items-start mt-5 sm:mt-8 md:-mt-36 pb-8 px-0 sm:px-3">
          {feed?.length > 0 && <UserCard user={feed[0]} />}
        </div>
      </div>
    </div>
  );
};

export default FeedContent;
