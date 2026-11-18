
import React from "react";
import {
  UserRound,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const EditProfileHeader = () => {
  return (
    <header className="mb-8 flex flex-col gap-5 border-b border-base-300 pb-7 sm:flex-row sm:items-end sm:justify-between">

      {/* Heading */}
      <div className="max-w-2xl">
        <div className="mb-3 inline-flex items-center gap-2 text-primary">
          <Sparkles size={15} />

          <span className="text-[10px] font-bold uppercase tracking-[0.22em]">
            Profile Settings
          </span>
        </div>

        <h2 className="font-serif text-3xl font-semibold tracking-tight text-base-content sm:text-4xl">
          Edit your profile<span className="text-primary">.</span>
        </h2>

        <p className="mt-3 max-w-lg text-sm leading-6 text-base-content/55 sm:text-base">
          Update your personal information and build a developer profile
          that reflects who you are.
        </p>
      </div>

      {/* Personal Details Badge */}
      <div className="flex w-fit items-center gap-3 rounded-2xl border border-base-300 bg-base-200 px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <UserRound size={19} />
        </div>

        <div>
          <p className="text-xs font-bold text-base-content">
            Personal Details
          </p>

          <p className="mt-0.5 text-[10px] text-base-content/45">
            Manage your identity
          </p>
        </div>

        <ArrowUpRight
          size={15}
          className="ml-2 text-base-content/35"
        />
      </div>

    </header>
  );
};

export default EditProfileHeader;
