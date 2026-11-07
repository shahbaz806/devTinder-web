import React from "react";
import { Camera } from "lucide-react";

const ProfilePhoto = ({
  firstName,
  photoUrl,
  photoError,
  handlePhotoChange,
}) => {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-base-content/80">
        <Camera size={15} className="text-indigo-500" />
        Profile Photo
      </label>

      <div className="flex flex-col items-center gap-5 rounded-xl border border-base-300 bg-base-200/50 p-4 sm:flex-row">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-base-100 bg-base-300 shadow-md">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-indigo-500">
              {firstName?.charAt(0)?.toUpperCase() || "D"}
            </div>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20">
            <Camera size={17} />
            Choose Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>

          <p className="mt-2 text-xs text-base-content/50">
            JPG, PNG or other image formats. Maximum 1 MB.
          </p>
        </div>
      </div>

      {photoError && <p className="mt-2 text-sm text-red-500">{photoError}</p>}
    </div>
  );
};

export default ProfilePhoto;
