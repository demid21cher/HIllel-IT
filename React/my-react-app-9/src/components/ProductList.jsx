import React from 'react';
import ProductItem from './ProductItem';

// React.memo запобігає зайвому ререндеру,
// якщо props компонента не змінилися.
const ProductList = React.memo(function ProductList({
  products,
  onProductClick,
}) {
  console.log('Рендер ProductList');

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
});

export default ProductList;
