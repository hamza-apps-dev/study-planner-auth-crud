import './globals.css';

export const metadata = {
  title: 'StudyPlanner — Plan Today. Achieve Tomorrow',
  description:
    'A simple and powerful task & study planner for students. Organize your tasks, manage courses, stay focused and achieve your goals.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased bg-[#070913] text-slate-100 flex flex-col">
        {children}
      </body>
    </html>
  );
}
