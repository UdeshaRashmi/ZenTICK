import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

export default function TodoForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!title) return;
    try {
      setSaving(true);
      await onCreate({ title });
      setTitle('');
    } catch (err) {
      console.error('create todo failed', err);
      // show a helpful message when possible
      const msg = err?.response?.data?.message || err?.message || 'Failed to create todo';
      alert(msg);
    } finally {
      setSaving(false);
    }
  };
  return (
    <form onSubmit={submit} className="flex gap-2 items-center">
      <Input value={title} onChange={setTitle} placeholder="New todo" />
      <Button type="submit" disabled={saving}>{saving ? 'Adding...' : 'Add'}</Button>
    </form>
  );
}
