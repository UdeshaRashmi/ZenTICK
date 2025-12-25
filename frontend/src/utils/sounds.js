// Play alarm sound with smooth ramp (fade-in)
export function playAlarmSmoothly({ sound = 'chime', rampDuration = 30, maxVolume = 1.0 } = {}) {
  const path = `/sounds/${sound}.mp3`;
  const audio = new Audio(path);
  audio.loop = true;
  audio.volume = 0;

  let start = null;
  let rafId = null;
  let stopped = false;

  const step = (timestamp) => {
    if (!start) start = timestamp;
    const elapsed = (timestamp - start) / 1000; // seconds
    const t = Math.min(1, elapsed / Math.max(0.1, rampDuration));
    audio.volume = Math.min(maxVolume, t * maxVolume);
    if (!stopped) {
      if (t < 1) rafId = requestAnimationFrame(step);
    }
  };

  const play = async () => {
    try {
      await audio.play();
    } catch (e) {
      // autoplay may be blocked; ignore so caller can call play explicitly
    }
    rafId = requestAnimationFrame(step);
  };

  const stop = () => {
    stopped = true;
    if (rafId) cancelAnimationFrame(rafId);
    audio.pause();
    audio.currentTime = 0;
  };

  // start playing immediately (may be blocked by browser autopolicy)
  play();

  return { audio, stop };
}
