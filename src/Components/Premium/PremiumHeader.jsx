
import React from "react";
import { Sparkles, ShieldCheck, Users, Lock } from "lucide-react";

const PremiumHeader = () => {
  return (
    <div className="mb-14 text-center">
      {/* Premium Badge */}
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-base-200 px-5 py-2 text-sm font-bold text-primary shadow-sm">
        <Sparkles size={17} />
        DEV TINDER PREMIUM
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-black tracking-tight text-base-content sm:text-5xl">
        Upgrade Your
        <span className="block bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
          Developer Journey
        </span>
      </h1>

      {/* Description */}
      <p className="mx-auto mt-5 max-w-2xl text-base-content/60">
        Connect with more developers, build meaningful relationships and unlock
        premium networking features.
      </p>

      {/* Features */}
      <div className="mt-7 flex flex-wrap justify-center gap-5 text-sm font-medium text-base-content/70">
        <span className="flex items-center gap-2">
          <ShieldCheck size={17} className="text-primary" />
          Secure Payments
        </span>

        <span className="flex items-center gap-2">
          <Users size={17} className="text-primary" />
          Developer Community
        </span>

        <span className="flex items-center gap-2">
          <Lock size={17} className="text-primary" />
          Secure Checkout
        </span>
      </div>
    </div>
  );
};

export default PremiumHeader;
