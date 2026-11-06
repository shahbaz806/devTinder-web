// import axios from "axios";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addUser } from "../utils/userSlice";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constant";

// const Login = () => {
//   const [emailId, setEmailId] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [islogginForm, setIsLoggingForm] = useState(true);
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/login",
//         {
//           emailId,
//           password,
//         },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res.data));
//       return navigate("/");
//     } catch (err) {
//       setError(err?.response?.data || "something went wrogn");
//     }
//   };

//   const handleSignUp = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL + "/signup",
//         { firstName, lastName, emailId, password },
//         { withCredentials: true }
//       );
//       dispatch(addUser(res?.data?.data));
//       return navigate("/profile");
//     } catch (e) {
//       console.error(e);
//     }
//   };
//   return (
//     <div className=" z-10 relative flex justify-center my-10">
//       <div className="card bg-base-300 w-96 shadow-sm">
//         <div className="card-body">
//           <h2 className="card-title justify-center">
//             {islogginForm ? "Login" : "Sign Up"}
//           </h2>
//           <div>
//             {!islogginForm && (
//               <>
//                 {" "}
//                 <fieldset className="fieldset my-2">
//                   <legend className="fieldset-legend">First Name</legend>
//                   <input
//                     type="text"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     className="input"
//                     placeholder="enter your first name"
//                   />
//                 </fieldset>
//                 <fieldset className="fieldset my-2">
//                   <legend className="fieldset-legend">Last Name</legend>
//                   <input
//                     type="text"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     className="input"
//                     placeholder="enter your last name"
//                   />
//                 </fieldset>{" "}
//               </>
//             )}

//             <fieldset className="fieldset my-2">
//               <legend className="fieldset-legend">Email ID</legend>
//               <input
//                 type="text"
//                 value={emailId}
//                 onChange={(e) => setEmailId(e.target.value)}
//                 className="input"
//                 placeholder="enter your email"
//               />
//             </fieldset>

//             <fieldset className="fieldset my-2">
//               <legend className="fieldset-legend">Password</legend>
//               <input
//                 type="text"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="input"
//                 placeholder="enter your password"
//               />
//             </fieldset>
//           </div>
//           <p className="text-red-500"> {error}</p>
//           <div className="card-actions justify-center m-2">
//             <button
//               className="btn btn-primary"
//               onClick={islogginForm ? handleLogin : handleSignUp}
//             >
//               {islogginForm ? "Login" : "Sign up"}
//             </button>
//           </div>
//           <p
//             className="m-auto py-2 cursor-pointer"
//             onClick={() => setIsLoggingForm((value) => !value)}
//           >
//             {" "}
//             {islogginForm
//               ? "New User ? Sign up Here"
//               : "Existing User ? Login Here"}
//           </p>
//         </div>
//       </div>
//     </div>
   
//   );

 
// };

// export default Login;



import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loading) return;

    islogginForm ? handleLogin() : handleSignUp();
  };

  const toggleForm = () => {
    setIsLoggingForm((value) => !value);
    setError("");
  };

  return (
    <div className="relative min-h-[calc(100vh-150px)] flex items-center justify-center px-4 py-12 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* Background Decorations */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-violet-200/30 rounded-full blur-3xl" />

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white/95 border border-slate-200 rounded-3xl shadow-xl shadow-blue-900/5 p-7 sm:p-9">

          {/* Logo */}
          <div className="flex flex-col items-center text-center mb-8">

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25 mb-4">
              <span className="text-white text-3xl font-bold">
                {"</>"}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              Dev<span className="text-blue-600">Tinder</span>
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              {islogginForm
                ? "Welcome back! Connect with amazing developers."
                : "Create your account and grow your developer network."}
            </p>

          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">
              {islogginForm ? "Welcome Back!" : "Create Account"}
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {islogginForm
                ? "Enter your credentials to continue."
                : "Fill in your details to get started."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {!islogginForm && (
              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    First Name
                  </label>

                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    placeholder="First name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Last Name
                  </label>

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                    placeholder="Last name"
                    required
                  />
                </div>

              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-4 pr-20 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 hover:text-indigo-600"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>

              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 mt-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading
                ? "Please wait..."
                : islogginForm
                ? "Login to DevTinder →"
                : "Create Account →"}
            </button>

          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-slate-200 flex-1" />
            <span className="text-xs font-medium text-slate-400">
              OR
            </span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          {/* Toggle */}
          <div className="text-center">

            <span className="text-sm text-slate-500">
              {islogginForm
                ? "New to DevTinder?"
                : "Already have an account?"}
            </span>

            <button
              type="button"
              onClick={toggleForm}
              className="ml-2 text-sm font-bold text-blue-600 hover:text-indigo-600 transition-colors"
            >
              {islogginForm ? "Create Account" : "Login"}
            </button>

          </div>

        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Connect. Code. Collaborate.
        </p>

      </div>
    </div>
  );
};

export default Login;




