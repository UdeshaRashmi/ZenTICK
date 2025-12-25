import { useState, useEffect } from 'react';
import api from '../services/api';

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    setLoading(true);
    const res = await api.get('/todos');
    setTodos(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async (payload) => {
    const res = await api.post('/todos', payload);
    setTodos((s) => [res.data, ...s]);
    return res.data;
  };

  const updateTodo = async (id, payload) => {
    const res = await api.put(`/todos/${id}`, payload);
    setTodos((s) => s.map((t) => (t._id === id ? res.data : t)));
    return res.data;
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodos((s) => s.filter((t) => t._id !== id));
  };

  return { todos, loading, createTodo, updateTodo, deleteTodo, fetchTodos };
}
