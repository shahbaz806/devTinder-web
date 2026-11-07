import React from "react";
import { UserRound, Sparkles } from "lucide-react";

const EditProfileHeader = () => {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="mb-2 flex items-center gap-2 text-indigo-500">
          <Sparkles size={17} />

          <span className="text-xs font-bold uppercase tracking-widest">
            Profile Settings
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-base-content sm:text-3xl">
          Edit Your Profile
        </h2>

        <p className="mt-2 text-sm text-base-content/60">
          Update your information and make your developer profile stand out.
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-indigo-500/20 bg-indigo-500/10 px-4 py-3">
        <UserRound className="text-indigo-500" size={20} />

        <span className="text-sm font-semibold text-indigo-500">
          Personal Details
        </span>
      </div>
    </div>
  );
};

export default EditProfileHeader;
