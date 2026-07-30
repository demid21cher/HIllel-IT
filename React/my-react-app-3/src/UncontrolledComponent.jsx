import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

import { useRef } from 'react';

const UncontrolledComponent = () => {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Надіслано значення:', inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Uncontrolled Component Example</h1>
      <input type="text" ref={inputRef} />
      <button type="submit">Показати значення в консолі</button>
    </form>
  );
};

export default UncontrolledComponent;
