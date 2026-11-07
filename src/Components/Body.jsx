
// import React, { useEffect } from "react";
// import NavBar from "./NavBar";
// import { Outlet, useNavigate } from "react-router-dom";
// import Footer from "./Footer";
// import axios from "axios";
// import { BASE_URL } from "../utils/constant";
// import { addUser } from "../utils/userSlice";
// import { useDispatch, useSelector } from "react-redux";

// const Body = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userData = useSelector((store) => store.user);

//   useEffect(() => {
//     if (userData) return;

//     const fetchUser = async () => {
//       try {
//         const res = await axios.get(
//           `${BASE_URL}/profile/view`,
//           { withCredentials: true }
//         );

//         dispatch(addUser(res.data));
//       } catch (err) {
//         if (err.response?.status === 401) {
//           navigate("/login", { replace: true });
//           return;
//         }

//         console.error(
//           "Profile fetch error:",
//           err.response?.data || err.message
//         );
//       }
//     };

//     fetchUser();
//   }, [userData, dispatch, navigate]);

//   return (
//     <div className="pt-20">
//       <NavBar />
//       <Outlet />
//       <Footer />
//     </div>
//   );
// };

// export default Body;



import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    if (userData) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/profile/view`,
          { withCredentials: true }
        );

        dispatch(addUser(res.data));
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login", { replace: true });
          return;
        }

        console.error("Profile fetch error:", err);
      }
    };

    fetchUser();
  }, [userData, dispatch, navigate]);
 
return (
  <div className="min-h-screen flex flex-col bg-base-100 text-base-content transition-colors duration-300 pt-16">
    <NavBar />

    <main className="flex-1 flex flex-col">
      <Outlet />
    </main>

    <Footer />
  </div>
);

};

export default Body;
