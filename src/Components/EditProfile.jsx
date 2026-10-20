import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          gender,
          age,
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
      setError(e.response?.data?.message || e.message);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Profile Edit</h2>
              <div>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input"
                  />
                </fieldset>

                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input"
                  />
                </fieldset>

                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend"> photoUrl</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="input"
                  />
                </fieldset>

                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Gender</legend>
                  <input
                    type="text"
                    value={gender || ""}
                    onChange={(e) => setGender(e.target.value)}
                    className="input"
                  />
                </fieldset>

                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    value={age || ""}
                    onChange={(e) => setAge(e.target.value)}
                    className="input"
                  />
                </fieldset>

                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">About</legend>
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="input"
                  />
                </fieldset>
              </div>
              <p className="text-red-500"> {error}</p>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  save profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, gender, age, about }}
        />
      </div>

      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile save successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
