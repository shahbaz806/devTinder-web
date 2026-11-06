import React from "react";
import { Sparkles, ShieldCheck, Users, Lock } from "lucide-react";

const PremiumHeader = () => {
  return (
    <div className="mb-14 text-center">
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-5 py-2 text-sm font-bold text-violet-700 shadow-sm">
        <Sparkles size={17} />
        DEV TINDER PREMIUM
      </div>

      <h1 className="text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
        Upgrade Your
        <span className="block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
          Developer Journey
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-gray-500">
        Connect with more developers, build meaningful relationships and unlock
        premium networking features.
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-5 text-sm font-medium text-gray-500">
        <span className="flex items-center gap-2">
          <ShieldCheck size={17} className="text-violet-600" />
          Secure Payments
        </span>

        <span className="flex items-center gap-2">
          <Users size={17} className="text-violet-600" />
          Developer Community
        </span>

        <span className="flex items-center gap-2">
          <Lock size={17} className="text-violet-600" />
          Secure Checkout
        </span>
      </div>
    </div>
  );
};

export default PremiumHeader;
