import React from 'react';

const ProductItem = React.memo(function ProductItem({
  product,
  onProductClick,
}) {
  console.log(`Рендер ProductItem: ${product.name}`);

  return (
    <div className="rounded-lg bg-white p-5 shadow">
      <h2 className="text-xl font-bold">{product.name}</h2>

      <p className="mt-2 text-gray-600">Категорія: {product.category}</p>

      <p className="mt-2 font-semibold">Ціна: {product.price} грн</p>

      <button
        onClick={() => onProductClick(product)}
        className="mt-4 rounded bg-green-600 px-4 py-2 text-white"
      >
        Обрати
      </button>
    </div>
  );
});

export default ProductItem;
