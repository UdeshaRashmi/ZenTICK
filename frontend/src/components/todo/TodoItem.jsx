import React from 'react';
import Button from '../common/Button';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: 8 }}>
      <div>
        <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo)} />
        <span style={{ marginLeft: 8 }}>{todo.title}</span>
      </div>
      <div>
        <Button onClick={() => onDelete(todo._id)}>Delete</Button>
      </div>
    </div>
  );
}
