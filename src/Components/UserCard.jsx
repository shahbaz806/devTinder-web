
import axios from "axios";
import React, { useState } from "react";
import {
  AlertCircle,
  Code2,
  Heart,
  LoaderCircle,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useDispatch } from "react-redux";

import { BASE_URL } from "../utils/constant";
import { removeUserFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

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

  const handleSendRequest = async (status, userId) => {
    try {
      setLoading(true);
      setActiveButton(status);
      setError("");

      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFeed(userId));
    } catch (err) {
      console.error("Request error:", err);
      setError("Unable to send request. Please try again.");
    } finally {
      setLoading(false);
      setActiveButton("");
    }
  };

  return (
    <article className="group mx-auto w-full max-w-[400px] overflow-hidden rounded-3xl border border-base-300 bg-base-200 shadow-xl shadow-base-content/[0.07] transition-all duration-300 hover:-translate-y-1">
      {/* Profile Image */}
      <div className="relative h-[280px] w-full overflow-hidden bg-base-300 sm:h-[310px]">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${fullName || "Developer"}'s profile`}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-base-200 to-accent/20">
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-4xl font-bold text-primary">
              {firstName?.charAt(0)?.toUpperCase() || "D"}
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-2 text-white backdrop-blur-md">
          <Sparkles size={13} className="text-[#D69A72]" />
          <span className="text-[10px] font-semibold uppercase tracking-wider">
            Developer profile
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="mb-2 flex items-center gap-2 text-white/75">
            <Code2 size={13} />
            <span className="text-[10px] font-semibold uppercase tracking-wider">
              Community member
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {fullName || "Developer"}
            {age && (
              <span className="ml-2 font-normal text-white/80">{age}</span>
            )}
          </h2>

          {gender && (
            <p className="mt-1 text-xs capitalize text-white/75">{gender}</p>
          )}
        </div>
      </div>

      {/* Profile Details */}
      <div className="p-5">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <UserRound size={14} />
          </div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/70">
            About
          </h3>
        </div>

        <p className="mt-2 line-clamp-3 min-h-[48px] text-sm leading-6 text-base-content/65">
          {about || "This developer hasn't added a bio yet."}
        </p>

        {Array.isArray(skills) && skills.length > 0 && (
          <div className="mt-4 border-t border-base-300 pt-4">
            <div className="mb-3 flex items-center gap-2">
              <Code2 size={14} className="text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/70">
                Skills & Technologies
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 5).map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="rounded-lg border border-primary/15 bg-primary/5 px-2.5 py-1.5 text-xs font-medium text-base-content/80"
                >
                  {skill}
                </span>
              ))}

              {skills.length > 5 && (
                <span className="rounded-lg border border-base-300 bg-base-300/50 px-2.5 py-1.5 text-xs text-base-content/60">
                  +{skills.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-base-300 pt-4">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSendRequest("ignored", _id)}
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl border border-base-300 bg-base-100 px-3 text-sm font-semibold text-base-content/75 transition hover:bg-base-300 disabled:opacity-50"
          >
            {loading && activeButton === "ignored" ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <X size={16} />
            )}
            {loading && activeButton === "ignored" ? "Please wait" : "Ignore"}
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={() => handleSendRequest("interested", _id)}
            className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-3 text-sm font-semibold text-primary-content shadow-md shadow-primary/15 transition hover:-translate-y-0.5 hover:brightness-110 disabled:opacity-50"
          >
            {loading && activeButton === "interested" ? (
              <LoaderCircle size={16} className="animate-spin" />
            ) : (
              <Heart size={16} />
            )}
            {loading && activeButton === "interested"
              ? "Please wait"
              : "Interested"}
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-2 rounded-xl border border-error/20 bg-error/5 p-3 text-xs text-error"
          >
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </article>
  );
};

export default UserCard;
