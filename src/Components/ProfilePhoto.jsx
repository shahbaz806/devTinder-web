
import React from "react";
import { Camera, ImagePlus, ShieldCheck } from "lucide-react";

const ProfilePhoto = ({
  firstName,
  photoUrl,
  photoError,
  handlePhotoChange,
}) => {
  const initial = firstName?.trim()?.charAt(0)?.toUpperCase() || "D";

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

        {/* Photo Preview */}
        <div className="relative mx-auto shrink-0 sm:mx-0">
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-base-100 bg-base-300 shadow-lg ring-1 ring-base-300">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={`${firstName || "User"} profile`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-primary/10 font-serif text-4xl text-primary">
                {initial}
              </div>
            )}
          </div>

          <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-base-100 bg-primary text-primary-content shadow-md">
            <Camera size={14} />
          </div>
        </div>

        {/* Upload Details */}
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h3 className="font-semibold text-base-content">
            Your profile picture
          </h3>

          <p className="mt-1 text-xs leading-5 text-base-content/50">
            Make your profile recognizable with a clear photo.
            You can change it anytime.
          </p>

          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
            <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-content shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <ImagePlus size={16} />
              {photoUrl ? "Change Photo" : "Upload Photo"}

              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>

            <span className="text-[11px] text-base-content/45">
              Maximum file size: 1 MB
            </span>
          </div>
        </div>
      </div>

      {/* Upload Guidelines */}
      <div className="mt-5 flex items-start gap-2 rounded-xl border border-base-300 bg-base-100/70 p-3">
        <ShieldCheck
          size={16}
          className="mt-0.5 shrink-0 text-primary"
        />

        <p className="text-[11px] leading-5 text-base-content/55">
          Supported formats: JPG, JPEG, PNG and other browser-supported
          image formats. Your photo will appear on your developer profile.
        </p>
      </div>

      {/* Error */}
      {photoError && (
        <p
          role="alert"
          className="mt-3 rounded-xl border border-error/20 bg-error/10 px-4 py-3 text-xs font-medium text-error"
        >
          {photoError}
        </p>
      )}
    </div>
  );
};

export default ProfilePhoto;
