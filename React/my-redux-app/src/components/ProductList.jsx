import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartSlice';

const products = [
  {
    id: 1,
    name: 'Ноутбук',
    price: 30000,
  },
  {
    id: 2,
    name: 'Мишка',
    price: 800,
  },
  {
    id: 3,
    name: 'Клавіатура',
    price: 1800,
  },
];

function ProductList() {
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Товари</h2>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: '1px solid gray',
            padding: '10px',
            marginBottom: '10px',
          }}
        >
          <h3>{product.name}</h3>

          <p>{product.price} грн</p>

          <button onClick={() => dispatch(addProduct(product))}>
            Додати в кошик
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
