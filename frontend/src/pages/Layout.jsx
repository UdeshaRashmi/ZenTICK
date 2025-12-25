import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">ZenTICK</h1>
          <nav className="space-x-4">
            <a className="text-indigo-600 hover:underline" href="/">Home</a>
            <a className="text-indigo-600 hover:underline" href="/stopwatch">Stopwatch</a>
          </nav>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-4">{children}</main>
    </div>
  );
}
