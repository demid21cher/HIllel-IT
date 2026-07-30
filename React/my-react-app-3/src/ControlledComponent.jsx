import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

const ControlledComponent = () => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <h1>Controlled Component Example</h1>
      <input type="text" value={value} onChange={handleChange} />
      <p>Current Value: {value}</p>
    </div>
  );
};

export default ControlledComponent;
