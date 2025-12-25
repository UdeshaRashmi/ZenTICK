import { useState, useEffect } from 'react';
import api from '../services/api';

export default function useAlarms() {
  const [alarms, setAlarms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlarms = async () => {
    setLoading(true);
    const res = await api.get('/alarms');
    // support both {data:[]} and raw array responses
    setAlarms(res.data && res.data.data ? res.data.data : res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAlarms();
  }, []);

  const createAlarm = async (payload) => {
    const res = await api.post('/alarms', payload);
    const item = res.data && res.data.data ? res.data.data : res.data;
    setAlarms((s) => [item, ...s]);
    return item;
  };

  const updateAlarm = async (id, payload) => {
    const res = await api.put(`/alarms/${id}`, payload);
    const item = res.data && res.data.data ? res.data.data : res.data;
    setAlarms((s) => s.map((a) => (a._id === id ? item : a)));
    return item;
  };

  const deleteAlarm = async (id) => {
    await api.delete(`/alarms/${id}`);
    setAlarms((s) => s.filter((a) => a._id !== id));
  };

  const triggerAlarm = async (id) => {
    const res = await api.post(`/alarms/${id}/trigger`);
    return res.data;
  };

  return { alarms, loading, fetchAlarms, createAlarm, updateAlarm, deleteAlarm, triggerAlarm };
}
