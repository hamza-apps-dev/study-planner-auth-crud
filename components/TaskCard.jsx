'use client';

import { Check, Calendar, Edit2, Trash2 } from 'lucide-react';

const PRIORITY_BADGES = {
  low: {
    bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    label: 'Low',
  },
  medium: {
    bg: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    label: 'Medium',
  },
  high: {
    bg: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
    label: 'High',
  },
  urgent: {
    bg: 'bg-red-500/20 text-red-400 border-red-500/30 font-bold',
    label: 'Urgent',
  },
};

const CATEGORY_BADGES = {
  Study: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Assignment: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Exam Prep': 'bg-rose-500/20 text-rose-400 border-rose-500/30',
  Project: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Reading: 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  Personal: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  Coursework: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
};

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in-progress';
  const priorityInfo = PRIORITY_BADGES[task.priority] || PRIORITY_BADGES.medium;
  const categoryStyle = CATEGORY_BADGES[task.category] || CATEGORY_BADGES.Study;

  let dueDateText = 'No date';
  if (task.dueDate) {
    try {
      const date = new Date(task.dueDate);
      dueDateText = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      dueDateText = 'Invalid date';
    }
  }

  return (
    <div
      className={`group relative rounded-2xl p-4 sm:p-5 transition-all duration-200 border ${
        isCompleted
          ? 'bg-[#0c1222]/50 border-white/[0.04] opacity-75'
          : 'bg-[#10172b]/80 border-white/[0.08] hover:border-cyan-500/30 hover:bg-[#121a30]'
      } shadow-lg`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left Side: Checkbox + Title + Category + Description */}
        <div className="flex items-start sm:items-center gap-3.5 flex-1 min-w-0">
          {/* Custom Checkbox Toggle matching Screen 4 */}
          <button
            type="button"
            onClick={() => onToggleStatus(task)}
            title={isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
            className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all flex-shrink-0 mt-0.5 sm:mt-0 ${
              isCompleted
                ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 border-emerald-400 text-white shadow-sm'
                : 'border-slate-600 bg-slate-900/60 hover:border-cyan-400 text-transparent'
            }`}
          >
            <Check className={`w-3.5 h-3.5 stroke-[3] ${isCompleted ? 'opacity-100' : 'opacity-0'}`} />
          </button>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3
                className={`text-sm sm:text-base font-semibold tracking-tight transition-all truncate ${
                  isCompleted ? 'line-through text-slate-500' : 'text-slate-100 group-hover:text-white'
                }`}
              >
                {task.title}
              </h3>

              {/* Category Pill Badge */}
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${categoryStyle}`}
              >
                {task.category || 'Study'}
              </span>

              {/* In Progress Status pill if active */}
              {isInProgress && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                  In Progress
                </span>
              )}
            </div>

            {task.description && (
              <p className="text-xs text-slate-400 line-clamp-1 leading-relaxed">
                {task.description}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Due Date + Priority Pill + Action Icons */}
        <div className="flex items-center gap-4 sm:gap-6 self-end sm:self-center flex-shrink-0 pt-2 sm:pt-0">
          {/* Due date */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{dueDateText}</span>
          </div>

          {/* Priority Badge */}
          <span
            className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${priorityInfo.bg}`}
          >
            {priorityInfo.label}
          </span>

          {/* Action Buttons (Edit & Delete) */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(task)}
              title="Edit task"
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task)}
              title="Delete task"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
