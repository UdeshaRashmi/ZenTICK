import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos = [], onToggle, onDelete }) {
  const list = Array.isArray(todos) ? todos : (todos && todos.data ? todos.data : []);
  if (!list || list.length === 0) return <div className="muted">No todos</div>;
  return (
    <div className="space-y-1">
      {list.map((t) => (
        <TodoItem key={t._id || t.id} todo={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
