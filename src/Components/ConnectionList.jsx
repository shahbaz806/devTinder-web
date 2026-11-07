import React from "react";
import { Link } from "react-router-dom";

import {
  Users,
  MessageCircle,
  Code2,
  ArrowRight,
  Sparkles,
  AlertCircle,
} from "lucide-react";

const BackgroundDecor = () => (
  <>
    <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.12] bg-[radial-gradient(circle,rgba(129,140,248,0.8)_1.5px,transparent_2px)] bg-[size:30px_30px]" />

    <div className="absolute -left-28 top-1/4 -z-10 w-80 h-80 rounded-full border border-indigo-500/10 pointer-events-none" />

    <div className="absolute -right-28 bottom-10 -z-10 w-80 h-80 rounded-full border border-indigo-500/10 pointer-events-none" />

    <div className="absolute top-20 right-1/4 -z-10 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
  </>
);

const ConnectionList = ({ connection, loading, error }) => {
  const backgroundStyle = `
    relative isolate overflow-hidden min-h-[calc(100svh-160px)]
    bg-base-100 text-base-content
    transition-colors duration-300
  `;

  // Loading State
  if (loading) {
    return (
      <div className={`${backgroundStyle} flex items-center justify-center`}>
        <BackgroundDecor />

        <div className="relative z-10 text-center">
          <div className="w-11 h-11 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />

          <h2 className="text-lg font-semibold text-base-content">
            Loading Connections...
          </h2>

          <p className="text-sm text-base-content/50 mt-1">
            Finding your developer community.
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div
        className={`${backgroundStyle} flex items-center justify-center px-4`}
      >
        <BackgroundDecor />

        <div className="relative z-10 bg-base-200 border border-base-300 rounded-3xl p-8 text-center shadow-xl max-w-md w-full">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={28} className="text-red-500" />
          </div>

          <h2 className="text-xl font-bold text-base-content mb-2">
            Something went wrong
          </h2>

          <p className="text-base-content/60 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (!connection || connection.length === 0) {
    return (
      <div
        className={`${backgroundStyle} flex items-center justify-center px-4 py-10`}
      >
        <BackgroundDecor />

        <div className="relative z-10 max-w-md w-full text-center bg-base-200 border border-base-300 rounded-3xl p-8 md:p-10 shadow-xl">
          <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-6">
            <Users size={36} className="text-indigo-500" />
          </div>

          <h1 className="text-2xl font-bold text-base-content mb-3">
            No Connections Yet
          </h1>

          <p className="text-base-content/60 text-sm leading-6 mb-7">
            Your developer network starts here. Discover developers and build
            meaningful connections.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-lg shadow-indigo-500/20"
          >
            Discover Developers
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  // Connections List
  return (
    <div className={`${backgroundStyle} px-4 md:px-8 py-10`}>
      <BackgroundDecor />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={15} />
            Developer Community
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-base-content">
            Your Connections
          </h1>

          <p className="text-base-content/60 mt-3 text-sm md:text-base">
            Connect, communicate and grow together.
          </p>

          <div className="inline-flex items-center gap-2 mt-5 px-5 py-2 rounded-full bg-base-200 border border-base-300 shadow-sm">
            <Users size={17} className="text-indigo-500" />

            <span className="text-sm font-semibold text-base-content">
              {connection.length} Connections
            </span>
          </div>
        </div>

        {/* Connection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {connection.map((conn) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              conn;

            return (
              <div
                key={_id}
                className="group bg-base-200 border border-base-300 rounded-2xl p-5 shadow-md shadow-slate-950/10 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  {/* Profile Image */}
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-base-300 bg-indigo-500/10">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt={`${firstName} ${lastName}`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-indigo-500">
                          {firstName?.charAt(0)?.toUpperCase() || "D"}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-base-content truncate group-hover:text-indigo-500 transition">
                      {firstName} {lastName}
                    </h2>

                    {(age || gender) && (
                      <p className="text-xs text-base-content/50 mt-1 capitalize">
                        {age && `${age} years`}
                        {age && gender && " · "}
                        {gender}
                      </p>
                    )}

                    <p className="text-sm text-base-content/60 mt-2 line-clamp-2 leading-5">
                      {about || "Developer and technology enthusiast."}
                    </p>
                  </div>
                </div>

                {/* Chat Button */}
                <div className="mt-5">
                  <Link
                    to={`/chat/${_id}`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-md shadow-indigo-500/20 group-hover:shadow-lg"
                  >
                    <MessageCircle size={18} />
                    Start Chat
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-2 text-base-content/40 text-xs">
            <Code2 size={15} />
            Keep building meaningful connections.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionList;
