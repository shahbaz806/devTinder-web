// import React from 'react'

// import EditProfile from './EditProfile'
// import { useSelector } from "react-redux";

// const Profile = () => {
//   const user = useSelector((store)=> store.user)
//   return ( user && (
//     <div>
//       <EditProfile user={user}/>
//     </div>
//   )
// );
// };

// export default Profile


import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { UserRound, Sparkles } from "lucide-react";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f7ff]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-500 font-medium">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f8f7ff] via-[#f5f3ff] to-[#eef2ff] px-4 py-10 sm:px-6">

      {/* Background Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(#a78bfa 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Decorative Circles */}
      <div className="absolute -top-24 -right-20 w-80 h-80 rounded-full bg-violet-300/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-indigo-300/20 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Profile Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-violet-100 shadow-sm text-violet-700 text-sm font-semibold mb-4">
            <Sparkles size={16} />
            Your Personal Space
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-200">
              <UserRound size={25} className="text-white" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              My Profile
            </h1>
          </div>

          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Manage your developer identity, update your information
            and make your profile stand out.
          </p>
        </div>

        {/* Edit Profile Card */}
        <div className="bg-white/90 backdrop-blur-xl border border-white rounded-3xl shadow-[0_15px_60px_rgba(99,102,241,0.10)] p-3 sm:p-6">
          <EditProfile user={user} />
        </div>

      </div>
    </div>
  );
};

export default Profile;
