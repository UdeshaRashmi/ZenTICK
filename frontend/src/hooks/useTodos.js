import { useState, useEffect } from 'react';
import api from '../services/api';

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    setLoading(true);
    const res = await api.get('/todos');
    const payload = res.data && res.data.data ? res.data.data : res.data;
    setTodos(Array.isArray(payload) ? payload : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async (payload) => {
    const res = await api.post('/todos', payload);
    const item = res.data && res.data.data ? res.data.data : res.data;
    setTodos((s) => [item, ...s]);
    return item;
  };

  const updateTodo = async (id, payload) => {
    const res = await api.put(`/todos/${id}`, payload);
    const item = res.data && res.data.data ? res.data.data : res.data;
    setTodos((s) => s.map((t) => (t._id === id ? item : t)));
    return item;
  };

  const deleteTodo = async (id) => {
    await api.delete(`/todos/${id}`);
    setTodos((s) => s.filter((t) => t._id !== id));
  };

  return { todos, loading, createTodo, updateTodo, deleteTodo, fetchTodos };
}
