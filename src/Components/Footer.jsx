
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-auto bg-base-100 border-t border-base-300 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-5">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              {"</>"}
            </div>

            <span className="text-lg font-bold text-base-content">
              Dev<span className="text-indigo-600">Tinder</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-base-content/60 text-center">
            © {new Date().getFullYear()} DevTinder.
            Built for developers, by developers.
          </p>

          {/* Tagline */}
          <p className="text-sm font-medium text-indigo-500">
            Connect. Code. Collaborate.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
