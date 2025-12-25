import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

export default function TodoForm({ onCreate }) {
  const [title, setTitle] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    if (!title) return;
    await onCreate({ title });
    setTitle('');
  };
  return (
    <form onSubmit={submit}>
      <Input value={title} onChange={setTitle} placeholder="New todo" />
      <Button type="submit">Add</Button>
    </form>
  );
}
