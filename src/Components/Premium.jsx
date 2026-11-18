
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

import plans from "./Premium/Plan";
import PremiumHeader from "./Premium/PremiumHeader";
import PricingCard from "./Premium/PricingCard";
import PremiumSuccess from "./Premium/PremiumSucces";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [memberShipType, setMemberShipType] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [processingType, setProcessingType] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  // Check membership
  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/premium/verify`, {
        withCredentials: true,
      });

      setIsUserPremium(res.data.isPremium);
      setMemberShipType(res.data.memberShipType || "");
    } catch (error) {
      console.log("Premium Check Error:", error.message);
    } finally {
      setChecking(false);
    }
  };

  // Verify payment
  const verifyPayment = async (response) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/payment/verify`,
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        await verifyPremiumUser();
        alert("Payment successful! Premium activated.");
      } else {
        alert("Payment verification failed.");
      }
    } catch (error) {
      console.log("Payment Verification Error:", error);
      alert("Payment verification failed. Please contact support.");
    } finally {
      setLoading(false);
      setProcessingType("");
    }
  };

  // Buy membership
  const handleBuyClick = async (type) => {
    if (loading) return;

    try {
      setLoading(true);
      setProcessingType(type);
      setError("");

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK is not loaded.");
      }

      const orderResponse = await axios.post(
        `${BASE_URL}/payment/create`,
        { memberShipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } =
        orderResponse.data;

      const options = {
        key: keyId,
        amount,
        currency,
        name: "DevTinder",
        description: `${type.toUpperCase()} Membership`,
        order_id: orderId,

        prefill: {
          name: `${notes.firstName} ${notes.lastName}`,
          email: notes.emailId,
        },

        theme: {
          color: "#A95735",
        },

        handler: async (response) => {
          await verifyPayment(response);
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
            setProcessingType("");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        console.log("Payment Failed:", response.error);
        setLoading(false);
        setProcessingType("");
        alert("Payment failed. Please try again.");
      });

      razorpay.open();
    } catch (error) {
      console.log("Order Creation Error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to create payment order."
      );

      setLoading(false);
      setProcessingType("");
    }
  };

  // Membership checking screen
  if (checking) {
    return (
      <div className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-base-100 px-4 transition-colors duration-300">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary" />

          <p className="mt-5 text-sm font-medium text-base-content/60">
            Checking your membership...
          </p>
        </div>
      </div>
    );
  }

  // Premium user screen
  if (isUserPremium) {
    return <PremiumSuccess memberShipType={memberShipType} />;
  }

  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-base-100 px-4 py-14 transition-colors duration-300 sm:px-8 lg:py-20">

      {/* Background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(rgb(169 87 53) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Soft ambient lights */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />

      <div className="pointer-events-none absolute -right-40 top-[45%] h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">

        {/* Premium header */}
        <PremiumHeader />

        {/* Pricing plans */}
        <section className="mx-auto mt-12 grid max-w-5xl gap-7 md:grid-cols-2 md:items-stretch lg:mt-16">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onBuy={handleBuyClick}
              loading={loading}
              processingType={processingType}
            />
          ))}
        </section>

        {/* Payment error */}
        {error && (
          <div
            role="alert"
            className="mx-auto mt-8 max-w-xl rounded-2xl border border-error/25 bg-error/10 px-5 py-4 text-center text-sm font-medium text-error"
          >
            {error}
          </div>
        )}

        {/* Footer note */}
        <div className="mt-14 text-center">
          <div className="mx-auto mb-4 h-px w-16 bg-primary/30" />

          <p className="text-sm font-medium tracking-wide text-base-content/50">
            Build connections. Share knowledge. Grow together.
          </p>

          <p className="mt-2 text-xs text-base-content/35">
            Your next opportunity starts with a connection.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Premium;
