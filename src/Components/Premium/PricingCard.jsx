
import React from "react";
import {
  Check,
  Crown,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  LoaderCircle,
} from "lucide-react";

const PricingCard = ({ plan, onBuy, loading, processingType }) => {
  const Icon = plan.icon === "crown" ? Crown : ShieldCheck;
  const isFeatured = plan.featured;
  const isProcessing = loading && processingType === plan.id;

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border p-7 transition-all duration-300 sm:p-9 ${
        isFeatured
          ? "border-primary/50 bg-base-200 shadow-2xl shadow-primary/10"
          : "border-base-300 bg-base-200 shadow-lg shadow-base-content/[0.03] hover:-translate-y-1 hover:border-primary/30"
      }`}
    >
      {/* Featured Accent */}
      {isFeatured && (
        <div className="absolute left-0 top-0 h-1 w-full bg-primary" />
      )}

      {/* Soft Background Accent */}
      {isFeatured && (
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-[80px]" />
      )}

      <div className="relative z-10 flex h-full flex-col">

        {/* Plan Icon & Badge */}
        <div className="mb-8 flex items-center justify-between">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${
              isFeatured
                ? "border-primary/25 bg-primary/10 text-primary"
                : "border-base-300 bg-base-100 text-primary"
            }`}
          >
            <Icon size={27} strokeWidth={1.8} />
          </div>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider ${
              isFeatured
                ? "bg-primary text-primary-content"
                : "border border-base-300 bg-base-100 text-base-content/60"
            }`}
          >
            {isFeatured && <Sparkles size={13} />}
            {plan.badge}
          </span>
        </div>

        {/* Plan Details */}
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
            DevTinder Membership
          </p>

          <h2 className="font-serif text-3xl font-semibold tracking-tight text-base-content sm:text-4xl">
            {plan.name}
          </h2>

          <p className="mt-3 max-w-xs text-sm leading-6 text-base-content/55">
            {plan.subtitle}
          </p>
        </div>

        {/* Price */}
        <div className="mt-8 flex items-baseline gap-2">
          <span className="text-5xl font-bold tracking-tight text-base-content sm:text-6xl">
            {plan.price}
          </span>

          <span className="text-sm font-medium text-base-content/45">
            / {plan.duration}
          </span>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-base-300" />

        {/* Features */}
        <div className="flex-1">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-base-content/45">
            What's included
          </p>

          <div className="space-y-5">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check size={13} strokeWidth={3} />
                </div>

                <span className="text-sm leading-6 text-base-content/75">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Buy Button */}
        <button
          onClick={() => onBuy(plan.id)}
          disabled={loading}
          className={`mt-10 flex w-full items-center justify-center gap-3 rounded-xl px-5 py-4 text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 ${
            isFeatured
              ? "bg-primary text-primary-content shadow-lg shadow-primary/15 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/20"
              : "border border-base-300 bg-base-100 text-base-content hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5"
          }`}
        >
          {isProcessing ? (
            <>
              <LoaderCircle size={18} className="animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Get {plan.name}
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </>
          )}
        </button>

        {/* Payment Info */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-base-content/45">
          <ShieldCheck size={14} className="text-primary" />
          Secure payment powered by Razorpay
        </div>
      </div>
    </article>
  );
};

export default PricingCard;
