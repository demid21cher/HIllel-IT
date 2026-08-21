import { createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// GET
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch(`${API_URL}?_limit=10`);

  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }

  return await response.json();
});

// POST
export const addTodo = createAsyncThunk('todos/addTodo', async (title) => {
  const response = await fetch(API_URL, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      title,
      completed: false,
      userId: 1,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add todo');
  }

  return await response.json();
});

// DELETE
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete todo');
  }

  return id;
});

// PUT
export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
  const response = await fetch(`${API_URL}/${todo.id}`, {
    method: 'PUT',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error('Failed to update todo');
  }

  return await response.json();
});
