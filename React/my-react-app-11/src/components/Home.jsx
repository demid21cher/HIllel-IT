import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiUser } from 'react-icons/hi';
import Color from './Color';

const Home = () => {
  const notify = () => {
    toast('Вітаю, ви успішно відправили форму!', {
      icon: <HiUser />,
    });
  };

  return (
    <>
      <h1>Головна сторінка</h1>
      <button onClick={notify}>Відправити</button>
      <ToastContainer />
      <Color />
    </>
  );
};

export default Home;
