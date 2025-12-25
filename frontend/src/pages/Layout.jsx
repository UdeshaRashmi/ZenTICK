import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <header className="bg-transparent">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">ZenTICK</h1>
            <p className="text-sm muted">A calm, focused timer and simple todos</p>
          </div>
          <nav className="space-x-4">
            <a className="text-emerald-600 hover:underline" href="/">Home</a>
            <a className="text-emerald-600 hover:underline" href="/stopwatch">Stopwatch</a>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-4 zen-container">{children}</main>
    </div>
  );
}
