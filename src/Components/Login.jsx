import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";
import LoginForm from "./LoginForm";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [islogginForm, setIsLoggingForm] = useState(true);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Login API
  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(
        typeof err?.response?.data === "string"
          ? err.response.data
          : err?.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  // Signup API
  const handleSignUp = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(
        typeof err?.response?.data === "string"
          ? err.response.data
          : err?.response?.data?.message || "Unable to create account"
      );
    } finally {
      setLoading(false);
    }
  };

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    islogginForm ? handleLogin() : handleSignUp();
  };

  // Toggle Login / Signup
  const toggleForm = () => {
    setIsLoggingForm((value) => !value);
    setError("");
  };

  return (
    <LoginForm
      emailId={emailId}
      setEmailId={setEmailId}
      password={password}
      setPassword={setPassword}
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      islogginForm={islogginForm}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      loading={loading}
      error={error}
      handleSubmit={handleSubmit}
      toggleForm={toggleForm}
    />
  );
};

export default Login;
