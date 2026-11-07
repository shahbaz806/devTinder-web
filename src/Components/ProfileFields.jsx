import React from "react";
import { User, VenusAndMars, CalendarDays, FileText } from "lucide-react";

import ProfilePhoto from "./ProfilePhoto";

const ProfileFields = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  gender,
  setGender,
  age,
  setAge,
  about,
  setAbout,
  photoUrl,
  photoError,
  handlePhotoChange,
}) => {
  const inputClass = `
    w-full rounded-xl border border-base-300 bg-base-100
    px-4 py-3 text-sm text-base-content outline-none
    transition-all duration-200 placeholder:text-base-content/40
    focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10
  `;

  const labelClass =
    "mb-2 flex items-center gap-2 text-sm font-semibold text-base-content/80";

  return (
    <div className="space-y-5">
      {/* Name Fields */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>
            <User size={15} className="text-indigo-500" />
            First Name
          </label>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            <User size={15} className="text-indigo-500" />
            Last Name
          </label>

          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            className={inputClass}
          />
        </div>
      </div>

      {/* Profile Photo */}
      <ProfilePhoto
        firstName={firstName}
        photoUrl={photoUrl}
        photoError={photoError}
        handlePhotoChange={handlePhotoChange}
      />

      {/* Gender and Age */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass}>
            <VenusAndMars size={15} className="text-indigo-500" />
            Gender
          </label>

          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            placeholder="Enter gender"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>
            <CalendarDays size={15} className="text-indigo-500" />
            Age
          </label>

          <input
            type="number"
            min="18"
            max="100"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
            className={inputClass}
          />
        </div>
      </div>

      {/* About */}
      <div>
        <label className={labelClass}>
          <FileText size={15} className="text-indigo-500" />
          About You
        </label>

        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Tell other developers about yourself, your skills and interests..."
          rows={5}
          className={`${inputClass} resize-none`}
        />

        <div className="mt-2 text-right text-xs text-base-content/40">
          {about.length} characters
        </div>
      </div>
    </div>
  );
};

export default ProfileFields;
