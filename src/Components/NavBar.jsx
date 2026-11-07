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
  Sun,
  Moon,
} from "lucide-react";

import { useTheme } from "./Context/ThemeContext";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });

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
    <nav className="fixed top-0 left-0 w-full z-50 h-16 bg-base-100/95 backdrop-blur-xl border-b border-base-300 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center justify-between">
        {/* Logo + Theme Toggle */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center group-hover:bg-indigo-700 transition shadow-md shadow-indigo-200">
              <Code2 size={23} className="text-white" />
            </div>

            <span className="text-xl font-extrabold text-base-content tracking-tight">
              Dev<span className="text-indigo-600">Tinder</span>
            </span>
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
            className="w-10 h-10 flex items-center justify-center rounded-xl border border-base-300 bg-base-200 text-base-content hover:bg-indigo-500/10 hover:text-indigo-500 transition-all duration-300"
          >
            {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
          </button>
        </div>

        {/* User Navigation */}
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
                        ? "bg-indigo-500/10 text-indigo-500"
                        : "text-base-content/70 hover:bg-base-200 hover:text-indigo-500"
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
                className="flex items-center gap-2 cursor-pointer p-1.5 pl-3 rounded-full hover:bg-base-200 transition"
              >
                <div className="hidden sm:block text-right">
                  <p className="text-[11px] text-base-content/60">
                    Welcome back,
                  </p>

                  <p className="text-sm font-bold text-base-content">
                    {user.firstName}
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full border-2 border-indigo-200 overflow-hidden bg-base-200">
                  <img
                    src={user.photoUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>

                <ChevronDown size={16} className="text-base-content/60" />
              </div>

              {/* Dropdown Menu */}
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-2xl w-60 p-2 mt-4 shadow-xl border border-base-300 text-base-content"
              >
                <li className="menu-title px-3 text-xs tracking-wider">
                  MY ACCOUNT
                </li>

                <li>
                  <Link to="/profile" className="flex items-center gap-3 py-3">
                    <UserRound size={18} className="text-indigo-500" />
                    My Profile
                  </Link>
                </li>

                <li>
                  <Link
                    to="/connections"
                    className="flex items-center gap-3 py-3"
                  >
                    <Users size={18} className="text-indigo-500" />
                    Connections
                  </Link>
                </li>

                <li>
                  <Link to="/requests" className="flex items-center gap-3 py-3">
                    <UserRoundPlus size={18} className="text-indigo-500" />
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
                    className="flex items-center gap-3 py-3 text-red-500 hover:bg-red-500/10"
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
