import { useState, useEffect } from 'react';
import api from '../services/api';

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await api.get('/todos');
      const payload = res.data && res.data.data ? res.data.data : res.data;
      const list = Array.isArray(payload) ? payload : [];
      // normalize id field to _id for consistency
      const normalized = list.map((it) => ({ ...it, _id: it._id || it.id }));
      setTodos(normalized);
    } catch (err) {
      console.error('fetchTodos error', err);
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async (payload) => {
    try {
      const res = await api.post('/todos', payload);
      const item = res.data && res.data.data ? res.data.data : res.data;
      const normalized = { ...item, _id: item._id || item.id };
      setTodos((s) => [normalized, ...s]);
      return normalized;
    } catch (err) {
      console.error('createTodo error', err);
      throw err;
    }
  };

  const updateTodo = async (id, payload) => {
    try {
      const res = await api.put(`/todos/${id}`, payload);
      const item = res.data && res.data.data ? res.data.data : res.data;
      const normalized = { ...item, _id: item._id || item.id };
      setTodos((s) => s.map((t) => (t._id === id ? normalized : t)));
      return normalized;
    } catch (err) {
      console.error('updateTodo error', err);
      throw err;
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos((s) => s.filter((t) => t._id !== id));
    } catch (err) {
      console.error('deleteTodo error', err);
      throw err;
    }
  };

  return { todos, loading, createTodo, updateTodo, deleteTodo, fetchTodos };
}
