
import React from "react";
import {
  User,
  VenusAndMars,
  CalendarDays,
  FileText,
} from "lucide-react";

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
    transition-all duration-200
    placeholder:text-base-content/35
    hover:border-base-content/20
    focus:border-primary focus:ring-4 focus:ring-primary/10
  `;

  const labelClass =
    "mb-2.5 flex items-center gap-2 text-xs font-bold tracking-wide text-base-content/75";

  const iconClass = "text-primary";

  return (
    <div className="space-y-6">

      {/* Name Fields */}
      <section>
        <div className="mb-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
            Basic Information
          </p>
          <p className="mt-1 text-xs text-base-content/45">
            Tell the community what to call you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* First Name */}
          <div>
            <label className={labelClass}>
              <User size={15} className={iconClass} />
              First Name
            </label>

            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
              autoComplete="given-name"
              maxLength={50}
              className={inputClass}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className={labelClass}>
              <User size={15} className={iconClass} />
              Last Name
            </label>

            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
              autoComplete="family-name"
              maxLength={50}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Profile Photo */}
      <section className="rounded-2xl border border-base-300 bg-base-200/50 p-4 sm:p-5">
        <div className="mb-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
            Profile Appearance
          </p>
          <p className="mt-1 text-xs text-base-content/45">
            Choose a photo that represents you.
          </p>
        </div>

        <ProfilePhoto
          firstName={firstName}
          photoUrl={photoUrl}
          photoError={photoError}
          handlePhotoChange={handlePhotoChange}
        />
      </section>

      {/* Gender and Age */}
      <section>
        <div className="mb-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
            Personal Details
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {/* Gender */}
          <div>
            <label className={labelClass}>
              <VenusAndMars size={15} className={iconClass} />
              Gender
            </label>

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className={`${inputClass} cursor-pointer`}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className={labelClass}>
              <CalendarDays size={15} className={iconClass} />
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
      </section>

      {/* About */}
      <section>
        <div className="mb-3">
          <label className={labelClass}>
            <FileText size={15} className={iconClass} />
            About You
          </label>

          <p className="text-xs text-base-content/45">
            Introduce yourself to other developers.
          </p>
        </div>

        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Tell other developers about yourself, your skills and interests..."
          rows={5}
          maxLength={500}
          className={`${inputClass} resize-none leading-6`}
        />

        <div className="mt-2 flex items-center justify-between">
          <p className="text-[10px] text-base-content/40">
            Keep it clear and interesting.
          </p>

          <span className="text-xs tabular-nums text-base-content/45">
            {about.length}/500
          </span>
        </div>
      </section>
    </div>
  );
};

export default ProfileFields;
