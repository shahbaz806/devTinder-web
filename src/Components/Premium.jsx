// import React, { useEffect, useState } from "react";
// import { BASE_URL } from "../utils/constant";
// import axios from "axios";

// const Premium = () => {
//   const [isUserPremium, setIsUserPremium] = useState(false);
//   useEffect(()=> {
//     verifyPremiumUser();
//   },[])
//   const verifyPremiumUser = async () => {
//     const res = await axios.get(BASE_URL + "/premium/verify", {
//       withCredentials: true,
//     });

//     if (res.data.isPremium) {
//       setIsUserPremium(true);
//     }
//   };



//   const handleBuyClick = async (type) => {
//     const order = await axios.post(
//       BASE_URL + "/payment/create",
//       { memberShipType: type },
//       { withCredentials: true }
//     );

//     // it should open razopay dialogue box

//     const { amount, keyId, currrency, notes, orderId } = order.data;
//     const options = {
//       key: keyId, // Replace with your Razorpay key_id
//       amount: amount, // Amount is in currency subunits.
//       currency: currrency,
//       name: "Dev Tinder",
//       description: "Connect to other developer",
//       order_id: orderId, // This is the order_id created in the backend
//       prefill: {
//         name: notes.firstName + " " + notes.lastName,
//         email: notes.emailId,
//         contact: "9999999999",
//       },
//       theme: {
//         color: "#F37254",
//       },
//       handler: verifyPremiumUser,
//     };
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };
//   return isUserPremium ? (
//     "you are already premium"
//   ) : (
//     <div className="m-10">
//       <div className="flex w-full">
//         <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
//           <h1 className="font-bold text-2xl text-white">Silver Member Ship</h1>
//           <ul>
//             <li>-Chat with other people</li>
//             <li>-100 connection Request per day</li>
//             <li>-Blue Tick</li>
//             <li>-3-Months</li>
//           </ul>
//           <button
//             onClick={() => handleBuyClick("silver")}
//             className="btn btn-secondary"
//           >
//             Buy Silver
//           </button>
//         </div>
//         <div className="divider divider-horizontal">OR</div>
//         <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
//           <h1 className="font-bold text-2xl text-white">Gold Memeber ship</h1>
//           <ul>
//             <li>-Chat with other people</li>
//             <li>-Infinite connection Request per day</li>
//             <li>-Blue Tick</li>
//             <li>-6-Months</li>
//           </ul>
//           <button
//             onClick={() => handleBuyClick("gold")}
//             className="btn btn-primary"
//           >
//             Buy Gold
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Premium;



import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import axios from "axios";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  // Check premium status
  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });

      setIsUserPremium(res.data.isPremium);
    } catch (error) {
      console.log("Premium Check Error:", error.message);
    }
  };

  // Verify payment after Razorpay checkout
  const verifyPayment = async (response) => {
    try {
      const res = await axios.post(
        BASE_URL + "/payment/verify",
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        alert("Payment successful! Premium activated.");
        await verifyPremiumUser();
      }
    } catch (error) {
      console.log(
        "Payment Verification Error:",
        error.response?.data || error.message
      );

      alert("Payment verification failed. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  // Buy membership
  const handleBuyClick = async (type) => {
    try {
      setLoading(true);

      const orderResponse = await axios.post(
        BASE_URL + "/payment/create",
        { memberShipType: type },
        { withCredentials: true }
      );

      const { amount, keyId, currency, notes, orderId } =
        orderResponse.data;

      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "Dev Tinder",
        description: "Connect with other developers",
        order_id: orderId,

        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.emailId,
        },

        theme: {
          color: "#F37254",
        },

        handler: async function (response) {
          await verifyPayment(response);
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.log("Payment Failed:", response.error);
        setLoading(false);
        alert("Payment failed. Please try again.");
      });

      rzp.open();

    } catch (error) {
      console.log("Order Creation Error:", error.message);
      setLoading(false);
      alert("Unable to create payment order.");
    }
  };

  if (isUserPremium) {
    return (
      <div className="m-10 text-center">
        <h1 className="text-3xl font-bold text-success">
          You are already a Premium Member!
        </h1>
      </div>
    );
  }

  return (
    <div className="m-10">
      <div className="flex w-full flex-col md:flex-row gap-5">

        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center p-5">
          <h1 className="font-bold text-2xl text-white">
            Silver Membership
          </h1>

          <ul>
            <li>- Chat with other people</li>
            <li>- 100 connection requests per day</li>
            <li>- Blue Tick</li>
            <li>- 3 Months</li>
          </ul>

          <button
            onClick={() => handleBuyClick("silver")}
            disabled={loading}
            className="btn btn-secondary"
          >
            {loading ? "Processing..." : "Buy Silver"}
          </button>
        </div>

        <div className="divider divider-horizontal">OR</div>

        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center p-5">
          <h1 className="font-bold text-2xl text-white">
            Gold Membership
          </h1>

          <ul>
            <li>- Chat with other people</li>
            <li>- Infinite connection requests per day</li>
            <li>- Blue Tick</li>
            <li>- 6 Months</li>
          </ul>

          <button
            onClick={() => handleBuyClick("gold")}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? "Processing..." : "Buy Gold"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Premium;
