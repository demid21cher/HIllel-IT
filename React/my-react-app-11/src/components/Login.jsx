import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiUser } from 'react-icons/hi';

const Login = () => {
  const notify = () => {
    toast('Вітаю, ви успішно зареєструвалися!', {
      icon: <HiUser />,
    });
  };
  return (
    <>
      <h1>Сторінка Login</h1>
      <button onClick={notify}>Зареєструватися</button>
      <ToastContainer />
    </>
  );
};

export default Login;
