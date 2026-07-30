import { useState, useEffect } from 'react';

function HukUseEffect() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts?_limit=5'
        );

        if (!response.ok) {
          throw new Error('Не вдалося завантажити дані з сервера');
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <h2>Завантаження постів... Будь ласка, зачекайте.</h2>;
  }

  if (error) {
    return <h2 style={{ color: 'red' }}>Помилка: {error}</h2>;
  }

  return (
    <div>
      <h1>Список постів</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} style={{ marginBottom: '20px' }}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HukUseEffect;
