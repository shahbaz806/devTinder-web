
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  UserRound,
  Check,
  X,
  Users,
  Clock,
  Sparkles,
} from "lucide-react";

const Request = () => {
  const request = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [processingStatus, setProcessingStatus] = useState("");
  const [error, setError] = useState("");

  const fetchRequest = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        BASE_URL + "/user/request/recieved",
        { withCredentials: true }
      );

      dispatch(addRequest(res?.data?.data || []));
    } catch (err) {
      console.error(err);
      setError("Unable to load requests. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reviewRequest = async (status, id) => {
    try {
      setProcessingId(id);
      setProcessingStatus(status);

      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(id));
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setProcessingId(null);
      setProcessingStatus("");
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const BackgroundDecor = () => (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] dark:opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(#818cf8 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="pointer-events-none absolute -top-28 -left-20 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="pointer-events-none absolute top-72 -right-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
    </>
  );

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

  if (error) {
    return (
      <div className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center bg-base-100 px-4">
        <BackgroundDecor />

        <div className="relative rounded-3xl border border-base-300 bg-base-200 p-8 text-center shadow-xl">
          <p className="mb-5 text-base-content/70">{error}</p>

          <button
            onClick={fetchRequest}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
            You are all caught up! When someone sends you a connection
            request, it will appear here.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-indigo-500">
            <Sparkles size={17} />
            Keep discovering developers
          </div>
        </div>
      </div>
    );
  }

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
              <p className="font-bold text-base-content">
                Pending Requests
              </p>

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
          {request.map((req) => {
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

            return (
              <div
                key={req._id}
                className="group flex flex-col gap-5 rounded-3xl border border-base-300 bg-base-200/80 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-xl sm:flex-row sm:items-center sm:p-6"
              >
                {/* Profile */}
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={
                        photoUrl ||
                        "https://placehold.co/120x120?text=User"
                      }
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
                  <button
                    disabled={isProcessing}
                    onClick={() =>
                      reviewRequest("rejected", req._id)
                    }
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

                  <button
                    disabled={isProcessing}
                    onClick={() =>
                      reviewRequest("accepted", req._id)
                    }
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
          })}
        </div>
      </div>
    </div>
  );
};

export default Request;
