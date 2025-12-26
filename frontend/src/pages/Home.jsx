import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { playSoundOnce } from '../utils/sounds';

export default function Home() {
  const navigate = useNavigate();
  const [minutes, setMinutes] = useState(25);
  const [soundUrl, setSoundUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
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

              <button
                onClick={() => navigate('/stopwatch')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-indigo-200 text-indigo-700 bg-white hover:bg-indigo-50 transition"
                aria-label="Open Timer"
              >
                <span className="material-icons">timer</span>
                Open Timer
              </button>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full" />
                <span>Gentle ramping alarms</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full" />
                <span>Simple focused workflows</span>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <div className="text-xs text-gray-500">Session</div>
                <div className="flex items-center gap-2 bg-white rounded-full px-2 py-1 border border-gray-100">
                  {[10,15,25,50].map((p) => (
                    <button
                      key={p}
                      onClick={() => setMinutes(p)}
                      className={`text-xs px-2 py-1 rounded-full ${minutes===p ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                    >{p}m</button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={minutes}
                    onChange={(e) => setMinutes(Math.max(1, Number(e.target.value || 0)))}
                    className="w-16 text-sm px-2 py-1 border rounded-md"
                    aria-label="minutes"
                  />
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <input
                    type="text"
                    value={soundUrl}
                    onChange={(e) => setSoundUrl(e.target.value)}
                    placeholder="Sound URL (optional)"
                    className="text-sm px-3 py-1 border rounded-md w-56"
                    aria-label="sound-url"
                  />
                  <button
                    onClick={() => playSoundOnce({ sound: soundUrl || 'bell', volume: 1.0 })}
                    className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm"
                    title="Play sound URL"
                  >
                    Test
                  </button>
                </div>
                <div className="ml-4 flex items-center gap-2">
                  <input type="file" accept="audio/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                  <button
                    onClick={async () => {
                      if (!selectedFile) return alert('Choose a file first');
                      setUploading(true);
                      try {
                        const fd = new FormData();
                        fd.append('file', selectedFile);
                        const res = await fetch('/api/sounds/upload', { method: 'POST', body: fd });
                        const data = await res.json();
                        if (!res.ok) throw new Error(data.message || 'Upload failed');
                        setSoundUrl(data.url);
                        alert('Uploaded: ' + data.filename);
                      } catch (err) {
                        console.error('upload failed', err);
                        alert(err?.message || 'Upload failed');
                      } finally {
                        setUploading(false);
                      }
                    }}
                    className="px-3 py-1 rounded-md bg-emerald-600 text-white text-sm"
                  >
                    {uploading ? 'Uploading...' : 'Upload'}
                  </button>
                </div>
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
                <button
                  onClick={() => navigate('/stopwatch', { state: { initial: minutes * 60, sound: soundUrl || 'bell' } })}
                  className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white"
                >
                  Start
                </button>
                <button
                  onClick={() => navigate(`/stopwatch?initial=${minutes * 60}${soundUrl ? `&sound=${encodeURIComponent(soundUrl)}` : ''}`)}
                  className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700"
                >
                  Preset
                </button>
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
