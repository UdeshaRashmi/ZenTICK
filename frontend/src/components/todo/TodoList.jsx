import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos = [], onToggle, onDelete }) {
  if (!todos.length) return <div>No todos</div>;
  return (
    <div>
      {todos.map((t) => (
        <TodoItem key={t._id} todo={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
