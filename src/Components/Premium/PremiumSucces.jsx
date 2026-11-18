
import React from "react";
import {
  Crown,
  BadgeCheck,
  Sparkles,
  ShieldCheck,
  Check,
} from "lucide-react";

const PremiumSuccess = ({ memberShipType }) => {
  return (
    <main className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-base-100 px-4 py-12 text-base-content transition-colors duration-300">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary/10 blur-[110px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />

      {/* Background Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(rgb(169 87 53) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Success Card */}
      <section className="relative z-10 w-full max-w-xl overflow-hidden rounded-[30px] border border-base-300 bg-base-200 px-6 py-10 text-center shadow-xl shadow-base-content/5 transition-colors duration-300 sm:px-12 sm:py-14">

        {/* Top Accent */}
        <div className="absolute left-0 top-0 h-1 w-full bg-primary" />

        {/* Premium Icon */}
        <div className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-[28px] border border-primary/20 bg-primary/10 text-primary">
          <Crown size={45} strokeWidth={1.6} />

          <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-4 border-base-200 bg-primary text-primary-content">
            <Check size={15} strokeWidth={3} />
          </span>
        </div>

        {/* Success Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-bold tracking-wider text-primary">
          <BadgeCheck size={16} />
          MEMBERSHIP ACTIVATED
        </div>

        {/* Heading */}
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-base-content sm:text-5xl">
          You're Premium!
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-sm text-sm leading-7 text-base-content/60 sm:text-base">
          Welcome to the DevTinder Premium community. Your next chapter of
          developer networking starts here.
        </p>

        {/* Membership Details */}
        <div className="mt-9 rounded-2xl border border-primary/20 bg-base-100 p-5 text-left">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-base-content/45">
                Your membership
              </p>

              <p className="mt-2 flex items-center gap-2 text-xl font-bold capitalize text-base-content">
                <Crown size={19} className="text-primary" />
                {memberShipType || "Premium"} Member
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck size={23} />
            </div>
          </div>

          <div className="mt-5 h-px bg-base-300" />

          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary">
            <BadgeCheck size={17} />
            Active Membership
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-base-content/50">
          <Sparkles size={17} className="text-primary" />
          Enjoy your premium developer journey!
        </div>
      </section>
    </main>
  );
};

export default PremiumSuccess;
