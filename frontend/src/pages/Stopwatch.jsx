 import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
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
    try {
      let settings = preset;
      if (preset && (preset._id || preset.id)) {
        const res = await triggerAlarm(preset._id || preset.id);
        settings = res && (res.data || res) ? (res.data || res) : preset;
      }

      const controller = playAlarmSmoothly({
        sound: settings.sound || preset.sound || 'chime',
        rampDuration: settings.rampDuration || preset.rampDuration || 30,
        maxVolume: settings.maxVolume || preset.maxVolume || 1.0,
      });

      setActiveSoundController(controller);
    } catch (err) {
      console.error('Failed to trigger preset', err);
      // notify user
      alert(err?.response?.data?.message || err?.message || 'Failed to trigger preset');
    }
  };

  const stopSound = () => {
    if (activeSoundController) {
      activeSoundController.stop();
      setActiveSoundController(null);
    }
  };

  const location = useLocation();
  // allow passing an initial seconds value via navigation state or ?initial= query
  const params = new URLSearchParams(location.search);
  const initialFromQuery = params.get('initial') ? parseInt(params.get('initial'), 10) : null;
  const initialFromState = location.state && location.state.initial ? Number(location.state.initial) : null;
  const initialSeconds = initialFromState || initialFromQuery || 60 * 15;
  // sound may be passed via state.sound or ?sound= URL param
  const soundFromQuery = params.get('sound') || null;
  const soundFromState = location.state && location.state.sound ? location.state.sound : null;
  const finishSound = soundFromState || soundFromQuery || 'bell';

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 space-y-8">

        {/* Header */}
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-800">
          <span className="material-icons text-indigo-600 text-4xl">
            timer
          </span>
          Stopwatch
        </h2>

        {/* Stopwatch */}
        <div className="flex justify-center">
          <StopwatchDisplay
            initial={initialSeconds}
            finishSound={finishSound}
            onFinish={() => {
              /* trigger default sound */
            }}
          />
        </div>

        {/* Presets Section */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-700">
            <span className="material-icons text-indigo-500">
              alarm
            </span>
            Alarm Presets
          </h3>

          {/* Create Preset */}
          <AlarmPresetForm onCreate={handleCreate} />

          {/* Preset List */}
          {alarms.length === 0 ? (
            <div className="flex flex-col items-center text-gray-400 py-6">
              <span className="material-icons text-5xl mb-2">
                alarm_off
              </span>
              No presets added yet
            </div>
          ) : (
            <AlarmPresetList
              presets={alarms}
              onTrigger={handleTrigger}
              onDelete={deleteAlarm}
            />
          )}
        </div>

        {/* Stop Sound Button */}
        <div className="flex justify-center pt-4">
          <button
            onClick={stopSound}
            disabled={!activeSoundController}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-white font-medium transition
              ${
                activeSoundController
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            <span className="material-icons">
              volume_off
            </span>
            Stop Sound
          </button>
        </div>

      </div>
    </div>
  );
}
