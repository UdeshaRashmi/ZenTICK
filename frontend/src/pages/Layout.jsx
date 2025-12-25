 // src/pages/Layout.jsx
import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Mountains from '../components/common/Mountains';
import BackgroundLeaves from '../components/common/BackgroundLeaves';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-teal-50 relative overflow-hidden">
      <Mountains />
      <BackgroundLeaves />
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-purple-100 relative z-10">
        <div className="max-w-5xl mx-auto px-6 py-8 flex justify-between items-center">
          <h1 className="text-4xl font-light text-gray-800 tracking-wide">
            ZenTick <span className="text-purple-500">🧘‍♂️</span>
          </h1>
          <nav className="flex gap-10">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-600 font-medium text-lg border-b-2 border-purple-600 pb-1"
                  : "text-gray-600 hover:text-purple-600 text-lg transition"
              }
            >
              Todos
            </NavLink>
            <NavLink
              to="/stopwatch"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-600 font-medium text-lg border-b-2 border-purple-600 pb-1"
                  : "text-gray-600 hover:text-purple-600 text-lg transition"
              }
            >
              Timer
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <Outlet />
      </main>

      <footer className="text-center text-gray-500 text-sm py-8">
        Breathe. Flow. Tick. 
      </footer>
    </div>
  );
}