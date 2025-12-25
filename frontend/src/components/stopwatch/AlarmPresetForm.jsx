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
    <form onSubmit={submit} style={{ marginBottom: 12 }}>
      <Input value={name} onChange={setName} placeholder="Preset name" />
      <Input value={minutes} onChange={setMinutes} type="number" min={10} max={120} />
      <select value={sound} onChange={(e) => setSound(e.target.value)}>
        <option value="bell">bell</option>
        <option value="chime">chime</option>
        <option value="gong">gong</option>
        <option value="soft">soft</option>
        <option value="nature">nature</option>
      </select>
      <div style={{ marginTop: 8 }}>
        <Button type="submit">Add Preset</Button>
      </div>
    </form>
  );
}
