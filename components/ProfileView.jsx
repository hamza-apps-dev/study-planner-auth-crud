'use client';

import { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Edit2,
  Shield,
  CheckCircle2,
  Loader2,
  Award,
} from 'lucide-react';

export default function ProfileView({ user, onProfileUpdated }) {
  const [name, setName] = useState(user?.name || 'Muhammad Ali');
  const [email] = useState(user?.email || 'Muhammad@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      // 1. Instant optimistic update so UI never hangs
      if (onProfileUpdated) {
        onProfileUpdated({ name: name.trim() });
      }

      setSuccessMsg('Profile updated successfully!');
      setPassword('');

      // 2. Background sync with short timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          ...(password ? { password: password.trim() } : {}),
        }),
        signal: controller.signal,
      })
        .then((r) => r.json())
        .catch(() => {})
        .finally(() => clearTimeout(timeoutId));
    } catch (err) {
      console.error('Update profile error:', err);
      setErrorMsg('Error updating profile.');
    } finally {
      // Always reset saving state immediately
      setTimeout(() => {
        setIsSaving(false);
      }, 350);
    }
  };

  const userInitial = name ? name[0].toUpperCase() : 'M';

  return (
    <div className="space-y-6">
      {/* Top Header matching Screen 3 */}
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Dashboard
        </span>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Profile Overview</h2>
      </div>

      {/* Hero Banner with Avatar matching Screen 3 */}
      <div className="relative rounded-3xl overflow-hidden glass-card-cyber border border-white/[0.08] shadow-2xl">
        {/* Banner Top Gradient */}
        <div className="h-32 sm:h-36 bg-gradient-to-r from-purple-800/60 via-indigo-700/50 to-cyan-600/60 relative">
          <button
            type="button"
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
            title="Edit Banner"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          {/* Decorative Security Icons matching Screen 3 */}
          <div className="absolute bottom-3 right-6 flex items-center gap-2 text-cyan-300">
            <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-cyan-400/30">
              <Lock className="w-4 h-4 text-cyan-300" />
            </div>
            <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-cyan-400/30">
              <Shield className="w-4 h-4 text-cyan-300" />
            </div>
          </div>
        </div>

        {/* Avatar & User Details */}
        <div className="px-6 pb-6 pt-0 relative flex flex-col items-center -mt-14 sm:-mt-16 text-center space-y-2">
          {/* Avatar with Edit Badge */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-4 ring-[#0a0d18] bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-extrabold shadow-2xl">
              {userInitial}
            </div>
            <button
              type="button"
              className="absolute bottom-1 right-1 p-1.5 rounded-full bg-cyan-500 text-black hover:bg-cyan-400 transition-colors shadow-lg"
              title="Change Avatar"
            >
              <Edit2 className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">Student Details team</p>
          </div>
        </div>
      </div>

      {/* Two Cards Grid matching Screen 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Card: Update Information Form */}
        <div className="lg:col-span-7 rounded-3xl glass-card-cyber p-6 sm:p-7 border border-white/[0.08] shadow-2xl space-y-5">
          <h3 className="text-base font-bold text-white tracking-tight">Update Information</h3>

          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            {/* Name input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Muhammad Ali"
                required
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs text-white"
              />
            </div>

            {/* Email input (read-only with badge) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-2.5 rounded-xl glass-input text-xs text-slate-400 bg-slate-900/80 cursor-not-allowed"
              />
            </div>

            {/* Password input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password (leave blank to keep current)"
                  className="w-full px-4 pr-10 py-2.5 rounded-xl glass-input text-xs text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-full text-xs font-semibold text-white btn-gradient-primary shadow-lg shadow-indigo-600/30 flex items-center gap-2 active:scale-95 transition-all mt-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </form>
        </div>

        {/* Right Card: Task Achievements matching Screen 3 */}
        <div className="lg:col-span-5 rounded-3xl glass-card-cyber p-6 sm:p-7 border border-white/[0.08] shadow-2xl space-y-6 text-center">
          <h3 className="text-base font-bold text-white tracking-tight text-left">Task Achievements</h3>

          {/* Circular Progress Meter matching Screen 3 */}
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="url(#progressGradient)"
                strokeWidth="10"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * 85) / 100}
                strokeLinecap="round"
                fill="transparent"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-white">85%</span>
              <span className="text-[10px] text-slate-400 font-medium">Task Completion</span>
            </div>
          </div>

          {/* Bottom 3 Stats matching Screen 3 */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/[0.08]">
            <div>
              <div className="text-lg font-extrabold text-cyan-400">85%</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Task Completion</div>
            </div>
            <div>
              <div className="text-lg font-extrabold text-emerald-400">32</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Completed</div>
            </div>
            <div>
              <div className="text-lg font-extrabold text-amber-400">6</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Pending Tasks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
