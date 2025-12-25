import React from 'react';

export default function Layout({ children }) {
  return (
    <div style={{ padding: 20 }}>
      <header style={{ marginBottom: 20 }}>
        <h1>ZenTICK</h1>
        <nav>
          <a href="/">Home</a> | <a href="/stopwatch">Stopwatch</a>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
