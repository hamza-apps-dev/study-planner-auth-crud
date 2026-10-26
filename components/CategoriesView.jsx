'use client';

import { useState } from 'react';
import {
  GraduationCap,
  ListOrdered,
  User,
  BookMarked,
  Plus,
  Edit2,
  Trash2,
  Database,
  Layers,
} from 'lucide-react';

export default function CategoriesView({ tasks = [], onSelectCategory }) {
  const [categories, setCategories] = useState([
    {
      id: 'study',
      name: 'Study',
      tasksCount: 12,
      progress: 80,
      color: 'blue',
      glow: 'shadow-blue-500/15 border-cyan-500/30',
      barColor: 'from-cyan-400 to-blue-500',
      iconBg: 'bg-blue-600/20 text-cyan-400 border-blue-500/30',
      icon: GraduationCap,
    },
    {
      id: 'assignments',
      name: 'Assignments',
      tasksCount: 6,
      progress: 45,
      color: 'purple',
      glow: 'shadow-purple-500/15 border-purple-500/30',
      barColor: 'from-purple-500 to-indigo-500',
      iconBg: 'bg-purple-600/20 text-purple-400 border-purple-500/30',
      icon: ListOrdered,
    },
    {
      id: 'personal',
      name: 'Personal',
      tasksCount: 5,
      progress: 90,
      color: 'green',
      glow: 'shadow-emerald-500/15 border-emerald-500/30',
      barColor: 'from-emerald-400 to-teal-500',
      iconBg: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
      icon: User,
    },
    {
      id: 'exams',
      name: 'Exams',
      tasksCount: 3,
      progress: 20,
      color: 'amber',
      glow: 'shadow-amber-500/15 border-amber-500/30',
      barColor: 'from-amber-400 to-orange-500',
      iconBg: 'bg-amber-600/20 text-amber-400 border-amber-500/30',
      icon: BookMarked,
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newCatName, setNewCatName] = useState('');

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setCategories((prev) => [
      ...prev,
      {
        id: newCatName.toLowerCase().replace(/\s+/g, '-'),
        name: newCatName.trim(),
        tasksCount: 0,
        progress: 0,
        color: 'blue',
        glow: 'shadow-blue-500/15 border-blue-500/30',
        barColor: 'from-blue-500 to-indigo-500',
        iconBg: 'bg-blue-600/20 text-cyan-400 border-blue-500/30',
        icon: Layers,
      },
    ]);
    setNewCatName('');
    setIsCreating(false);
  };

  const handleDeleteCategory = (id) => {
    if (confirm('Delete this category?')) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header of Categories matching Screen 2 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Dashboard
          </span>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Manage Categories</h2>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white btn-gradient-primary shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create Category</span>
        </button>
      </div>

      {/* New Category Input Modal if toggled */}
      {isCreating && (
        <form
          onSubmit={handleAddCategory}
          className="p-4 rounded-2xl glass-card-cyber border border-cyan-400/40 flex items-center gap-3 animate-in fade-in"
        >
          <input
            type="text"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="Category name (e.g. Research, Lab, Project)..."
            required
            className="flex-1 px-4 py-2 rounded-xl glass-input text-xs text-white"
            autoFocus
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white btn-gradient-primary"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsCreating(false)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.05]"
          >
            Cancel
          </button>
        </form>
      )}

      {/* Categories Grid matching Screen 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const IconComponent = cat.icon;

          return (
            <div
              key={cat.id}
              className={`p-6 sm:p-7 rounded-3xl glass-card-cyber border ${cat.glow} space-y-6 transition-all hover:scale-[1.01]`}
            >
              {/* Card Header: Icon + Name + 3D Cylinder/Database indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-lg ${cat.iconBg}`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{cat.name}</h3>
                  </div>
                </div>

                {/* Decorative 3D stack icon matching Screen 2 */}
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-400">
                  <Database className="w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Progress Bar Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">{cat.progress}% progress</span>
                  <span className="font-bold text-white">{cat.tasksCount}</span>
                </div>
                {/* Progress Track */}
                <div className="w-full h-2.5 rounded-full bg-slate-900 border border-white/[0.06] overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${cat.barColor} transition-all duration-500`}
                    style={{ width: `${cat.progress}%` }}
                  />
                </div>
              </div>

              {/* Card Footer: Task Count + Edit & Delete Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-xs">
                <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                  <span>{cat.tasksCount} tasks</span>
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const newTitle = prompt('Edit Category name:', cat.name);
                      if (newTitle && newTitle.trim()) {
                        setCategories((prev) =>
                          prev.map((c) => (c.id === cat.id ? { ...c, name: newTitle.trim() } : c))
                        );
                      }
                    }}
                    title="Edit Category"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(cat.id)}
                    title="Delete Category"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
