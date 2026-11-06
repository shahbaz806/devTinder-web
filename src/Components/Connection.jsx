// import axios from "axios";
// import React, { useEffect } from "react";
// import { BASE_URL } from "../utils/constant";
// import { useDispatch, useSelector } from "react-redux";
// import { addConnection } from "../utils/connectionSlice";
// import { Link } from "react-router-dom";

// const Connection = () => {
//   const connection = useSelector((store) => store.connections);
//   const dispatch = useDispatch();
//   const fetchConnections = async () => {
//     try {
//       const res = await axios.get(BASE_URL + "/user/connection", {
//         withCredentials: true,
//       });
//       console.log(res?.data?.data);
//       dispatch(addConnection(res?.data?.data));
//     } catch (err) {}
//   };

//   useEffect(() => {
//     fetchConnections();
//   }, []);

//   if (!connection) return;
//   if (connection.length === 0) return <h1>No Connection Found</h1>;

//   return (
//     <div className=" text-center my-10">
//       <h1 className="text-bold text-white text-3xl">Connections</h1>

//       {connection.map((conn, indx) => {
//         const { _id, firstName, lastName, photoUrl, age, gender, about } = conn;
//         return (
//           <div
//             key={_id}
//             className="flex items-center flex-row m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
//           >
//             <div>
//               <img
//                 className="w-20 h-20 rounded-full"
//                 src={photoUrl}
//                 alt="photo"
//               />
//             </div>
//             <div className="text-left mx-4">
//               <h2 className="font-bold text-xl">
//                 {firstName + " " + lastName}
//               </h2>
//               {age && gender && <p>{age + ", " + gender}</p>}
//               <p>{about}</p>
//             </div>
//             <div className="mx-auto  ">
//               <Link to={"/chat/" + _id}>
//                 <button className=" btn btn-primary">Chat</button>
//               </Link>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Connection;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Users,
  MessageCircle,
  Code2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { BASE_URL } from "../utils/constant";
import { addConnection } from "../utils/connectionSlice";

const Connection = () => {
  const connection = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(BASE_URL + "/user/connection", {
          withCredentials: true,
        });

        dispatch(addConnection(res?.data?.data || []));
      } catch (err) {
        console.error("Connection Error:", err);
        setError("Unable to load connections. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchConnections();
  }, [dispatch]);

  const backgroundStyle =
    "relative isolate overflow-hidden min-h-[calc(100svh-160px)] bg-[#F8F8FF] bg-[radial-gradient(circle_at_15%_20%,rgba(129,140,248,0.16),transparent_28%),radial-gradient(circle_at_85%_75%,rgba(167,139,250,0.15),transparent_30%),linear-gradient(135deg,#FAFAFF,#F3F2FF,#F8FAFF)]";

  const BackgroundDecor = () => (
    <>
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-40 bg-[radial-gradient(circle,rgba(129,140,248,0.45)_1.5px,transparent_2px)] bg-[size:30px_30px]" />

      <div className="absolute -left-28 top-1/4 -z-10 w-80 h-80 rounded-full border border-indigo-200/50 pointer-events-none" />

      <div className="absolute -right-28 bottom-10 -z-10 w-80 h-80 rounded-full border border-indigo-200/50 pointer-events-none" />

      <div className="absolute top-20 right-1/4 -z-10 w-64 h-64 rounded-full bg-indigo-200/20 blur-3xl pointer-events-none" />
    </>
  );

  // Loading
  if (loading) {
    return (
      <div className={`${backgroundStyle} flex items-center justify-center`}>
        <BackgroundDecor />

        <div className="relative z-10 text-center">
          <div className="w-11 h-11 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />

          <h2 className="text-lg font-semibold text-slate-700">
            Loading Connections...
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Finding your developer community.
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className={`${backgroundStyle} flex items-center justify-center px-4`}>
        <BackgroundDecor />

        <div className="relative z-10 bg-white/90 rounded-3xl p-8 text-center shadow-xl max-w-md w-full">
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Something went wrong
          </h2>

          <p className="text-slate-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Empty Connections
  if (!connection || connection.length === 0) {
    return (
      <div className={`${backgroundStyle} flex items-center justify-center px-4 py-10`}>
        <BackgroundDecor />

        <div className="relative z-10 max-w-md w-full text-center bg-white/90 backdrop-blur-md border border-white rounded-3xl p-8 md:p-10 shadow-xl shadow-indigo-100/60">
          <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mx-auto mb-6">
            <Users size={36} className="text-indigo-600" />
          </div>

          <h1 className="text-2xl font-bold text-slate-800 mb-3">
            No Connections Yet
          </h1>

          <p className="text-slate-500 text-sm leading-6 mb-7">
            Your developer network starts here. Discover developers and
            build meaningful connections.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-lg shadow-indigo-200"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles size={15} />
            Developer Community
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
            Your Connections
          </h1>

          <p className="text-slate-500 mt-3 text-sm md:text-base">
            Connect, communicate and grow together.
          </p>

          <div className="inline-flex items-center gap-2 mt-5 px-5 py-2 rounded-full bg-white border border-indigo-100 shadow-sm">
            <Users size={17} className="text-indigo-600" />

            <span className="text-sm font-semibold text-slate-700">
              {connection.length} Connections
            </span>
          </div>
        </div>

        {/* Connection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {connection.map((conn) => {
            const {
              _id,
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
            } = conn;

            return (
              <div
                key={_id}
                className="group bg-white/90 backdrop-blur-sm border border-white rounded-2xl p-5 shadow-md shadow-indigo-100/40 hover:shadow-xl hover:shadow-indigo-100/70 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4">

                  {/* Profile Image */}
                  <div className="shrink-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-indigo-100 bg-indigo-50">
                      <img
                        src={photoUrl}
                        alt={`${firstName} ${lastName}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Profile Details */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-slate-800 truncate group-hover:text-indigo-600 transition">
                      {firstName} {lastName}
                    </h2>

                    {(age || gender) && (
                      <p className="text-xs text-slate-500 mt-1 capitalize">
                        {age && `${age} years`}
                        {age && gender && " · "}
                        {gender}
                      </p>
                    )}

                    <p className="text-sm text-slate-500 mt-2 line-clamp-2 leading-5">
                      {about || "Developer and technology enthusiast."}
                    </p>
                  </div>
                </div>

                {/* Chat Button */}
                <div className="mt-5">
                  <Link
                    to={`/chat/${_id}`}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-md shadow-indigo-200 group-hover:shadow-lg"
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
          <div className="inline-flex items-center gap-2 text-slate-400 text-xs">
            <Code2 size={15} />
            Keep building meaningful connections.
          </div>
        </div>

      </div>
    </div>
  );
};

export default Connection;
