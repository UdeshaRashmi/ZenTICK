import React from 'react';
import Button from '../common/Button';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b last:border-b-0">
      <div className="flex items-center">
        <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo)} className="w-4 h-4" />
        <span className="ml-3">{todo.title}</span>
      </div>
      <div>
        <Button onClick={() => onDelete(todo._id)} className="bg-red-600 hover:bg-red-500">Delete</Button>
      </div>
    </div>
  );
}
