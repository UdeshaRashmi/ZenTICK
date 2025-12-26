import React, { useState, useRef, useEffect } from 'react';
import { formatTime } from '../../utils/formatTime';
import Button from '../common/Button';
import { playSoundOnce } from '../../utils/sounds';

export default function StopwatchDisplay({ initial = 0, onFinish, finishSound }) {
  const [seconds, setSeconds] = useState(initial);
  const [running, setRunning] = useState(false);
  const rafRef = useRef(null);
  const lastRef = useRef(null);

  useEffect(() => {
    if (running) {
      lastRef.current = performance.now();
      const tick = (t) => {
        const delta = (t - lastRef.current) / 1000;
        lastRef.current = t;
        setSeconds((s) => s - delta);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  useEffect(() => {
    if (seconds <= 0 && running) {
      setRunning(false);
      // play a short ring once when timer finishes
      try {
        playSoundOnce({ sound: finishSound || 'bell', volume: 1.0 });
      } catch (e) {
        // ignore play errors
      }
      onFinish && onFinish();
    }
  }, [seconds, running, onFinish]);

  return (
    <div>
      <div style={{ fontSize: 48 }}>{formatTime(Math.max(0, Math.round(seconds)))}</div>
      <div style={{ marginTop: 12 }}>
        <Button onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Start'}</Button>
        <Button onClick={() => { setRunning(false); setSeconds(initial); }} style={{ marginLeft: 8 }}>Reset</Button>
      </div>
    </div>
  );
}
