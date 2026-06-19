function Counter({ count, setCount }) {
  return (
    <div>
      <p>Лічильник: {count}</p>
      <button onClick={() => setCount(count + 1)}>Збільшити</button>
    </div>
  );
}

export default Counter;
