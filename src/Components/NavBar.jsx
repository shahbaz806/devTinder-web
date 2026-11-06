// import axios from "axios";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constant";
// import { removeUser } from "../utils/userSlice";

// const NavBar = () => {
//   const user = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post(BASE_URL + "/logout", { withCredentials: true });
//       dispatch(removeUser())
//       return navigate("/login");
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   return (
//     <div className="navbar bg-base-300 shadow-sm fixed top-0 left-0 w-full z-50">
//       <div className="flex-1">
//         <Link to="/" className="btn btn-ghost text-white text-xl">
//           DevTinder
//         </Link>
//       </div>

//       {user && (
//         <div className="flex-none gap-2">
//           <div className="dropdown dropdown-end mx-5 flex">
//             <div className="flex items-center mx-5">
//               {" "}
//               Welcome,{user.firstName}
//             </div>
//             <div
//               tabIndex={0}
//               role="button"
//               className="btn btn-ghost btn-circle avatar"
//             >
//               <div className="w-10 rounded-full">
//                 <img alt="user photo" src={user.photoUrl} />
//               </div>
//             </div>
//             <ul
//               tabIndex={-1}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
//             >
//               <li>
//                 <Link to="/profile" className="justify-between">
//                   Profile
//                   <span className="badge">New</span>
//                 </Link>
//               </li>
//               <li>
//                <Link to="/connections">Connections</Link> 
//               </li>
//               <li>
//                <Link to="/requests">Connections Requests</Link> 
//               </li>
//               <li>
//                <Link to="/premium">Premium </Link> 
//               </li>
//               <li>
//                 <a onClick={handleLogout}>Logout</a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NavBar;


// import axios from "axios";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constant";
// import { removeUser } from "../utils/userSlice";

// const NavBar = () => {
//   const user = useSelector((store) => store.user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         BASE_URL + "/logout",
//         {},
//         { withCredentials: true }
//       );

//       dispatch(removeUser());
//       navigate("/login", { replace: true });
//     } catch (err) {
//       console.error("Logout error:", err);
//     }
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full z-50
//       h-16 bg-white border-b border-slate-200 shadow-sm">

//       <div className="max-w-7xl mx-auto h-full px-4 md:px-8
//         flex items-center justify-between">

//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2 group">

//           <div className="w-9 h-9 rounded-lg bg-indigo-600
//             flex items-center justify-center
//             group-hover:bg-indigo-700 transition">

//             <span className="text-white font-bold text-lg">
//               {"</>"}
//             </span>

//           </div>

//           <span className="text-xl font-bold text-slate-800">
//             Dev<span className="text-indigo-600">Tinder</span>
//           </span>

//         </Link>

//         {user && (
//           <div className="flex items-center gap-5">

//             {/* Navigation Links */}
//             <div className="hidden md:flex items-center gap-7">

//               <Link to="/" className="text-sm font-medium
//                 text-slate-600 hover:text-indigo-600 transition">
//                 Feed
//               </Link>

//               <Link to="/connections" className="text-sm font-medium
//                 text-slate-600 hover:text-indigo-600 transition">
//                 Connections
//               </Link>

//               <Link to="/requests" className="text-sm font-medium
//                 text-slate-600 hover:text-indigo-600 transition">
//                 Requests
//               </Link>

//             </div>

//             {/* Profile Dropdown */}
//             <div className="dropdown dropdown-end">

//               <div tabIndex={0} role="button"
//                 className="flex items-center gap-2 cursor-pointer
//                 p-1.5 rounded-full hover:bg-slate-100 transition">

//                 <div className="text-right hidden sm:block">
//                   <p className="text-xs text-slate-400">
//                     Welcome,
//                   </p>

//                   <p className="text-sm font-semibold text-slate-800">
//                     {user.firstName}
//                   </p>
//                 </div>

//                 <div className="w-10 h-10 rounded-full
//                   border-2 border-indigo-100 overflow-hidden">

//                   <img
//                     src={user.photoUrl}
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />

//                 </div>

//               </div>

//               <ul tabIndex={0}
//                 className="dropdown-content menu bg-white
//                 rounded-xl w-56 p-2 mt-4 shadow-xl
//                 border border-slate-200 text-slate-700">

//                 <li className="menu-title px-3">
//                   MY ACCOUNT
//                 </li>

//                 <li>
//                   <Link to="/profile">
//                     My Profile
//                   </Link>
//                 </li>

//                 <li>
//                   <Link to="/connections">
//                     Connections
//                   </Link>
//                 </li>

//                 <li>
//                   <Link to="/requests">
//                     Connection Requests
//                   </Link>
//                 </li>

//                 <li>
//                   <Link to="/premium">
//                     Premium Membership
//                   </Link>
//                 </li>

//                 <div className="divider my-1"></div>

//                 <li>
//                   <button
//                     onClick={handleLogout}
//                     className="text-red-500 hover:bg-red-50"
//                   >
//                     Logout
//                   </button>
//                 </li>

//               </ul>

//             </div>

//           </div>
//         )}

//       </div>
//     </nav>
//   );
// };

// export default NavBar;


import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Code2,
  Home,
  Users,
  UserRoundPlus,
  UserRound,
  Crown,
  LogOut,
  ChevronDown,
  Settings,
} from "lucide-react";

import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );

      dispatch(removeUser());
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const navLinks = [
    { name: "Feed", path: "/", icon: Home },
    { name: "Connections", path: "/connections", icon: Users },
    { name: "Requests", path: "/requests", icon: UserRoundPlus },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-16 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-700 transition shadow-md shadow-indigo-200">
            <Code2 size={23} className="text-white" />
          </div>

          <span className="text-xl font-extrabold text-slate-800 tracking-tight">
            Dev<span className="text-indigo-600">Tinder</span>
          </span>
        </Link>

        {user && (
          <div className="flex items-center gap-3 md:gap-7">

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map(({ name, path, icon: Icon }) => {
                const active = location.pathname === path;

                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      active
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                    }`}
                  >
                    <Icon size={18} />
                    {name}
                  </Link>
                );
              })}
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 cursor-pointer p-1.5 pl-3 rounded-full hover:bg-slate-100 transition"
              >
                <div className="hidden sm:block text-right">
                  <p className="text-[11px] text-slate-400">
                    Welcome back,
                  </p>

                  <p className="text-sm font-bold text-slate-800">
                    {user.firstName}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full border-2 border-indigo-200 overflow-hidden bg-indigo-50">
                  <img
                    src={user.photoUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <ChevronDown size={16} className="text-slate-500" />
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white rounded-2xl w-60 p-2 mt-4 shadow-xl border border-slate-200 text-slate-700"
              >
                <li className="menu-title px-3 text-xs tracking-wider">
                  MY ACCOUNT
                </li>

                <li>
                  <Link to="/profile" className="flex items-center gap-3 py-3">
                    <UserRound size={18} className="text-indigo-600" />
                    My Profile
                  </Link>
                </li>

                <li>
                  <Link to="/connections" className="flex items-center gap-3 py-3">
                    <Users size={18} className="text-indigo-600" />
                    Connections
                  </Link>
                </li>

                <li>
                  <Link to="/requests" className="flex items-center gap-3 py-3">
                    <UserRoundPlus size={18} className="text-indigo-600" />
                    Connection Requests
                  </Link>
                </li>

                <li>
                  <Link to="/premium" className="flex items-center gap-3 py-3">
                    <Crown size={18} className="text-amber-500" />
                    Premium Membership
                  </Link>
                </li>

                <div className="divider my-1" />

                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 py-3 text-red-500 hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

