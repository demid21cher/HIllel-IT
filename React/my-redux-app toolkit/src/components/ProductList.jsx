import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct, fetchProducts } from '../redux/cartSlice';

function ProductList() {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <p>Завантаження...</p>;
  }

  if (error) {
    return <p>Помилка: {error}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Товари</h2>

      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
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
