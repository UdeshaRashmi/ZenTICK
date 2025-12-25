import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

export default function AlarmPresetForm({ onCreate }) {
  const [name, setName] = useState('');
  const [minutes, setMinutes] = useState(15);
  const [sound, setSound] = useState('chime');

  const submit = (e) => {
    e.preventDefault();
    onCreate && onCreate({ name, durationInMinutes: Number(minutes), sound });
    setName('');
  };

  return (
    <form onSubmit={submit} className="space-y-3 mb-3">
      <Input value={name} onChange={setName} placeholder="Preset name" />
      <div className="flex gap-2">
        <Input value={minutes} onChange={setMinutes} type="number" min={10} max={120} className="w-32" />
        <select value={sound} onChange={(e) => setSound(e.target.value)} className="px-3 py-2 border rounded-md">
          <option value="bell">bell</option>
          <option value="chime">chime</option>
          <option value="gong">gong</option>
          <option value="soft">soft</option>
          <option value="nature">nature</option>
        </select>
      </div>
      <div>
        <Button type="submit">Add Preset</Button>
      </div>
    </form>
  );
}
