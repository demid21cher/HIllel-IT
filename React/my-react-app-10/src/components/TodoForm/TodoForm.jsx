import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTodo } from '../../features/todos/todosThunks';

import './TodoForm.css';

function TodoForm() {
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    dispatch(addTodo(title));

    setTitle('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        className="todo-input"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="What needs to be done?"
      />

      <button className="todo-add-button" type="submit">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
