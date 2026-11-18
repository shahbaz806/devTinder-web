
import React from "react";
import {
  UserRound,
  AlertCircle,
  Save,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

import ProfileFields from "./ProfileFields";

const ProfileForm = (props) => {
  const {
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
    error,
    loading,
    saveProfile,
  } = props;

  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition-colors duration-300 sm:rounded-3xl sm:p-7 lg:p-8">

      {/* Form Header */}
      <div className="mb-7 flex items-center gap-3 border-b border-base-300 pb-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/15 bg-primary/10 text-primary">
          <UserRound size={22} />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-serif text-xl font-semibold text-base-content sm:text-2xl">
              Personal Information
            </h3>

            <Sparkles size={14} className="text-primary" />
          </div>

          <p className="mt-1 text-xs leading-relaxed text-base-content/50 sm:text-sm">
            Manage your details and make your profile yours.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <ProfileFields
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          gender={gender}
          setGender={setGender}
          age={age}
          setAge={setAge}
          about={about}
          setAbout={setAbout}
          photoUrl={photoUrl}
          photoError={photoError}
          handlePhotoChange={handlePhotoChange}
        />

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-xl border border-error/20 bg-error/10 p-4 text-sm text-error"
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />

            <p className="leading-relaxed">{error}</p>
          </div>
        )}

        {/* Save Button */}
        <div className="border-t border-base-300 pt-6">
          <button
            type="button"
            onClick={saveProfile}
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-content shadow-md shadow-primary/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <LoaderCircle size={19} className="animate-spin" />
                Saving Profile...
              </>
            ) : (
              <>
                <Save
                  size={18}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
                Save Changes
              </>
            )}
          </button>

          <p className="mt-3 text-center text-[10px] text-base-content/40 sm:text-xs">
            Your profile changes will be reflected across DevTinder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
