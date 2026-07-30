import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import ControlledComponent from './ControlledComponent';
import UncontrolledComponent from './UncontrolledComponent';
import HukUseEffect from './HukUseEffect';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ControlledComponent></ControlledComponent>
    <UncontrolledComponent></UncontrolledComponent>
    <HukUseEffect></HukUseEffect>
  </StrictMode>
);
