import React from 'react';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">

      {/* Floating Effects Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Green Leaves */}
        {[...Array(6)].map((_, i) => (
          <span key={`leaf-${i}`} className="float slow material-icons text-green-400 opacity-40">
            eco
          </span>
        ))}

        {/* Autumn Leaves */}
        {[...Array(5)].map((_, i) => (
          <span key={`autumn-${i}`} className="float medium material-icons text-orange-400 opacity-40">
            spa
          </span>
        ))}

        {/* Sakura Petals */}
        {[...Array(6)].map((_, i) => (
          <span key={`sakura-${i}`} className="float fast material-icons text-pink-300 opacity-50">
            local_florist
          </span>
        ))}

        {/* Snowflakes */}
        {[...Array(6)].map((_, i) => (
          <span key={`snow-${i}`} className="snow material-icons text-blue-200 opacity-70">
            ac_unit
          </span>
        ))}

        {/* Stars */}
        {[...Array(10)].map((_, i) => (
          <span key={`star-${i}`} className="star material-icons text-yellow-300 opacity-50">
            star
          </span>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl w-full text-center space-y-10">

        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">
            Welcome to <span className="text-indigo-600">Productivity Hub</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mt-3">
            A calm, beautiful space to manage tasks, track time, and stay focused.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: 'checklist', title: 'Todo Manager', color: 'indigo' },
            { icon: 'timer', title: 'Smart Stopwatch', color: 'purple' },
            { icon: 'self_improvement', title: 'Stay Focused', color: 'green' },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
              <div className={`mx-auto mb-4 w-14 h-14 flex items-center justify-center rounded-full bg-${f.color}-100`}>
                <span className={`material-icons text-${f.color}-600 text-3xl`}>
                  {f.icon}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{f.title}</h3>
              <p className="text-gray-500 mt-2">
                Designed to improve focus and productivity.
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/todos" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition">
            <span className="material-icons">check_circle</span>
            Go to Todos
          </a>
          <a href="/stopwatch" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 text-white hover:bg-gray-900 transition">
            <span className="material-icons">timer</span>
            Open Stopwatch
          </a>
        </div>

        <div className="text-gray-400 text-sm pt-8">
          Calm • Focus • Flow 🌿
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .float, .snow, .star {
          position: absolute;
          top: -10%;
          left: calc(100% * var(--x));
          font-size: calc(16px + 20px * var(--s));
        }

        .float {
          animation: fall 20s linear infinite;
        }

        .slow { animation-duration: 26s; }
        .medium { animation-duration: 20s; }
        .fast { animation-duration: 14s; }

        .snow {
          animation: snowFall 18s linear infinite;
        }

        .star {
          top: calc(100% * var(--y));
          animation: twinkle 4s ease-in-out infinite;
        }

        @keyframes fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.5; }
          100% { transform: translateY(120vh) rotate(360deg); opacity: 0; }
        }

        @keyframes snowFall {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.7; }
          100% { transform: translateY(120vh); opacity: 0; }
        }

        @keyframes twinkle {
          0%,100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1); }
        }

        /* Randomize */
        span {
          --x: ${Math.random()};
          --y: ${Math.random()};
          --s: ${Math.random()};
        }
      `}</style>
    </div>
  );
}
