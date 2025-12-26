import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos = [], onToggle, onDelete, onUpdate }) {
  const list = Array.isArray(todos) ? todos : (todos && todos.data ? todos.data : []);
  if (!list || list.length === 0) return (
    <div className="text-center text-gray-400 py-8">
      <div className="text-4xl mb-2">📭</div>
      No todos yet — add your first task to get started
    </div>
  );

  return (
    <div className="space-y-3">
      {list.map((t) => (
        <TodoItem
          key={t._id || t.id}
          todo={t}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
