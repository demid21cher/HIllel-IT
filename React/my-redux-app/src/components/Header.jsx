import { useSelector } from 'react-redux';

function Header() {
  const cart = useSelector((state) => state.cart.items);

  return (
    <header style={{ padding: '20px', background: '#061781ff' }}>
      <h1>Redux Shop</h1>

      <h3>Товарів у кошику: {cart.length}</h3>
    </header>
  );
}

export default Header;
