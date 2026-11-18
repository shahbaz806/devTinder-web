
import React from "react";
import {
  Code2,
  Eye,
  EyeOff,
  ArrowUpRight,
  Users,
  MessageCircle,
  Sparkles,
  Terminal,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

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
  const shouldReduceMotion = useReducedMotion();

  const features = [
    {
      icon: Users,
      title: "Find your people",
      description: "Meet developers who share your interests.",
    },
    {
      icon: MessageCircle,
      title: "Build connections",
      description: "Turn meaningful connections into collaborations.",
    },
    {
      icon: Terminal,
      title: "Grow together",
      description: "Learn, share ideas and build something great.",
    },
  ];

  const inputClass =
    "h-[52px] w-full rounded-xl border border-base-300 bg-base-100 px-4 text-sm text-base-content outline-none transition-all duration-200 placeholder:text-base-content/35 hover:border-primary/40 focus:border-primary focus:ring-4 focus:ring-primary/10";

  const labelClass =
    "mb-2 block text-[12px] font-bold tracking-wide text-base-content/75";

  return (
    <main className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-base-100 px-4 py-8 text-base-content transition-colors duration-300 sm:px-6 lg:px-10 lg:py-10">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-primary/5 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[450px] w-[450px] rounded-full bg-accent/10 blur-[110px]" />

      <div className="relative mx-auto grid min-h-[680px] max-w-[1250px] overflow-hidden rounded-[30px] border border-base-300/80 bg-base-200/40 shadow-2xl shadow-base-content/5 lg:grid-cols-[0.95fr_1.05fr]">

        {/* LEFT PANEL */}
        <motion.section
          initial={shouldReduceMotion ? false : { opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative hidden flex-col justify-between overflow-hidden bg-base-200 p-10 lg:flex xl:p-14"
        >
          {/* Panel Background */}
          <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[90px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-accent/10 blur-[90px]" />

          {/* Brand */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-content shadow-lg shadow-primary/20">
                <Code2 size={23} strokeWidth={2.2} />
              </div>

              <div>
                <p className="text-xl font-black tracking-tight">
                  Dev<span className="text-primary">Tinder</span>
                </p>
                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-[2px] text-base-content/40">
                  Developer Community
                </p>
              </div>
            </Link>
          </div>

          {/* Main Content */}
          <div className="relative z-10 my-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
              <Sparkles size={14} className="text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                Your next chapter starts here
              </span>
            </div>

            <h1 className="max-w-lg text-[clamp(2.8rem,4vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.06em]">
              Great minds
              <br />
              <span className="font-serif font-normal italic text-primary">
                find each other.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-7 text-base-content/60 xl:text-base">
              Your developer journey doesn't have to be a solo one.
              Discover like-minded people, exchange ideas and create
              meaningful connections.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-5">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, y: 15 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.25 + index * 0.12,
                    }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-base-300 bg-base-100 text-primary">
                      <Icon size={19} />
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-base-content">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-xs text-base-content/50">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="relative z-10 border-t border-base-300 pt-6">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em]">
                Built for developers
              </span>
            </div>

            <p className="mt-3 font-serif text-lg italic text-base-content/70">
              "Connect. Code. Collaborate."
            </p>
          </div>
        </motion.section>

        {/* RIGHT PANEL */}
        <section className="relative flex items-center justify-center bg-base-100 px-5 py-10 sm:px-10 lg:px-12 xl:px-16">

          {/* Mobile Brand */}
          <div className="absolute left-6 top-6 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-content">
                <Code2 size={19} />
              </div>
              <span className="text-lg font-black tracking-tight">
                Dev<span className="text-primary">Tinder</span>
              </span>
            </Link>
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="w-full max-w-[440px] pt-12 lg:pt-0"
          >

            {/* Form Heading */}
            <div className="mb-8">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                {islogginForm ? "WELCOME BACK" : "GET STARTED"}
              </p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={islogginForm ? "login-heading" : "signup-heading"}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-3xl font-semibold tracking-[-0.045em] text-base-content sm:text-4xl">
                    {islogginForm ? "Welcome back." : "Create account."}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-base-content/55">
                    {islogginForm
                      ? "Sign in to continue building meaningful connections."
                      : "Join a community where developers grow together."}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Login / Signup Toggle */}
            <div className="mb-7 grid grid-cols-2 rounded-xl border border-base-300 bg-base-200/70 p-1">
              <button
                type="button"
                onClick={() => {
                  if (!islogginForm) toggleForm();
                }}
                className={`relative rounded-lg py-3 text-sm font-bold transition-all duration-300 ${
                  islogginForm
                    ? "bg-base-100 text-primary shadow-sm"
                    : "text-base-content/45 hover:text-base-content"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  if (islogginForm) toggleForm();
                }}
                className={`relative rounded-lg py-3 text-sm font-bold transition-all duration-300 ${
                  !islogginForm
                    ? "bg-base-100 text-primary shadow-sm"
                    : "text-base-content/45 hover:text-base-content"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name Fields */}
              <AnimatePresence initial={false}>
                {!islogginForm && (
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={shouldReduceMotion ? {} : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-2 gap-3 overflow-hidden"
                  >
                    <div>
                      <label className={labelClass} htmlFor="firstName">
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        autoComplete="given-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={inputClass}
                        placeholder="First name"
                        required
                      />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="lastName">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        autoComplete="family-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={inputClass}
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div>
                <label className={labelClass} htmlFor="emailId">
                  Email Address
                </label>

                <input
                  id="emailId"
                  type="email"
                  autoComplete="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className={inputClass}
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className={labelClass + " mb-0"} htmlFor="password">
                    Password
                  </label>

                  <span className="text-[10px] font-medium text-base-content/40">
                    {islogginForm ? "Your account password" : "Choose a secure password"}
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete={
                      islogginForm ? "current-password" : "new-password"
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass + " pr-12"}
                    placeholder="Enter your password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 transition-colors hover:text-primary"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
                    className="flex items-start gap-2 rounded-xl border border-error/20 bg-error/10 p-3.5 text-sm text-error"
                    role="alert"
                  >
                    <span className="mt-0.5 shrink-0">!</span>
                    <p>{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group mt-2 flex h-[54px] w-full items-center justify-center gap-3 rounded-xl bg-primary px-6 text-sm font-bold text-primary-content shadow-lg shadow-primary/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/20 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Please wait...
                  </>
                ) : (
                  <>
                    {islogginForm ? "Login to DevTinder" : "Create your account"}
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </>
                )}
              </button>
            </form>

            {/* Trust Information */}
            <div className="mt-7 flex items-center justify-center gap-2 text-center">
              <CheckCircle2 size={14} className="text-success" />
              <p className="text-[11px] text-base-content/45">
                A community built around meaningful connections.
              </p>
            </div>

            {/* Bottom Toggle */}
            <div className="mt-7 border-t border-base-300 pt-6 text-center">
              <p className="text-sm text-base-content/55">
                {islogginForm
                  ? "New to DevTinder?"
                  : "Already have an account?"}

                <button
                  type="button"
                  onClick={toggleForm}
                  className="ml-2 font-bold text-primary transition-colors hover:text-secondary"
                >
                  {islogginForm ? "Create an account" : "Login"}
                </button>
              </p>
            </div>

            {/* Footer */}
            <p className="mt-8 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-base-content/30">
              Connect. Code. Collaborate.
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
};

export default LoginForm;
