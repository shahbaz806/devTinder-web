
import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  MessageCircle,
  Code2,
  ArrowRight,
  Sparkles,
  AlertCircle,
  RefreshCw,
  UserRound,
} from "lucide-react";

const BackgroundDecor = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 opacity-[0.14] [background-image:radial-gradient(var(--color-base-content)_0.7px,transparent_0.7px)] [background-size:28px_28px]" />

    <div className="absolute -left-40 top-20 h-96 w-96 rounded-full border border-primary/10" />

    <div className="absolute -right-40 bottom-10 h-[28rem] w-[28rem] rounded-full border border-primary/10" />

    <div className="absolute right-[10%] top-20 h-72 w-72 rounded-full bg-primary/10 blur-[100px]" />

    <div className="absolute bottom-0 left-[15%] h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
  </div>
);

const LoadingState = () => (
  <div className="relative z-10 flex min-h-[65vh] flex-col items-center justify-center px-5 text-center">
    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
      <Users size={27} className="animate-pulse text-primary" />
    </div>

    <h2 className="text-xl font-semibold text-base-content">
      Building your network
    </h2>

    <p className="mt-2 text-sm text-base-content/55">
      Finding your developer connections...
    </p>
  </div>
);

const EmptyState = () => (
  <div className="relative z-10 flex min-h-[65vh] items-center justify-center px-5 py-10">
    <div className="w-full max-w-lg rounded-3xl border border-base-300 bg-base-200/80 px-7 py-12 text-center shadow-sm sm:px-12">
      <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-[26px] border border-primary/20 bg-primary/10">
        <Users size={34} className="text-primary" />
      </div>

      <p className="mb-3 text-xs font-bold uppercase tracking-[2px] text-primary">
        Your network starts here
      </p>

      <h1 className="text-2xl font-bold tracking-tight text-base-content sm:text-3xl">
        No connections yet.
      </h1>

      <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-base-content/60">
        Meet developers, discover shared interests and start building your
        professional network.
      </p>

      <Link
        to="/feed"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-content transition hover:-translate-y-0.5 hover:brightness-110"
      >
        Discover developers
        <ArrowRight size={17} />
      </Link>
    </div>
  </div>
);

const ErrorState = ({ error }) => (
  <div className="relative z-10 flex min-h-[65vh] items-center justify-center px-5">
    <div className="w-full max-w-md rounded-3xl border border-base-300 bg-base-200 p-8 text-center shadow-sm">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-error/10 text-error">
        <AlertCircle size={27} />
      </div>

      <h2 className="text-xl font-bold text-base-content">
        Unable to load connections
      </h2>

      <p className="mt-3 text-sm leading-6 text-base-content/60">
        {error}
      </p>
    </div>
  </div>
);

const ConnectionCard = ({ user }) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    gender,
    about,
    skills,
  } = user;

  const fullName = `${firstName || ""} ${lastName || ""}`.trim();

  return (
    <article className="group rounded-3xl border border-base-300 bg-base-200 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 sm:p-5">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative h-[76px] w-[76px] shrink-0 overflow-hidden rounded-2xl border border-base-300 bg-base-300 sm:h-[88px] sm:w-[88px]">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={fullName || "Developer"}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-3xl font-bold text-primary">
              {firstName?.charAt(0)?.toUpperCase() || "D"}
            </div>
          )}

          <span className="absolute bottom-1.5 right-1.5 h-3 w-3 rounded-full border-2 border-base-200 bg-success" />
        </div>

        {/* Details */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold tracking-tight text-base-content transition-colors group-hover:text-primary sm:text-xl">
                {fullName || "Developer"}
              </h2>

              {(age || gender) && (
                <p className="mt-1 text-xs capitalize text-base-content/50">
                  {age && `${age} years`}
                  {age && gender && " · "}
                  {gender}
                </p>
              )}
            </div>

            <span className="shrink-0 rounded-full border border-primary/15 bg-primary/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-primary">
              Connected
            </span>
          </div>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-base-content/60">
            {about || "Developer and technology enthusiast."}
          </p>
        </div>
      </div>

      {/* Skills */}
      {Array.isArray(skills) && skills.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2 border-t border-base-300 pt-4">
          {skills.slice(0, 4).map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="rounded-lg border border-base-300 bg-base-100 px-2.5 py-1.5 text-[11px] font-medium text-base-content/70"
            >
              {skill}
            </span>
          ))}

          {skills.length > 4 && (
            <span className="rounded-lg bg-primary/10 px-2.5 py-1.5 text-[11px] font-semibold text-primary">
              +{skills.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Chat Action */}
      <div className="mt-5">
        <Link
          to={`/chat/${_id}`}
          className="group/chat flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-content transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
        >
          <MessageCircle size={17} />
          Start a conversation
          <ArrowRight
            size={16}
            className="transition-transform group-hover/chat:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
};

const ConnectionList = ({ connection, loading, error }) => {
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
        <ErrorState error={error} />
      </main>
    );
  }

  if (!connection || connection.length === 0) {
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

      <div className="relative z-10 mx-auto max-w-6xl">
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
              Your network,
              <span className="font-serif font-normal italic text-primary">
                {" "}your growth.
              </span>
            </h1>

            <p className="mt-3 max-w-lg text-sm leading-7 text-base-content/60 sm:text-base">
              Stay connected with developers, exchange ideas and build
              something meaningful together.
            </p>
          </div>

          {/* Stats */}
          <div className="flex w-fit items-center gap-3 rounded-2xl border border-base-300 bg-base-200/80 px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Users size={19} />
            </div>

            <div>
              <p className="text-xl font-bold leading-none text-base-content">
                {connection.length}
              </p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-base-content/50">
                Connections
              </p>
            </div>
          </div>
        </header>

        {/* Section Heading */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <UserRound size={16} className="text-primary" />
              <h2 className="text-sm font-bold text-base-content">
                People in your network
              </h2>
            </div>

            <p className="mt-1 text-xs text-base-content/50">
              Your developer connections in one place.
            </p>
          </div>

          <span className="hidden items-center gap-2 text-xs text-base-content/45 sm:flex">
            <Code2 size={15} />
            Keep building together
          </span>
        </div>

        {/* Connection Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {connection.map((conn) => (
            <ConnectionCard key={conn._id} user={conn} />
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-10 flex items-center justify-center gap-2 text-center text-xs text-base-content/40">
          <Code2 size={14} />
          Great things are built together.
        </div>
      </div>
    </main>
  );
};

export default ConnectionList;
