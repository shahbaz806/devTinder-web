import React from "react";
import { Check, Crown, ShieldCheck, ArrowRight } from "lucide-react";

const PricingCard = ({ plan, onBuy, loading, processingType }) => {
  const Icon = plan.icon === "crown" ? Crown : ShieldCheck;

  return (
    <div
      className={`relative flex flex-col rounded-[32px] border p-7 transition-all duration-300 hover:-translate-y-2 sm:p-9 ${
        plan.featured
          ? "border-violet-400 bg-gradient-to-br from-[#29204c] via-[#392767] to-[#27204b] text-white shadow-2xl shadow-violet-300/50"
          : "border-white bg-white/90 text-gray-800 shadow-xl shadow-violet-100/70"
      }`}
    >
      <div className="mb-7 flex items-center justify-between">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
            plan.featured
              ? "bg-white/15 text-amber-300"
              : "bg-violet-100 text-violet-600"
          }`}
        >
          <Icon size={29} />
        </div>

        <span
          className={`rounded-full px-4 py-2 text-xs font-extrabold ${
            plan.featured
              ? "bg-amber-300 text-gray-900"
              : "bg-violet-100 text-violet-700"
          }`}
        >
          {plan.badge}
        </span>
      </div>

      <h2 className="text-3xl font-black">{plan.name} Membership</h2>

      <p
        className={`mt-2 text-sm ${
          plan.featured ? "text-purple-200" : "text-gray-500"
        }`}
      >
        {plan.subtitle}
      </p>

      <div className="mt-7 flex items-end gap-2">
        <span className="text-5xl font-black">{plan.price}</span>
        <span
          className={`pb-2 text-sm ${
            plan.featured ? "text-purple-200" : "text-gray-500"
          }`}
        >
          / {plan.duration}
        </span>
      </div>

      <div
        className={`my-8 h-px ${
          plan.featured ? "bg-white/20" : "bg-violet-100"
        }`}
      />

      <div className="flex-1 space-y-5">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-3">
            <div
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                plan.featured
                  ? "bg-emerald-400/20 text-emerald-300"
                  : "bg-violet-100 text-violet-600"
              }`}
            >
              <Check size={13} strokeWidth={3} />
            </div>

            <span
              className={`text-sm leading-6 ${
                plan.featured ? "text-purple-100" : "text-gray-600"
              }`}
            >
              {feature}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={() => onBuy(plan.id)}
        disabled={loading}
        className={`mt-9 flex w-full items-center justify-center gap-3 rounded-2xl py-4 font-extrabold transition disabled:opacity-60 ${
          plan.featured
            ? "bg-gradient-to-r from-amber-300 to-yellow-400 text-gray-900"
            : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
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

      <p
        className={`mt-4 text-center text-xs ${
          plan.featured ? "text-purple-200" : "text-gray-400"
        }`}
      >
        Secure payment powered by Razorpay
      </p>
    </div>
  );
};

export default PricingCard;
