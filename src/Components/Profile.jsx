
import React from "react";
import { useSelector } from "react-redux";
import { UserRound, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  // Loading State
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-base-100 px-4 text-base-content">
        <div className="text-center">
          <div className="mx-auto h-11 w-11 animate-spin rounded-full border-[3px] border-primary/20 border-t-primary" />

          <p className="mt-4 text-sm font-medium text-base-content/60">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-base-100 px-4 py-10 transition-colors duration-300 sm:px-6 lg:py-14">

      {/* Background Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-9"
        >
          <div className="flex flex-col items-center text-center">

            {/* Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-bold tracking-wide text-primary">
              <Sparkles size={14} />
              YOUR PERSONAL SPACE
            </div>

            {/* Heading */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-content shadow-lg shadow-primary/20">
                <UserRound size={24} />
              </div>

              <h1 className="font-serif text-3xl font-bold tracking-tight text-base-content sm:text-5xl">
                My Profile<span className="text-primary">.</span>
              </h1>
            </div>

            <p className="mt-4 max-w-xl text-sm leading-7 text-base-content/55 sm:text-base">
              Your developer identity starts here. Keep your information
              updated and let the community know more about you.
            </p>

            {/* Profile Status */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200 px-3 py-2">
              <ShieldCheck size={15} className="text-primary" />
              <span className="text-xs font-medium text-base-content/65">
                Manage your profile information
              </span>
            </div>
          </div>

          <div className="mx-auto mt-8 h-px max-w-4xl bg-gradient-to-r from-transparent via-base-content/15 to-transparent" />
        </motion.div>

        {/* Edit Profile Container */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="overflow-hidden rounded-3xl border border-base-300 bg-base-200/70 p-3 shadow-xl shadow-base-content/5 backdrop-blur-sm sm:p-6 lg:p-8"
        >
          <EditProfile user={user} />
        </motion.div>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs text-base-content/40">
          Your profile helps other developers get to know you better.
        </p>
      </div>
    </div>
  );
};

export default Profile;
