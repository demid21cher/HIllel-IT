import { Outlet, NavLink } from 'react-router';
import './Layout.css';

const Layout = () => {
  return (
    <div>
      <nav>
        <NavLink to="/" className={'nav-link'}>
          Головна
        </NavLink>
        <NavLink to="/about" className="nav-link">
          Про нас
        </NavLink>
        <NavLink to="/contact" className="nav-link">
          Контакти
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;
