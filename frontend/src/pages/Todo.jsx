 import React from 'react';
import useTodos from '../hooks/useTodos';
import TodoForm from '../components/todo/TodoForm';
import TodoList from '../components/todo/TodoList';

export default function Todo() {
  const { todos, loading, createTodo, updateTodo, deleteTodo } = useTodos();

  const toggle = (todo) => {
    updateTodo(todo._id, { completed: !todo.completed });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50 flex justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8">

        {/* Header */}
        <h2 className="flex items-center justify-center gap-2 text-3xl font-bold text-gray-800 mb-6">
          <span className="material-icons text-indigo-600">
            checklist
          </span>
          My Todos
        </h2>

        {/* Create Todo */}
        <div className="mb-6">
          <TodoForm onCreate={createTodo} />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-10 text-gray-500 animate-pulse">
            <span className="material-icons mr-2">hourglass_empty</span>
            Loading todos...
          </div>
        ) : todos.length === 0 ? (
          <div className="flex flex-col items-center text-gray-400 py-10">
            <span className="material-icons text-5xl mb-2">
              inbox
            </span>
            No todos yet. Add one above
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggle}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        )}
      </div>
    </div>
  );
}
