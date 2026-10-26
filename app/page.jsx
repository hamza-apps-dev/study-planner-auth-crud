import Navbar from '@/components/Navbar';
import Link from 'next/link';
import {
  GraduationCap,
  LayoutGrid,
  Target,
  BarChart2,
  Check,
  Shield,
  Lock,
  Key,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#070913] text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Navbar */}
      <Navbar user={null} />

      {/* Main Hero Section matching Screen 1 */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-16 flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Typography & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                Plan Today.{' '}
                <span className="block mt-1 bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Achieve Tomorrow
                </span>
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-slate-400 font-normal leading-relaxed pt-2">
                A simple and powerful task & study planner for students. Organize your tasks, manage courses,
                stay focused and achieve your goals.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/signup"
                id="hero-get-started-btn"
                className="px-8 py-3.5 rounded-full text-base font-semibold text-white btn-gradient-primary shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all"
              >
                Get Started
              </Link>
              <Link
                href="#features"
                id="hero-learn-more-btn"
                className="px-8 py-3.5 rounded-full text-base font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 backdrop-blur-md transition-all"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Column: Floating Cyber Glass Study Mockup matching Screen 1 */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient background glows */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-purple-600/20 blur-3xl rounded-full pointer-events-none" />

            {/* Main Interactive Glass Task Card */}
            <div className="relative w-full max-w-md rounded-3xl p-6 sm:p-7 glass-card-cyber space-y-5 border border-cyan-400/30">
              {/* Header inside card */}
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/30 flex items-center justify-center text-cyan-400">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-white tracking-wide">Daily Study List</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Oct 26, 2026
                </span>
              </div>

              {/* Tasks Checklist matching Screen 1 */}
              <div className="space-y-3">
                {/* Item 1 */}
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/40 transition-all">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-200">Study DSA</p>
                    <p className="text-[11px] text-slate-400">Arrays & Trees revision</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                    Study
                  </span>
                </div>

                {/* Item 2 */}
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/40 transition-all">
                  <div className="w-6 h-6 rounded-lg border border-slate-600/80 bg-slate-900/60 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-300">Read Islamic Book</p>
                    <p className="text-[11px] text-slate-400">Chapter 4 pages 12-25</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
                    Personal
                  </span>
                </div>

                {/* Item 3 */}
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/40 transition-all">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-200">Complete Assignment</p>
                    <p className="text-[11px] text-slate-400">Web Dev Task 6 Authentication</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                    Assignment
                  </span>
                </div>

                {/* Item 4 */}
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-cyan-500/40 transition-all">
                  <div className="w-6 h-6 rounded-lg border border-slate-600/80 bg-slate-900/60 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-slate-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-300">Prepare for Exam</p>
                    <p className="text-[11px] text-slate-400">Calculus past papers</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400">
                    Exam
                  </span>
                </div>
              </div>

              {/* Security Shield Badge Floating */}
              <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>MongoDB Atlas Connected</span>
                </span>
                <span className="text-slate-500">Auto-saved</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Feature Cards in a row at bottom matching Screen 1 */}
        <section id="features" className="pt-16 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-3xl glass-card-dark border border-white/[0.08] hover:border-blue-500/30 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                <LayoutGrid className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Stay Organized</h3>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  Manage of your study tasks in one place
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-3xl glass-card-dark border border-white/[0.08] hover:border-purple-500/30 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Boost Productivity</h3>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  Focus on what matters and achieve more
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-3xl glass-card-dark border border-white/[0.08] hover:border-cyan-500/30 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-600/30">
                <BarChart2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">Track Progress</h3>
                <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                  See your improvement every day
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-white/[0.06] bg-[#070913] py-6 px-4 text-center text-xs text-slate-500">
        <p>StudyPlanner — Built with Next.js 14, Tailwind CSS & MongoDB Atlas</p>
      </footer>
    </div>
  );
}
