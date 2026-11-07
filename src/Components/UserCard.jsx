
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const {_id, firstName, lastName, photoUrl,age, gender, about,} = user;

  const handleSendRequest = async (status, userId) => {
    try {
      setLoading(true);
      setActiveButton(status);
      setError("");

      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
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
    <div className="w-full max-w-[370px] overflow-hidden rounded-2xl border border-base-300 bg-base-200 text-base-content shadow-lg shadow-base-300/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Profile Image */}
      <div className="relative h-[200px] w-full overflow-hidden bg-base-300 min-[400px]:h-[260px] sm:h-[300px] md:h-[240px]">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            loading="lazy"
             className="block bg-base-300 h-full w-full object-cover object-[center_45%]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500/10 to-violet-500/20">
            <span className="text-6xl font-bold text-primary">
              {firstName?.charAt(0)?.toUpperCase() || "D"}
            </span>
          </div>
        )}
      </div>

      {/* Profile Details */}
      <div className="p-5">

        {/* Name */}
        <h2 className="text-xl font-bold text-base-content">
          {firstName} {lastName}
        </h2>

        {/* Age & Gender */}
        {(age || gender) && (
          <p className="mt-1 text-sm capitalize text-base-content/60">
            {age && `${age} years`}
            {age && gender && " · "}
            {gender}
          </p>
        )}

        {/* About */}
        <div className="mt-4">
          <p className="line-clamp-2 text-sm leading-6 text-base-content/70">
            {about || "No bio available."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">

          {/* Ignore */}
          <button
            disabled={loading}
            onClick={() => handleSendRequest("ignored", _id)}
            className="flex-1 rounded-xl border border-base-300 bg-base-100 py-3 font-semibold text-base-content/80 transition-all duration-200 hover:border-base-content/30 hover:bg-base-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && activeButton === "ignored"
              ? "Please wait..."
              : "Ignore"}
          </button>

          {/* Interested */}
          <button
            disabled={loading}
            onClick={() => handleSendRequest("interested", _id)}
            className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 py-3 font-semibold text-white shadow-md shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading && activeButton === "interested"
              ? "Please wait..."
              : "♥ Interested"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-3 rounded-lg border border-error/20 bg-error/10 p-2 text-xs text-error">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCard;
