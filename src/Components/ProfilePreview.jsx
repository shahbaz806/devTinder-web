import React from "react";
import { Image, Sparkles } from "lucide-react";
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
    <div>
      <div className="mb-4 flex items-center gap-2">
        <Image size={19} className="text-indigo-500" />

        <h3 className="font-bold text-base-content">Live Profile Preview</h3>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-200/70 p-4 transition-colors duration-300 sm:p-5">
        <div className="mb-4 flex items-center gap-2 text-xs font-medium text-indigo-500">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          Preview updates as you type
        </div>

        <div className="flex justify-center">
          <UserCard user={previewUser} />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm transition-colors duration-300">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-500">
            <Sparkles size={18} />
          </div>

          <div>
            <h4 className="text-sm font-bold text-base-content">Profile Tip</h4>

            <p className="mt-1 text-xs leading-5 text-base-content/60">
              Use a clear profile photo and write a meaningful introduction to
              help other developers understand your interests.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
