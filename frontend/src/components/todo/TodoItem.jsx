import React, { useState } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const id = todo._id || todo.id;
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title || '');
  const [saving, setSaving] = useState(false);

  const startEdit = () => {
    setTitle(todo.title || '');
    setEditing(true);
  };

  const cancelEdit = () => {
    setEditing(false);
    setTitle(todo.title || '');
  };

  const saveEdit = async () => {
    if (!onUpdate) return setEditing(false);
    try {
      setSaving(true);
      await onUpdate(id, { title });
      setEditing(false);
    } catch (err) {
      console.error('update todo failed', err);
      alert(err?.response?.data?.message || 'Failed to update todo');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-center justify-between px-3 py-2 border-b last:border-b-0">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={!!todo.completed}
          onChange={() => onToggle && onToggle(todo)}
          className="w-4 h-4"
        />

        {!editing ? (
          <span className="ml-1 flex-1">{todo.title}</span>
        ) : (
          <div className="flex-1">
            <Input value={title} onChange={setTitle} />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {!editing ? (
          <>
            <Button onClick={startEdit} className="bg-emerald-500 hover:bg-emerald-400">Edit</Button>
            <Button onClick={() => onDelete && onDelete(id)} className="bg-red-600 hover:bg-red-500">Delete</Button>
          </>
        ) : (
          <>
            <Button onClick={saveEdit} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
            <Button onClick={cancelEdit} className="bg-gray-300 text-black">Cancel</Button>
          </>
        )}
      </div>
    </div>
  );
}
