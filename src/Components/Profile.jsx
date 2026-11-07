
import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import { UserRound, Sparkles } from "lucide-react";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100 text-base-content transition-colors duration-300">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-base-content/60 font-medium">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-base-100 px-4 py-10 sm:px-6 transition-colors duration-300">

      {/* Background Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Decorative Circles */}
      <div className="absolute -top-24 -right-20 w-80 h-80 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Profile Header */}
        <div className="mb-8 text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200 border border-base-300 shadow-sm text-indigo-500 text-sm font-semibold mb-4 transition-colors duration-300">
            <Sparkles size={16} />
            Your Personal Space
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <UserRound size={25} className="text-white" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content">
              My Profile
            </h1>
          </div>

          <p className="text-base-content/60 mt-3 max-w-lg mx-auto">
            Manage your developer identity, update your information
            and make your profile stand out.
          </p>
        </div>

        {/* Edit Profile Card */}
        <div className="bg-base-200/90 backdrop-blur-xl border border-base-300 rounded-3xl shadow-xl shadow-slate-950/10 p-3 sm:p-6 transition-colors duration-300">
          <EditProfile user={user} />
        </div>

      </div>
    </div>
  );
};

export default Profile;
