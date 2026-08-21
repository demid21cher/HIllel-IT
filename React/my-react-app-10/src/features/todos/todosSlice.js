import { createSlice } from '@reduxjs/toolkit';

import { fetchTodos, addTodo, deleteTodo, updateTodo } from './todosThunks';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  filter: 'all',
};

const todosSlice = createSlice({
  name: 'todos',

  initialState,

  reducers: {
    clearTodos(state) {
      state.items = [];
    },

    setFilter(state, action) {
      state.filter = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // GET
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })

      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // POST
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // DELETE
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo.id !== action.payload);
      })

      // PUT
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (todo) => todo.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { clearTodos, setFilter } = todosSlice.actions;

export default todosSlice.reducer;
