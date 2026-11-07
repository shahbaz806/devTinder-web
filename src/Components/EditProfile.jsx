// import React from "react";
// import { useState } from "react";
// import UserCard from "./UserCard";
// import axios from "axios";
// import { BASE_URL } from "../utils/constant";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";

// const EditProfile = ({ user }) => {
//   const [firstName, setFirstName] = useState(user.firstName);
//   const [lastName, setLastName] = useState(user.lastName);
//   const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
//   const [gender, setGender] = useState(user.gender);
//   const [age, setAge] = useState(user.age);
//   const [about, setAbout] = useState(user.about);
//   const [error, setError] = useState("");
//   const [toast, setToast] = useState(false);

//   const dispatch = useDispatch();

//   const saveProfile = async () => {
//     setError("");

//     try {
//       const res = await axios.patch(
//         BASE_URL + "/profile/edit",
//         {
//           firstName,
//           lastName,
//           photoUrl,
//           gender,
//           age,
//           about,
//         },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data.data));
//       setToast(true);

//        setTimeout(() => {
//         setToast(false);
//       }, 3000);
//     } catch (e) {
//       setError(e.response?.data?.message || e.message);
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center my-10">
//         <div className="flex justify-center mx-10">
//           <div className="card bg-base-300 w-96 shadow-sm">
//             <div className="card-body">
//               <h2 className="card-title justify-center">Profile Edit</h2>
//               <div>
//                 <fieldset className="fieldset my-2">
//                   <legend className="fieldset-legend">First Name</legend>
//                   <input
//                     type="text"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     className="input"
//                   />
//                 </fieldset>

//                 <fieldset className="fieldset my-2">
//                   <legend className="fieldset-legend">Last Name</legend>
//                   <input
//                     type="text"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     className="input"
//                   />
//                 </fieldset>

//                 <fieldset className="fieldset my-2">
//                   <legend className="fieldset-legend"> photoUrl</legend>
//                   <input
//                     type="text"
//                     value={photoUrl}
//                     onChange={(e) => setPhotoUrl(e.target.value)}
//                     className="input"
//                   />
//                 </fieldset>

//                 <fieldset className="fieldset my-2">
//                   <legend className="fieldset-legend">Gender</legend>
//                   <input
//                     type="text"
//                     value={gender || ""}
//                     onChange={(e) => setGender(e.target.value)}
//                     className="input"
//                   />
//                 </fieldset>

//                 <fieldset className="fieldset my-2">
//                   <legend className="fieldset-legend">Age</legend>
//                   <input
//                     type="text"
//                     value={age || ""}
//                     onChange={(e) => setAge(e.target.value)}
//                     className="input"
//                   />
//                 </fieldset>

//                 <fieldset className="fieldset my-2">
//                   <legend className="fieldset-legend">About</legend>
//                   <input
//                     type="text"
//                     value={about}
//                     onChange={(e) => setAbout(e.target.value)}
//                     className="input"
//                   />
//                 </fieldset>
//               </div>
//               <p className="text-red-500"> {error}</p>
//               <div className="card-actions justify-center m-2">
//                 <button className="btn btn-primary" onClick={saveProfile}>
//                   save profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         <UserCard
//           user={{ firstName, lastName, photoUrl, gender, age, about }}
//         />
//       </div>

//       {toast && (
//         <div className="toast toast-top toast-center z-50">
//           <div className="alert alert-success">
//             <span>Profile save successfully.</span>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default EditProfile;

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
        e.response?.data?.message || e.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100";

  const labelClass =
    "mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700";

  return (
    <div className="w-full">
      {/* Section Heading */}
     <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-violet-600">
            <Sparkles size={17} />
            <span className="text-xs font-bold uppercase tracking-widest">
              Profile Settings
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Edit Your Profile
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Update your information and make your developer profile stand out.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-violet-100 bg-violet-50 px-4 py-3">
          <UserRound className="text-violet-600" size={20} />
          <span className="text-sm font-semibold text-violet-700">
            Personal Details
          </span>
        </div>
      </div> 

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Edit Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-7 shadow-sm">
            <div className="mb-7 flex items-center gap-3 border-b border-gray-100 pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                <UserRound size={22} />
              </div>

              <div>
                <h3 className="font-bold text-gray-900">
                  Personal Information
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Keep your profile information up to date.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>
                    <User size={15} className="text-violet-500" />
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
                    <User size={15} className="text-violet-500" />
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

              {/* Photo URL */}
              {/* <div>
                <label className={labelClass}>
                  <Camera size={15} className="text-violet-500" />
                  Profile Photo URL
                </label>

                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className={inputClass}
                />

                <p className="mt-2 text-xs text-gray-400">
                  Add a publicly accessible image URL.
                </p>
              </div> */}
              <div>
  <label className={labelClass}>
    <Camera size={15} className="text-violet-500" />
    Profile Photo
  </label>

  <div className="flex items-center gap-5 rounded-xl border p-4">
    <img
      src={photoUrl || user.photoUrl}
      alt="Profile"
      className="h-24 w-24 rounded-full object-cover"
    />

    <label className="cursor-pointer rounded-xl bg-violet-600 px-5 py-3 text-white">
      <Camera size={17} className="inline mr-2" />
      Choose Photo

      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
        className="hidden"
      />
    </label>
  </div>

  {photoError && (
    <p className="mt-2 text-sm text-red-500">{photoError}</p>
  )}
</div>

              {/* Gender & Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>
                    <VenusAndMars size={15} className="text-violet-500" />
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
                    <CalendarDays size={15} className="text-violet-500" />
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
                  <FileText size={15} className="text-violet-500" />
                  About You
                </label>

                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell other developers about yourself, your skills and interests..."
                  rows={5}
                  className={`${inputClass} resize-none`}
                />

                <div className="mt-2 text-right text-xs text-gray-400">
                  {about.length} characters
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={saveProfile}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
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
            <Image size={19} className="text-violet-600" />

            <h3 className="font-bold text-gray-900">Live Profile Preview</h3>
          </div>

          <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-indigo-50 p-4 sm:p-5">
            <div className="mb-4 flex items-center gap-2 text-xs font-medium text-violet-600">
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

          <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-violet-100 p-2 text-violet-600">
                <Sparkles size={18} />
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-800">Profile Tip</h4>

                <p className="mt-1 text-xs leading-5 text-gray-500">
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
          <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-white px-5 py-4 shadow-xl">
            <CheckCircle2 className="text-green-600" size={22} />

            <div>
              <p className="text-sm font-bold text-gray-900">
                Profile Updated!
              </p>
              <p className="text-xs text-gray-500">
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
