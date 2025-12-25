import React, { useState } from 'react';
import StopwatchDisplay from '../components/stopwatch/StopwatchDisplay';
import AlarmPresetForm from '../components/stopwatch/AlarmPresetForm';
import AlarmPresetList from '../components/stopwatch/AlarmPresetList';
import useAlarms from '../hooks/useAlarms';
import { playAlarmSmoothly } from '../utils/sounds';

export default function StopwatchPage() {
  const { alarms, createAlarm, deleteAlarm, triggerAlarm } = useAlarms();
  const [activeSoundController, setActiveSoundController] = useState(null);

  const handleCreate = async (payload) => {
    await createAlarm(payload);
  };

  const handleTrigger = async (preset) => {
    // call backend trigger to mark lastTriggered and get settings
    const res = await triggerAlarm(preset._id || preset.id);
    const settings = res && (res.data || res);
    const controller = playAlarmSmoothly({ sound: preset.sound || 'chime', rampDuration: preset.rampDuration || 30, maxVolume: preset.maxVolume || 1.0 });
    setActiveSoundController(controller);
  };

  const stopSound = () => {
    if (activeSoundController) {
      activeSoundController.stop();
      setActiveSoundController(null);
    }
  };

  return (
    <div>
      <h2>Stopwatch</h2>
      <StopwatchDisplay initial={60 * 15} onFinish={() => { /* trigger default sound */ }} />

      <h3>Presets</h3>
      <AlarmPresetForm onCreate={handleCreate} />
      <AlarmPresetList presets={alarms} onTrigger={handleTrigger} onDelete={deleteAlarm} />

      <div style={{ marginTop: 12 }}>
        <button onClick={stopSound}>Stop Sound</button>
      </div>
    </div>
  );
}
