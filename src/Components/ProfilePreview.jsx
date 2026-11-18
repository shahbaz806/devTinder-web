
import React from "react";
import {
  Image,
  Sparkles,
  Eye,
  CheckCircle2,
} from "lucide-react";

import UserCard from "./UserCard";

const ProfilePreview = ({
  user,
  firstName,
  lastName,
  photoUrl,
  gender,
  age,
  about,
}) => {
  const previewUser = {
    ...user,
    firstName,
    lastName,
    photoUrl,
    gender,
    age,
    about,
  };

  return (
    <div className="space-y-5">

      {/* Preview Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Eye size={17} />
            </div>

            <div>
              <h3 className="font-serif text-lg font-bold text-base-content">
                Live Preview
              </h3>

              <p className="text-[11px] text-base-content/45">
                Your public profile appearance
              </p>
            </div>
          </div>
        </div>

        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[10px] font-bold text-primary">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          LIVE
        </span>
      </div>

      {/* Preview Card Container */}
      <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-200/70 p-3 transition-colors duration-300 sm:p-4">

        {/* Preview Label */}
        <div className="mb-4 flex items-center gap-2 border-b border-base-300 pb-3">
          <Image size={15} className="text-primary" />

          <p className="text-xs font-semibold text-base-content/65">
            How developers see your profile
          </p>
        </div>

        {/* User Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm">
            <UserCard user={previewUser} />
          </div>
        </div>

        {/* Preview Footer */}
        <div className="mt-4 flex items-center justify-center gap-2 border-t border-base-300 pt-3">
          <CheckCircle2 size={14} className="text-primary" />

          <p className="text-[11px] text-base-content/50">
            Changes appear here as you edit.
          </p>
        </div>
      </div>

      {/* Profile Tip */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-primary/5 p-4">
        <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/10 blur-2xl" />

        <div className="relative flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles size={18} />
          </div>

          <div>
            <h4 className="text-sm font-bold text-base-content">
              Make your profile stand out
            </h4>

            <p className="mt-1 text-xs leading-5 text-base-content/55">
              Add a clear profile photo, write a meaningful introduction
              and mention your interests to help other developers connect
              with you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
