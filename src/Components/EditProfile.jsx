
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";

import EditProfileHeader from "./EditProfileHeader";
import ProfileForm from "./ProfileForm";
import ProfilePreview from "./ProfilePreview";
import ProfileToast from "./ProfileToast";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [gender, setGender] = useState(user.gender || "");
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");

  const [photoError, setPhotoError] = useState("");
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

    if (
      age !== "" &&
      (!Number.isFinite(Number(age)) ||
        Number(age) < 18 ||
        Number(age) > 100)
    ) {
      setError("Please enter a valid age.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          photoUrl,
          gender,
          age: age === "" ? undefined : Number(age),
          about: about.trim(),
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));
      setToast(true);

      setTimeout(() => setToast(false), 3000);
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-base-100 px-4 py-7 transition-colors duration-300 sm:px-6 sm:py-10 lg:px-8">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl">

        {/* Header */}
        <EditProfileHeader />

        {/* Main Content */}
        <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">

          {/* Profile Form */}
          <section className="min-w-0 lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-200/70 shadow-sm sm:rounded-3xl">
              <ProfileForm
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
                error={error}
                loading={loading}
                saveProfile={saveProfile}
              />
            </div>
          </section>

          {/* Live Profile Preview */}
          <aside className="min-w-0 lg:sticky lg:top-24 lg:col-span-5">
            <ProfilePreview
              user={user}
              firstName={firstName}
              lastName={lastName}
              photoUrl={photoUrl}
              gender={gender}
              age={age}
              about={about}
            />
          </aside>
        </div>

        {/* Footer Note */}
        <div className="mt-8 border-t border-base-300 pt-5">
          <p className="text-center text-xs leading-relaxed text-base-content/40">
            Your profile represents you in the DevTinder community.
            Keep it authentic and up to date.
          </p>
        </div>
      </div>

      <ProfileToast show={toast} />
    </main>
  );
};

export default EditProfile;
