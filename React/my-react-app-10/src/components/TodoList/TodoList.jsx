import { useSelector } from 'react-redux';

import TodoItem from './TodoItem';

import './TodoList.css';

function TodoList() {
  const todos = useSelector((state) => state.todos.items);

  const filter = useSelector((state) => state.todos.filter);

  const status = useSelector((state) => state.todos.status);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  if (filteredTodos.length === 0) {
    return <div className="empty-todos">No tasks found</div>;
  }

  return (
    <div className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
