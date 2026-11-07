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
      const res = await axios.get(BASE_URL + "/premium/verify", {
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
        BASE_URL + "/payment/verify",
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
        BASE_URL + "/payment/create",
        { memberShipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } = orderResponse.data;

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
          color: "#7C3AED",
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

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F5FF]">
        <span className="loading loading-spinner loading-lg text-violet-600" />
      </div>
    );
  }

  if (isUserPremium) {
    return <PremiumSuccess memberShipType={memberShipType} />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#faf8ff] via-[#f4f0ff] to-[#eef2ff] px-4 py-12 sm:px-8">
      {/* Background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(#a78bfa 1px, transparent 1px)",
          backgroundSize: "25px 25px",
        }}
      />

      <div className="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl" />

      <div className="pointer-events-none absolute top-80 -right-32 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <PremiumHeader />

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:items-stretch">
          {plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onBuy={handleBuyClick}
              loading={loading}
              processingType={processingType}
            />
          ))}
        </div>

        {error && (
          <div className="mx-auto mt-7 max-w-xl rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-center text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <p className="mt-12 text-center text-sm text-gray-400">
          Build connections. Share knowledge. Grow together.
        </p>
      </div>
    </div>
  );
};

export default Premium;
