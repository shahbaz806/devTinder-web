
import React from "react";
import {
  Sparkles,
  ShieldCheck,
  Users,
  Lock,
  ArrowDown,
} from "lucide-react";

const PremiumHeader = () => {
  const features = [
    {
      icon: ShieldCheck,
      label: "Secure Payments",
    },
    {
      icon: Users,
      label: "Developer Community",
    },
    {
      icon: Lock,
      label: "Safe Checkout",
    },
  ];

  return (
    <header className="mx-auto mb-12 max-w-4xl text-center sm:mb-16">
      {/* Premium Badge */}
      <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/5 px-5 py-2.5 text-xs font-bold tracking-[0.18em] text-primary shadow-sm sm:text-sm">
        <Sparkles size={16} strokeWidth={2} />
        DEV TINDER PREMIUM
      </div>

      {/* Heading */}
      <h1 className="font-serif text-4xl font-semibold leading-[1.15] tracking-tight text-base-content sm:text-5xl md:text-6xl">
        More Than Connections.
        <span className="mt-2 block italic text-primary">
          A Better Developer Journey.
        </span>
      </h1>

      {/* Description */}
      <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-base-content/65 sm:text-base sm:leading-8">
        Take your developer networking to the next level. Discover meaningful
        connections, grow your community and unlock more opportunities with
        DevTinder Premium.
      </p>

      {/* Divider */}
      <div className="mx-auto mt-8 flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-primary/30" />
        <span className="h-1.5 w-1.5 rotate-45 bg-primary" />
        <span className="h-px w-12 bg-primary/30" />
      </div>

      {/* Feature Pills */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {features.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200/70 px-4 py-2.5 text-xs font-medium text-base-content/75 transition-colors duration-200 hover:border-primary/40 hover:text-primary sm:text-sm"
          >
            <Icon size={16} className="text-primary" />
            {label}
          </div>
        ))}
      </div>

      {/* Pricing Hint */}
      <div className="mt-9 inline-flex items-center gap-2 text-xs font-medium tracking-wide text-base-content/40">
        <ArrowDown size={14} />
        CHOOSE YOUR MEMBERSHIP PLAN
      </div>
    </header>
  );
};

export default PremiumHeader;
