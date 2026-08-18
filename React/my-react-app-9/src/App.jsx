import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

import { useCallback, useMemo, useState } from 'react';
import ProductList from './components/ProductList';

const products = [
  { id: 1, name: 'Power Bank', price: 1200, category: 'Електроніка' },
  { id: 2, name: 'Настільна лампа', price: 850, category: 'Дім' },
  { id: 3, name: 'Бездротові навушники', price: 1800, category: 'Електроніка' },
  { id: 4, name: 'Термокружка', price: 600, category: 'Дім' },
  { id: 5, name: 'USB-хаб', price: 450, category: 'Електроніка' },
  { id: 6, name: 'Органайзер', price: 350, category: 'Дім' },
];

function App() {
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(0);

  // useMemo запам'ятовує результат складного обчислення.
  // Фільтрація виконується тільки тоді, коли змінюється search.
  const filteredProducts = useMemo(() => {
    console.log('Виконується фільтрація товарів...');

    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // useCallback запам'ятовує посилання на функцію.
  // Функція не створюється заново при кожному ререндері App.
  const handleProductClick = useCallback((product) => {
    alert(`Ви обрали: ${product.name}`);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold">
          Демонстрація мемоізації в React
        </h1>

        <div className="mb-6 rounded-lg bg-white p-6 shadow">
          <input
            type="text"
            placeholder="Пошук товару..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded border p-3"
          />

          <button
            onClick={() => setCount(count + 1)}
            className="mt-4 rounded bg-blue-600 px-5 py-2 text-white"
          >
            Змінити лічильник: {count}
          </button>
        </div>

        <ProductList
          products={filteredProducts}
          onProductClick={handleProductClick}
        />
      </div>
    </div>
  );
}

export default App;
