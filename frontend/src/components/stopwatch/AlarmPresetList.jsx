import React from 'react';
import Button from '../common/Button';

export default function AlarmPresetList({ presets = [], onTrigger, onDelete }) {
  if (!presets || presets.length === 0) return <div>No presets</div>;
  return (
    <ul>
      {presets.map((p) => (
        <li key={p._id || p.name} style={{ marginBottom: 8 }}>
          <strong>{p.name || p.label}</strong> — {p.durationInMinutes || Math.round((p.duration||0)/60)} min
          <div>
            <Button onClick={() => onTrigger && onTrigger(p)}>Trigger</Button>
            <Button onClick={() => onDelete && onDelete(p._id)} style={{ marginLeft: 8 }}>Delete</Button>
          </div>
        </li>
      ))}
    </ul>
  );
}
