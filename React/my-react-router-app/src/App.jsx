import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Layout from './components/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: <div>404 - Сторінку не знайдено</div>,
      },
    ],
  },
]);

const App = () => {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<div>Завантаження...</div>}
    />
  );
};
export default App;
