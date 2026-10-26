'use client';

import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';

const CATEGORIES = [
  'Study',
  'Assignment',
  'Exam Prep',
  'Project',
  'Reading',
  'Coursework',
  'Personal',
];

const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

const STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

export default function TaskModal({ isOpen, onClose, onSave, task, isSaving }) {
  const isEditing = Boolean(task);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Study',
    priority: 'medium',
    status: 'pending',
    dueDate: '',
  });

  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (task) {
      let formattedDate = '';
      if (task.dueDate) {
        try {
          const d = new Date(task.dueDate);
          formattedDate = d.toISOString().split('T')[0];
        } catch {
          formattedDate = '';
        }
      }

      setFormData({
        title: task.title || '',
        description: task.description || '',
        category: task.category || 'Study',
        priority: task.priority || 'medium',
        status: task.status || 'pending',
        dueDate: formattedDate,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Study',
        priority: 'medium',
        status: 'pending',
        dueDate: new Date().toISOString().split('T')[0],
      });
    }
    setValidationError('');
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setValidationError('Please enter a task title.');
      return;
    }

    onSave({
      ...formData,
      title: formData.title.trim(),
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-lg rounded-3xl glass-card-cyber p-6 sm:p-7 shadow-2xl border border-cyan-400/30 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <h2 className="text-xl font-bold text-white tracking-tight">
            {isEditing ? 'Edit Task' : 'Add Task'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {validationError && (
          <div className="mt-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
            {validationError}
          </div>
        )}

        {/* Form Body matching Screen 5 & 6 */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Description (Optional)</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter task description..."
              className="w-full px-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-slate-500 resize-none"
            />
          </div>

          {/* Row 1: Category & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-white bg-[#0e1424] cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900 text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-white bg-[#0e1424] cursor-pointer"
              >
                {PRIORITIES.map((p) => (
                  <option key={p.value} value={p.value} className="bg-slate-900 text-white">
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Due Date & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-white [color-scheme:dark]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl glass-input text-sm text-white bg-[#0e1424] cursor-pointer"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value} className="bg-slate-900 text-white">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer Actions matching Screen 5 & 6 */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-full text-xs font-semibold text-white btn-gradient-primary shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>{isEditing ? 'Save Changes' : 'Add Task'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
