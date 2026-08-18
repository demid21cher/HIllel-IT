import { useSelector, useDispatch } from 'react-redux';
import { removeProduct } from '../redux/cartSlice';

function Cart() {
  const cart = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Кошик</h2>

      {cart.length === 0 ? (
        <p>Кошик порожній</p>
      ) : (
        cart.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              marginBottom: '10px',
              padding: '10px',
            }}
          >
            <h3>{product.title}</h3>

            <p>{product.price} грн</p>

            <button onClick={() => dispatch(removeProduct(product.id))}>
              Видалити
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;
