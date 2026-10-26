'use client';

import { Trash2, AlertTriangle, X, Loader2 } from 'lucide-react';

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
  isDeleting,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      {/* Modal matching Screen 7 (Delete Confirmation Modal) */}
      <div className="relative w-full max-w-sm rounded-3xl glass-card-cyber p-6 sm:p-7 shadow-2xl border border-rose-500/30 text-center animate-in fade-in zoom-in-95 duration-200">
        {/* Close 'X' button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Red circular badge with trash can matching Screen 7 */}
        <div className="w-14 h-14 mx-auto rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-500 shadow-lg shadow-rose-500/20 mb-4">
          <Trash2 className="w-7 h-7" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white tracking-tight">Delete Task</h3>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
          Are you sure you want to delete this task?
          {taskTitle && (
            <span className="block text-slate-200 font-semibold mt-1 truncate">
              &quot;{taskTitle}&quot;
            </span>
          )}
          <span className="block text-rose-400 text-xs mt-1">This action cannot be undone.</span>
        </p>

        {/* Footer Buttons matching Screen 7 */}
        <div className="flex items-center justify-center gap-3 mt-6 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="w-1/2 py-2.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-1/2 py-2.5 rounded-full text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/30 flex items-center justify-center gap-1.5 transition-all"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
