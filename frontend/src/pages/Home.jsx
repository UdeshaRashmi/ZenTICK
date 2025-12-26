import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center">
      <div className="max-w-6xl mx-auto w-full px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left: Hero */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
              ZenTick
              <span className="block text-2xl font-light text-gray-600 mt-2">Focused tasks, gentle timers — do more with calm.</span>
            </h1>

            <p className="text-lg text-gray-600 max-w-xl">
              A minimal, beautiful app to capture your todos and support intentional work sessions with smooth, non-jarring alarms.
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <Link
                to="/todos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white shadow-md hover:bg-indigo-700 transition"
                aria-label="Open Todos"
              >
                <span className="material-icons">checklist</span>
                View Todos
              </Link>

              <Link
                to="/stopwatch"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-indigo-200 text-indigo-700 bg-white hover:bg-indigo-50 transition"
                aria-label="Open Timer"
              >
                <span className="material-icons">timer</span>
                Open Timer
              </Link>
            </div>

            <div className="mt-6 flex gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full" />
                <span>Gentle ramping alarms</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full" />
                <span>Simple focused workflows</span>
              </div>
            </div>
          </div>

          {/* Right: Preview card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl ring-1 ring-black/5">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-500">Session</div>
                <div className="text-2xl font-mono text-gray-900">25:00</div>
              </div>

              <div className="space-y-3">
                {["Review PR", "Write summary", "Plan next steps"].map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-gray-200" />
                    <div className="flex-1 text-sm text-gray-800 truncate">{t}</div>
                    <div className="text-xs text-gray-400">15m</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white">Start</button>
                <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700">Preset</button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 bg-white rounded-2xl shadow flex gap-4 items-start">
            <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <span className="material-icons">check_circle</span>
            </div>
            <div>
              <div className="font-medium text-gray-800">Todo Manager</div>
              <div className="text-sm text-gray-500">Quickly create and organize tasks.</div>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl shadow flex gap-4 items-start">
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
              <span className="material-icons">timer</span>
            </div>
            <div>
              <div className="font-medium text-gray-800">Mindful Timer</div>
              <div className="text-sm text-gray-500">Ramped alarms and smooth audio.</div>
            </div>
          </div>

          <div className="p-5 bg-white rounded-2xl shadow flex gap-4 items-start">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <span className="material-icons">auto_awesome</span>
            </div>
            <div>
              <div className="font-medium text-gray-800">Delightful UX</div>
              <div className="text-sm text-gray-500">Subtle animations to reduce friction.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
