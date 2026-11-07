import React from "react";
import { CheckCircle2 } from "lucide-react";

const ProfileToast = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed left-1/2 top-6 z-[100] -translate-x-1/2 px-4">
      <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-base-200 px-5 py-4 shadow-xl">
        <CheckCircle2 className="text-green-500" size={22} />

        <div>
          <p className="text-sm font-bold text-base-content">
            Profile Updated!
          </p>

          <p className="text-xs text-base-content/60">
            Your changes have been saved successfully.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileToast;
