
import React from "react";
import { Check, Crown, ShieldCheck, ArrowRight } from "lucide-react";

const PricingCard = ({ plan, onBuy, loading, processingType }) => {
  const Icon = plan.icon === "crown" ? Crown : ShieldCheck;

  return (
    <div
      className={`relative flex flex-col rounded-[32px] border p-7 transition-all duration-300 hover:-translate-y-2 sm:p-9 ${
        plan.featured
          ? "border-indigo-400/40 bg-gradient-to-br from-indigo-950 via-slate-800 to-violet-950 text-white shadow-2xl shadow-indigo-500/10"
          : "border-base-300 bg-base-200 text-base-content shadow-xl shadow-base-300/20"
      }`}
    >
      {/* Plan Icon & Badge */}
      <div className="mb-7 flex items-center justify-between">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
            plan.featured
              ? "bg-white/10 text-amber-300"
              : "bg-primary/10 text-primary"
          }`}
        >
          <Icon size={29} />
        </div>

        <span
          className={`rounded-full px-4 py-2 text-xs font-extrabold ${
            plan.featured
              ? "bg-amber-300 text-gray-900"
              : "bg-primary/10 text-primary"
          }`}
        >
          {plan.badge}
        </span>
      </div>

      {/* Plan Details */}
      <h2 className="text-3xl font-black">
        {plan.name} Membership
      </h2>

      <p
        className={`mt-2 text-sm ${
          plan.featured ? "text-indigo-200" : "text-base-content/60"
        }`}
      >
        {plan.subtitle}
      </p>

      {/* Price */}
      <div className="mt-7 flex items-end gap-2">
        <span className="text-5xl font-black">
          {plan.price}
        </span>

        <span
          className={`pb-2 text-sm ${
            plan.featured ? "text-indigo-200" : "text-base-content/60"
          }`}
        >
          / {plan.duration}
        </span>
      </div>

      {/* Divider */}
      <div
        className={`my-8 h-px ${
          plan.featured ? "bg-white/20" : "bg-base-300"
        }`}
      />

      {/* Features */}
      <div className="flex-1 space-y-5">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                plan.featured
                  ? "bg-emerald-400/20 text-emerald-300"
                  : "bg-primary/10 text-primary"
              }`}
            >
              <Check size={13} strokeWidth={3} />
            </div>

            <span
              className={`text-sm leading-6 ${
                plan.featured
                  ? "text-indigo-100"
                  : "text-base-content/75"
              }`}
            >
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Buy Button */}
      <button
        onClick={() => onBuy(plan.id)}
        disabled={loading}
        className={`mt-9 flex w-full items-center justify-center gap-3 rounded-2xl py-4 font-extrabold transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 ${
          plan.featured
            ? "bg-gradient-to-r from-amber-300 to-yellow-400 text-gray-900 hover:shadow-lg hover:shadow-amber-400/20"
            : "bg-gradient-to-r from-indigo-500 to-violet-600 text-white hover:shadow-lg hover:shadow-indigo-500/20"
        }`}
      >
        {loading && processingType === plan.id ? (
          "Processing..."
        ) : (
          <>
            Get {plan.name}
            <ArrowRight size={19} />
          </>
        )}
      </button>

      {/* Payment Info */}
      <p
        className={`mt-4 text-center text-xs ${
          plan.featured ? "text-indigo-200/80" : "text-base-content/50"
        }`}
      >
        Secure payment powered by Razorpay
      </p>
    </div>
  );
};

export default PricingCard;
