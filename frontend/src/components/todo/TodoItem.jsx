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
    <div className="group bg-white/60 hover:bg-white/80 rounded-xl p-3 shadow-sm flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={!!todo.completed}
          onChange={() => onToggle && onToggle(todo)}
          className="w-5 h-5 text-emerald-600 rounded"
        />

        {!editing ? (
          <span className={`ml-2 truncate ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{todo.title}</span>
        ) : (
          <div className="flex-1">
            <Input value={title} onChange={setTitle} className="bg-white" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        {!editing ? (
          <>
            <Button onClick={startEdit} variant="neutral" className="text-sm">Edit</Button>
            <Button onClick={() => onDelete && onDelete(id)} variant="danger" className="text-sm">Delete</Button>
          </>
        ) : (
          <>
            <Button onClick={saveEdit} disabled={saving} variant="primary" className="text-sm">{saving ? 'Saving...' : 'Save'}</Button>
            <Button onClick={cancelEdit} variant="ghost" className="text-sm">Cancel</Button>
          </>
        )}
      </div>
    </div>
  );
}
