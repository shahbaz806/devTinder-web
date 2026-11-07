
import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

import {
  UserRound,
  Camera,
  Save,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Image,
  CalendarDays,
  VenusAndMars,
  FileText,
} from "lucide-react";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [photoError, setPhotoError] = useState("");
  const [gender, setGender] = useState(user.gender || "");
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");

  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // Profile photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPhotoError("");

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please select a valid image.");
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      setPhotoError("Image size must be less than 1 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPhotoUrl(reader.result);
      }
    };

    reader.onerror = () => {
      setPhotoError("Unable to read image.");
    };

    reader.readAsDataURL(file);
  };

  // Save profile
  const saveProfile = async () => {
    setError("");
    setToast(false);

    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required.");
      return;
    }

    if (age && (Number(age) < 18 || Number(age) > 100)) {
      setError("Please enter a valid age.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          gender,
          age: age === "" ? undefined : Number(age),
          about,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));

      setToast(true);

      setTimeout(() => {
        setToast(false);
      }, 3000);

    } catch (e) {
      setError(
        e.response?.data?.message ||
        e.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  // Theme-aware input styles
  const inputClass = `
    w-full rounded-xl
    border border-base-300
    bg-base-100
    px-4 py-3
    text-sm text-base-content
    outline-none
    transition-all duration-200
    placeholder:text-base-content/40
    focus:border-indigo-500
    focus:ring-4 focus:ring-indigo-500/10
  `;

  const labelClass = `
    mb-2 flex items-center gap-2
    text-sm font-semibold text-base-content/80
  `;

  return (
    <div className="w-full">

      {/* Section Heading */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <div className="mb-2 flex items-center gap-2 text-indigo-500">
            <Sparkles size={17} />

            <span className="text-xs font-bold uppercase tracking-widest">
              Profile Settings
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content">
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

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Edit Form */}
        <div className="lg:col-span-7">

          <div className="rounded-2xl border border-base-300 bg-base-100 p-5 sm:p-7 shadow-sm transition-colors duration-300">

            {/* Form Header */}
            <div className="mb-7 flex items-center gap-3 border-b border-base-300 pb-5">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                <UserRound size={22} />
              </div>

              <div>
                <h3 className="font-bold text-base-content">
                  Personal Information
                </h3>

                <p className="text-xs text-base-content/50 mt-1">
                  Keep your profile information up to date.
                </p>
              </div>
            </div>

            <div className="space-y-5">

              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

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
              <div>
                <label className={labelClass}>
                  <Camera size={15} className="text-indigo-500" />
                  Profile Photo
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-5 rounded-xl border border-base-300 bg-base-200/50 p-4">

                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-base-100 shadow-md bg-base-300">
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

                {photoError && (
                  <p className="mt-2 text-sm text-red-500">
                    {photoError}
                  </p>
                )}
              </div>

              {/* Gender & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

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

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={saveProfile}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Saving Profile...
                  </>
                ) : (
                  <>
                    <Save size={19} />
                    Save Changes
                  </>
                )}
              </button>

            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-5">

          <div className="mb-4 flex items-center gap-2">
            <Image size={19} className="text-indigo-500" />

            <h3 className="font-bold text-base-content">
              Live Profile Preview
            </h3>
          </div>

          <div className="rounded-2xl border border-base-300 bg-base-200/70 p-4 sm:p-5 transition-colors duration-300">

            <div className="mb-4 flex items-center gap-2 text-xs font-medium text-indigo-500">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Preview updates as you type
            </div>

            <div className="flex justify-center">
              <UserCard
                user={{
                  ...user,
                  firstName,
                  lastName,
                  photoUrl,
                  gender,
                  age,
                  about,
                }}
              />
            </div>
          </div>

          {/* Profile Tip */}
          <div className="mt-4 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm transition-colors duration-300">

            <div className="flex items-start gap-3">

              <div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-500">
                <Sparkles size={18} />
              </div>

              <div>
                <h4 className="text-sm font-bold text-base-content">
                  Profile Tip
                </h4>

                <p className="mt-1 text-xs leading-5 text-base-content/60">
                  Use a clear profile photo and write a meaningful introduction
                  to help other developers understand your interests.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Success Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 z-[100] -translate-x-1/2 px-4">

          <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-base-200 px-5 py-4 shadow-xl">

            <CheckCircle2 className="text-green-500" size={22} />

            <div>
              <p className="text-sm font-bold text-base-content">
                Profile Updated!
              </p>

              <p className="text-xs text-base-content/60">
                Your changes have been saved successfully.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default EditProfile;
