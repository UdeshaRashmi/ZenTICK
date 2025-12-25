import React from 'react';
import useTodos from '../hooks/useTodos';
import TodoForm from '../components/todo/TodoForm';
import TodoList from '../components/todo/TodoList';

export default function Home() {
  const { todos, loading, createTodo, updateTodo, deleteTodo } = useTodos();

  const toggle = (todo) => {
    updateTodo(todo._id, { completed: !todo.completed });
  };

  return (
    <div>
      <h2>Todos</h2>
      <TodoForm onCreate={createTodo} />
      {loading ? <div>Loading...</div> : <TodoList todos={todos} onToggle={toggle} onDelete={deleteTodo} onUpdate={updateTodo} />}
    </div>
  );
}
