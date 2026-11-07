import React from "react";
import { Code2, Eye, EyeOff } from "lucide-react";

const LoginForm = ({
  emailId,
  setEmailId,
  password,
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  islogginForm,
  showPassword,
  setShowPassword,
  loading,
  error,
  handleSubmit,
  toggleForm,
}) => {
  return (
    <div className="relative flex min-h-[calc(100vh-150px)] items-center justify-center overflow-hidden bg-base-100 px-4 py-12 text-base-content transition-colors duration-300">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-base-300 bg-base-200 p-7 shadow-2xl shadow-indigo-500/5 transition-colors duration-300 sm:p-9">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
              <Code2 size={34} className="text-white" />
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-base-content">
              Dev<span className="text-primary">Tinder</span>
            </h1>

            <p className="mt-2 text-sm text-base-content/60">
              {islogginForm
                ? "Welcome back! Connect with amazing developers."
                : "Create your account and grow your developer network."}
            </p>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-base-content">
              {islogginForm ? "Welcome Back!" : "Create Account"}
            </h2>

            <p className="mt-1 text-sm text-base-content/60">
              {islogginForm
                ? "Enter your credentials to continue."
                : "Fill in your details to get started."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            {!islogginForm && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-base-content/80">
                    First Name
                  </label>

                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12 w-full rounded-xl border border-base-300 bg-base-100 px-4 text-base-content outline-none transition-all placeholder:text-base-content/40 focus:border-primary focus:ring-4 focus:ring-primary/10"
                    placeholder="First name"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-base-content/80">
                    Last Name
                  </label>

                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-12 w-full rounded-xl border border-base-300 bg-base-100 px-4 text-base-content outline-none transition-all placeholder:text-base-content/40 focus:border-primary focus:ring-4 focus:ring-primary/10"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-base-content/80">
                Email Address
              </label>

              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="h-12 w-full rounded-xl border border-base-300 bg-base-100 px-4 text-base-content outline-none transition-all placeholder:text-base-content/40 focus:border-primary focus:ring-4 focus:ring-primary/10"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-base-content/80">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 w-full rounded-xl border border-base-300 bg-base-100 px-4 pr-12 text-base-content outline-none transition-all placeholder:text-base-content/40 focus:border-primary focus:ring-4 focus:ring-primary/10"
                  placeholder="Enter your password"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/50 transition-colors hover:text-primary"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-error/20 bg-error/10 p-3 text-sm text-error">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-3 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 font-bold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading
                ? "Please wait..."
                : islogginForm
                ? "Login to DevTinder →"
                : "Create Account →"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-base-300" />

            <span className="text-xs font-medium text-base-content/40">OR</span>

            <div className="h-px flex-1 bg-base-300" />
          </div>

          {/* Toggle */}
          <div className="text-center">
            <span className="text-sm text-base-content/60">
              {islogginForm ? "New to DevTinder?" : "Already have an account?"}
            </span>

            <button
              type="button"
              onClick={toggleForm}
              className="ml-2 text-sm font-bold text-primary transition-colors hover:text-secondary"
            >
              {islogginForm ? "Create Account" : "Login"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-base-content/40">
          Connect. Code. Collaborate.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
