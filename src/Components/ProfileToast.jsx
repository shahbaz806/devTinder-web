
import React from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProfileToast = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -12, x: "-50%" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed left-1/2 top-5 z-[100] w-[calc(100%-32px)] max-w-sm"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-base-100 p-4 shadow-2xl shadow-base-content/10">

            {/* Success Icon */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <CheckCircle2 size={23} className="text-primary" />
            </div>

            {/* Message */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-base-content">
                  Profile Updated!
                </p>
                <Sparkles size={13} className="text-primary" />
              </div>

              <p className="mt-1 text-xs leading-5 text-base-content/55">
                Your changes have been saved successfully.
              </p>
            </div>

            {/* Status */}
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary">
              Saved
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileToast;
