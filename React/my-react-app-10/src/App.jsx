import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TodoPage from './pages/TodoPage';
import { fetchTodos } from './features/todos/todosThunks';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return <TodoPage />;
}

export default App;
