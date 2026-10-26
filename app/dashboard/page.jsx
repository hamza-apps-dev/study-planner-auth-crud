'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TaskCard from '@/components/TaskCard';
import TaskModal from '@/components/TaskModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import CalendarView from '@/components/CalendarView';
import CategoriesView from '@/components/CategoriesView';
import ProfileView from '@/components/ProfileView';
import SettingsView from '@/components/SettingsView';
import {
  GraduationCap,
  LayoutDashboard,
  CheckSquare,
  FolderTree,
  CalendarDays,
  User,
  Settings,
  LogOut,
  Plus,
  Search,
  Bell,
  CheckCircle2,
  Clock,
  RotateCw,
  ListTodo,
  AlertCircle,
  RefreshCw,
  FolderOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const INITIAL_DEMO_TASKS = [
  {
    _id: 'task-1-dsa',
    title: 'Study Data Structure and Algorithms',
    description: 'Read chapter 5 and solve 10 questions',
    category: 'Study',
    priority: 'high',
    status: 'pending',
    dueDate: '2026-10-26T00:00:00.000Z',
  },
  {
    _id: 'task-2-web',
    title: 'Complete Web Development Assignment',
    description: 'Finish the Next.js project and submit to LMS',
    category: 'Assignment',
    priority: 'medium',
    status: 'pending',
    dueDate: '2026-11-01T00:00:00.000Z',
  },
  {
    _id: 'task-3-islamic',
    title: 'Read Islamic Book',
    description: 'Read 25 pages of Seerat-un-Nabi',
    category: 'Personal',
    priority: 'low',
    status: 'completed',
    dueDate: '2026-10-20T00:00:00.000Z',
  },
  {
    _id: 'task-4-exam',
    title: 'Prepare for Midterm Exam',
    description: 'Revision of Mathematics and Statistics',
    category: 'Exam Prep',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2026-11-16T00:00:00.000Z',
  },
];

export default function DashboardPage() {
  const router = useRouter();

  // Active Sidebar Tab: 'dashboard' | 'tasks' | 'categories' | 'calendar' | 'profile' | 'settings'
  const [activeTab, setActiveTab] = useState('dashboard');

  // Auth User state
  const [user, setUser] = useState({
    name: 'Muhammad Ali',
    email: 'student@example.com',
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Tasks state
  const [tasks, setTasks] = useState(INITIAL_DEMO_TASKS);
  const [toastMessage, setToastMessage] = useState('');

  // Filters & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // 1. Fetch user session in background
  useEffect(() => {
    async function checkAuth() {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const res = await fetch('/api/auth/me', { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setUser(data.user);
          }
        }
      } catch (err) {
        // Fallback user kept smoothly
      }
    }
    checkAuth();
  }, []);

  // 2. Fetch tasks in background
  const fetchTasks = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch('/api/tasks', { signal: controller.signal });
      clearTimeout(timeoutId);

      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.tasks) && data.tasks.length > 0) {
        setTasks(data.tasks);
      }
    } catch (err) {
      // Kept initial demo tasks smoothly
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
      router.refresh();
    } catch (err) {
      router.push('/login');
    }
  };

  // 3. Save Task (Instant Optimistic update)
  const handleSaveTask = async (taskData) => {
    setIsSaving(true);
    try {
      if (selectedTask) {
        // UPDATE
        const updated = { ...selectedTask, ...taskData };
        setTasks((prev) =>
          prev.map((t) => (t._id === selectedTask._id ? updated : t))
        );
        showToast('Task updated successfully!');

        fetch(`/api/tasks/${selectedTask._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        }).catch(() => {});
      } else {
        // CREATE
        const created = {
          _id: `task-${Date.now()}`,
          ...taskData,
          createdAt: new Date().toISOString(),
        };
        setTasks((prev) => [created, ...prev]);
        showToast('Task added successfully!');

        fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
        }).catch(() => {});
      }

      setIsModalOpen(false);
      setSelectedTask(null);
    } finally {
      setIsSaving(false);
    }
  };

  // 4. Quick Status Toggle
  const handleToggleStatus = (task) => {
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, status: nextStatus } : t))
    );

    fetch(`/api/tasks/${task._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus }),
    }).catch(() => {});
  };

  // 5. Delete Task
  const handleDeleteConfirm = () => {
    if (!taskToDelete) return;
    setIsDeleting(true);
    try {
      setTasks((prev) => prev.filter((t) => t._id !== taskToDelete._id));
      showToast('Task deleted successfully.');
      setIsDeleteModalOpen(false);

      fetch(`/api/tasks/${taskToDelete._id}`, {
        method: 'DELETE',
      }).catch(() => {});

      setTaskToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  // Metrics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    const pending = tasks.filter((t) => t.status === 'pending').length;
    const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
    return { total, completed, pending, inProgress };
  }, [tasks]);

  // Filtered Tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (statusFilter !== 'all' && task.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = task.title?.toLowerCase().includes(q);
        const matchesDesc = task.description?.toLowerCase().includes(q);
        const matchesCat = task.category?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesCat) return false;
      }
      return true;
    });
  }, [tasks, statusFilter, searchQuery]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning,';
    if (hour < 18) return 'Good Afternoon,';
    return 'Good Evening,';
  }, []);

  const userInitial = user?.name ? user.name[0].toUpperCase() : 'M';

  return (
    <div className="min-h-screen flex bg-[#070913] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-2xl backdrop-blur-md animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* LEFT SIDEBAR matching all Screens */}
      <aside className="w-64 border-r border-white/[0.06] bg-[#0a0d18]/90 hidden md:flex flex-col justify-between p-6 flex-shrink-0 z-30">
        <div className="space-y-8">
          {/* Brand Logo */}
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-blue-500/10">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Study<span className="text-white">Planner</span>
            </span>
          </Link>

          {/* Navigation Links with Distinct Dashboard vs My Tasks */}
          <nav className="space-y-1.5">
            {/* 1. Dashboard Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all text-left ${
                activeTab === 'dashboard'
                  ? 'text-white bg-gradient-to-r from-blue-600/90 to-indigo-600/90 shadow-lg shadow-indigo-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            {/* 2. My Tasks Tab */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('tasks');
                setStatusFilter('all');
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-medium transition-all text-left ${
                activeTab === 'tasks'
                  ? 'text-white bg-gradient-to-r from-blue-600/90 to-indigo-600/90 shadow-lg shadow-indigo-600/25 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>My Tasks</span>
            </button>

            {/* 3. Categories Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-medium transition-all text-left ${
                activeTab === 'categories'
                  ? 'text-white bg-gradient-to-r from-blue-600/90 to-indigo-600/90 shadow-lg shadow-indigo-600/25 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <FolderTree className="w-4 h-4" />
              <span>Categories</span>
            </button>

            {/* 4. Calendar Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('calendar')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-medium transition-all text-left ${
                activeTab === 'calendar'
                  ? 'text-white bg-gradient-to-r from-blue-600/90 to-indigo-600/90 shadow-lg shadow-indigo-600/25 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Calendar</span>
            </button>

            {/* 5. Profile Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-medium transition-all text-left ${
                activeTab === 'profile'
                  ? 'text-white bg-gradient-to-r from-blue-600/90 to-indigo-600/90 shadow-lg shadow-indigo-600/25 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>

            {/* 6. Settings Tab */}
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-medium transition-all text-left ${
                activeTab === 'settings'
                  ? 'text-white bg-gradient-to-r from-blue-600/90 to-indigo-600/90 shadow-lg shadow-indigo-600/25 font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Logout button */}
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold text-rose-400 hover:text-white hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all text-left"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Logout</span>
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="px-6 sm:px-10 py-6 border-b border-white/[0.06] bg-[#0a0d18]/40 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left Title */}
          <div>
            <span className="text-xs font-medium text-slate-400">
              {activeTab === 'dashboard'
                ? greeting
                : activeTab === 'tasks'
                ? 'Academic Assignments'
                : 'StudyPlanner Suite'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>{user?.name || 'Muhammad Ali'}</span>
              <span>👋</span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Stay consistent. Smart steps make big progress!
            </p>
          </div>

          {/* Right: Notifications + User pill + Add Task Button */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => showToast('No new notifications')}
              className="w-10 h-10 rounded-full bg-slate-900/80 border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-all relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-[#0a0d18]" />
            </button>

            {/* User Pill Badge */}
            <button
              type="button"
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-900/80 border border-white/[0.08] hover:border-cyan-400/30 transition-all text-left"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                {userInitial}
              </div>
              <div className="hidden lg:block pr-2">
                <p className="text-xs font-semibold text-white line-clamp-1">{user?.name || 'Muhammad Ali'}</p>
                <p className="text-[10px] text-slate-400 line-clamp-1">{user?.email || 'student@example.com'}</p>
              </div>
            </button>

            {/* '+ Add Task' Button */}
            <button
              onClick={() => {
                setSelectedTask(null);
                setIsModalOpen(true);
              }}
              id="dashboard-add-task-btn"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white btn-gradient-primary shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Task</span>
            </button>
          </div>
        </header>

        {/* Tab Content Rendering */}
        <div className="p-6 sm:p-10 space-y-8 flex-1">
          {/* TAB 1: CALENDAR VIEW */}
          {activeTab === 'calendar' && (
            <CalendarView
              tasks={tasks}
              onAddTask={() => {
                setSelectedTask(null);
                setIsModalOpen(true);
              }}
            />
          )}

          {/* TAB 2: CATEGORIES VIEW */}
          {activeTab === 'categories' && (
            <CategoriesView
              tasks={tasks}
              onSelectCategory={(cat) => {
                setStatusFilter('all');
                setSearchQuery(cat);
                setActiveTab('tasks');
              }}
            />
          )}

          {/* TAB 3: PROFILE VIEW */}
          {activeTab === 'profile' && (
            <ProfileView
              user={user}
              onProfileUpdated={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
            />
          )}

          {/* TAB 4: SETTINGS VIEW */}
          {activeTab === 'settings' && <SettingsView user={user} />}

          {/* TAB 5: DASHBOARD OVERVIEW VIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* 4 Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-blue-950/40 to-slate-900/60 border border-blue-500/20 backdrop-blur-md space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <ListTodo className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white">{stats.total}</div>
                      <div className="text-xs text-slate-400">Total Tasks</div>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-emerald-950/40 to-slate-900/60 border border-emerald-500/20 backdrop-blur-md space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white">{stats.completed}</div>
                      <div className="text-xs text-slate-400">Completed</div>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-amber-950/40 to-slate-900/60 border border-amber-500/20 backdrop-blur-md space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white">{stats.pending}</div>
                      <div className="text-xs text-slate-400">Pending</div>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-purple-950/40 to-slate-900/60 border border-purple-500/20 backdrop-blur-md space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                      <RotateCw className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-white">{stats.inProgress}</div>
                      <div className="text-xs text-slate-400">In Progress</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Tasks Preview Section */}
              <div className="rounded-3xl glass-card-cyber p-6 border border-white/[0.08] shadow-2xl space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">Active Study Workload</h3>
                    <p className="text-xs text-slate-400">Showing top priority assignments and study tasks</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('tasks')}
                    className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>View All Tasks</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {tasks.slice(0, 3).map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onEdit={(t) => {
                        setSelectedTask(t);
                        setIsModalOpen(true);
                      }}
                      onDelete={(t) => {
                        setTaskToDelete(t);
                        setIsDeleteModalOpen(true);
                      }}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: DEDICATED MY TASKS VIEW */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Task Manager
                  </span>
                  <h2 className="text-2xl font-extrabold text-white tracking-tight">All Tasks ({stats.total})</h2>
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-72">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tasks..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs text-white placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900/80 border border-white/[0.08] overflow-x-auto w-fit">
                <button
                  type="button"
                  onClick={() => setStatusFilter('all')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    statusFilter === 'all'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({stats.total})
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter('pending')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    statusFilter === 'pending'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Pending ({stats.pending})
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter('in-progress')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    statusFilter === 'in-progress'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  In Progress ({stats.inProgress})
                </button>

                <button
                  type="button"
                  onClick={() => setStatusFilter('completed')}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    statusFilter === 'completed'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Completed ({stats.completed})
                </button>
              </div>

              {/* Tasks List */}
              {filteredTasks.length > 0 ? (
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onEdit={(t) => {
                        setSelectedTask(t);
                        setIsModalOpen(true);
                      }}
                      onDelete={(t) => {
                        setTaskToDelete(t);
                        setIsDeleteModalOpen(true);
                      }}
                      onToggleStatus={handleToggleStatus}
                    />
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl p-12 text-center glass-panel border border-white/[0.06] space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-800/60 border border-white/[0.08] flex items-center justify-center text-slate-400">
                    <FolderOpen className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">No tasks found</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      No tasks match your current filter criteria.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Task Add / Edit Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
        task={selectedTask}
        isSaving={isSaving}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        taskTitle={taskToDelete?.title}
        isDeleting={isDeleting}
      />
    </div>
  );
}
