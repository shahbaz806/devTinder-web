// import React from 'react'



// const Footer = () => {
//   return (
    
//         <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 fixed bottom-0">
//   <aside>
//     <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
//   </aside>
// </footer>
    
//   )
// }

// export default Footer


import React from "react";

const Footer = () => {
  return (
    <footer className="w-full mt-auto bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-5">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600
              flex items-center justify-center text-white font-bold">
              {"</>"}
            </div>

            <span className="text-lg font-bold text-slate-800">
              Dev<span className="text-indigo-600">Tinder</span>
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-slate-500 text-center">
            © {new Date().getFullYear()} DevTinder.
            Built for developers, by developers.
          </p>

          {/* Tagline */}
          <p className="text-sm font-medium text-indigo-600">
            Connect. Code. Collaborate.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;

