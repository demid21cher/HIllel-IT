import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import DataFetcher from './components/DataFetcher';

function App() {
  return (
    <DataFetcher url="https://official-joke-api.appspot.com/jokes/programming/random" />
  );
}

export default App;
