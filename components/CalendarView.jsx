'use client';

import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle2,
  Clock,
  Calendar as CalendarIcon,
} from 'lucide-react';

export default function CalendarView({ tasks = [], onAddTask }) {
  const [currentView, setCurrentView] = useState('Month'); // Month, Week, Day
  const [currentMonth, setCurrentMonth] = useState('October 2026');

  // Days of week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calendar dates for October 2026
  // October 2026 starts on Thursday (Oct 1)
  // September overflow: 27, 28, 29, 30
  // October: 1 to 31
  // November overflow: 1, 2, ...
  const calendarCells = [
    { day: 27, isCurrentMonth: false },
    { day: 28, isCurrentMonth: false },
    { day: 29, isCurrentMonth: false },
    { day: 30, isCurrentMonth: false },
    { day: 1, isCurrentMonth: true },
    { day: 2, isCurrentMonth: true, event: 'Math Study group', eventColor: 'blue' },
    { day: 3, isCurrentMonth: true },
    { day: 4, isCurrentMonth: true },
    { day: 5, isCurrentMonth: true },
    { day: 6, isCurrentMonth: true },
    { day: 7, isCurrentMonth: true, event: 'Math Study group', eventColor: 'blue' },
    { day: 8, isCurrentMonth: true },
    { day: 9, isCurrentMonth: true, event: 'Project Submission', eventColor: 'amber' },
    { day: 10, isCurrentMonth: true, event: 'Project Submission', eventColor: 'amber' },
    { day: 11, isCurrentMonth: true, event: 'Math Study group', eventColor: 'blue' },
    { day: 12, isCurrentMonth: true },
    { day: 13, isCurrentMonth: true },
    { day: 14, isCurrentMonth: true, event: 'Project Submission', eventColor: 'amber' },
    { day: 15, isCurrentMonth: true, event: 'Math Study group', eventColor: 'blue' },
    { day: 16, isCurrentMonth: true, event: 'Math Study group', eventColor: 'blue' },
    { day: 17, isCurrentMonth: true },
    { day: 18, isCurrentMonth: true, event: 'Project Submission', eventColor: 'amber' },
    { day: 19, isCurrentMonth: true },
    { day: 20, isCurrentMonth: true, event: 'Islamic Book', eventColor: 'purple' },
    { day: 21, isCurrentMonth: true, event: 'Project Submission', eventColor: 'amber' },
    { day: 22, isCurrentMonth: true, event: 'Project Submission', eventColor: 'amber' },
    { day: 23, isCurrentMonth: true },
    { day: 24, isCurrentMonth: true, event: 'Math Study group', eventColor: 'blue' },
    { day: 25, isCurrentMonth: true },
    { day: 26, isCurrentMonth: true, isToday: true, event: 'DSA Study', eventColor: 'rose' },
    { day: 27, isCurrentMonth: true },
    { day: 28, isCurrentMonth: true },
    { day: 29, isCurrentMonth: true },
    { day: 30, isCurrentMonth: true },
    { day: 31, isCurrentMonth: true },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header of Calendar matching Screen 1 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Dashboard
          </span>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Academic Calendar</h2>
        </div>

        <button
          onClick={onAddTask}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white btn-gradient-primary shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add Event</span>
        </button>
      </div>

      {/* Main Grid: Calendar on Left, Agenda on Right matching Screen 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Calendar Box */}
        <div className="lg:col-span-8 rounded-3xl glass-card-cyber p-6 border border-white/[0.08] shadow-2xl space-y-5">
          {/* Calendar Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">{currentMonth}</h3>
            </div>

            {/* View Mode Pills (Month / Week / Day) */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/80 border border-white/[0.08]">
              {['Month', 'Week', 'Day'].map((view) => (
                <button
                  key={view}
                  type="button"
                  onClick={() => setCurrentView(view)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    currentView === view
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 pb-1">
            {daysOfWeek.map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid Cells matching Screen 1 */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {calendarCells.map((cell, idx) => (
              <div
                key={idx}
                className={`min-h-[64px] sm:min-h-[72px] p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border transition-all flex flex-col justify-between ${
                  cell.isToday
                    ? 'border-cyan-400/60 bg-cyan-950/20 shadow-md shadow-cyan-500/10'
                    : cell.isCurrentMonth
                    ? 'border-white/[0.04] bg-[#0d1424]/60 hover:border-white/[0.1] hover:bg-[#10192e]'
                    : 'border-transparent bg-transparent opacity-30'
                }`}
              >
                <span
                  className={`text-xs font-bold ${
                    cell.isToday
                      ? 'text-cyan-400'
                      : cell.isCurrentMonth
                      ? 'text-slate-300'
                      : 'text-slate-600'
                  }`}
                >
                  {cell.day}
                </span>

                {cell.event && (
                  <div
                    className={`mt-1 px-1.5 py-0.5 rounded-md text-[9px] sm:text-[10px] font-semibold truncate leading-tight ${
                      cell.eventColor === 'blue'
                        ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30'
                        : cell.eventColor === 'amber'
                        ? 'bg-amber-600/30 text-amber-300 border border-amber-500/30'
                        : cell.eventColor === 'purple'
                        ? 'bg-purple-600/30 text-purple-300 border border-purple-500/30'
                        : 'bg-rose-600/30 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {cell.event}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Today's Agenda & Weekly Deadlines matching Screen 1 */}
        <div className="lg:col-span-4 space-y-6">
          {/* Today's Agenda Box */}
          <div className="rounded-3xl glass-card-cyber p-6 border border-white/[0.08] shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wide">Today&apos;s Agenda</h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#0c1222]/80 border border-white/[0.06] hover:border-cyan-500/30 transition-all flex items-start gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 mt-0.5 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-200">Today Appointment 20 days</p>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400">
                    High context
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0c1222]/80 border border-white/[0.06] hover:border-cyan-500/30 transition-all flex items-start gap-3">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 mt-0.5 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-200">Today Appointment 2 days</p>
                  <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400">
                    High context
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Deadlines Box matching Screen 1 */}
          <div className="rounded-3xl glass-card-cyber p-6 border border-white/[0.08] shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wide">Weekly Deadlines</h3>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-[#0c1222]/80 border border-white/[0.06] flex items-start gap-3">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-900 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-300">High contrast assistor</p>
                  <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.2 rounded-full bg-teal-500/20 text-teal-400">
                    Toggle
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#0c1222]/80 border border-white/[0.06] flex items-start gap-3">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-900 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-300">Weekly deadline</p>
                  <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-400">
                    High context
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#0c1222]/80 border border-white/[0.06] flex items-start gap-3">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-900 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-300">Weekly destination deadlines</p>
                  <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.2 rounded-full bg-orange-500/20 text-orange-400">
                    Critical
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#0c1222]/80 border border-white/[0.06] flex items-start gap-3">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-900 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-300">Friday deadline</p>
                  <span className="inline-block mt-1 text-[9px] font-bold px-2 py-0.2 rounded-full bg-rose-500/20 text-rose-400">
                    Priority
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
