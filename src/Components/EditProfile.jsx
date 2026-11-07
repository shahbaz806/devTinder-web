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

      setTimeout(() => setToast(false), 3000);
    } catch (e) {
      setError(
        e.response?.data?.message || e.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <EditProfileHeader />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
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

        <div className="lg:col-span-5">
          <ProfilePreview
            user={user}
            firstName={firstName}
            lastName={lastName}
            photoUrl={photoUrl}
            gender={gender}
            age={age}
            about={about}
          />
        </div>
      </div>

      <ProfileToast show={toast} />
    </div>
  );
};

export default EditProfile;
