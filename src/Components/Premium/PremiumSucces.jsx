import React from "react";
import { Crown, BadgeCheck } from "lucide-react";

const PremiumSuccess = ({ memberShipType }) => {
  return (
    <div className="relative flex min-h-[calc(100vh-80px)] items-center justify-center bg-gradient-to-br from-[#faf8ff] via-[#f3edff] to-[#eef2ff] px-4">
      <div className="w-full max-w-lg rounded-[32px] border border-white bg-white/90 p-10 text-center shadow-2xl shadow-violet-200/50">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-300 to-yellow-500 text-white shadow-lg">
          <Crown size={48} />
        </div>

        <BadgeCheck size={32} className="mx-auto mb-3 text-violet-600" />

        <h1 className="text-3xl font-extrabold text-gray-800">
          You're Premium!
        </h1>

        <p className="mt-3 text-gray-500">
          Welcome to the DevTinder Premium community.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-violet-100 px-5 py-3 font-bold capitalize text-violet-700">
          <Crown size={18} />
          {memberShipType || "Premium"} Member
        </div>
      </div>
    </div>
  );
};

export default PremiumSuccess;
