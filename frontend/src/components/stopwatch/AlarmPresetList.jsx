import React from 'react';
import Button from '../common/Button';

export default function AlarmPresetList({ presets = [], onTrigger, onDelete }) {
  const list = Array.isArray(presets) ? presets : (presets && presets.data ? presets.data : []);
  if (!list || list.length === 0) return <div>No presets</div>;
  return (
    <ul>
      {list.map((p) => (
        <li key={p._id || p.name} style={{ marginBottom: 8 }}>
          <div className="flex items-center justify-between">
            <div>
              <strong>{p.name || p.label}</strong>
              <div className="text-sm text-gray-500">{(p.durationInMinutes || Math.round((p.duration||0)/60)) + ' min'}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="primary"
                onClick={() => onTrigger && onTrigger(p)}
                disabled={!onTrigger}
              >
                Trigger
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={() => onDelete && onDelete(p._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
