// import axios from "axios";
// import React from "react";
// import { BASE_URL } from "../utils/constant";
// import { useDispatch } from "react-redux";
// import { removeUserFeed } from "../utils/feedSlice";

// const UserCard = ({ user }) => {
//   const dispatch = useDispatch();
//   const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

//   const handleSendRequest = async (status, userId) => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/request/send/" + status + "/" + userId,
//         {},
//         { withCredentials: true }
//       );
//       dispatch(removeUserFeed(userId));
//     } catch (e) {}
//   };

//   return (
//     <div>
//       <div className="card bg-base-300 w-80 max-w-[90vw] shadow-xl overflow-hidden">
//       <figure className="w-full h-72 overflow-hidden">
//     <img
//       src={photoUrl}
//       alt={`${firstName} ${lastName}`}
//       className="w-full h-full object-cover object-center"
//     />
//   </figure>
//         <div className="card-body">
//           <h2 className="card-title">{firstName + " " + lastName}</h2>
//           {age && gender && <p>{age + ", " + gender} </p>}
//           <p>{about}</p>
//           <div className="card-actions justify-center my-4">
//             <button
//               className="btn btn-primary"
//               onClick={() => handleSendRequest("ignored", _id)}
//             >
//               Ignore
//             </button>
//             <button
//               className="btn btn-secondary"
//               onClick={() => handleSendRequest("interested", _id)}
//             >
//               Interested
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;

// import axios from "axios";
// import React, { useState } from "react";
// import { BASE_URL } from "../utils/constant";
// import { useDispatch } from "react-redux";
// import { removeUserFeed } from "../utils/feedSlice";

// const UserCard = ({ user }) => {
//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
//     user;

//   const handleSendRequest = async (status, userId) => {
//     try {
//       setLoading(true);
//       setError("");

//       await axios.post(
//         BASE_URL + "/request/send/" + status + "/" + userId,
//         {},
//         { withCredentials: true }
//       );

//       dispatch(removeUserFeed(userId));
//     } catch (e) {
//       console.error("Request Error:", e);
//       setError("Unable to send request. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

// return (

//     <div className="bg-[#24334B] border border-[#3B4D68]
//       rounded-xl overflow-hidden shadow-lg">

//       {/* Image */}
//       <div className="h-[165px] sm:h-[180px] bg-[#34445D]">
//         <img
//           src={photoUrl}
//           alt={`${firstName} ${lastName}`}
//           className="w-full h-full object-cover object-center"
//         />
//       </div>

//       {/* Details */}
//       <div className="p-4">

//         <h2 className="text-xl font-semibold text-white">
//           {firstName} {lastName}
//         </h2>

//         {(age || gender) && (
//           <p className="text-sm text-slate-300 mt-1">
//             {age && `${age} years`}
//             {age && gender && " · "}
//             {gender}
//           </p>
//         )}

//         <p className="text-sm text-slate-300 leading-5 mt-3 line-clamp-2">
//           {about || "No bio available."}
//         </p>

//         {skills?.length > 0 && (
//           <div className="flex flex-wrap gap-2 mt-3">
//             {skills.slice(0, 4).map((skill, index) => (
//               <span
//                 key={index}
//                 className="text-xs px-2.5 py-1 rounded-md
//                 bg-[#34445D] text-purple-200"
//               >
//                 {skill}
//               </span>
//             ))}
//           </div>
//         )}

//         <div className="flex gap-3 mt-4 pt-3 border-t border-[#3B4D68]">

//           <button
//             disabled={loading}
//             onClick={() => handleSendRequest("ignored", _id)}
//             className="flex-1 py-2 rounded-lg border
//             border-slate-400 text-white hover:bg-[#34445D]
//             disabled:opacity-50"
//           >
//             Ignore
//           </button>

//           <button
//             disabled={loading}
//             onClick={() => handleSendRequest("interested", _id)}
//             className="flex-1 py-2 rounded-lg bg-violet-500
//             text-white hover:bg-violet-600
//             disabled:opacity-50"
//           >
//             {loading ? "Please wait..." : "♥ Interested"}
//           </button>

//         </div>

//         {error && (
//           <p className="text-red-400 text-xs mt-2">{error}</p>
//         )}

//       </div>
//     </div>
// );

// };

// export default UserCard;

import axios from "axios";
import { useState } from "react";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

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
    <div
      className="w-full max-w-[370px] bg-white
      rounded-2xl overflow-hidden border border-slate-200
      shadow-lg shadow-slate-200/60 transition duration-300
      hover:shadow-xl"
    >
      {/* Profile Image */}
      {/* <div className="w-full h-full  overflow-hidden sm:h-[250px] bg-slate-100 overflow-hidden">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-[100%] object-cover object- "
        />
      </div> */}
      
{/* Profile Image */}
<div className="
  relative
  w-full
  h-[230px]
  min-[400px]:h-[260px]
  sm:h-[300px]
  md:h-[240px]
  overflow-hidden
  bg-[#EFECFF]
">
  {photoUrl ? (
    <img
      src={photoUrl}
      alt={`${firstName} ${lastName}`}
      loading="lazy"
      className="
        block
        w-full h-full
        object-cover
        object-center
      "
    />
  ) : (
    <div className="
      w-full h-full
      flex items-center justify-center
      bg-gradient-to-br
      from-[#EFECFF] to-[#DDD6FE]
    ">
      <span className="
        text-6xl font-bold
        text-indigo-500
      ">
        {firstName?.charAt(0)?.toUpperCase() || "D"}
      </span>
    </div>
  )}

  {/* <div className="
    absolute top-3 left-3
    bg-white/90 backdrop-blur-md
    border border-white/70
    rounded-full
    px-3 py-1.5
    text-xs font-bold
    text-indigo-600
  ">
    Developer
  </div> */}
</div>



      {/* Profile Details */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-slate-800">
          {firstName} {lastName}
        </h2>

        {(age || gender) && (
          <p className="text-sm text-slate-500 mt-1 capitalize">
            {age && `${age} years`}
            {age && gender && " · "}
            {gender}
          </p>
        )}

        <div className="mt-4">
          <p className="text-sm text-slate-600 leading-6 line-clamp-2">
            {about || "No bio available."}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            disabled={loading}
            onClick={() => handleSendRequest("ignored", _id)}
            className="flex-1 py-3 rounded-xl border
    border-slate-300 text-slate-600 font-semibold
    hover:bg-slate-100 transition
    disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && activeButton === "ignored"
              ? "Please wait..."
              : "Ignore"}
          </button>

          <button
            disabled={loading}
            onClick={() => handleSendRequest("interested", _id)}
            className="flex-1 py-3 rounded-xl bg-indigo-600
    text-white font-semibold hover:bg-indigo-700
    shadow-sm transition
    disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading && activeButton === "interested"
              ? "Please wait..."
              : "♥ Interested"}
          </button>
        </div>

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default UserCard;
