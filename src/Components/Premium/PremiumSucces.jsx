
import React from "react";
import { Crown, BadgeCheck, Sparkles } from "lucide-react";

const PremiumSuccess = ({ memberShipType }) => {
  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-base-100 px-4 py-10 text-base-content transition-colors duration-300">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute left-10 top-20 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Success Card */}
      <div className="relative w-full max-w-lg rounded-[32px] border border-base-300 bg-base-200 p-8 text-center shadow-2xl shadow-indigo-500/10 transition-colors duration-300 sm:p-10">

        {/* Premium Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-300 to-yellow-500 text-white shadow-lg shadow-amber-500/20">
          <Crown size={48} />
        </div>

        {/* Success Badge */}
        <BadgeCheck
          size={34}
          className="mx-auto mb-3 text-primary"
        />

        {/* Heading */}
        <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
          You're Premium!
        </h1>

        {/* Description */}
        <p className="mt-3 text-base-content/60">
          Welcome to the DevTinder Premium community.
        </p>

        {/* Membership Badge */}
        <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-3 font-bold capitalize text-primary">
          <Crown size={18} />
          {memberShipType || "Premium"} Member
        </div>

        {/* Footer Message */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-base-content/50">
          <Sparkles size={16} className="text-amber-500" />
          Enjoy your premium developer journey!
        </div>
      </div>
    </div>
  );
};

export default PremiumSuccess;
