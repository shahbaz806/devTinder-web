import React from "react";
import { UserRound, AlertCircle, Save, Loader2 } from "lucide-react";
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
    <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm transition-colors duration-300 sm:p-7">
      <div className="mb-7 flex items-center gap-3 border-b border-base-300 pb-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
          <UserRound size={22} />
        </div>

        <div>
          <h3 className="font-bold text-base-content">Personal Information</h3>
          <p className="mt-1 text-xs text-base-content/50">
            Keep your profile information up to date.
          </p>
        </div>
      </div>

      <div className="space-y-5">
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

        {error && (
          <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            {error}
          </div>
        )}

        <button
          type="button"
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
  );
};

export default ProfileForm;
