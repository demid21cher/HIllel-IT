import React from 'react';
class Counter extends React.Component {
  render() {
    const { count, setCount } = this.props;
    return (
      <div>
        <p>Лічильник: {count}</p>
        <button onClick={() => setCount(count + 1)}>Збільшити</button>
      </div>
    );
  }
}

export default Counter;
