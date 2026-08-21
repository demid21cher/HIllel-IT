import { useDispatch } from 'react-redux';

import { deleteTodo, updateTodo } from '../../features/todos/todosThunks';

import './TodoItem.css';

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(
      updateTodo({
        ...todo,
        completed: !todo.completed,
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <div className={todo.completed ? 'todo-item completed' : 'todo-item'}>
      <div className="todo-content">
        <input
          className="todo-checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />

        <span className="todo-title">{todo.title}</span>
      </div>

      <button className="todo-delete" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
