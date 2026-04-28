import React from "react";
import { LogOut, X } from "lucide-react";

export function LogoutDialog({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 text-center border border-slate-100 transform transition-all animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl hover:bg-slate-50 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-slate-400" />
        </button>
        
        <div className="mx-auto h-20 w-20 rounded-full bg-rose-50 flex items-center justify-center mb-6">
          <div className="h-14 w-14 rounded-full bg-rose-100 flex items-center justify-center">
            <LogOut className="h-7 w-7 text-rose-500" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Are you sure you want to logout?
        </h3>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed">
          You will be signed out of your account and need to login again to continue.
        </p>
        
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 h-12 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 font-semibold text-slate-600 text-sm transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-12 rounded-2xl bg-rose-500 text-white hover:bg-rose-600 font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-500/20"
          >
            <LogOut className="h-4 w-4" />
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}
