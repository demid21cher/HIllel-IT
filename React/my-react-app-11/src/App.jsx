import { useEffect } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';

import Login from './components/Login';
import Home from './components/Home';

const AppContent = () => {
  const navigate = useNavigate();

  const onIdle = () => {
    console.log('Користувач бездіяльний. Виконуємо вихід...');
    navigate('/login');
  };

  const onActive = () => {
    console.log('Користувач активний.');
  };

  const onAction = () => {
    console.log('Користувач виконав дію.');
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: 10 * 1000,
    throttle: 1000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(
        `Залишилось часу: ${Math.ceil(getRemainingTime() / 1000)} секунд`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [getRemainingTime]);

  return <Home />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppContent />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
