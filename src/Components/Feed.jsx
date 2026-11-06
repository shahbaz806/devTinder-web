// import React, { useEffect } from "react";
// import { BASE_URL } from "../utils/constant";
// import { useDispatch, useSelector } from "react-redux";
// import { addfeed } from "../utils/feedSlice";
// import axios from "axios";
// import UserCard from "./UserCard";

// const Feed = () => {
//   const feed = useSelector((store) => store.feed);
//   const dispatch = useDispatch();
//   const getFeed = async () => {
//     if (feed) return;
//     const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
//     dispatch(addfeed(res.data));
//     console.log("Feed API response:", res);
//   };

//   useEffect(() => {
//     getFeed();
//   }, []);

//   if (!feed) return;

//   if (feed.length <= 0)
//     return <h1 className="flex justify-center my-10">No new user found</h1>;
//   return (
//     feed && (
//       <div className="flex justify-center my-10">
//         <UserCard user={feed[0]} />
//       </div>
//     )
//   );
// };

// export default Feed;

// import React, { useCallback, useEffect, useState } from "react";
// import { BASE_URL } from "../utils/constant";
// import { useDispatch, useSelector } from "react-redux";
// import { addfeed } from "../utils/feedSlice";
// import axios from "axios";
// import UserCard from "./UserCard";

// const Feed = () => {
//   const feed = useSelector((store) => store.feed);
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const getFeed = useCallback(
//     async (force = false) => {
//       // Already fetched feed? Don't call API again.
//       if (feed != null && !force) return;

//       try {
//         setLoading(true);
//         setError("");

//         const res = await axios.get(BASE_URL + "/feed", {
//           withCredentials: true,
//         });

//         dispatch(addfeed(res.data));

//         console.log("Feed API response:", res.data);
//       } catch (err) {
//         console.error("Feed Error:", err);
//         setError("Unable to load profiles. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [feed, dispatch]
//   );

//   useEffect(() => {
//     getFeed();
//   }, [getFeed]);

//   // Loading State
//   if (loading && feed == null) {
//     return (
//       <div className="min-h-[75vh] flex items-center justify-center bg-[#0D1117]">
//         <div className="text-center">
//           <div className="w-9 h-9 border-4 border-[#30363D] border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-400">Finding developers...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error State
//   if (error && feed == null) {
//     return (
//       <div className="min-h-[75vh] flex flex-col items-center justify-center bg-[#0D1117] text-center px-4">
//         <h2 className="text-xl text-white font-semibold mb-3">
//           Something went wrong
//         </h2>
//         <p className="text-gray-400 mb-5">{error}</p>
//         <button
//           onClick={() => getFeed(true)}
//           className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   // Empty Feed State
//   if (feed && feed.length === 0) {
//     return (
//       <div
//         className="flex-1 min-h-[calc(100svh-160px)]
//   flex items-center justify-center px-4
//   bg-[#F1F5F9]"
//       >
//         <div
//           className="max-w-md w-full text-center
//     bg-white border border-slate-200
//     rounded-2xl p-8 md:p-10 shadow-sm"
//         >
//           <div
//             className="w-16 h-16 rounded-2xl
//       bg-indigo-50 flex items-center
//       justify-center mx-auto mb-6"
//           >
//             <span className="text-3xl text-indigo-600">{"</>"}</span>
//           </div>

//           <h1 className="text-2xl font-bold text-slate-800 mb-3">
//             You're all caught up.
//           </h1>

//           <p className="text-slate-500 text-sm leading-6 mb-7">
//             There are no new developers to discover right now. Check back later
//             to find new connections.
//           </p>

//           <button
//             onClick={() => getFeed(true)}
//             disabled={loading}
//             className="px-6 py-3 rounded-lg
//       bg-indigo-600 hover:bg-indigo-700
//       text-white font-medium transition
//       disabled:opacity-50"
//           >
//             {loading ? "Refreshing..." : "↻ Refresh Feed"}
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Profile Feed
//   return (
//     <div className="flex-1 bg-[#F1F5F9] px-5 md:px-10 py-5">
//       {/* Heading - Left Side */}
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-slate-800">
//           Discover Developers
//         </h1>

//         <p className="text-slate-500 mt-2 text-sm max-w-[280px] leading-6">
//           Find your next connection in the developer community.
//         </p>
//       </div>

//       {/* Center Profile Card */}
//       <div
//         className="flex justify-center items-center
//   -mt-24 px-3 pb-6"
//       >
//         {feed?.length > 0 && <UserCard user={feed[0]} />}
//       </div>
//     </div>
//   );
// };

// export default Feed;



import React, { useCallback, useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getFeed = useCallback(
    async (force = false) => {
      if (feed != null && !force) return;

      try {
        setLoading(true);
        setError("");

        const res = await axios.get(`${BASE_URL}/feed`, {
          withCredentials: true,
        });

        dispatch(addfeed(res.data));
      } catch (err) {
        console.error("Feed Error:", err);
        setError("Unable to load profiles. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [feed, dispatch]
  );

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  // Common background design
  const background =
    "relative isolate overflow-hidden bg-[#F8F8FF] bg-[radial-gradient(circle_at_15%_20%,rgba(129,140,248,0.16),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(167,139,250,0.15),transparent_30%),linear-gradient(135deg,#FAFAFF,#F3F2FF,#F8FAFF)]";

  // Background decorations
  const BackgroundDecor = () => (
    <>
      <div
        className="absolute inset-0 -z-10 pointer-events-none opacity-40
        bg-[radial-gradient(circle,rgba(129,140,248,0.45)_1.5px,transparent_2px)]
        bg-[size:30px_30px]
        [mask-image:linear-gradient(to_right,black,transparent_25%,transparent_75%,black)]"
      />

      <div className="absolute -left-28 top-1/4 -z-10 w-80 h-80 rounded-full border border-indigo-200/50 pointer-events-none" />

      <div className="absolute -right-28 bottom-10 -z-10 w-80 h-80 rounded-full border border-indigo-200/50 pointer-events-none" />

      <div className="absolute top-20 right-1/4 -z-10 w-64 h-64 rounded-full bg-indigo-200/20 blur-3xl pointer-events-none" />

      <div className="absolute bottom-10 left-1/3 -z-10 w-48 h-48 rounded-full bg-purple-200/20 blur-3xl pointer-events-none" />
    </>
  );

  // Loading State
  if (feed == null && loading) {
    return (
      <div className={`${background} min-h-[75vh] flex items-center justify-center`}>
        <BackgroundDecor />

        <div className="relative z-10 text-center">
          <div className="w-11 h-11 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />

          <h2 className="text-lg font-semibold text-slate-700">
            Finding Developers...
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Discovering new connections for you.
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error && feed == null) {
    return (
      <div className={`${background} min-h-[75vh] flex items-center justify-center px-4`}>
        <BackgroundDecor />

        <div className="relative z-10 max-w-md w-full text-center bg-white/90 backdrop-blur-md border border-white rounded-3xl p-8 shadow-xl shadow-indigo-100/60">
          <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5 text-3xl">
            !
          </div>

          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Something went wrong
          </h2>

          <p className="text-slate-500 text-sm mb-6">
            {error}
          </p>

          <button
            onClick={() => getFeed(true)}
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
      <div className={`${background} flex-1 min-h-[calc(100svh-160px)] flex items-center justify-center px-4 py-10`}>
        <BackgroundDecor />

        <div className="relative z-10 max-w-md w-full text-center bg-white/90 backdrop-blur-md border border-white rounded-3xl p-8 md:p-10 shadow-xl shadow-indigo-100/60">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-bold text-indigo-600">
              {"</>"}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-slate-800 mb-3">
            You're all caught up!
          </h1>

          <p className="text-slate-500 text-sm leading-6 mb-7">
            There are no new developers to discover right now.
            Check back later to find new connections.
          </p>

          <button
            onClick={() => getFeed(true)}
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
  // return (
  //   <div className={`${background} flex-1 min-h-[calc(100svh-160px)] px-5 md:px-10 py-8 md:py-10`}>
  //     <BackgroundDecor />

  //     <div className="relative z-10 max-w-7xl mx-auto">

  //       {/* Left Heading */}
  //       <div className="mb-8 md:mb-0">
  //         <p className="text-indigo-600 text-xs font-bold uppercase tracking-[3px] mb-3">
  //           Developer Community
  //         </p>

  //         <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
  //           Discover Developers
  //         </h1>

  //         <p className="text-slate-500 mt-2 text-sm md:text-base max-w-xs leading-6">
  //           Find your next connection in the developer community.
  //         </p>
  //       </div>

  //       {/* Center Profile Card */}
  //       <div className="flex justify-center items-center -mt-36  pb-6 px-3">
  //         {feed?.length > 0 && (
  //           <UserCard user={feed[0]} />
  //         )}
  //       </div>

  //     </div>
  //   </div>
  // );
  
{/* Main Feed */}
return (
  <div className={`
    ${background}
    relative isolate
    w-full min-w-0
    flex-1
    min-h-[calc(100svh-140px)]
    overflow-x-hidden
    px-4 sm:px-6 md:px-10
    py-7 sm:py-9 md:py-10
  `}>
    <BackgroundDecor />

    <div className="
      relative z-10
      w-full max-w-7xl
      mx-auto
    ">

      {/* Heading */}
      <div className="
        w-full
        mb-6 sm:mb-8
        text-center sm:text-left
      ">
        <p className="
          text-indigo-600
          text-[10px] sm:text-xs
          font-bold uppercase
          tracking-[2px] sm:tracking-[3px]
          mb-2 sm:mb-3
        ">
          Developer Community
        </p>

        <h1 className="
          text-2xl sm:text-3xl md:text-4xl
          font-extrabold
          text-slate-800
          tracking-tight
        ">
          Discover Developers
        </h1>

        <p className="
          text-slate-500
          mt-2
          text-sm sm:text-base
          max-w-md
          mx-auto sm:mx-0
          leading-6
        ">
          Find your next connection in the developer community.
        </p>
      </div>

      {/* Profile Card */}
      <div className="
        w-full min-w-0
        flex justify-center items-start
        mt-5 sm:mt-8 md:-mt-36
        pb-8
        px-0 sm:px-3
      ">
        {feed?.length > 0 && (
          <UserCard user={feed[0]} />
        )}
      </div>

    </div>
  </div>
);

};

export default Feed;

