import { useDispatch, useSelector } from 'react-redux';

import { setFilter } from '../../features/todos/todosSlice';

import './TodoFilter.css';

function TodoFilter() {
  const dispatch = useDispatch();

  const currentFilter = useSelector((state) => state.todos.filter);

  return (
    <div className="todo-filter">
      <button
        className={
          currentFilter === 'all' ? 'filter-button active' : 'filter-button'
        }
        onClick={() => dispatch(setFilter('all'))}
      >
        All
      </button>

      <button
        className={
          currentFilter === 'active' ? 'filter-button active' : 'filter-button'
        }
        onClick={() => dispatch(setFilter('active'))}
      >
        Active
      </button>

      <button
        className={
          currentFilter === 'completed'
            ? 'filter-button active'
            : 'filter-button'
        }
        onClick={() => dispatch(setFilter('completed'))}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilter;
