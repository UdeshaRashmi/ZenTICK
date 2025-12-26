// Play alarm sound with smooth ramp (fade-in)
export function playAlarmSmoothly({ sound = 'chime', rampDuration = 30, maxVolume = 1.0 } = {}) {
  // `sound` may be a simple name (e.g. 'chime') or a URL/path (https://... or /assets/...).
  const isUrl = typeof sound === 'string' && (sound.startsWith('http://') || sound.startsWith('https://') || sound.startsWith('/') || sound.startsWith('data:'));
  const path = isUrl ? sound : `/sounds/${sound}.mp3`;
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

// Play a sound once (no loop). Returns an object with `stop()` to cancel playback.
export function playSoundOnce({ sound = 'bell', volume = 1.0 } = {}) {
  const isUrl = typeof sound === 'string' && (sound.startsWith('http://') || sound.startsWith('https://') || sound.startsWith('/') || sound.startsWith('data:'));
  const path = isUrl ? sound : `/sounds/${sound}.mp3`;
  const audio = new Audio(path);
  audio.volume = Math.max(0, Math.min(1, volume));

  let stopped = false;
  const play = async () => {
    try {
      await audio.play();
    } catch (e) {
      // autoplay may be blocked; ignore
    }
  };

  const stop = () => {
    stopped = true;
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (e) {}
  };

  audio.onended = () => {
    // cleanup if needed
  };

  play();
  return { audio, stop };
}
