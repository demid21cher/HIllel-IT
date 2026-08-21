import Header from '../components/Header/Header';
import TodoForm from '../components/TodoForm/TodoForm';
import TodoFilter from '../components/TodoFilter/TodoFilter';
import TodoList from '../components/TodoList/TodoList';

import './TodoPage.css';

function TodoPage() {
  return (
    <div className="todo-page">
      <div className="todo-container">
        <Header />

        <section className="todo-card">
          <TodoForm />

          <TodoFilter />

          <TodoList />
        </section>
      </div>
    </div>
  );
}

export default TodoPage;
