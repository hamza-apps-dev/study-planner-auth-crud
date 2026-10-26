'use client';

import { useState } from 'react';
import {
  Sun,
  Moon,
  Bell,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

export default function SettingsView({ user }) {
  const [theme, setTheme] = useState('dark');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushReminders, setPushReminders] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(true);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setStatusMsg('Access controls updated successfully!');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        'DANGER: Are you sure you want to delete your account? All study tasks will be permanently removed!'
      )
    ) {
      alert('For security in this submission demo, please contact admin or reset your password.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header matching Screen 4 */}
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Dashboard
        </span>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Settings</h2>
      </div>

      {statusMsg && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Card 1: Preferences (Light / Dark Toggler) matching Screen 4 */}
      <div className="rounded-3xl glass-card-cyber p-6 border border-white/[0.08] shadow-2xl space-y-4">
        <h3 className="text-base font-bold text-white tracking-tight">Preferences</h3>

        <div className="flex items-center justify-between py-2 border-t border-white/[0.06]">
          <div>
            <p className="text-xs font-semibold text-slate-200">Light toggler</p>
            <p className="text-[11px] text-slate-400">Switch between dark and light appearance</p>
          </div>

          {/* Sun / Moon Toggler matching Screen 4 */}
          <div className="flex items-center p-1 rounded-full bg-slate-900 border border-white/[0.1]">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-full transition-all ${
                theme === 'light' ? 'bg-cyan-500 text-black shadow-md' : 'text-slate-400 hover:text-white'
              }`}
              title="Light Mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-full transition-all ${
                theme === 'dark' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
              title="Dark Mode"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Card 2: Notification Preferences matching Screen 4 */}
      <div className="rounded-3xl glass-card-cyber p-6 border border-white/[0.08] shadow-2xl space-y-4">
        <h3 className="text-base font-bold text-white tracking-tight">Notification Preferences</h3>

        <div className="space-y-4 border-t border-white/[0.06] pt-3">
          {/* Email alerts */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-200">Email alerts</p>
              <p className="text-[11px] text-slate-400">Receive assignment deadlines in your inbox</p>
            </div>
            <button
              type="button"
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                emailAlerts ? 'bg-blue-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  emailAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Push reminders */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-200">Push reminders</p>
              <p className="text-[11px] text-slate-400">Browser alerts when tasks are due</p>
            </div>
            <button
              type="button"
              onClick={() => setPushReminders(!pushReminders)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                pushReminders ? 'bg-blue-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  pushReminders ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* System updates */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-200">System Updates</p>
              <p className="text-[11px] text-slate-400">Feature releases and security updates</p>
            </div>
            <button
              type="button"
              onClick={() => setSystemUpdates(!systemUpdates)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                systemUpdates ? 'bg-blue-600' : 'bg-slate-800'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  systemUpdates ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Row: Access Controls & Danger Zone matching Screen 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Access Controls */}
        <div className="rounded-3xl glass-card-cyber p-6 border border-white/[0.08] shadow-2xl space-y-4">
          <h3 className="text-base font-bold text-white tracking-tight">Access Controls</h3>

          <form onSubmit={handleUpdatePassword} className="space-y-3.5 border-t border-white/[0.06] pt-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Reset Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Reset Password"
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-300">Repeat Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Input Password"
                className="w-full px-3.5 py-2 rounded-xl glass-input text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded-full text-xs font-semibold text-white btn-gradient-primary shadow-lg shadow-indigo-600/30"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Danger Zone matching Screen 4 */}
        <div className="rounded-3xl p-6 bg-rose-950/20 border border-rose-500/40 shadow-2xl shadow-rose-950/20 space-y-4">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <h3 className="text-base font-bold text-rose-400 tracking-tight">Danger Zone:</h3>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Specific warning: specific warnings. If specific account settings are modified or account is
            deleted, all academic study schedules and tasks will be erased permanently.
          </p>

          <button
            type="button"
            onClick={handleDeleteAccount}
            className="w-full py-2.5 rounded-full text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>Danger Zone: Delete My Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
